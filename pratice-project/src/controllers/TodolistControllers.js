const ToDoListModel = require("../models/ToDoListModel")
const err = require("jsonwebtoken/lib/JsonWebTokenError");
const ProfileModel = require("../models/ProfileModel");

exports.CreateToDo = async (req, res) =>  {
    try {
        const requestBody = req.body;


        let ToDoSubject= requestBody['ToDoSubject']
        let ToDoDescription= requestBody['ToDoDescription']
        let UserName= req.headers['UserName'];
        let ToDoStatus= "New"
        let ToDoCreateDate= Date.now()
        let ToDoUpdateDate = Date.now()
        let PostBody={
            UserName:UserName,
            ToDoSubject:ToDoSubject,
            ToDoDescription:ToDoDescription,
            ToDoStatus:ToDoStatus,
            ToDoCreateDate:ToDoCreateDate,
            ToDoUpdateDate:ToDoUpdateDate
        }



        // Use await to handle the creation asynchronously
        const data = await ToDoListModel.create(PostBody);

        // Send success response
        res.status(200).json({ status: "success", data: data });

    } catch (err) {
        // Send error response if something goes wrong
        res.status(400).json({ status: "fail", message: err.message || "Error creating profile", data: err });
    }
};

exports.SelectToDo = async (req, res) => {
    try {
        const UserName = req.headers['UserName'];

        const data =await ToDoListModel.find({ UserName:UserName });


        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.status(401).json({ status: "error", data: err.message });
    }
};
exports.UpdateToDo = async (req, res) => {
    try {
        let ToDoSubject =req.body['ToDoSubject']
        let ToDoDescription= req.body['ToDoDescription']
        let ToDoUpdateDate=Date.now()
        let _id= req.body['id']
        let postbody={

            ToDoSubject:ToDoSubject,
            ToDoDescription:ToDoDescription,
            ToDoUpdateDate:ToDoUpdateDate,
        }

        const data =await ToDoListModel.updateOne({_id:_id},{$set:postbody},{upsert:true});


        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.status(401).json({ status: "error", data: err.message });
    }
};

exports.UpdateToDoStatus = async (req, res) => {
    try {

        let ToDoStatus= req.body['ToDoStatus']
        let ToDoUpdateDate=Date.now()
        let _id= req.body['id']
        let postbody={

            ToDoStatus:ToDoStatus,
            ToDoUpdateDate:ToDoUpdateDate,
        }

        const data =await ToDoListModel.updateOne({_id:_id},{$set:postbody},{upsert:true});


        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.status(401).json({ status: "error", data: err.message });
    }
};

exports.RemoveToDo = async (req, res) => {
    try {



        let _id= req.body['id']


        const data =await ToDoListModel.deleteOne({_id:_id})


        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.status(401).json({ status: "error", data: err.message });
    }
};

exports.SelectToDoByStatus = async (req, res) => {
    try {
        const UserName = req.headers['UserName'];
        const  ToDoStatus = req.body['ToDoStatus'];


        const data =await ToDoListModel.find({ UserName:UserName,ToDoStatus:ToDoStatus });


        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.status(401).json({ status: "error", data: err.message });
    }
};

exports.SelectToDoByDate = async (req, res) => {
    try {
    const UserName = req.headers['UserName'];
    const FromDate = req.body['FromDate'];
    const ToDate= req.body['ToDate'];

    //const fromDate = new Date(FromDate);
   // const toDate = new Date(ToDate);

        const data =await ToDoListModel.find({ UserName:UserName,ToDoCreateDate:{$gte:new Date(FromDate),$lte: new Date(ToDate)}});


        res.status(200).json({ status: "success", data: data });
    } catch (err) {
        res.status(401).json({ status: "error", data: err.message });
    }
};