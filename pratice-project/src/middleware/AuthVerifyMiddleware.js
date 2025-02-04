var jwt = require('jsonwebtoken');

module.exports= (req, res,next) => {

    let Token = req.headers['token-key'];
    console.log(Token)
    jwt.verify(Token, "SecretKey12345", (err, decoded) => {
      if (err) {
          res.status(401).json({status:"error", error: err});
      }    else {
          //get username from decoded token with req header
          let UserName = decoded.data.UserName;

          req.headers['UserName']=UserName;
         next();
      }
})


}