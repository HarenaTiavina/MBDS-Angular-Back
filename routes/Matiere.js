const express = require('express')
const MatiereController = require('../controllers/Matiere')
const router = express.Router();

router.post('/', MatiereController.create);
router.get('/:id', MatiereController.findOne);

module.exports = router