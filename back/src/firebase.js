require("dotenv").config();
//const { initializeApp, applicationDefault } = require("firebase-admin/app");
//const { getFirestore } = require("firebase-admin/firestore");

const { initializeApp } = require ("firebase/app");
const { getFirestore } = require("firebase/firestore")
var serviceAccount = {
  type: process.env.TYPE,
  projectId: process.env.PROYECTOID,
  private_key_id: process.env.PRIVATEKEYID,
  private_key: process.env.PRIVATEKEY,
  client_email: process.env.CLIENTEMAIL,
  client_id: process.env.CLIENTID,
  auth_uri: process.env.AUTHURL,
  token_uri: process.env.TOKENURL,
  auth_provider_x509_cert_url: process.env.AUTHPROVIDER,
  client_x509_cert_url: process.env.CLIENTCERTURL

}



const app = initializeApp(serviceAccount);

const db = getFirestore(app);

module.exports = {
  db,
};
