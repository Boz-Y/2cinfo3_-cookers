import { validationResult } from "express-validator";
import reclamSchema from "../Models/reclamation.js";

//------------------------------AddReclamtion--------------------------------------/

export function add_reclamation(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  }else {
    reclamSchema.create({
      id_user: req.body.id_user,
      etat: req.body.etat,
      commentaire: req.body.commentaire,
      id_type : req.body.id_type
     
      
  })
    .then((new_reclamation) => {
      res.status(200).json({ result: true
      });
    })
    .catch((err) => {
      res.status(500).json({ result: false });
    });
  }
}

//------------------------------getByID--------------------------------------/

export function getOnce_byId(req, res) { reclamSchema.findById(req.params.id)
  .then((doc) => {
    res.status(200).json({result :true,
    data:doc});
  })
  .catch((err) => {
    res.status(500).json({ result :false });
  });
}


//------------------------------getByUser--------------------------------------/
export function getReclamationsByUserId(req, res) {
  const { id_user } = req.params;
  reclamSchema.find({ id_user })
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
        list.push({
          id: docs[i]._id,
          id_user: docs[i].id_user,
          etat: docs[i].etat,
          commentaire: docs[i].commentaire,
          id_type: docs[i].id_type
         

        });
      }
      res.status(200).json({ data: list, result: true });
    })
    .catch((err) => {
      res.status(500).json({ result: false });
    });
}

//------------------------------getByType--------------------------------------/
export function getReclamationsByType(req, res) {
  const { id_type } = req.params;
  reclamSchema.find({ id_type })
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
        list.push({
          id: docs[i]._id,
          id_user: docs[i].id_user,
          etat: docs[i].etat,
          commentaire: docs[i].commentaire,
          id_type: docs[i].id_type
          
        });
      }
      res.status(200).json({ data: list, result: true });
    })
    .catch((err) => {
      res.status(500).json({ result: false });
    });
}



//------------------------------getAll--------------------------------------/


export function getAll(req, res) {
  reclamSchema.find({})
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
              list.push({
                  id: docs[i]._id,
                  id_user: docs[i].id_user,
                  etat: docs[i].etat,
                  commentaire: docs[i].commentaire,
                  id_type: docs[i].id_type
                  
                  
                  
                });
      }
      res.status(200).json({data:list,result :true});
    })
    .catch((err) => {
      res.status(500).json({ result: false });
    });
}


//delet si admin n'as pas rpondu  
// export function delete_reclamation(req, res) {
//   reclamSchema.findByIdAndRemove(req.params.id)
//     .then(() => {
//       res.status(200).json({ result :true });
//     })
//     .catch((err) => {
//       res.status(500).json({ result: false });
//     });
// }
export function deleteReclamation(req, res) {
   const { id } = req.params;
   reclamSchema.findByIdAndRemove(id)
      .then((deleteReclamation) => {
        res.status(200).json({ result: true });
      })
      .catch((err) => {
        res.
       
  status(500).json({ result: false });
      });
  }

//************************************Effacer la réclamation si l'admin n'a pas répondu********/


export function deleteReclIfStatusIsOne(req, res) {
  const { id } = req.params;
  reclamSchema.findOne({ _id: id, etat: '1' })
    .then((reclamation) => {
      if (reclamation) {
        reclamSchema.findByIdAndRemove(id)
          .then((delete_reclamation) => {
            res.status(200).json({ result: true });
          })
          .catch((err) => {
            res.status(500).json({ result: false });
          });
      } else {
        res.status(404).json({ error: 'Reclamation not found or status is not 1.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ result: false });
    });
}
 

/********************************update ****************************************************/


export function updateReclamation(req, res) {
  const { id } = req.params;
  const { id_user,etat, commentaire, id_type } = req.body;

  reclamSchema.findByIdAndUpdate(id, { id_user,etat, commentaire, id_type }, { new: true })
    .then((updatedReclamation) => {
      if (updatedReclamation) {
        res.status(200).json(updatedReclamation);
      } else {
        res.status(404).json({ error: 'Réclamation non trouvée.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la modification de la réclamation.' });
    });
}


/***********************************Fonction de statistique******************************* */