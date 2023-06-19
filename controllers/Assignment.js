const AssignmentModel = require('../model/assignment')

// Create and Save a new user
exports.createAssignment = async (req, res) => {
    if (!req.body.nom && !req.body.fichierSujet && !req.body.auteur && !req.body.matiere) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const assignment = new AssignmentModel({
        nom: req.body.nom,
        fichierSujet: req.body.fichierSujet,
        auteur: req.body.auteur,
        matiere: req.body.matiere,
        rendu: false
    });
    
    await assignment.save().then(data => {
        res.send({
            message:"Assignment created successfully!!",
            assignment:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};

// Retrieve all users type of prof from the database.
exports.getStudentAssignment = async (req, res) => {
    try {
        const assignment = await AssignmentModel.find({auteur: req.params.id}).populate({path:'auteur', populate:{path:'profil'}}).populate({path:'matiere', populate:{path:'prof'}});
        res.status(200).json(assignment);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Update assignment
exports.doAssignment = async (req, res) => {
    if(!req.body.fichierReponse) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    const update = { fichierReponse: req.body.fichierReponse };
    
    await AssignmentModel.findByIdAndUpdate(id, update, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Assignment not found.`
            });
        }else{
            res.send({ message: "Assignment updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Update assignment
exports.noteAssignment = async (req, res) => {
    if(!req.body.note) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    const update = { note: req.body.note, rendu:true, dateRendu: new Date(), remarque: req.body.remarque };
    
    await AssignmentModel.findByIdAndUpdate(id, update, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Assignment not found.`
            });
        }else{
            res.send({ message: "Assignment updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await AssignmentModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `User not found.`
          });
        } else {
          res.send({
            message: "User deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};