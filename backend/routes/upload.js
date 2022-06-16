const express = require('express');
const router = express.Router();

const multer  = require('multer')

// Route 1: 

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
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

router.post('/video', upload.single('file'), (req, res)=>{
    // upload(req, res, err => {
    //     if(err){
    //         console.log(err);
    //         return res.json({a: false, err});
    //     }
    //     return res.json({success: true, filePath: res.req.file.path, fileName: req.req.file.filename})
    // })
    console.log(req.file);
    res.json({success:"Successsss"});
})

module.exports = router;