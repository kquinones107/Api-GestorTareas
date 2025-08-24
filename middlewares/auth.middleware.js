const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer '))
    return res.status(401).json({ error: 'No autorizado' });

  const token = header.slice(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.sub; // almacenamos el id del usuario
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = { requireAuth };
