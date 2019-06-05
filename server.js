const express = require('express');
const app = express();
const PORT = process.env.PORT||4000;
const shop = require("./shop");
let mysql = require('mysql');

let connection = mysql.createConnection({host:'localhost',user:'root',password:'123456789',database:'shop'

});
connection.connect(function(err){
if(err){
return console.error('error: ' + err.message);

}

console.log('Connected to the MySQL server.');
});
let createCart = `create table if not exists cartproducts(id int primary key auto_increment, name varchar(255) not null,price double not null, image varchar(10000),quantity int not null)`;
connection.query(createCart,function(err,results,fields){
    if(err){
        console.log(err.message);
    }
});
let createUnique = `CREATE UNIQUE INDEX idx_cart ON cartproducts(name)`;
connection.query(createUnique,function(err,results,fields){
    if(err){
        console.log(err.message);
    }
   
})

app.get('/products',(req,res)=>{

    const products = shop.products;

res.json(products);

});
app.get('/cart',(req,res,next)=>{
   let sql = `SELECT * FROM cartproducts`;

   connection.query(sql,(error,results,fields)=>{
       if(error){
           next(error);
           return console.error(error.message);
       }
    
       res.send(results);
   }
   
   );
  

});

app.post('/cart',express.json(),(req,res,next)=>{
const {name,price,image,quantity} = req.query;

let sql = `INSERT INTO cartproducts(name,image,price,quantity) VALUES("${name}","${image}",${price},${quantity}) ON DUPLICATE KEY UPDATE quantity= quantity + ?`;
let data = [quantity];
connection.query(sql,data,(error,results,fields)=>{
    if(error){
        next(error);
        return console.error(error.message);
    }
    return res.send(JSON.stringify(results));
});



});
app.post('/cart/item',express.json(),(req,res,next)=>{
    const {name,price,image,quantity} = req.query;
    
    let sql = `REPLACE INTO cartproducts(name,image,price,quantity) VALUES("${name}","${image}",${price},${quantity})`;
   
    
    

    
    connection.query(sql, (error,results,fields)=>{
      if(error){
          next(results);
          return console.error(error.message);
      }
      res.send(JSON.stringify(results));
    });

    
});

app.delete('/cart/item',(req,res)=>{
    const {name} = req.query;
    let sql = `DELETE FROM cartproducts where name = ?`;
    let data = [name];
    connection.query(sql,data,(error,results,fields)=>{
        if(error){
            return console.error(error.message);
        }
       res.send(200);
    });
});
app.delete('/cart',(req,res,next)=>{
let sql = `DELETE FROM cartproducts`;
connection.query(sql,(error,results,fields)=>{
if(error){
    next(error);
    return console.error(error.message);
}
  res.send(JSON.stringify(results));
});
   
});


app.listen(PORT,()=>{console.log("listening on PORT 4000")});