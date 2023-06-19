const express = require('express')
const UserController = require('../controllers/Utilisateur')
const router = express.Router();

router.get('/', UserController.findAll);
router.post('/signin', UserController.signin);
router.post('/', UserController.create);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.destroy);
router.get('/prof', UserController.getProf);
router.get('/student', UserController.getEtudiant);

module.exports = router