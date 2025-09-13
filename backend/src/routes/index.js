const express = require('express');
const router = express.Router();
const controller = require('../controllers/item.controller');
const { validateItemCreate, validateItemUpdate } = require('../middleware/validate');

// Healthcheck para el botón "Probar conexión"
router.get('/health', controller.health);

// CRUD Items
router.get('/items', controller.list);
router.get('/items/:id', controller.getById);
router.post('/items', validateItemCreate, controller.create);
router.put('/items/:id', validateItemUpdate, controller.update);
router.delete('/items/:id', controller.remove);

module.exports = router;
