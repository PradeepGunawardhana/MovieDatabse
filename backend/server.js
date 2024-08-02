const  express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 8000

// connecting Database
mongoose.connect(URL).then(() => {
    console.log('MongoDB Connected.');
}).catch((err) => {
    console.log(`Error Connecting to Mongo DB ${err}`);
});



//Connecting to server



app.use(cors());
app.use(bodyParser.json());


app.listen(PORT,() => {
    console.log(`server is running on port: ${PORT}`);
});


 const accountRouter = require("./routes/user.js")
 app.use("/account",accountRouter);

