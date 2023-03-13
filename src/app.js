const path = require("path")
const express = require("express");
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const app = express();

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlesbar engine and views loactaion
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))




app.get('', (req, res) => {    
    res.render('index', {        
        title: 'Weather',        
        name: 'Rohil'    
    })
})

// app.get('/index', (req, res) => {    
//     res.render('index', {        
//         title: 'This App',        
//         name: 'Edison'    
//     })
// })

app.get('/about', (req, res) => {    
    res.render('about', {        
        title: "About Me",        
        name: 'Rohil'    
    })
})
app.get('/help', (req, res) => {    
    res.render('help', {        
        helpText: 'This is for help.' ,
        title : "Help",
        name : "Rohil"  
    })
})
app.get("/weather", (req, res) => {  
    if(!req.query.address){
        return res.send({
            error : "You must provide an address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location } = {} ) =>{
        if(error){
            return res.send({ error })
        }
console.log("abc")
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    } )
    // res.send({       
    //      forecast : "It is sunny",        
    //      location : "Ahmedabad",    
    //      address : req.query.address
    //     }  
    // );
});

app.get("/products", (req, res) => {  
    if(!req.query.search){
        res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send(  {       
         products : []
        }  
    );
});

app.get("/help/*", (req, res) => {
    res.render("404",{
        title: "404",
        name : "Rohil",
        errorMessage : "Help article not found."
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title:"404",
        name : "Rohil",
        errorMessage : "Page not found."
    })
})

app.listen(3000, () => {  
    console.log("Server running on port 3000");
});
















































// const path = require("path")
// const express = require("express")
  
// //here ".." will move up a folder like src to web-server folder in directory. 
// //"../.." again it will move one folder up.

// const app = express()
// const publicDirectoryPath = path.join(__dirname, "../public")

// // app.set("Views engine", "hbs")
// app.set('view engine', 'html');
// app.engine('html', require('hbs').__express);
// app.use(express.static(publicDirectoryPath))

// app.get("", (req,res) => {
//     res.render("index")
// })

// app.get("/weather", (req,res) => {
//     res.send({
//         forecast : "It is sunny",
//         location : "Ahmedabad"
//     })
// })

// app.listen(3000, () => {
//     console.log("Server is up on port 3000")
// })
