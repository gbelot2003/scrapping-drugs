const fs = require("fs");

module.exports = function writefiles(filepath, data) {
  fs.writeFileSync(filepath, JSON.stringify(data), function(err) {
    if (err) {
      console.error("Crap happens", err);
    }
  });
};