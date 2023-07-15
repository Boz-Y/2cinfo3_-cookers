
import express from 'express';
//import { body } from "express-validator";
import {envoyerEmailUtilisateur,add_reclamation,getOnce_byId ,getAll,getReclamationsByUserId,getReclamationsByType,deleteReclIfStatusIsOne,updateReclamation 
  ,getTotalReclamations,
  getReclamationsByEtat,
  getNBReclamationsByType,
  getRecentReclamations,} from '../Controllers/reclamation.js';
  
const router = express.Router();

router.route("/")
.get(getAll)

router.route("/")
.post(add_reclamation);

router.route('/:id')
  .get(getOnce_byId); 

  
router.route('/user/:id_user')
.get(getReclamationsByUserId);

router.route('/type/:id_type')
.get(getReclamationsByType);


  //router.route('/:id')
  //.delete(delete_reclamation);

  router.route('/:id')
  .delete(deleteReclIfStatusIsOne);

router.route('/:id').
put(updateReclamation);

router.route('/reclamations/total').
get(getTotalReclamations);



router.route('/reclamations/reclamations-by-etat').
get(getReclamationsByEtat);


router.route('/reclamations/reclamations-by-type').
get(getNBReclamationsByType);


router.route('/recent-reclamations/:limit').
get(getRecentReclamations);


// router.get('/total-reclamations', (req, res) => {
//   getTotalReclamations()
//     .then((count) => {
//       res.status(200).json({ count });
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'An error occurred while fetching the total number of reclamations.' });
//     });
// });

// router.get('/reclamations-by-etat', (req, res) => {
//   getReclamationsByEtat()
//     .then((reclamations) => {
//       res.status(200).json({ reclamations });
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'An error occurred while fetching the reclamations by etat.' });
//     });
// });


// router.get('/reclamations-by-type', (req, res) => {
//   getNBReclamationsByType()
//     .then((reclamations) => {
//       res.status(200).json({ reclamations });
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'An error occurred while fetching the reclamations by type.' });
//     });
// });

// router.get('/recent-reclamations/:limit', (req, res) => {
//   const limit = Number(req.params.limit);
//   getRecentReclamations(limit)
//     .then((reclamations) => {
//       res.status(200).json({ reclamations });
//     })
//     .catch((error) => {
//       res.status(500).json({ error: 'An error occurred while fetching the recent reclamations.' });
//     });
// });



// router.route('/envoyer-email').post(sendEmail);

router.route("/envoyer-email-utilisateur")
.post(envoyerEmailUtilisateur);

export default router;

