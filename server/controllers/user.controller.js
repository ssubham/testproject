const userdetails = require('../models/user.model');
const config = require('../index');
const servermessage = config.config.servermessage;

const userMessage = servermessage.user;  // User message from server.

// Creating users
const createUser = async(req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(200).json({data: {
            success: false,
            message: userMessage.blankuser,
        }})
    }
    const {phoneNumber, userName, email, password} = body;
    const userData = {phonenumber:phoneNumber, name:userName, email, password};
    await userdetails.find({$or:[
        {'phonenumber':phoneNumber}, {'email':email}
    ]})
    .then(result => {
        // console.log(result);
        if(result.length>0){
            return res
                .status(200)
                .json({ success: false, message: userMessage.alreadyRegistered })
        } else {
            const userProfile = new userdetails(userData,{});
            // console.log(userProfile);
            userProfile
                .save()
                .then(() => {
                    console.log('sdsd', userProfile)
                    const {name, email, _id} = userProfile;
                    const data = Object.assign({}, {name, email, _id })
                    return res.status(200).json({success: true, data })
                })
                .catch(error => {
                    console.log(error);
                    return res.status(200).json({
                        success: false,
                        message: userMessage.notcreated,
                    })
                })
        }
    })
    .catch(err => {
        return res.status(200).json({success:false, message:err})
    })

}

// Authenticating and getting user information for login user.
const getUserDetails = async(req, res) => {
    const body = req.body;
    if(!body){
        return res.status(200).json({ success: false, message: userMessage.blankuser })
    }
    const {userphone, userpassword} = body;
    if(userphone === undefined || userpassword === undefined || userphone === "" || userpassword === ""){
        return res.status(200).json({ success: false, message: userMessage.usernotfound })
    }
    await userdetails.find(userphone.indexOf('@') !== -1 ? {
        'email':userphone
    }: {'phonenumber':userphone})
    .then(
        result => {
            if(result.length === 0) return res.status(200).json({success:false, message: userMessage.usernotfound })
            if(result.length>0){
                console.log(result[0].password, body.userpassword)
                if(result[0].password !== body.userpassword){
                    return res
                        .status(200)
                        .json({ success: false, message: userMessage.notloginmatched })
                }
                const {name, email, _id} = result[0];
                const data = Object.assign({}, {name, email, _id})
                return res.status(200).json({success: true, data})
            }
        }
    )
    .catch(err => {
        return res.status(200).json({success: false, error:err})}
    )
}


module.exports = {
    createUser,
    getUserDetails,
}