const UtilisateurModel = require('../model/utilisateur')
const bcrypt = require("bcrypt")

// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.mail && !req.body.nom && !req.body.prenom && !req.body.profil && !req.body.photo) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const utilisateur = new UtilisateurModel({
        mail: req.body.mail,
        nom: req.body.nom,
        prenom: req.body.prenom,
        photo: req.body.photo,
        mdp: bcrypt.hashSync(req.body.mdp, 8),
        profil: req.body.profil
    });
    
    await utilisateur.save().then(data => {
        res.send({
            message:"User created successfully!!",
            utilisateur:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const utilisateur = await UtilisateurModel.find().populate('profil');
        res.status(200).json(utilisateur);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single User with an id
exports.signin = async (req, res) => {
    try {
        if (!req.body.mail || !req.body.mdp) {
            res.status(400).send({ message: "Content can not be empty!" });
        }
        const utilisateur = await UtilisateurModel.findOne({mail: req.body.mail}).populate("profil");
        if (!utilisateur) {
            res.status(404).send({ message: "User Not found." });
        }
          var passwordIsValid = bcrypt.compareSync(
            req.body.mdp,
            utilisateur.mdp
          );
    
          if (!passwordIsValid) {
            res.status(401).send({ message: "Invalid Password!" });
          }
        res.status(200).json(utilisateur);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await UtilisateurModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await UtilisateurModel.findByIdAndRemove(req.params.id).then(data => {
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
exports.getProf = async (req, res) => {
    try {
        const utilisateur = await UtilisateurModel.find().populate({ path: 'profil', nom: { $ne: 'Prof' } });
        res.status(200).json(utilisateur);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Retrieve all users type of prof from the database.
exports.getEtudiant = async (req, res) => {
    try {
        const utilisateur = await UtilisateurModel.find().populate({ path: 'profil', nom: { $ne: 'Etudiant' } });
        res.status(200).json(utilisateur);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};