require("dotenv").config();
const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const logger = require("morgan");
const fileUpload = require("express-fileupload");
require("./src/database/mongoDB")


const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(logger('dev'));
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

/* importing admin profile, login & registration related route */
app.use("/api/v1/admins", require("./src/routes/adminRoute/adminRoute"))
app.use(async (req, res, next) => {
    next(createError.NotFound("Page not found"));
});
// Error message
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server listening on port", port)
});