const { Router } = require('express');
const { requireAuth } = require('../middlewares/auth.middleware');
const { list, create, update, remove } = require('../controllers/tasks.controller');

const router = Router();

router.use(requireAuth);
router.get('/', list);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', remove);

module.exports = router;
