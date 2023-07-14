import BesoinPlatsRecette from '../models/BesoinPlatsRecette.js';




export  function addOnceBesoin (req, res){
            BesoinPlatsRecette.create({
            idIng: req.body.idIng,
            idRec: req.body.idRec,
            quantite: req.body.quantite,


          })
            .then((newBesoin) => {
              
              res.status(200).json({
                idIng: newBesoin.idIng,
                idRec: newBesoin.idRec,
                quantite: newBesoin.quantite,  


              });
            })
            .catch((err) => {
              res.status(404).json({ error: err });
            });
        }
      

export async function DeleteBesoin(req, res) {
  const id =req.params.id
  const besoin = await BesoinPlatsRecette.findByIdAndDelete(id);
  res.status(200).json({"message":"besoin supprimé"});
}

export function putOnce(req, res) {
  let newBesoin = {};
    if(req.file == undefined) {
      newBesoin = {
        idIng: req.body.idIng,
        idRec: req.body.idRec,
        quantite: req.body.quantite,
      }
    }
    else {
      newBesoin = {
        idIng: req.body.idIng,
        idRec: req.body.idRec,
        quantite: req.body.quantite,
      }
    }
  BesoinPlatsRecette.findByIdAndUpdate(req.params.id, newBesoin)
    .then((doc1) => {
      BesoinPlatsRecette.findById(req.params.id)
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





