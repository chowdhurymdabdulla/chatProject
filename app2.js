import express from 'express'
import redis from 'redis'
const fetch = require('node-fetch')

const app=express()

const redisClient = redis.createClient({
    host: '127.0.0.1',
    port:6379
})

// redisClient.set('noOfVisits', 0)

app.get('/',(req, res)=>{
    
    fetch('https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=USA')
        .then(res=> res.json())
        .then(data=>{ 
            redisClient.set('countryData', JSON.stringify(data))          
            redisClient.get('countryData', (err, result)=>{
                let resultData = JSON.parse(result)      
                console.log(resultData);  
                res.send(resultData)
            })
            
            // redisClient.get('noOfVisits',(err, data)=>{
            //     console.log(data);
            //     redisClient.set('noOfVisits', data)
            //     res.send(" noOfVisits : " + data )
            // })
        })
})

app.listen(7800,()=>{
    console.log("app working on 7800")
})