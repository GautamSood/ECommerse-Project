const app = require("./app")
const dotenv = require("dotenv")
const { path } = require("./app")
const connectDatabase = require("./config/database");

dotenv.config({ path: "backend/config/config.env" });
connectDatabase()

app.listen(process.env.PORT, () => {
    console.log("server is running on " + process.env.PORT);
    
})