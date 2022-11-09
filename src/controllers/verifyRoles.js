const jwt = require("jsonwebtoken");


const verifyRoles = (roles) => async (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    token = token.split(" ")[1];
    const { user } = jwt.verify(token, process.env.secretToken);

    if(roles.includes(user.role.type.name)){
        
        if(user.role.type.name === "user_type_equipment"){
      
            req.user_type_equipments = user.role.type.asset;
        }
        next();
    }else{
        res.status(409).json("No tienes autorización");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = verifyRoles;
