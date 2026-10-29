const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.json());

/**
 * Routes
 */
const authRoute = require('./routes/auth.routes');
const accountRoute=require("./routes/account.routes")
/**
 * use Routes
 */

app.use('/api/auth', authRoute);
app.use('api/accounts',accountRoute)
module.exports=app