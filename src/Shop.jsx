import React ,{Component} from 'react';

import Product from './Product';
import './App.css';


class Shop extends Component{
 constructor(){
    super();
     this.state = {
       products:[{name:"Shoes",price:200,image:"https://previews.123rf.com/images/gorbelabda/gorbelabda1205/gorbelabda120500148/13600984-mens-shoes-with-white-background.jpg"},
       {name:"Shirts",price:300,image:"https://previews.123rf.com/images/picsfive/picsfive1402/picsfive140200229/26034367-close-up-of-a-white-t-shirt-template-on-white-background.jpg"},
       {name:"Belts",price:200,image:"https://previews.123rf.com/images/radionphoto/radionphoto1704/radionphoto170400337/75568127-military-belt-on-isolated-white-background.jpg"},
       {name:"Skirts",price:300,image:"https://previews.123rf.com/images/pakhnyushchyy/pakhnyushchyy1506/pakhnyushchyy150600588/41081691-jean-skirt-isolated-on-white-background.jpg"},
       {name:"Jackets",price:300,image:"https://previews.123rf.com/images/donikz/donikz1803/donikz180300258/97666195-children-s-winter-jacket-isolated-on-white-background.jpg"},
       {name:"Trousers",price:200,image:"https://previews.123rf.com/images/sergeybogachuk/sergeybogachuk1608/sergeybogachuk160800025/63120076-grey-sports-trousers-on-a-white-background-clothing-sport.jpg"},
       ]
       
     }
 }


render(){
     const productList = this.state.products.map(
     product=>(
         
       <li className = "listitem">
         <Product style={{height:"10%"}} name = {product.name} image={product.image} price={product.price}></Product>
       </li>
     )
    )
  return(
      <div className="shopdiv">
        <ul class = "products" style = {{listStyle:"none"}}>
             {productList}
        </ul>
      </div>
       )

  

}


}

export default Shop;

