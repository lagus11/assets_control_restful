const jwt = require("jsonwebtoken");


const generateToken = (user) => {
    try {
        //genero el token con la uid en payload
        const token = jwt.sign({user : user}, process.env.secretToken, {
            expiresIn: "15m" // 60 * 30 // 60s por 30 = 30 min
        });
        return token;
    } catch(error){
        console.log(error);
    }
}

const generateRefreshToken = (user, res) => {
    const expiresIn = 60 * 60; //1h
    try{
        const refreshToken = jwt.sign({user : user}, process.env.secretRefreshToken,{
            expiresIn: expiresIn
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + expiresIn * 1000) 
        });

        return refreshToken;
    }catch(error){
        console.log(error);
    }
}

module.exports = { generateToken, generateRefreshToken};
