import express from "express"

const App =  express()

const port = 9000;

App.listen(9000,(err)=> {
    if(err) console.log(err), `server started at ${port}`
})