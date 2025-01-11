const JWT = require('jsonwebtoken')
const userModel = require('../models/userModel');
const { hashPassword, comparePassword } = require('../helpers/authHelper');
var { expressjwt: jwt} = require("express-jwt")




//middleware
const requireSignIn  = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
})


const signupController = async (req, res) => {
    try {
        const { ID_card_number, password , name ,surename } = req.body;
        
        // Validation
        if (!ID_card_number) {
            return res.status(400).send({
                success: false,
                message: 'IDcard is required'
            });
        }
        if (!password || password.length < 10) {
            return res.status(400).send({
                success: false,
                message: 'Password is required'
            });
        }
        
        // Existing user
        const existingUser = await userModel.findOne({ ID_card_number });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User already signed up with this IDcard'
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);



        // Save user
        const user = await userModel.create({
            ID_card_number,
            password: hashedPassword,
            name,
            surename
            
            
        });

        return res.status(201).send({
            success: true,
            message: 'Signup successful, please sign in'
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in signup API',
            error
        });
    }
};

//signin

const signinController = async (req,res) => {
    try{
        const {ID_card_number,password} = req.body
        //validation
        if(!ID_card_number || !password){
            return res.status(500).send({
                success:false,
                message:'Please Provide IDcard or Password'
            })
        }
        // find user
        const user = await userModel.findOne({ID_card_number})
        if(!ID_card_number){
            return res.status(500).send({
                success:false,
                message:'User not found'
            })
        }
        //match password
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(500).send({
                success:false,
                message:'Invlid Idcard or Password',
            })
        }

      //Token JWT
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '7d',
});

        //underfinfed password
        user.password = undefined;
        res.status(200).send({
            success:true,
            message:'Signin Successful',
            token,
            user,
            
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in signin api',
            error
        })
    }
};

const updateUserController = async (req, res) => {
    try {
        const { ID_card_number, password, name ,surename } = req.body;

        // Find user
        const user = await userModel.findOne({ ID_card_number });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        // Validate password if provided
        let hashedPassword;
        if (password) {
            if (password.length < 10) {
                return res.status(400).send({
                    success: false,
                    message: 'Password should be at least 10 characters long'
                });
            }
            hashedPassword = await hashPassword(password);
        }

        // Update user
        const updateFields = {
            ...(name && { name }), // Only include name if it is provided
            ...(hashedPassword && { password: hashedPassword }) // Only include password if it is provided
        };

        const updatedUser = await userModel.findOneAndUpdate(
            { ID_card_number },
            { $set: updateFields },
            { new: true }
        );

        updatedUser.password = undefined;

        res.status(200).send({
            success: true,
            message: 'Profile updated successfully',
            updatedUser,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error in user update API',
            error,
        });
    }
};


module.exports = { signupController , 
    signinController , 
    updateUserController ,
    requireSignIn  };
