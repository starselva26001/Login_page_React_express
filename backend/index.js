const express = require("express")
const cors = require("cors")

const app = express();

app.use(cors())

app.use(express.json())

let email = "selva@gmail.com"
let password = "selva@1234"

app.post("/login", function(req, res){

    if(req.body.email === email && req.body.password === password)
    {
        res.send({
            success:true,
            message:"Login Successfull"
        })
    }
    else{
        res.send({
            success:false,
            message:"Login Failed"
        })
    }
})

app.listen(3000,function(){
    console.log("server started...")
})