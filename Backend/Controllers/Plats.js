import Plats from '../models/Plats.js';




export  function addOncePlat (req, res){
            Plats.create({
            name: req.body.name,
            timeOfCook: req.body.timeOfCook,
            description: req.body.description,
            withIngredients: req.body.withIngredients
          })
            .then((newPlat) => {
              
              res.status(200).json({
                name: newPlat.name,
                timeOfCook: newPlat.timeOfCook,
                description: newPlat.description,  
                withIngredients: req.body.withIngredients
              });
            })
            .catch((err) => {
              res.status(404).json({ error: err });
            });
        }
      
  


export function getAll(req, res) {
  Plats
    .find({})

    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}

export async function DeletePlat(req, res) {
  const id =req.params.id
  const plat = await Plats.findByIdAndDelete(id);
  res.status(200).json({"message":"deleted"});
}

export function getPlatById(req, res){
  Plats.findById(req.params.id)
          .then((doc) => {
            res.status(200).json(doc);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      }


export function putOnce(req, res) {
  let newPlat = {};
    if(req.file == undefined) {
      newPlat = {
        name: req.body.name,
        timeOfCook: req.body.timeOfCook,
        description: req.body.description,
      }
    }
    else {
      newPlat = {
        name: req.body.name,
        timeOfCook: req.body.timeOfCook,
        description: req.body.description,
      }
    }
  Plats.findByIdAndUpdate(req.params.id, newPlat)
    .then((doc1) => {
      Plats.findById(req.params.id)
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

export function getPlatsBySpeciality(req, res)  {
	const specialite = req.params.specialityId;
	const limit = Number(req.query.limit) || 0;
	const sort = req.query.sort == 'desc' ? -1 : 1;

	Plats.find({
		specialite,
	})
		.select(['-_id'])
		.limit(limit)
		.sort({ id: sort })
		.then((plats) => {
			res.json(plats);
		})
		.catch((err) => console.log(err));
};

