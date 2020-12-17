require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
console.log(accountSid);
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sample = 'hello';
// client.messages
//   .create({
//      body: 'Registration Done Successfully on Indian Railways. Thank you for choosing us.',
//      from: '+12059648213',
//      to: '+919967476145'
//    })
//   .then((message) => console.log(message))
//   .catch((err) => console.log(err));


//(205) 964-8213
//+12059648213

const sendSms = () => {
  client.messages
  .create({
     body: 'Registration Done Successfully on Indian Railways. Thank you for choosing us.',
           from: '+12059648213',
           to: '+919967476145'
   })
  .then(message => console.log(message.sid))
  .catch((err) => console.log(err));;
}


module.exports = {sendSms, sample};
