const puppeteer = require("puppeteer");

(async function () {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.autotrader.co.uk/car-search?postcode=SE13AE&include-delivery-option=on&advertising-location=at_cars&page=1",
    {
      waitUntil: "load",
      timeout: 0,
    }
  );
  console.log("Launched browser in headless mode");
  await page.waitForTimeout(10000);
  await page.evaluate(() => {
    document.querySelector("div#sp_message_container_441126").style =
      "display:none";
  });
  let cars = [];
  for (let i = 0; i < 2; i++) {
    await page.waitForTimeout(3000);
    let car = await page.evaluate(() => {
      let finalArr = [];
      document.querySelector("div#sp_message_container_441126").style =
        "display:none";
      let cars = document.querySelectorAll(".product-card__inner");
      for (let j = 0; j < cars.length; j++) {
        let image = cars[j].querySelector(
          ".product-card-image__main-image"
        ).src;
        let price = cars[j].querySelector(
          ".product-card-pricing__price"
        ).innerText;
        let car = cars[j].querySelector(
          ".product-card-details__title"
        ).innerText;
        let carDetail = cars[j].querySelector(
          ".product-card-details__subtitle"
        ).innerText;
        finalArr.push({
          image,
          car,
          price,
          carDetail,
        });
      }
      document.querySelector(".paginationMini--right__active").click();
      return finalArr;
    });
    cars = [...cars, car];
  }
  console.log(cars);
  console.log(cars[0].length + cars[1].length);
})();
