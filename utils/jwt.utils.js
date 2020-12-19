// import 

var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = "217f534be47ac7723f3efd301a8baa16";

// exports function

module.exports = {

    generateTokenForUser : (userData) => {
        return  jwt.sign({
            userId: userData.id
        },
        JWT_SIGN_SECRET,
        {
            expiresIn:'24h'
        })
    },

    getUserId: (token) => {
        var userId = -1;
        if(token != null){
            try{
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != null){
                    userId = jwtToken.userId;
                }
            } catch(error) {}
        }
        return userId;
    }
}