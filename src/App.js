import { useState } from 'react';
import './App.css';
import Header from './component/Header';
// App Lin : https://food-basket-1f2b5.web.app
function App() {
  const [Cart, setCart] = useState([])
  const product = [{name:'Momos',price:100,img:'https://kitchenmai.com/wp-content/uploads/2019/03/chkn_momos2-e1564320413679-500x500.jpg'},
                    {name:'Burger',price:150,img:'http://thoughtcatalog.com/wp-content/uploads/2014/07/shutterstock_172259846.jpg?w=786'},
                    {name:'Chicken Wings',price:100,img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-d1zQWRfiPRVXljcVRdHzlJH5s02sYcxyOQ&usqp=CAU'},
                    {name:'Shawarma',price:100,img:'https://www.recipetineats.com/wp-content/uploads/2014/12/Chicken-Shawarma_5.jpg'},
  ]

  const addTocart=(p)=>{
    let newCart = [...Cart]
    let itemCart = newCart.find(
      (item)=> p.name === item.name
    )
    if(itemCart){
      itemCart.quantity++
    }
    else{
      itemCart = {
        ...p,quantity:1,
      }
      newCart.push(itemCart)
    }
    setCart(newCart)
  } 

  const inc=(p)=>{
   let inCart = [...Cart]
   inCart.find(
     (item)=>item.name === p.name 
   ).quantity = p.quantity+1
   setCart(inCart)
  }
  
  const dec=(p)=>{
   let deCart = [...Cart]
   deCart.find(
     (item)=>item.name === p.name 
   ).quantity = p.quantity-1
   setCart(deCart)
  }

  const removeFromcart=(p)=>{
    setCart(Cart.filter((Product)=>Product !== p))
  } 
  const deleteAll=()=>{
    setCart([])
  } 

  return (
    <div className="App">
      <Header cartlen = {Cart.length} data ={Cart} remove = {removeFromcart} deleteall={deleteAll} inc={inc} dec={dec}></Header>  
      <div className='products'>
        {
          product.map((p,index)=>(
            <div className='prd' key={index}>
              <h3>{p.name}</h3>
              <img src={p.img} alt=""/>
              <br />
              <small>Price</small>
              <p>{p.price}</p>
              <button onClick={()=>addTocart(p)}>Add to Cart</button>
            </div>
          ))
          }
      </div>
    </div>
  );
}

export default App;
