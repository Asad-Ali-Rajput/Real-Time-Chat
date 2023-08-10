// function debugPrint(message) {
//   if (JSON.parse(process.env.DEBUG)) console.log(message);
// }
// module.exports = debugPrint;
require("dotenv").config();
function debugPrint(message) {
  if (process.env.DEBUG === 'true') {
    console.log("In")
    console.log(message);
  }
}

module.exports = debugPrint;
