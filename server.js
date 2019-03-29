const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const postsRouter = require('./blog-post-router')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', postsRouter)

app.listen(8080, () => {
    console.log('Your app is running in port 8080');
});