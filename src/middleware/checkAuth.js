const crypto = require('../utils/crypto');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        decoded = crypto.decrypt(token).toString()
        if(decoded=="This is a secret message"){
            next()
        }else{
            return res.status(401).json({
                err: 'Auth failed',
                status: 'failed',
                data : decoded
            })
        }
    } catch (error) {
        {
            return res.status(401).json({
                err: error,
                status: 'failed'
            })
        }
    }
}