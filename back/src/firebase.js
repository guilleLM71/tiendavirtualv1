require("dotenv").config();
//const { initializeApp, applicationDefault } = require("firebase-admin/app");
//const { getFirestore } = require("firebase-admin/firestore");

const { initializeApp } = require ("firebase/app");
const { getFirestore } = require("firebase/firestore")
var serviceAccount = {
  type: "service_account",
  projectId: "tiendavirtual-228b5",
  private_key_id: "eb5a5d9adcfca6397a09e3e61019e44063f8e2dc",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDlPAsB0k12uU2r\nNDuARi0qnvRj/OdhgclsIWBLZBfQUI43YSP51n6MfdOQImSNqaUK7J1lI0B8Xxl5\nUx1AuNf2cJdhImARZ7Mq4aAKH4Ao57M9ZkCfQl2nlkffH4i4RA+1rTkIJDtCJnOv\nW32dxjKxckbR9lUcFIUKIIDbUYsEv/SQ2rInfdFaBtuKRXjHUHDRy6bE9C7n6eXJ\n1RIAY/aDjVysXQdAlS4sgVJdj0XqOq87umuAtj0n0n/sEQK2QGChhCyH801AQGTT\n/0k9hsDFpdeIY7LwlwScRxw8+YCMiOH+zo8netpVCuD4aMafaH2gTDR/rnMnRmdj\nT6bmarQ1AgMBAAECggEAUXFHp9oD0456Xb0s9qH4IhBfW7barfXijhw9jgt9unEk\nVeCZW4YtZ9S8eZT+jKYdEQiH0wr3Oji/YC97USda8x+FaOlBoG1rZmzK403VxrKr\nJ8FQbESz6XqnBkq51F26Bx4ICTB2LUZkC4VB1/A2ynyDVM1j55oSukpZ/ZG3BnRQ\nFkdES0nOomMxfchfOPvifSH0VxR02lXq7W1KkPZKvWAhQJRU6siVBw11OJl/dQGT\n34Ry3h3SmgcPgMyfe2TNywrBFhLWgnUWp6QHON7VQXspo8RhrSnVDkaBCnENkWsv\nllXtyOGAPS9FTl7NAFxz3OkBJsvOBaIC7trYzDjG8QKBgQD/+6IVarD+0AoP6NDy\nYpzb+7D9tlbSAUBVr656wfGWNoHppdMCiG5ohN9YmuSrNm83VWBcwp15HjvRGs93\nqymN+61NxF1oNOheUJByhRU7egHY84mSijN9pI2xcZzpCYJ/+7P3sMI1L1XL9Ndw\nHo5N+/KQzB3ESogMp8XPZmiofwKBgQDlP/Qb8JV54DWpRch4IR21MYfuZm5wOJBv\n6r1DCz8DKGEAwtaoJ2as2tcv1OM/jQnGyRo34OBVTP1bNyc9o//8HxUkgU96eD1R\ncfGk1rjf7p79lOr0XDwvlLBot4xaRCvMNDYe+adZYu5b47nZZKVdfy253m8TB6qa\nDWg+8rspSwKBgQCE/TY36jYKLAsOOOZVBuZ3Y0uQhCqW8A98dMkw/ZGFeMwFlyEJ\nL9gsdNuULOSgDqe5F6H4jyNAyXRKLqOaiFIOcbKXtGzStqoCVdi1pm5heAF9tQjE\nGQinPdZfWacrasVhuGLHTA2Zk/3++DT1CurjmQFsOJ8+W3pTGNar6Yh2AQKBgDOg\nlnHgWVlME+meDIp5Mr6GfA1FRiPBqU16+MprcvJcGpRYTI0r6mSNGB7ue4rpUUVS\nLrRc0UiEgR4UqqKoF1MJEPLaqDJ1d6Gq3nd338SWcXm8GrmTN/6jJqM+ir4dUhu3\numR5ZqWrsPBCtazujIskxAByxmLrvBDbahmbAmlHAoGASEwrBN/G/xVx6Wlhx91g\nvcKmY8/4XS7vE2gv3G0EZyTb6EXbqCZ3aUqYYp2V4ZltYkdMFdKwQUdzGkKoezx3\nQz6GmVt3OTZvg9bARJJto5zS0sTq8YQXmqaD5yxg8Ms3G20avE929/qVEiwshPVS\nEn8bkqByHvArZ/9UUOeHVkc=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-zazcl@tiendavirtual-228b5.iam.gserviceaccount.com",
  client_id: "101315132840127832903",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zazcl%40tiendavirtual-228b5.iam.gserviceaccount.com"

}



const app = initializeApp(serviceAccount);

const db = getFirestore(app);

module.exports = {
  db,
};
