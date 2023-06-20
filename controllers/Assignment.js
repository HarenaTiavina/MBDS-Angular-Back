const AssignmentModel = require('../model/assignment')
var mongoose = require('mongoose');

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

// Retrieve all users type of prof from the database.
exports.getStudentAssignmentRendu = async (req, res) => {
    try {
        const assignment = await AssignmentModel.find({auteur: req.params.id, rendu:true}).populate({path:'auteur', populate:{path:'profil'}}).populate({path:'matiere', populate:{path:'prof'}});
        res.status(200).json(assignment);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Retrieve all users type of prof from the database.
exports.getStudentAssignmentNonRendu = async (req, res) => {
    try {
        const assignment = await AssignmentModel.find({auteur: req.params.id, rendu:false}).populate({path:'auteur', populate:{path:'profil'}}).populate({path:'matiere', populate:{path:'prof'}});
        res.status(200).json(assignment);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

//GENARATE ASSIGNEMENT

exports.generateAssignment = async (req, res) => {
    for (let pass = 0; pass < 100; pass++) {
        const assignment = new AssignmentModel({
            nom: "Technologie web "+pass,
            fichierSujet: "techno"+pass+".doc",
            auteur: '648fbd04fc44df1a4e163c08',
            matiere: '648dfb8f62608869735ecfb1',
            rendu: false
        });
    await assignment.save();
    }

    for (let pass = 100; pass < 200; pass++) {
        const assignment = new AssignmentModel({
            nom: "BDD "+pass,
            fichierSujet: "bdd"+pass+".doc",
            fichierReponse :"bddR"+pass+".doc",
            auteur: '648fbd04fc44df1a4e163c08',
            matiere: '6490a8204bb30a1f6a265c41',
            note: pass/10, rendu:true, dateRendu: new Date(), remarque: "OK"
        });
    await assignment.save();
    }

    for (let pass = 200; pass < 300; pass++) {
        const assignment = new AssignmentModel({
            nom: "Grails "+pass,
            fichierSujet: "grails"+pass+".doc",
            auteur: '64909f3caf41ba441ba3d40a',
            matiere: '6490a87b4bb30a1f6a265c42',
            rendu: false
        });
    await assignment.save();
    }

    for (let pass = 300; pass < 400; pass++) {
        const assignment = new AssignmentModel({
            nom: "BDD "+pass,
            fichierSujet: "bdd"+pass+".doc",
            fichierReponse :"bddR"+pass+".doc",
            auteur: '64909f3caf41ba441ba3d40a',
            matiere: '6490a8204bb30a1f6a265c41',
            note: pass/100, 
            rendu:true, 
            dateRendu: new Date(), 
            remarque: "Bien fait"
        });
    await assignment.save();
    }    
};