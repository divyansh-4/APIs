const express=require("express");
const bodyParser=require("body-parser")
const app=express();
//HTTPS is a native node module so no need to use npm i ...
const https=require("https")
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
    const url="https://api.openweathermap.org/data/2.5/weather?q="+req.body.cityName+"&appid=enterapikeyhere&units=metric"
    https.get(url,function(response){
    console.log(response.statusCode)
    response.on("data",function(data){
        const weatherdata=JSON.parse(data);
        const temp=weatherdata.main.temp
        const desc=weatherdata.weather[0].description
        const icon=weatherdata.weather[0].icon
        const iconurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<h1>The temperature in"+req.body.cityName+" is currently "+temp+" degress celcius</h1>")
        res.write("<p>The weather in "+req.body.cityName+" is "+desc+"</p>")
        console.log(iconurl)
        res.write("<p>The icon for the weather in "+req.body.cityName+" is </p><img src="+iconurl+">")
        res.send()
    })
})
})



app.listen(3000,function(req,res){
    console.log("Server started at port 3000")
})
