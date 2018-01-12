const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();
const images = require("./images");
const ORDER_STATUS = require("./consts").ORDER_STATUS;
const productsData = require("./products.json");

admin.initializeApp(functions.config().firebase);

app.use(cors());
app.enable("trust proxy");

app.get("/products", (req, res) => {
  const imageBaseUrl =
    "https://storage.googleapis.com/" +
    functions.config().firebase.storageBucket +
    "/resized/";

  const products = productsData.map(p => {
    const newProd = Object.assign({}, p);
    newProd.images = p.images.map(imgName => imageBaseUrl + imgName);
    return newProd;
  });

  return res
    .set("Cache-Control", "public, max-age=1800, s-maxage=1800")
    .json(products);
});

app.use("/", require("./checkout"));

app.use("/orders", require("./orders"));

app.use("/econt", require("./econt"));

// Expose the API as a function
exports.api = functions.https.onRequest(app);

// Every time a new order is placed to DB it triggers this event and
// send email to customer and admin
exports.sendEmail = functions.firestore
  .document("orders/{id}")
  .onCreate(event => {
    const { globalConfig } = require("./inits");
    const emailTemplates = require("./templates/email");
    const orderId = event.params.id;
    const data = event.data.data();
    data.orderId = orderId;

    const sendToCustomer = sendEmail({
      from: `${globalConfig.sender_name} <${globalConfig.sender_email}>`,
      to: data.user.email,
      subject: "You order: " + orderId,
      text: emailTemplates.customer(data, globalConfig)
    });
    const sendToAdmin = sendEmail({
      from: `${globalConfig.sender_name} <${globalConfig.sender_email}>`,
      to: globalConfig.admin_email,
      subject: "You have new order " + orderId,
      text: emailTemplates.admin(data, globalConfig)
    });

    return Promise.all([sendToAdmin, sendToCustomer]);
  });

exports.generateThumbnail = functions.storage
  .object("uploads/{imageId}")
  .onChange(images.resizeImage);

const sendEmail = ({ from, to, subject, text }) => {
  const emailData = {
    from,
    to,
    subject,
    //text
    html: text
  };

  return new Promise((resolve, reject) => {
    const { mailgun } = require("./inits");
    mailgun.messages().send(emailData, (error, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};
