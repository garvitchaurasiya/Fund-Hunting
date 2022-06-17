const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Video = require('../models/Video')

const multer  = require('multer')

// Route 1: 

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/uploads')
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}_${file.originalname}` )
    },
    fileFilter: (req, file, cb) => {
        const extention = path.extname(file.originalname);
        if(extention !== ".mp4"){
            return cb(res.status(400).end('Only mp4 file is allowed'), false);
        }
    }
})

var upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res)=>{
    // upload(req, res, err => {
    //     if(err){
    //         console.log(err);
    //         return res.json({a: false, err});
    //     }
    //     return res.json({success: true, filePath: res.req.file.path, fileName: req.req.file.filename})
    // })

    let user = await User.updateOne({companyName: "Soshio"}, { $push: { "post": req.file.filename } } );

    await Video.create({
        filename: req.file.filename,
        author: 'Soshio'
    })

    console.log(req.file);
    res.json({success:"Successsss"});
})

router.get('/getvideos', async (req, res)=>{
    
    let videos = await Video.find();
    
    res.json(videos);

})

module.exports = router;