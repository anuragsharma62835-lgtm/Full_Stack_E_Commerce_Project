const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;
console.log("NEW DEPLOY TEST");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});