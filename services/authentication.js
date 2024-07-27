const JWT=require('jsonwebtoken');
const key='$uperBatman@123';

function createToken(user){
    const payload={
        _id:user._id,
        email:user.email,
        profileImage:user.profileImage,
        role:user.role
    }
    const token=JWT.sign(payload,key);
    return token;

}

function validateToken(token)
{
    const payload=JWT.verify(token,key);
    return payload;
}

module.exports={
    validateToken,
    createToken
}