const express = require('express');
const {v4: uuid4} = require('uuid');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const IP = require('ip');
require('dotenv').config();
const app = express();
const upload = multer();

const TodoRouter = require('./routers/todo');
const connect = require('./database/conn');

const PORT = process.env.PORT || 4000;

const accessLogFile = fs.createWriteStream(path.join(__dirname,"access.log"));
const assignIdRequest = (req, res, next) => {
    req.id = uuid4()
    next();
}
app.use(assignIdRequest);

morgan.token("id", (req) => {
    return req.id;
})
app.use(morgan(':id :method :url :status :res[content-length] - :response-time ms', {stream: accessLogFile}));

app.use(cors())

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(upload.array());

app.use('/todo', TodoRouter);

app.get('/', (req, res) => {
    res.send("Server Running Successfully");
});

app.get('/get/ip', (req, res) => {
    // let forwarded = req.headers['x-forwarded-for']
    // console.log('forwarded', forwarded);
    // let ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;
    // res.writeHead(200);
    
    const ipAddress = IP.address();
    res.send(ipAddress)
});

connect().then(() => {
    try {
        app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
    }catch(err) {
        console.log(`Could not connect to the server`);
    }
}).catch(err => console.log("Invalid database connection"));
