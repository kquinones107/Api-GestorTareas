const { Router } = require('express');
const { body } = require('express-validator');
const { login, register } = require('../controllers/auth.controller');

const router = Router();

router.post(
  '/register',
  [
    body('name').isString().isLength({ min: 2 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  (req, res, next) => {
    // Si hay errores de validación:
    const { validationResult } = require('express-validator');
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
    next();
  },
  register
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  (req, res, next) => {
    const { validationResult } = require('express-validator');
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
    next();
  },
  login
);

module.exports = router;
