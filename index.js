import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db =  new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "alternate_storoage",
  password: "Superuser",
  post: 5432
})
db.connect();
let countries =[];
db.query("SELECT * from visited_countries", (err, res)=>{
  if(err){
    console.log("Error executing the SQL query", err.stack);
  }else{
    countries=res.rows
  }
  db.end();
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
let totalCountries=0;

app.get("/", async (req, res) => {
  totalCountries = 0;

  res.render("index.ejs", {countries: countries})
  
});

app.post("/submit", (req, res)=>{
  let enteredCode=req.body;
  const countryCode=countries.find((country_code) => countries.country_code)
 if(enteredCode=countryCode){
    totalCountries++;
 }
 res.render("index.ejs", { 
  countries:countryCode,
  total: totalCountries
 })

})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
