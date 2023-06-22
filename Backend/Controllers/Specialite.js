import Specialite from '../Models/Specialite.js'




export  function addOnceSpeciality (req, res){
            Specialite.create({
            name: req.body.name,
            description: req.body.description,
            plats: req.body.plats,

          })
            .then((newSpeciality) => {
              
              res.status(200).json({
                name: newSpeciality.name,
                description: newSpeciality.description,  
                plats: newSpeciality.plats,

              });
            })
            .catch((err) => {
              res.status(404).json({ error: err });
            });
        }
      
  


export function getAll(req, res) {
  Specialite
    .find({})

    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}

export async function DeleteSpeciality(req, res) {
  const id =req.params.id
  const specialite = await Specialite.findByIdAndDelete(id);
  res.status(200).json({"message":" Speciality deleted"});
}

export function getSpecialityById(req, res){
  Specialite.findById(req.params.id)
          .then((doc) => {
            res.status(200).json(doc);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      }


export function putOnce(req, res) {
  let newSpeciality = {};
    if(req.file == undefined) {
      newSpeciality = {
        name: req.body.name,
        description: req.body.description,
        plats: req.body.plats,
      }
    }
    else {
      newSpeciality = {
        name: req.body.name,
        description: req.body.description,
        plats: req.body.plats,
      }
    }
  Specialite.findByIdAndUpdate(req.params.id, newSpeciality)
    .then((doc1) => {
      Specialite.findById(req.params.id)
        .then((doc2) => {
            res.status(200).json(doc2);
              })
        .catch((err) => {
            res.status(500).json({ error: err });
              });
          })
      .catch((err) => {
            res.status(500).json({ error: err });
          });
      }


