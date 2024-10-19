const twilio = require('twilio');

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = (to, body) => {
    return client.messages.create({
        body,
        to,
        from: process.env.TWILIO_PHONE_NUMBER,
    });
};

module.exports = sendSMS;
