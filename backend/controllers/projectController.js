const Project = require('../models/project');
const { createBoard } = require('../controllers/boardController');





const create = async (req, res, fileNames)=>{

    try {
        
        let data = req.body;
        let project = new Project(data);
        project.files = fileNames;
        project.date = new Date();
        
        project.team = JSON.parse(data.team);

        let result = await project.save();

        createBoard(result._id);

        res.send(result);

    } catch (error) {
        console.log(error)
        res.send(error);
    }

}
const byid = async(req, res) => {
    try {
        let id=req.params.id
       let result= await Project.findById({_id:id})
        res.send(result)



    } catch (error) {
        res.send(error)

    }
}
const list = async (req, res) => {
    try {
        let projects = await Project.find()
            .populate({
                path: 'client',
                model: 'Client'

            })
            .populate({
                path: 'team',
                model: 'User'
            })
            .exec()
        res.send(projects);
    } catch (error) {
        res.send(error)

    }
}

const update = async (req, res, fileNames) => {
    try {
        let data = req.body;
        let id = req.params.id;

        // Récupérer le projet existant
        let existingProject = await Project.findById(id);

        // Vérifier si des fichiers existent déjà
        if (existingProject && existingProject.files) {
            // Ajouter les nouveaux fichiers aux fichiers existants
            data.files = existingProject.files.concat(fileNames);
        } else if (fileNames.length > 0) {
            // S'il n'y a pas de fichiers existants, ajouter simplement les nouveaux fichiers
            data.files = fileNames;
        }

        data.team = JSON.parse(data.team);

        // Mettre à jour le projet
        let updatedProject = await Project.findByIdAndUpdate(
            { _id: id },
            data,
            { new: true }  // Pour renvoyer le projet mis à jour
        );

        res.send(updatedProject);
    } catch (error) {
        res.status(500).send(error);
    }
};




const deleteproject = async (req, res) => {
    try {
        let id = req.params.id
        let deletedproject = await Project.findByIdAndDelete({ _id: id })
        res.send(deletedproject)
    } catch (error) {
        res.send(error)

    }
}
//fct qui return les details de proj
const preview = async (req, res) => {
    try {
        let id = req.params.id;
        let project = await Project.findById({ _id: id })
            .populate({
                path: 'client',
                model: 'Client'

            })
            .populate({
                path: 'team',
                model: 'User'
            })
            .exec()
        res.send(project);
    } catch (error) {
        res.send(error)

    }
}





module.exports = { create, byid, list, deleteproject, update, preview }