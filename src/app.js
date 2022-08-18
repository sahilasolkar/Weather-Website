const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set (key , value to set)
//set up handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Sahil Asolkar'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name : 'Sahil Asolkar'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Sahil Asolkar'
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address)
    {
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{

        if(error){
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }   

            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
          })
    })
})

app.get('/products', (req, res)=>{
    
    if(!req.query.search)
    {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        message: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        message: 'page not found'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})