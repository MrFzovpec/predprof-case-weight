const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const crypto = require('crypto');

// Database Setup
const app = express();

const uri = "mongodb://127.0.0.1:27017/WeightControl"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

const userSchema = {
    'email': String,
    'password': String
}
const User = new mongoose.model('User', userSchema)

// Crypto
const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}
const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}
const authTokens = {};


// Express App Setup
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
    // Get auth token from the cookies
    const authToken = req.cookies['AuthToken'];

    // Inject the user to the request
    req.user = authTokens[authToken];

    next();
});


app.post("/signup", async function(req, res) {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email: email })
    if (!existingUser) {
        const hashedPassword = getHashedPassword(password);

        const newUser = new User({
            email: email,
            password: hashedPassword
        })

        newUser.save((err) => {
            if (err) {
                res.status(400).send({ message: "Bad request", type: "danger" })
            } else {
                res.status(200).send({ message: "Success", type: "success" })
            }
        })
    } else {
        res.status(400).send({ message: "User already exists!", type: "danger" })
    }
})

app.post("/login", async function(req, res) {
    const { email, password } = req.body;

    const hashedPassword = getHashedPassword(password);
    const existingUser = await User.findOne({ email: email, password: hashedPassword })
    if (existingUser) {
        const authToken = generateAuthToken();
        authTokens[authToken] = await existingUser;
        res.cookie('AuthToken', authToken);
        console.log(authToken)
        res.status(200).send({ message: "Success", type: "success", token: authToken, userData: { email: authTokens[authToken].email, _id: authTokens[authToken].id } })

    } else {
        res.status(401).send({ message: "Invalid login or password", type: "danger" })
    }


})

app.post('/logout', async function(req, res) {
    const token = req.body.token

    authTokens[token] = null
    res.status(200).send({ message: "Success", type: "success", token: token })
})

app.post('/api/get/user', async function(req, res) {
    const token = req.body.token
    const currentUser = authTokens[token]
    if (!currentUser) {
        res.status(401).send({ message: "Unauthorized" })
    } else {
        res.status(200).send({ message: "Success", type: "success", token: token, userData: { email: authTokens[token].email, _id: authTokens[token].id } })
    }
})



app.listen(3000, () => {
    console.log('Server started on port 3000')
})