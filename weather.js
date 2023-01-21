const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  const query=req.body.cityname;//cityname is the id of html form element accepting cityname
    const apikey="8e6a75f49e72e8ee78286e022777c93b";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric"+"&appid="+apikey;


     https.get(url,function(response){
       response.on("data",function(data){
         const weatherData=JSON.parse(data);
         const temp=weatherData.main.temp;
         const weatherDescription=weatherData.weather[0].description;
                  const icon=weatherData.weather[0].icon;
                  const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"

  res.set("Content-Type", "text/html")
  res.write("The weather is currently "+weatherDescription+"<p>");
  res.write("<h1>The curennt temperature in "+query+" is "+temp+" Degree Celcius</h1>");
          res.write("<img src="+ imageURL +">");
           res.send();
})

})

});








app.listen(3000,function(req,res){
  console.log("The server started at port 3000")
});
