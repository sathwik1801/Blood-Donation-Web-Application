var cors= require('cors')
var http =require('http');
var jwt=require("jsonwebtoken");


var mongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
app.use(cors())
app.use(express.json());
mongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err)
    {
        console.log("Error in connection"+err)
    }
    else{
        console.log("Connection established Successfully")
        db = client.db('bloodbud')
    }
});
app.get('/emps',verifyToken,(req,res)=>{
    db.collection('demo').find().toArray((err,items)=>
    {
        console.log(items)
        res.write(JSON.stringify(items))
        res.end()
    });
});
app.post('/addemp',(req,res)=>{
    console.log(req.body)
    db.collection('demo').insertOne(req.body);
    res.end('inserted');
});
app.put('/updateemp/:id',verifyToken,(req,res)=>{
    db.collection('demo').updateOne({_id:parseInt(req.params.id)},{$set:{name:req.body.name,age:req.body.age}});
    res.write("Updated");
});
app.delete('/deleteemp/:id',(req,res)=>{

    db.collection('demo').remove({_id:parseInt(req.params.id)});
})
app.listen(2000,()=>{
   console.log("Server started....");
});
app.post("/login",(req,res)=>
{
    uname=req.body.username;
    pwd=req.body.password;
    db.collection('demo').findOne({username:uname,password:pwd}).then((result)=>
    {
        if(result)
        {
            const token=jwt.sign({username:uname,password:pwd},"cvrcollege")
            res.json({
                success:true,
                message:"The authentication is successful",
                token:token
            })
        }
        else{
            res.json({
            success:false,
            message:"Authenticaton failed"
        })
       }
    })
})
function verifyToken(req,res,next)
{
    let token=req.headers['authorization'];
    if(token)
    {
        token=token.split(' ')[1]
        console.log(token);
        jwt.verify(token,"cvrcollege",(err,decoded)=>
        {
            if(err)
            {
                return res.json({
                    success:false,
                    message:"Token is not valid"
                });
            }
            else{
                next();
            }
        })
    }
    else{
        return res.json({
            success:false,
            message:"A token is required for authentication"
        })
    }
}