const express = require('express');
const TodoController = require('../controllers/TodoController');
const router = express.Router();

router.get('/', TodoController.index);
router.get('/create', TodoController.create);
router.post('/create', TodoController.store);
router.get('/edit/:id', TodoController.edit);
router.post('/edit/:id', TodoController.update);
router.post('/delete', TodoController.destroy);

module.exports = router;