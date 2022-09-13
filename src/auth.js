import jsonwebtoken from "jsonwebtoken";

function auth(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send("Acces denied. No token provided.");
  }

  try {
    const decodedToken = jsonwebtoken.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send(error.message);
  }
}

export default auth;

// MIDDLEWARE DE VÉRIFICATION DE TOKEN
