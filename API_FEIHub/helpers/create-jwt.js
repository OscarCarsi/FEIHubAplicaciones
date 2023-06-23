const jwt = require('jsonwebtoken');


const generateJWT = (username = '') =>{

    return new Promise((resolve, reject)=>{

        const payload = {username};

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '1h'},
            (err,token)=>{
                if(err){
                    reject('Can´t create web token');
                }else{
                    resolve(token);
                }
            })
    })

}

module.exports = {
    generateJWT
}