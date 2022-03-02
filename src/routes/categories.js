const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();

router.get('/', CategoryController.index);
router.get('/create', CategoryController.create);
router.post('/create', CategoryController.store);
router.get('/edit/:id', CategoryController.edit);
router.post('/edit/:id', CategoryController.update);
router.post('/delete', CategoryController.destroy);

module.exports = router;