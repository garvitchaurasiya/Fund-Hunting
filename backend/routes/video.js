const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Video = require('../models/Video')
const multer  = require('multer')
const fetchuser = require('../middleware/fetchuser');

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

    await User.updateOne({name: req.body.user}, { $push: { "post": req.file.filename } } );

    await Video.create({
        filename: req.file.filename,
        author: req.body.user,
        amount: req.body.amount,
        equity: req.body.equity
    })

    console.log(req.file);
    res.json({success:true});
})

router.get('/getvideos', async (req, res)=>{
    
    let videos = await Video.find();
    
    res.json(videos);

})

router.post('/placebid',fetchuser, async(req, res)=>{
    
    try {
        const {filename, bidamount, bidequity} = req.body;
        const video = await Video.findOneAndUpdate({filename: filename}, 
            {$push: {
                "bids": {amount: bidamount, equity: bidequity}
            }});

    } catch (error) {
        console.error(error.message);
        return res.status(400).json({success: false, error: "Internal Server Error"});
    }

})

module.exports = router;