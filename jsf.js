const express=require("express");
const app=express();
const request=require("request");
const bodyParser=require("body-parser");
app.set("view engine","hbs");
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

  res.sendFile(__dirname+"/wet.html");
});
app.post("/",function(req,res){
console.log("Akshit requested for post request");
console.log(req.body.cityco);
const city=req.body.cityco;
const unit="metric";

const url=`https://api.openweathermap.org/data/2.5/weather?appid=bdee514cc545e5400af4a254c92bec5f&q=${city}&units=${unit}`;
https.get(url,function(response){
console.log(response.statusCode);
response.on("data",function(data){
const weatherData=JSON.parse(data);
const weatherTemp=weatherData.main.temp;
const weatherDesc=weatherData.weather[0].description;
console.log(weatherData);
console.log(weatherTemp);
console.log(weatherDesc);
const feelsLike=weatherData.main.feels_like;
const humidity=weatherData.main.humidity;
const max=weatherData.main.temp_max;
const min=weatherData.main.temp_min;
const icc=weatherData.weather[0].icon;

const ico="http://openweathermap.org/img/wn/"+icc+"@2x.png";
if(response.statusCode=200){
res.render("index",{
cityName:(req.body.cityco),
wa:weatherData.main.temp,
icons:ico,
wedesc:weatherData.weather[0].description,
feels:feelsLike,
humi:humidity,
maxt:max,
mint:min
});



}
else if(response.statusCode!=200){
  res.redirect("/");
}







})
})

})

app.use(express.static("public"));
app.post("/",function(req,res){
  console.log("POST REQUEST");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("YOUR PORT IS WORKING");
})
