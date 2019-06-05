import React,{Component} from 'react';
import {getCart,addToCart,updateCart} from './services';
import { Card,CardText, CardImg,Button,Input,Table,Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import {deleteFromCart,deleteCart} from './services';
import './App.css';

class Cart extends Component{
constructor(){
   super();
   this.state = {
     cart:[],
     mounted:false,
     totalcost:0,
     modal:false
     
   
   }
   this.getInitialCart = this.getInitialCart.bind(this);
   this.setQuantity = this.setQuantity.bind(this);
   this.deleteAllCart = this.deleteAllCart.bind(this);
   this.toggle = this.toggle.bind(this);
  

}
componentDidMount(){
    
    this.getInitialCart();

}

getInitialCart(){
  
   getCart().then(result=>{
     let cost = 0;
     result.map(item=>(
        cost = cost + item.price * item.quantity
     ));
     let isEmpty = false;
     if(result.length===0){
       isEmpty = true;
     }
       this.setState({
           cart:result,
           mounted:!isEmpty,
           totalcost:cost
       })
   })
  

}

setQuantity(e,name,index,image,price){
   let value;
   const newState = Object.assign({},this.state);
   if(e.target.value<1){
     value=1;
   }
   else if(e.target.value>15){
     value = 15;
   }
   else{
     value = e.target.value;
   }
   console.log(value);
   newState.cart[index].quantity= value;
   let cost = 0;
   this.state.cart.map(item=>(
      cost = cost + item.price * item.quantity
   )

   )
   newState.totalcost = cost;
   this.setState(newState);
   updateCart(name,price,image,value);
}
deleteItem(name){

  const newState = Object.assign({},this.state);
  newState.cart = newState.cart.filter(product=>product.name!=name);
  if(newState.cart.length===0){
    newState.mounted = false;
  }
  this.setState(newState);
  deleteFromCart(name);
}
deleteAllCart(){
   this.setState({
     cart:[],
     mounted:!this.state.mounted,
     modal:!this.state.modal
   });
 
   deleteCart();



}
toggle(){
  this.setState({
    modal:!this.state.modal
  })
}

    render(){
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        if(this.state.mounted){
        const tableList = this.state.cart.map((item,index)=>(
      
        <tr class="tablerow">
           <td>
             <div>
                             
                <Card style={{width:"120px", height:"110px"}} inverse>
                  <CardImg  height = "100%" width="100%" src={item.image} alt="Product image" />
                   
                  <CardText style={{marginLeft:"30%",fontSize:"13px"}}>{item.name}</CardText>
                  <CardText style = {{marginTop:"-20px",marginLeft:"29%",fontSize:"13px"}}>
                    <Link style={{color:"black"}}onClick={()=> this.deleteItem(item.name)}>Remove</Link>
                  </CardText>
                </Card>

             </div>

           </td>
           <td>${item.price}.00</td>
           <td>
             <Input style={{width:"60px"}}  type="number" step="1" min ="1" max="15" value={item.quantity < 1 ? 1:item.quantity} onChange={(e)=>{this.setQuantity(e,item.name,index,item.image,item.price)}}></Input>
           </td>
           <td>{item.price * (item.quantity< 1 ? 1:item.quantity)}</td>
        </tr>
      ));
    return(
          <div className="carttable" style={{height:"1500px"}}> 
            
             <Table className="table"responsive borderless>
                      <tr>
                        <td>My Cart</td>
                        <td>Price</td>
                        <td>Qty</td>
                        <td>Total</td>
                      </tr>
                      
                         {tableList}
                    
                       <tr>
                         <td></td>
                         <td></td>
                         <td><CardText>Subtotal</CardText></td>
                         <td><CardText>${this.state.totalcost}.00</CardText></td>

                       </tr>
                          
                       <tr>
                          <td></td>
                          <td></td>
                          <td><CardText>Shipping</CardText></td>
                          <td><CardText>FREE</CardText></td>
                       </tr>
                  
                   
                       <tr>
                           <td></td>
                           <td></td>
                           <td><CardText>Total</CardText></td>
                           <td><CardText>${this.state.totalcost}.00</CardText></td>

                       </tr>
                          <tr>
                           <td></td>
                           <td></td>
                           <td><Button className="checkoutbutton" onClick={this.deleteAllCart}>Checkout</Button></td>     
                          </tr>
                         
                       
              </Table>
                       
               
            
          </div>
    
    )

}

return(
       <div className="cartempty">
         <CardText style={{border:"0",textAlign:"center"}}>Empty Cart</CardText>
         <Modal style={{marginTop:"10%"}}className = "cartmodal" isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader style={{border:"0"}}toggle={this.toggle} close={closeBtn}></ModalHeader>
             <ModalBody style={{textAlign:"center",height:"50%"}}>
              <CardText style={{marginBottom:"40%"}}>Thank you for shopping with us!</CardText>
             </ModalBody>
   
         </Modal>
      </div>
)
    }
}
export default Cart;