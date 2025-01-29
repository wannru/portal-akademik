const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];
        
        jwt.verify(token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403).send('Token tidak valid');
            } else {
                req.authData = authData;
                next();
            }
        });
    } else {
        res.status(401).send('Token tidak tersedia'); 
        // return res.redirect("your url");       
    }
};

// dotenv
// helmet
// tes unit belum mocha/jest