const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// hbs helper
hbs.registerHelper('getCurrentyear', ()=>{
return new Date().getFullYear();   
    
});

// middleware
app.use((req,res,next) =>{
var now = new Date().toString();
 var log =`${now}: ${req.method} ${req.url}`   
console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
      if(err){
          console.log("error");
      }  
    });
next();
    
});



//app.use((req,res,next) =>{
//   res.render('maintainance.hbs');
//});

app.get('/',(req,res) => { 
  res.render('home.hbs',{
     pagetitle :' Welcome Handlebar',
      welcome : ' Hello i am learning handlebar js and express and i am loving it.'
     
  });
   
});


app.get('/about',(req,res) =>{
   res.render('about.hbs',{
      pagetitle : 'hello handle bar',
     
   });
});

app.get('/bad', (req,res) =>{
    res.send({
        error:'unable to process your request'
    });
});


app.listen(port , () => {
    console.log(`server is up on port ${port}`);
});

