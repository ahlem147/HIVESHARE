const jwt=require('jsonwebtoken')
//cette fct essaye de decodeer le token et tkharej menou les info de user li f wostou
const verifyWebtoken=async(req,res,next)=>{
    try {
        //nverifi token shih wale
        const decoded = await jwt.verify(req.headers.authorization.split(' ')[1],process.env.SECRET_KEY);
        //bearer bjanbha token
        //kol req tet3ada bl middlware htha ba3ed tnajm req talka feha les info de user
        req.user =decoded;
        next();

    } catch (error) {
        res.status(401).send('invalid token')
    }
}
module.exports={verifyWebtoken};