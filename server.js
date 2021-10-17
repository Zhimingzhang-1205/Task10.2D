const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const experts = require("./models/experts.js")
const tasks = require("./models/tasks.js")
const imgs = require("./models/imgs.js")
const pathLib = require(("path"))
const fs = require('fs');
const cors=require("cors")
const multer = require('multer')


const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(bodyParser.json())

app.use(express.static(pathLib.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/Deakin",{useNewUrlParser: true})

var upload=multer({dest:'./public/img'}).any()
app.route('/upimg')
.post(upload,function(req,res,next){
    var newName = req.files[0].path+pathLib.parse(req.files[0].originalname).ext;

    var imgNewname ='img/'+req.files[0].filename+pathLib.parse(req.files[0].originalname).ext;
    fs.rename(req.files[0].path,newName,function(){
       
        if(req.files[0].size>1*1024*1024){   

            res.send('Large than 1M');
        }else{

            var src = {
                src:imgNewname,        
                title: req.files[0].filename,
                subTitle:'small'
            };
            var imgData = new imgs({
                src:imgNewname,        
                title: req.files[0].originalname,
                subTitle:'small'
            })      
            imgData.save(function(err){      
                if(err){
                    res.json({
                        status:500,
                        msg:err
                    })
                }else{
                    res.json({
                        status:200,
                        msg:'保存成功'
                    })
                }

            });
        };
    })
})


app.route('/experts')
.get( (req, res)=>{
    experts.find((err, List)=>{
        if (err) {res.send(err)}
        else {res.send(List)}
    })
})
.post( (req,res)=>{
    console.log(req)
    var name=req.body.name
    var phone=req.body.phone
    var password=req.body.password
    var address=req.body.address
    var expert = new experts({
        name : name,
        phone :phone,
        password: password,
        address: address
    })
    expert.save((err) =>{
        if (err) {res.send(err)}
        else res.send ('Successfully added a new expert!')
    }
    )
})
.delete((req,res) =>{
    experts.deleteMany((err) =>{
        if (err) {res.send(err)}
        else {res.send('Successfully deleted all experts!')}
    })
})

app.route('/experts/:id')
.get((req, res)=>{
    experts.findOne({_id: req.params.id}, (err, found)=>{
        if (found) (res.send(found))
        else res.send("No Matched Expert Found!")
    })
})
.put((req,res)=>{
experts.update(
    {_id: req.params.id},
    {
        name : req.body.name,
        phone :req.body.phone,
        password: req.body.password,
        address: req.body.address
    },
    {overwrite:true}, 
    (err)=>{
        if (err) {res.send(err)}
        else {res.send('Successfully updated!')}
    }
)
})
.delete((req,res) =>{
    experts.deleteMany(
        {_id: req.params.id},
        (err) =>{
        if (err) {res.send(err)}
        else {res.send('Successfully deleted this expert!')}
    })
})
.patch((req, res)=>{
    experts.update(
        {_id: req.params.id},
        {$set: req.body},
        (err)=>{
            if (!err) {res.send('Successfully updated! ')}
            else res.send(err)
        }
    )
})

app.route('/task')
.get( (req, res)=>{
    tasks.find((err, List)=>{
        if (err) {
            res.json({
                status:500,
                msg:err
            })
        }
        else {
            res.json({
                status:200,
                msg:List
            })
        }
    })
})
.delete((req,res) =>{
    experts.deleteMany((err) =>{
        if (err) {res.send(err)}
        else {res.send('Successfully deleted all experts!')}
    })
})

app.route('/task/:id')
.get((req, res)=>{
    experts.findOne({_id: req.params.id}, (err, found)=>{
        if (found) (res.send(found))
        else res.send("No Matched Expert Found!")
    })
})
.put((req,res)=>{
experts.update(
    {_id: req.params.id},
    {
        name : req.body.name,
        phone :req.body.phone,
        password: req.body.password,
        address: req.body.address
    },
    {overwrite:true}, 
    (err)=>{
        if (err) {res.send(err)}
        else {res.send('Successfully updated!')}
    }
)
})
.delete((req,res) =>{
    experts.deleteMany(
        {_id: req.params.id},
        (err) =>{
        if (err) {res.send(err)}
        else {res.send('Successfully deleted this expert!')}
    })
})
.patch((req, res)=>{
    experts.update(
        {_id: req.params.id},
        {$set: req.body},
        (err)=>{
            if (!err) {res.send('Successfully updated! ')}
            else res.send(err)
        }
    )
})

app.route('/newtask')
.post( (req,res)=>{
    console.log(req)
    var type=req.body.type
    var title=req.body.title
    var des=req.body.des
    var suburb=req.body.suburb
    var date=req.body.date
    var suggest=req.body.suggest
    var number=req.body.number
    var task = new tasks({
        type : type,
        title : title,
        des: des,
        suburb: suburb,
        date: date,
        suggest: suggest,
        number: number,
    })
    task.save((err) =>{
        if (err) {res.send(err)}
        else res.json ('Successfully added a new task!')
    }
    )
})

app.route('/newtask/:id')
.delete((req,res) =>{
    tasks.deleteMany(
        {title: req.params.id},
        (err) =>{
        if (err) {res.json(err)}
        else {res.json('Successfully deleted this task!')}
    })
})
.get((req, res)=>{
    tasks.find({title: req.params.id}, (err, found)=>{
        if (found.length!=0) {
            console.log('title');
            res.json(found);
        }
        else {
            tasks.find({date: req.params.id}, (err, found)=>{
                if (found.length!=0) (res.json(found))
                else {
                    tasks.find({suburb: req.params.id}, (err, found)=>{
                        if (found.length!=0) (res.json(found))
                        else res.json("No Matched Expert Found!")
                    })
                }
            })
        }
    })
})

app.listen(process.env.PORT || 8000, ()=>{
    console.log('Server started on port 8000');
})