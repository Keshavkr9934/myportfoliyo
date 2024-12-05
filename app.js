if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const path = require("path");
engine = require("ejs-mate");
const mongoose = require("mongoose");
const cotact = require("./schemas/contactSchema");
// const bodyParser = require("body-parser");
const twilio = require("twilio");

main()
  .then(() => {
    console.log("mongoose are connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    process.env.MONGOOSE,
    {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      connectTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000,
    }
  );
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", engine);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser);
app.use(express.json());
const { schema } = require("./schemas/dataMidleware");
const expressall = require("./expressAll");
const { Console } = require("console");

const validateForm = (req, res, next) => {
  let { error } = schema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new expressall(400, errMsg);
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  // console.log(req.body);
  res.render("normalPage/home.ejs");
});

const accountSid = process.env.ACCOUNTSID;
// console.log(accountSid);
const authToken = process.env.AUTHTOKEN;
const client = new twilio(accountSid, authToken);

app.post("/contact", validateForm, async (req, res) => {
  try {
    const { email, username, textarea } = req.body;
    // console.log("Received data:", email, username, textarea); // Now should log correctly
    const data = new cotact({
      email: email,
      username: username,
      textarea: textarea,
    });
    await data.save();
    const message = `New Contact Form Submission:\nName: ${username}\nEmail: ${email}\nQuery: ${textarea}`;
    try {
      
      await client.messages.create({
        body: message,
        from: process.env.FROM,
        to: process.env.TO,
      });
    
   } catch (error) {
      console.error("Error sending SMS:", error);
      res.status(500).send("Error sending message");
    }
    // res.send("data is saved");
    // console.log(data);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});
app.get("/project1", (req, res) => {
  // console.log(req);
  res.render("normalPage/project1.ejs");
});
app.get("/project2", (req, res) => {
  res.render("normalPage/project2.ejs");
});
app.get("/project3", (req, res) => {
  res.render("normalPage/project3.ejs");
});
app.listen("3000", () => {
  console.log("i am port");
});
