import jwt from 'jsonwebtoken';

const checkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(400).json({ msg: "Invalid or missing token" });
    }

    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decode;
    next();

  } catch (error) {
    console.log("Token Middleware Error:", error.message);
    return res.status(401).json({ msg: "Unauthorized: Invalid or expired token" });
  }
};

export { checkToken };
