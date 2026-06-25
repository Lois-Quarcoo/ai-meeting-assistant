import express from 'express'

const app = express()

//env
const port = process.env.PORT || 3000

app.use('/', (req, res) => {
    res.send('Hello world')
})




// start server 
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})