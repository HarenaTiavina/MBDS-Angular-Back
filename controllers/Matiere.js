const MatiereModel = require('../model/matiere')

// Create and Save a new matiere
exports.create = async (req, res) => {
    if (!req.body.titre && !req.body.photo && !req.body.etat && !req.body.prof ) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const matiere = new MatiereModel({
        titre: req.body.titre,
        photo: req.body.photo,
        etat: req.body.etat,
        prof: req.body.prof
    });
    
    await matiere.save().then(data => {
        res.send({
            message:"Matiere created successfully!!",
            matiere:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating matiere"
        });
    });
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await MatiereModel.findById(req.params.id).populate("prof");
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

