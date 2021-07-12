const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const express = require("express");
const Cors = require("cors");

let app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(Cors());

app.get("/", async (req, res) => {
  res.send("hello from puppeteer");
});

app.get("/buyer-message/:id", async (req, res) => {
  const id = req.params.id;
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.youtube.com/");
  await page.type("#search", id);
  await page.click("#search-icon-legacy");
  res.send({ id: id });
});

app.listen(port, () => {
  console.log(`listening at localhost ${port}`);
});
