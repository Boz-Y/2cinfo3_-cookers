import Recettes from '../models/Recettes.js';



export  function addOnceRecette (req, res){
            Recettes.create({
            order: req.body.order,
            description: req.body.description,
            plats: req.body.plats,

          })
            .then((newRecette) => {
              
              res.status(200).json({
                order: newRecette.order,
                description: newRecette.description,  
                plats: newRecette.plats,


              });
            })
            .catch((err) => {
              res.status(404).json({ error: err });
            });
        }
      
  


export function getAll(req, res) {
  Recettes
    .find({})

    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}

export async function DeleteRecette(req, res) {
  const id =req.params.id
  const recette = await Recettes.findByIdAndDelete(id);
  res.status(200).json({"message":" Recette deleted"});
}

export function getRecetteById(req, res){
  Recettes.findById(req.params.id)
          .then((doc) => {
            res.status(200).json(doc);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      }


export function putOnce(req, res) {
  let newRecette = {};
    if(req.file == undefined) {
      newRecette = {
        order: req.body.order,
        description: req.body.description,
        plats: req.body.plats,
      }
    }
    else {
      newRecette = {
        order: req.body.order,
        description: req.body.description,
        plats: req.body.plats,
      }
    }
    Recettes.findByIdAndUpdate(req.params.id, newRecette)
    .then((doc1) => {
      Recettes.findById(req.params.id)
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

export async function getRecetteByPlats(req, res)  {
	const plats = req.params.platId;

	 const limit = Number(req.query.limit) || 0;
	// const sort = req.query.sort == 'desc' ? -1 : 1;

	const RRR = await Recettes.find({
		plats,
	})
		.select(['-_id'])
		 .limit(limit)
		// .sort({ id: sort })
    res.status(200).json({Data : RRR});
    // console.log(RRR[0])
     




		
};




