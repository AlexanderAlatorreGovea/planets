const { parse } = require("csv-parse");
const fs = require("fs");

const results = [];
fs.createReadStream("kepler_data.csv")
  .on("data", (data) => {
    results.push(data);
    console.log(data);
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", (result) => {
    console.log(result);
  });
