import React,{Component} from 'react';
import { Card, CardTitle, CardText, CardImg, CardFooter,Row,Button,Input,InputGroup,Modal, ModalHeader, ModalBody} from 'reactstrap';
import './App.css';
import {addToCart} from './services.js';
class Product extends Component{
    constructor(props){
    super(props);
    
    this.state = {
        modal:false,
        quantity:1,
        viewvisibility:"hidden"
    }
    this.toggle = this.toggle.bind(this);
    this.sendToCart = this.sendToCart.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
    this.setViewvisibility = this.setViewvisibility.bind(this);
}
toggle(){
this.setState(prevState=>(
    {
      modal:!prevState.modal  
    }
))


}
setViewvisibility(){
  let visible = this.state.viewvisibility;
  if(visible==="hidden"){
    visible = "visible";
  }
  else{
    visible = "hidden";
  }
  this.setState({
    viewvisibility:visible
  })
}
sendToCart(name,price,image,quantity){
addToCart(name,price,image,quantity).then(result=>{
   
});
this.setState({
modal:false
});

}

setQuantity(event){
  let value;
  if(event.target.value<1){
    value=1;
  }
  else if(event.target.value>15){
    value=15;
  }
  else{
    value =event.target.value;
  }
  
this.setState(
    {
       quantity:value
       
    }
)

}

render(){
  const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
return(
        
  <div>
      <a style={{cursor:'pointer'}} onClick={this.toggle} onMouseEnter={this.setViewvisibility} onMouseLeave={this.setViewvisibility}>
        <Card className="card" >
            <CardImg  height = "70%" src={this.props.image} alt="Dress Image" />
                <Card style={{width:"100%",height:"50%",marginTop:"-9.9%",visibility:this.state.viewvisibility,color: "rgba(0,0,0,.5)",textAlign:"center",fontSize:"12px",border:"0",borderRadius:"0px"}}>
                    <CardTitle>QUICK VIEW</CardTitle>
                </Card>
               
                
             <CardFooter style={{backgroundColor:"#bfbfbf",  color: "rgba(0,0,0,.5)",border:"none"}}>
                <div style={{textAlign:"center"}}> 
                  <CardText>{this.props.name}</CardText>
                  <CardText style={{marginTop:"-5%", fontSize:"12px"}}> ${this.props.price}.00</CardText>
                 </div>       
             </CardFooter>
              
                
                
        </Card>
      </a> 
  <div>
  <div>
        <Modal style={{marginTop:"10%"}}isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader style={{border:"0"}} className="productmodalheader" toggle={this.toggle} close={closeBtn}></ModalHeader>
          <ModalBody className= "productmodal" >
            <Row>
             <Card className="productcard"  style={{height:"240px"}}inverse>
                <CardImg  height = "100%" width="100%" src={this.props.image} alt="Card image cap" />  
              </Card>
              <div className="modalproductdetails">
                <h4 >{this.props.name}</h4>
                <h6 class="priceheader">${this.props.price}.00</h6>
              <div class="quantityheader">
                  Quantity
              </div>
              <InputGroup style={{width:"65px",marginTop:"5%"}} > 
                <Input  type="number" step="1" min="1" max="15" value={this.state.quantity} onChange = {this.setQuantity}></Input>
              </InputGroup>
                <Button style={{marginTop:"10%",fontSize:"15px",width:"100%",border:"0",borderRadius:"0px"}} size="lg" onClick={()=>{this.sendToCart(this.props.name,this.props.price,this.props.image,this.state.quantity)}} block>ADD TO CART</Button>
              </div>
            </Row>
          
          </ModalBody>
         
        </Modal>
  </div>
  </div>
  </div>
         );

}


}
export default Product;