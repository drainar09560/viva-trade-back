const express = require('express');
const dotenv = require('dotenv')
const bodyParcer = require('body-parser')
const passport = require('passport');

const connectDB = require('./core/db')
const routes = require('./core/routes')

const app = express()
dotenv.config()

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParcer.urlencoded({extended: true}));
app.use(bodyParcer.json())
app.use(require('cors')())

app.use('/api', routes)
connectDB()
app.use(passport.initialize())
require('./middleware/passport')(passport)

const PORT = process.env.PORT || 5000


app.listen(PORT, () => console.log(PORT, 'Server has been starter'))

