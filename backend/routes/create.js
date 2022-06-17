const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/account', async(req, res)=>{
    await User.create({
        companyName: req.body.companyName
    })
})

module.exports = router;