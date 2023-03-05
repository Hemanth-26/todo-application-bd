const mongoose = require('mongoose');

async function connect () {
    const userNameMongodb = encodeURIComponent(process.env.MONGODB_USERNAME);
    const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
    // console.log(password);

    // const mongoUrl = "mongodb://127.0.0.1:27017/";
    const mongoUrl = `mongodb+srv://${userNameMongodb}:${password}@cluster0.icoqamg.mongodb.net/?retryWrites=true&w=majority`;
    mongoose.set("strictQuery", true);

    await mongoose.connect(mongoUrl, {dbName: 'TodoApplication'})

}

module.exports = connect;