var express    = require("express"),
    bodyParser = require("body-parser"),
    request    = require("request"),
    app        = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));

var apiKey = 'fd96c6e57df310aff2080dc54de32d7a';

app.get('/', function (req, res) {
  res.render("index", {weather: null, error: null});
});

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if(err){
      res.render("index", {weather: null, error: "Try again"});
    } else {
      let weather = JSON.parse(body);
      console.log(weather);
      if(weather.main == undefined){
        res.render("index", {weather: null, error: "Enter valid city!"});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render("index", {weather: weatherText, error: null});
      }
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function () {
  console.log('SERVER IS RUNNING!');
})