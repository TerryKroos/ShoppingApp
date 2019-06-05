const products = [{name:"Shoes",price:200,image:""},
{name:"Shirts",price:300,image:""},
{name:"Belts",price:200,image:""},
{name:"Hoodies",price:300,image:""},
{name:"Jackets",price:300,image:""},
{name:"Trousers",price:200,image:""}
];

const cart = [{name:"Shoes",price:200,image:"https://previews.123rf.com/images/gorbelabda/gorbelabda1205/gorbelabda120500148/13600984-mens-shoes-with-white-background.jpg",quantity:1}];

function addToCart({name,price,image,quantity}){
       if(cart.some(item=>item.name===name)){
          updateCart(name,quantity);
       }
       else{
         cart.push({name,price,image,quantity});
       }
 
        

}
function updateCart(name,quantity){
   let index = cart.findIndex((item=> item.name === name));
   cart[index].quantity = quantity;
   
}

function deleteFromCart(name){
   cart = cart.filter(product => product.name != name);
}
const shop = {products,cart,addToCart,deleteFromCart,updateCart};
module.exports = shop;
