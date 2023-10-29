import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default (req, res, next) => {
    const token = req.headers.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            req.userId = decoded._id;

            next();
        } catch (err) {
            return res.status(403).json({
                message: 'Access denied'
            })
        }
    } else {
        return res.status(403).json({
            message: 'Access denied'
        })
    }
}