const jwt= require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            error: 'No se proporciono un token de acceso'
        });
    }

    jwt.verify(token, 'secreto', (error, decoded) => {
        if(error){
            return res.status(401).json({
                error: 'Token inválido'
            });
        }
        req.userId = decoded.userId;
        next();
    });
};


/*token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTgzNTMxMGVhMzg1NDgxNDAzNGI0ZGEiLCJpYXQiOjE3MDMxMDUzMjQsImV4cCI6MTcwMzEzNDEyNH0.Kn3UZIIEB3FSAiBJZiDhmzlFfzZVAVxxI1oZxorHnU8*/