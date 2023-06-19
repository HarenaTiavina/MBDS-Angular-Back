const express = require('express')
const AssignmentController = require('../controllers/Assignment')
const router = express.Router();

router.post('/', AssignmentController.createAssignment);
router.get('/:id', AssignmentController.getStudentAssignment);
router.patch('/do/:id', AssignmentController.doAssignment);
router.patch('/note/:id', AssignmentController.noteAssignment);
router.delete('/:id', AssignmentController.destroy);
router.get('/rendu/:id', AssignmentController.getStudentAssignmentRendu);
router.get('/non-rendu/:id', AssignmentController.getStudentAssignmentNonRendu);

module.exports = router