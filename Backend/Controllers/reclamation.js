import { validationResult } from "express-validator";
import reclamSchema from "../Models/reclamation.js"
import nodemailer from 'nodemailer';

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


/***********************************Notification******************************* */
export function envoyerEmailUtilisateur(req, res) {
  const { email, sujet, contenu } = req.body;

  
  // user.findById(id)
  //    .then((utilisateur) => {
  //      if (!utilisateur) {
        
  //       return res.status(404).json({ message: 'Utilisateur non trouvé.' });
  //     }

     
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
          port: 587,
          secure: false,
        auth: {
          // user: 'cookerscookers4@gmail.com',
          // pass: 'cookerscookers123',
          user: 'jaweher.hamrouni@esprit.tn',
          pass: 'azerty123',
        },
      });

      // Préparer le message de l'e-mail
      const message = {
        from: 'jaweher.hamrouni@esprit.tn', // Remplacez par votre adresse e-mail
        //to: utilisateur.mail,
        to: email,
        subject: sujet,
        text: contenu,
      };

      // Envoyer l'e-mail
      transporter.sendMail(message)
        .then(() => {
          // L'e-mail a été envoyé avec succès
          res.status(200).json({ message: 'E-mail envoyé avec succès.' });
        })
        .catch((error) => {
          // Une erreur s'est produite lors de l'envoi de l'e-mail
          console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
          res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail.' });
        });
    // })
    // .catch((error) => {
    //   // Une erreur s'est produite lors de la recherche de l'utilisateur
    //   console.error('Erreur lors de la recherche de l\'utilisateur :', error);
    //   res.status(500).json({ message: 'Une erreur s\'est produite lors de la recherche de l\'utilisateur.' });
    // });
}


// export function sendEmail(req, res) {
//   // Étape 1: Configuration du transporteur de messagerie
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com', // Adresse du serveur SMTP
//   port: 587, // Port du serveur SMTP
//   secure: false, // true si vous utilisez SSL/TLS, false sinon
//   auth: {
//     user: 'cookerscookers4@gmail.com', // Adresse e-mail pour l'authentification
//     pass: 'cookerscookers123' // Mot de passe pour l'authentification
//   }
//   });

//   // Étape 2: Préparation du contenu de l'e-mail
//   const commentaire = req.body.comment;

//   const emailContent = {
//     from: 'cookerscookers4@gmail.com',
//     to: 'hamrounij5@gmail.com',
//     subject: 'Réclamation',
//     text: commentaire
//   };

  
//   // Étape 3: Envoi de l'e-mail
//   transporter.sendMail(emailContent, (error, info) => {
//     if (error) {
//       console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
//       res.status(500).send('Erreur lors de l\'envoi de l\'e-mail');
//     } else {
//       console.log('E-mail envoyé avec succès!', info.messageId);
//       res.status(200).send('E-mail envoyé avec succès');
//     }
//   });
// }


//-----------------Statstique-------------------------------------------//

   //---NB reclamation  ----------/

   export function getTotalReclamations(req, res) {
    reclamSchema.countDocuments()
      .then((totalReclamations) => {
        res.status(200).json({ totalReclamations });
      })
      .catch((err) => {
        res.status(500).json({ error: 'Une erreur s\'est produite lors du calcul du nombre total des réclamations.' });
      });
  }



   //---NB reclamation par etat ----------/
   export function getReclamationsByEtat(req, res) {
    reclamSchema.aggregate([
      { $group: { _id: "$etat", count: { $sum: 1 } } }
    ])
      .then((reclamations) => {
        res.status(200).json({ reclamations });
      })
      .catch((err) => {
        res.status(500).json({ error: 'Une erreur s\'est produite lors du calcul des statistiques par état des réclamations.' });
      });
  }

//---NB reclamation par type ----------/


export function getNBReclamationsByType(req, res) {
  reclamSchema.aggregate([
    {
      $lookup: {
        from: 'type_reclamations',
        localField: 'id_type',
        foreignField: '_id',
        as: 'type_reclamation'
      }
    },
    { $unwind: '$type_reclamations' },
    { $group: { _id: '$type_reclamations.type', count: { $sum: 1 } } }
  ])
    .then((reclamations) => {
      res.status(200).json({ reclamations });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Une erreur s\'est produite lors du calcul des statistiques par type des réclamations.' });
    });
}



//-----Réclamations les plus récentes (triées par date de création) ---//

export function getRecentReclamations(req, res) {
  const { limit } = req.params;
  reclamSchema.find()
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .then((reclamations) => {
      res.status(200).json({ reclamations });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des réclamations les plus récentes.' });
    });
}
