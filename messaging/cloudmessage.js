const admin = require("firebase-admin");
const serviceAccount = require('./seviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(  serviceAccount)
});
const cloudmessage = ( registrationToken, payload)=>{
  
  var k = JSON.stringify(payload);
  console.log(k);
  const message = {
    data:{
    title:'850',
    body:k
    },
    token:registrationToken
  }
    
  admin.messaging().send(message).then((res) => {
    console.log('sucess');
    return true;
  }).catch((err => {
    console.log(err);
  return false; 
}))
 

}


module.exports = cloudmessage;




