const express =  require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mySqlPool = require("./config/db");




//configure dotenv
dotenv.config({path:''});

//rest object
const app = express();

//middlewares

app.use(express.json());
app.use(morgan("dev"));

//route
app.use('/api/v1/student', require("./routes/studentRoutes"));

app.get('/test', (req ,res) => {
    res.status(200).send("<h1>Nodejs MySQL APP </h1>");
});

//port
const PORT = process.env.PORT || 8080;

//conditionally listen 
mySqlPool
.query('SELECT 1')
.then(() => {
  //MYSQL
  console.log("MYSQL DB CONNECTED")

//listen 
app.listen(PORT, () => {
  console.log("Server Running on port ${process.env.PORT}");
});
})
.catch((error) => {
  console.log(error)
});








  


    


