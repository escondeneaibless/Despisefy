const Router = require('express');
const router = new Router();
const controller = require('./authController');

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.post('form_edit');
router.get('/view', controller.view);

module.exports = router; 