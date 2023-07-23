
const config = {
    'local': {
        'serverpath':'http://localhost:5000',
        'serversubpath':'/api/v1',
        'server': {
            'database':'mongodb+srv://127.0.0.1:27017/testProject?retryWrites=true&w=majority',
        },
        'userschema':{
            'schema':{
                name: {type:String, required: true, trim:true},
                email: {type:String, required: true, trim:true},
                phonenumber:{type:Number, required: true},
                password: {type: String, required: true},
                created: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
                updated: {
                    type: Number,
                    default: () => Math.floor(Date.now() / 1000)
                },
            },
            'name': 'testusers.db'
        },'servermessage':{
            'user':{
                'alreadyRegistered': 'User is already Registered',
                'phoneNumber': 'Phoe Number must be 10-digit',
                'usernotfound':'User not found.',
                'blankuser': 'User Details can not be left blank.',
                'notcreated':'New User not created!',
                'notmatch':'Given Information does not match...',
                'notloginmatched': 'Enter the correct password',
                'cantphone': 'Phone Number can not be updated',
            }
        }
    }
}

module.exports = config["local"]
//module.exports = config[process.argv[2]]

