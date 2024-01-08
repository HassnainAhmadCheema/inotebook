const jwt = require('jsonwebtoken');
const topsecret = "hassnainisagoodboy";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Enter a valid authentication token" });
  }

  try {
    const data = jwt.verify(token, topsecret);
    req.user = data.user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid authentication token" });
  }
};

module.exports = fetchuser;
