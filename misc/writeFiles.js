const fs = require("fs");

module.exports = function writefiles(filepath, data) {
  fs.writeFile(filepath, JSON.stringify(data), function(err) {
    if (err) {
      console.error("Crap happens", err);
    }
  });
};