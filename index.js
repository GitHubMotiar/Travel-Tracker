import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "alternate_storoage",
  password: "Superuser",
  post: 5432
})
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


async function visitedCountries() {
  const result = await db.query("SELECT country_code FROM visited_countries")
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code)
  })
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await visitedCountries()

  res.render("index.ejs", {
    countries: countries,
    total: countries.length
  })
  db.end();

});

app.post("/add", async (req, res) => {



})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
