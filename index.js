import express from "express";
import axios from "axios";
import ejs from "ejs"
// 2. Create an express app and set the port number.
const app = express();
const port = 3000;
const apiKey = "openuv-11azfzrlqtnrln4-io";
const API_URL =  " https://api.openuv.io/api/v1/uv?lat=:lat&lng=:lng&alt=:alt&dt=:dt";
// 3. Use the public folder for static files.
app.use(express.static('public'));
// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", (req,res)=>{
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });