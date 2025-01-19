import { createContext, useContext, useEffect, useState } from 'react';
import './App.css';

const cartContext = createContext(null);

const CartList = ({children}) => {
  const [cart, setCart] = useState({});
  const [cartcount, setCartcount] = useState(0);
  const [priceList, setPriceList] = useState({});
  const [total, setTotal] = useState(0);
  const [trigger, setTrigger] = useState(false);
  const [imageLink, setImageLink] = useState({});

  return (
    <cartContext.Provider value={{ imageLink, setImageLink, trigger, setTrigger, total, setTotal, cart, setCart, cartcount, setCartcount, priceList, setPriceList, }}>
      {children}
    </cartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(cartContext);
  if(!context) {
    throw new Error("useCarte must must used within Cart");
  }

  return context;
};


function FoodCard(props) {
  const [item_count, setitem_Count] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [picLink, setPicLink] = useState("");
  const { imageLink, setImageLink, total, setTotal, priceList, setPriceList, cart, setCart, setCartcount } = useCart();
  
  useEffect(() => {setPicLink(props.image), setName(props.nounce); setPrice(props.price);}, [props.nounce, props.price]);
  
  
  const copyImgLink = () => {
    let new_imgLink = {};
  
    for(let key in imageLink) {
      new_imgLink[key] = imageLink[key];
    }

    return new_imgLink;
  };

  function AddItemButton(props) {
    return (
      <button onClick={() => addToCart(props)} className='flex justify-center items-center border-2 font-RedHat-Text-SemiBold bg-white border-black rounded-3xl h-10 w-40 hover:border-orange-600 gap-3'>
        <img src="/src/assets/images/icon-add-to-cart.svg" alt="Image Not Found..."/>
        Add to Cart
      </button>
    );
  }
  
  function AddAndRemoveButton(props) {
    return (
      <div className='flex flex-row gap-10 justify-center items-center bg-orange-600 rounded-3xl h-10 w-40'>
        <button onClick={() => deleteItemMinus(props)} className='justify-center items-center border-2 text-center border-white rounded-full text-white hover:bg-white hover:text-orange-600 font-RedHat-Text-Bold aspect-square h-7 p-0 leading-none'>-</button>
        {cart[name]}
        <button onClick={() => addItemPlus(props)} className='flex justify-center items-center border-2 text-center border-white rounded-full text-white hover:bg-white hover:text-orange-600 font-RedHat-Text-Bold aspect-square p-0 h-7 leading-none'>+</button>
      </div>
    );
  }
  
  const copyCart = () => {
    let newCart = {};

    for(let key in cart) { newCart[key] = cart[key]; }

    return newCart;
  };

  const copyPriceList = () => {
    let newPriceList = {};

    for(let key in priceList) { newPriceList[key] = priceList[key]; }

    return newPriceList;
  };

  const addToCart = (props) => {
    setitem_Count(item_count + 1);
    setCartcount(curr => curr + 1);

    let new_imgLink = copyImgLink();
    let newCart = copyCart();
    let newPriceList = copyPriceList();
    let newTotal = total + Number(price.replace("$", ""));

    newCart[name] = 1;
    newPriceList[name] = price;
    new_imgLink[name] = picLink;

    console.log(picLink);

    setImageLink(new_imgLink);
    setCart(newCart);
    setPriceList(newPriceList);
    setTotal(newTotal);
  };

  const addItemPlus = (props) => {
    setitem_Count(item_count + 1);
    setCartcount(curr => curr + 1);

    let newCart = copyCart();
    let newTotal = total + Number(price.replace("$", ""));

    
    newCart[name]++;
    setCart(newCart);
    setTotal(newTotal);
  };

  const deleteItemMinus = (props) => {
    setitem_Count(item_count - 1);
    setCartcount(curr => curr - 1);

    let newCart = copyCart();
    let newPriceList = copyPriceList();
    let newTotal = total - Number(price.replace("$", ""));

    if(newCart[name] === 1) {
      delete newCart[name];
      delete newPriceList[name];
    }
    else {
      newCart[name]--;
    }

    setPriceList(newPriceList);
    setCart(newCart);
    setTotal(newTotal);
  };

  return (
    <div className='flex flex-col gap-y-1 leading-none'>
      <div className='flex relative'>
        <figure className='relative'>
          <img src={props.image} className="rounded-lg w-52" alt="Image Not found..."></img>
        <div className='absolute bottom-[-16px] left-1/2 transform -translate-x-1/2 flex justify-center items-center'>
          { !cart[name] ? <AddItemButton/> : <AddAndRemoveButton/>}
        </div>
        </figure>
      </div>
      <br />
      <pre className='leading-none'>
        <p className='font-RedHat-Text-Regular text-xs text-gray-400'>{props.category}</p>
        <p className='font-RedHat-Text-SemiBold text-sm'>{props.nounce}</p>
        <p className='font-RedHat-Text-SemiBold text-orange-600 text-sm'>{props.price}</p>
      </pre>
    </div>
  );
}


function Cart(props) {
  const { setTrigger, total, setTotal, priceList, setPriceList ,cart, setCart, cartcount, setCartcount } = useCart();

  const deleteElement = (name) => {
    const copyCart = () => {
      let newCart = {};
  
      for(let key in cart) { newCart[key] = cart[key]; }
  
      return newCart;
    };
  
    const copyPriceList = () => {
      let newPriceList = {};
  
      for(let key in priceList) { newPriceList[key] = priceList[key]; }
  
      return newPriceList;
    };
  
    const newCartcount = cartcount - cart[name];
    const newPriceList = copyPriceList();
    const newCart = copyCart();
    const newTotal = total - Number(priceList[name].replace("$", "")) * Number(cart[name]);

    delete newPriceList[name];
    delete newCart[name];

    setCartcount(newCartcount);
    setPriceList(newPriceList);
    setCart(newCart);
    setTotal(newTotal);
  };

  const dialogTrigger = (props) => { setTrigger(true); };

  return (
    <div className='flex flex-col relative bg-white w-cart h-cart-list rounded-3xl right-0'>
        <p className='font-RedHat-Text-Bold text-orange-600 px-5 py-5 text-2xl'>Your Cart ({cartcount})</p>
        <div className='flex flex-col items-star max-h-48 overflow-y-auto  px-6'>
          {Object.entries(priceList).map(([key, value]) => (
            <div className='flex flex-col relative bg-white'>
              <p className='font-RedHat-Text-SemiBold'>{key}</p>
              <div className='flex flex-row gap-2 items-start w-40'>
                <p className='text-orange-600 font-RedHat-Text-SemiBold'>{cart[key]}x</p> 
                <p className='font-RedHat-Variable text-gray-400'>@{value}</p> 
                <p className='font-RedHat-Text-SemiBold text-gray-700'>${(Number(value.replace("$", "")) * cart[key]).toFixed(2)}</p>    
              </div>
              <hr className="w-full border-t-1 my-2" />
              <button onClick={() => deleteElement(key)} className='flex absolute justify-center items-center right-0 rounded-full border-gray-200 border-2 aspect-square h-5 hover:bg-black'><img src="/src/assets/images/icon-remove-item.svg" alt="Not Found..." /></button>
            </div>
          ))}
        </div>
        <div className='flex flex-row absolute justify-between items-center w-[30rem] left-1/2 transform -translate-x-1/2 top-[18rem]'>
          <p className='flex font-RedHat-Variable'>Order Total</p>
          <p className=' flex font-RedHat-Text-Bold text-xl'>${total}</p>
        </div>
        <div className='flex flex-row absolute justify-center items-center gap-1 bg-yellow-50 w-80 h-14 top-[22rem] rounded-xl left-1/2 transform -translate-x-1/2 '>
          <img src="/src/assets/images/icon-carbon-neutral.svg" alt="Not Found..." />
          <p className='font-RedHat-Variable'>This is a</p> <p className='font-RedHat-Text-Bold'>carbon-neutral</p> <p className='font-RedHat-Text-SemiBold'>delivery</p>
        </div>
        <div>
          <button onClick={() => dialogTrigger(props)} className='flex absolute justify-center items-center bg-orange-600 hover:bg-orange-900 rounded-3xl left-1/2 transform -translate-x-1/2 bottom-5 w-[30rem] h-14 text-white text-xl font-RedHat-Text-SemiBold'>Confirm Order</button>
        </div>
    </div>
  );
}

function EmptyCart(props) {
  const { cartcount } = useCart();
  return (
    <div className='flex flex-col bg-white w-cart h-cart-list rounded-3xl right-0'>
      <p className='font-RedHat-Text-Bold text-orange-600 px-5 py-5 text-2xl'>Your Cart ({cartcount})</p>
      <br /> <br /> <br /> <br />
      <div className='flex flex-col relative justify-center items-center h-52 gap-14'>
        <img src="/src/assets/images/illustration-empty-cart.svg" alt="Image Not Found..." />
        <p className=' font-RedHat-Text-Bold text-lg text-amber-800'>Your added items will appear here</p>
      </div>
    </div>
  );
}

function DisplayCart(props) {
  const { cartcount } = useCart();
  return (
    cartcount === 0 ? <EmptyCart/> : <Cart/>
  );
}

function Dialog(props) {
  const { imageLink ,priceList, cart, trigger, total } = useCart();

  if(!trigger) { return null; }

  return (
    <div className='flex justify-center items-center fixed h-full bg-black/60 w-full z-50'>
      <div className='flex flex-col w-[37rem] h-[43rem] rounded-2xl bg-white'>
        <div className='flex relative justify-center items-center h-20 w-32 top-3'>
          <img src="/src/assets/images/icon-order-confirmed.svg" alt="Not Found..." />
        </div>
        <br />
        <div className='relative left-2 px-10 leading-6'>
          <p className='font-RedHat-Text-Bold text-xl'>Order Confirmed</p>
          <p className='font-RedHat-Variable text-gray-600'>We hope you enjoy your food!</p>  
        </div>
        <br />
        <div className='flex absolute items-center flex-col top-80 left-1/2 transform -translate-x-1/2 h-[26rem] w-[32rem]'>
          <div className='flex flex-col w-96 h-[23.5rem] overflow-y-auto bg-yellow-50'>
            {Object.entries(priceList).map(([key, value]) => (
              <div className='flex flex-col'>
                <div className='flex flex-row p-2 gap-3'>
                  <div className='flex'>
                    <img className='rounded-full h-14 w-14' src={imageLink[key]} alt="Not Found..." />
                  </div>
                  <div className='flex flex-row justify-between'>
                    <div className='flex flex-col'>
                      <div className='flex flex-col'>
                        <div className='flex relative flex-row'>
                          <div className='flex flex-col relative'>
                            <p className='font-RedHat-Text-SemiBold'>{key}</p>
                            <div className='flex flex-row gap-4 items-start w-40'>
                              <p className='text-orange-600 font-RedHat-Text-SemiBold'>{cart[key]}x</p> 
                              <p className='font-RedHat-Variable text-gray-400'>@{value}</p> 
                            </div>
                          </div>
                        </div>  
                      </div>
                    </div>
                  </div>
                  <div className='flex w-12 bottom-0 ml-20 items-end'>
                    <p className='font-RedHat-Text-SemiBold text-black '>${(Number(value.replace("$", "")) * cart[key]).toFixed(2)}</p>    
                  </div>
                </div>
                  <hr className="w-full border-t-1 my-2" /> 
              </div>
            ))}
          </div>
          <div className='flex flex-row w-96 h-10 justify-between bg-yellow-50'>
            <p className='pl-2 font-RedHat-Text-SemiBold text-lg'>Order Total</p>
            <p className='pr-2 font-RedHat-Text-Bold text-lg'>${total}</p>
          </div>
          <button onClick={() => window.location.reload()} className='flex absolute justify-center items-center bg-orange-600 hover:bg-orange-900 rounded-3xl left-1/2 transform -translate-x-1/2 top-[27.1rem] w-[26rem] h-14 text-white text-xl font-RedHat-Text-SemiBold'>Start New order</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <CartList>
      <Dialog>
      </Dialog> 
      <div className='grid grid-cols-[900px_1fr] h-full gap-4 px-32 bg-yellow-50'>
        <h1 className='font-RedHat-Text-Bold text-2xl relative top-4 left-11'>Desserts</h1>

        <br/>      
        <br/>

        <div className='grid grid-cols-3 gap-x-17 gap-y-5 place-items-center'> 
          <FoodCard image="/src/assets/images/image-waffle-desktop.jpg" category="Waffle" nounce="Waffle with Berries" price="$6.50"></FoodCard>
          <FoodCard image="/src/assets/images/image-creme-brulee-desktop.jpg" category="Crème Brulée" nounce="Vanilla Bean Crème Brûlée" price="$7.00"></FoodCard>
          <FoodCard image="/src/assets/images/image-macaron-desktop.jpg" category="Macaron" nounce="Macaron Mix of Five" price="$8.00"></FoodCard>
          <FoodCard image="/src/assets/images/image-tiramisu-desktop.jpg" category="Tiramisu" nounce="Classic Tiramisu" price="$5.50"></FoodCard>
          <FoodCard image="/images/image-baklava-desktop.jpg" category="Baklava" nounce="Pistachio Baklava" price="$4.00"></FoodCard>
          <FoodCard image="/src/assets/images/image-meringue-desktop.jpg" category="Pie" nounce="Lemon Meringue Pie" price="$5.00"></FoodCard>
          <FoodCard image="/src/assets/images/image-cake-desktop.jpg" category="Cake" nounce="Red Velvet Cake" price="$4.50"></FoodCard>
          <FoodCard image="/src/assets/images/image-brownie-desktop.jpg" category="Brownie" nounce="Salted Caramel Brownie" price="$5.50"></FoodCard>
          <FoodCard image="/src/assets/images/image-panna-cotta-desktop.jpg" category="Panna Cotta" nounce="Vanilla Panna Cotta" price="$6.50"></FoodCard>
        </div>
        <div className='flex place-content-end'> <DisplayCart/> </div>
      </div>
    </CartList>
  );
}

export default App;
export { CartList, useCart };
