const express = require ("express")
const cors = require ("cors")
const XLSX = require ("xlsx")
// install NODEMAILER
const nodemailer = require("nodemailer");
const mongoose = require("mongoose")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://sindhu:123%40123@cluster0.4v7xu.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Connected to DataBase")
}).catch(()=>{
    console.log("Failed to connect DataBase")
})

const credential = mongoose.model("credential",{},"bulkmail")



// service and authentication pswd


app.post("/sendemail",function(req,res){

    var msg = req.body.msg
    var emailList = req.body.emailList

    credential.find().then((data)=>{
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
              user: data[0].toJSON().user,
              pass: data[0].toJSON().pass,
            }
          });
          
          new Promise(async function (resolve,reject){
            try{
                for(let i=0; i<emailList.length; i++)
                    {
                     await transporter.sendMail(
                        {
                            from:"sindhumuthuchamy@gmail.com",
                            to:emailList[i],
                            subject: "A message from Bulk Mail App",
                            text:msg 
                        }
                    ) 
                    console.log("Email send to : " + emailList[i])
                }
                resolve("sucessfull")
            }
            catch(error){
                reject("failed")
            }
        })
        .then(function(){
            res.send(true)
        })
        .catch(function(){
            res.send(false)
        })
    })
    
    .catch((error)=>{
        console.log(error)
    })
    
})

app.listen(5000,function(){
    console.log("server started...")
})

