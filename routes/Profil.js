const express = require('express')
const ProfilController = require('../controllers/Profil')
const router = express.Router();

router.post('/', ProfilController.create);

module.exports = router