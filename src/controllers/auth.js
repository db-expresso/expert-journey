'use strict';

const User = require('../models/user');

exports.login = (req,res)=>{
    User.findOne({email: req.body.email}.exec(async (error, user)=>{
        if(error) return res.status(400).json({error});
        if(user){
            const isPassword = await user.authenticate(req.body.password);
        };
    }));
};