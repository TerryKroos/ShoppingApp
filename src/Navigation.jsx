import React,{Component} from 'react';


import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    } from 'reactstrap';
class Navigation extends React.Component{
      constructor(){
        super();
        this.state = {
          collapsed:true
        }
        this.toggleNavbar = this.toggleNavbar.bind(this);
 
      }
    toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
      render(){
        return(
            <div>
            <Navbar  style={{backgroundColor: '#f1f1f1',width:"100%"}}light expand="md">
              <NavbarBrand href="/products">Terence & CO</NavbarBrand>
              <NavbarToggler onClick={this.toggleNavbar}/>
              <Collapse isOpen = {!this.state.collapsed} navbar>
                <Nav className="ml-auto" navbar>
                
                  <NavItem>
                       <NavLink href = "/products" to="/products">Shop</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/Cart">Cart</NavLink>
                  </NavItem>
                 
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        )
    }

    }


export default Navigation;