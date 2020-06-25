const User = require('../models/user');
const viewPath = 'users';


exports.new = async (req,res) => {
    res.render(`${viewPath}/new`,{
        pageTitle: 'New User'
    });
};

exports.create = async (req,res) =>{
    try{
        const user = await User.create(req.body);
        req.flash('success',`Welcome, ${user.fullname}. Thank you for registering.`);
        
        res.redirect('/');
    }
    catch(error){
        console.log(error);
        req.flash('danger',error.message);
        req.session.formData = req.body;
        res.redirect(`/register`)
    }
};