const allowedOrigins = ["https://goodbank-and-trust.herokuapp.com, http://localhost:3005"];

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
  
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Credentials", true);
    }
    next();
  };
  
  module.exports = credentials;