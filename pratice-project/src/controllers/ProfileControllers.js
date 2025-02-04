
const ProfileModel = require("../models/ProfileModel");
var jwt = require('jsonwebtoken');
const err = require("jsonwebtoken/lib/JsonWebTokenError");

exports.CreateProfile = async (req, res) => {
    try {
        const requestBody = req.body;

        // Use await to handle the creation asynchronously
        const data = await ProfileModel.create(requestBody);

        // Send success response
        res.status(200).json({ status: "success", data: data });

    } catch (err) {
        // Send error response if something goes wrong
        res.status(400).json({ status: "fail", message: err.message || "Error creating profile", data: err });
    }
};


exports.UserLogin = async (req, res) => {

    try {
        const { UserName, Password } = req.body;

        // Validate input
        if (!UserName || !Password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        // Find user by username
        const user = await ProfileModel.findOne({ UserName });

        // If no user is found

        if (!user) {

            return res.status(404).json({ message: 'User not found.' });

        }



        if (user.Password !== Password ) {
            return res.status(400).json({ message: ' Wrong Password' });
        }

        //creat auth token
        var payload = {exp: Math.floor(Date.now() / 1000) + (24*60 * 60),
        data: user
        }
        var token = jwt.sign(payload ,'SecretKey12345');
        res.status(200).json({status:"Success",token: token, data:
                    {UserName:UserName},
            }
            );




    } catch (err) {

        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.SelectProfile = async (req, res) => {
    try {
        const UserName = req.headers['UserName'];

        const data =await ProfileModel.find({ UserName:UserName });


        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.status(401).json({ status: "error", data: err.message });
    }
};
exports.UpdateProfile = async (req, res) => {
    try {
        const UserName = req.headers['UserName'];

        const requestBody = req.body;


        res.status(200).json(requestBody);
    } catch (err) {
        res.status(401).json({ status: "error", data: err.message });
    }
};











