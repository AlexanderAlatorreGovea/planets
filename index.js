const { parse } = require("csv-parse");
const fs = require("fs");

const results = [];

const isHabitable = (planet) =>
  planet["koi_disposition"] === "CONFIRMED" &&
  planet["koi_insol"] > 0.36 &&
  planet["koi_insol"] < 1.11 &&
  planet["koi_prad"] < 1.6;

// read
fs.createReadStream("kepler_data.csv")
  // writable in pipe
  // pipe the parsed data
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitable(data)) {
      results.push(data);
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log({
      results: results.map((planet) => planet.kepler_name),
      length: results.length,
    });
  });
