const express = require('express')
const app = express()

const path = require('path')
var multer = require('multer')

app.use(express.static('uploads'));

const storage = multer.diskStorage({
    destination:function(req,res,callback){
        callback(null,'./uploads')
    },
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})
var upload = multer({storage:storage}).single('myfile');

// const static_path = path.join(__dirname,"./views/index.ejs");
// app.use(express.static(static_path))
app.set('view engine','ejs');


app.get('/',function(req,res){
    res.render('index.ejs');
})
app.post('/upload',function(req,res){
    upload(req,res,function(err){
        if(err){
            res.render('index',{msg:err});
        }else{
            res.render('index',{file:`${req.file.originalname}`});
        }
    })
})



const serer = app.listen(4078,function(){
    console.log("Working");
    

    // app.use(express.static())
    
});     
 

console.log(path.join(__dirname,"./views/index.ejs"))
 




