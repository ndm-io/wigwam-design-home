


module.exports = {

    db: process.env.MONGO_db,
    passwordless: process.env.MONGO_passwordless,
    sessionSecret: process.env.MONGO_SESSION_SECRET,
    host: function () {
        return process.env.HOST;
    },
    clarifai: {
        clientId: process.env.CLARIFAI_ID,
        clientSecret: process.env.CLARIFAI_SECRET
    },

    sparkpost: {
        apiKey: process.env.SPARKPOST_API_KEY
    },

    twilio: {
        sid: process.env.TWILIO_ACCOUNT_SID,
        token: process.env.TWILIO_AUTH_TOKEN

    },
    opencage: {
        apiKey: process.env.OPENCAGE_APIKEY
    }
};
