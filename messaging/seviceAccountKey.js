const keys=require('../configs/config')
module.exports = {
  "type": "service_account",
  "project_id": "ambulancesaoilorpath",
  "private_key_id": keys.private_key_id,
  "private_key": keys.private_key,
  "client_email": keys.client_email,
  "client_id": keys.client_id,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1awgx%40ambulancesaoilorpath.iam.gserviceaccount.com",

};
