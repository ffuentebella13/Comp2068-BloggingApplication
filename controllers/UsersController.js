const User = require('../models/user');
const viewPath = 'users';


exports.new = async (req,res) => {
    res.render(`${viewPath}/new`,{
        pageTitle: 'New User'
    });
};


exports.create = async (req,res) =>{
    try{
        const user = new User(req.body);
        await User.register(user, req.body.password);
        //const register = await User.create(req.body);
        res.status(200).json(user);
        console.log(hello);
    }
    catch(error){
        console.log("error: " + error)
        res.status(400).json({message: "There was an error Registering this Account", error})
    }
};