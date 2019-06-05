export const getProducts = () =>{
    return fetch("/products",{
        headers: new Headers({'content-type': 'application/json'})
    }).catch(err=> Promise.reject({code: 'network',err})).then(
       response=>{
         if(response.ok){
             return response.json();
         }
         return Promise.reject({code:'Server Error',err:response.statusText});

       }

    )

}

export const getCart = () =>{
    return fetch('/cart',{
        headers:new Headers({'content-type':'application/json'})
    }).catch(err=> Promise.reject({code:'network',err})).then(
       response=>{
           console.log("resonse is   " + response);
           if(response.ok){
               return response.json();
           }
           return Promise.reject({code:'Server Error',err:response.statusText});
       }

    )

}
export const addToCart = (name,price,image,quantity) =>{
 return fetch(`/cart?name=${name}&price=${price}&image=${image}&quantity=${quantity}`,{
     method:'POST',
     headers:new Headers({'content-type':'application/json'}),
     body:JSON.stringify({name,price,image,quantity})
     
 }).catch(err=>Promise.reject({code:'network',err})).then(response=>{
    console.log(response);
     if(response.ok){
         
         return response.json();
     }
     return Promise.reject({code:'error',err: response.statusText});

 })

}
export const updateCart = (name,price,image,quantity) =>{
    return fetch(`/cart/item?name=${name}&price=${price}&image=${image}&quantity=${quantity}`,{
        method:'POST',
        headers:new Headers({'content-type':'application/json'}),
        body:JSON.stringify({name,price,image,quantity})
    }).catch(err=>Promise.reject({code:'network',err})).then(response=>{
        if(response.ok){
            return response.json();
        }
        return Promise.reject({code:"error",err:response.statusText});
    });
}
export const deleteFromCart = (name) =>{
return fetch(`/cart/item?name=${name}`,{
    method:'DELETE',
    headers:new Headers({'content-type':'application/json'}),
    body: JSON.stringify({name})
}).then(response=>{
    if(response.ok){
        return response;
    }
    return Promise.reject({code:'error',err: response.statusText })
})

}
export const deleteCart=()=>{
   return fetch(`/cart`,{
       method:'DELETE',
       headers:new Headers({'content-type':'application/json'}),
       
   }).then(response=>{
       if(response.ok){
           return response.json();
       }
       return Promise.reject({code:'error',err:response.statusText});
   })

}