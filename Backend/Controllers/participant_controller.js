
import Participant from "../Models/participant_model.js";
import Evenement from "../Models/evenement_model.js"
import mongoose from "mongoose";
import User from "../Models/user.js";
import { pdfGenerator } from "./utils/pdf.js";

export async function getParticipantEvent(req,res) {
    try{

      const participant = Participant.find({id_evenement: req.body.id_evenement});
      res.status(200).json({
        result: true,
        data: participant
      });

    }  catch(error) {
      res.status(500).json({ result: false });
    }

}



 export async function participerEvent(req,res) {
       try{

        const user = await User.findOne({_id: req.body.id_participant})

        const event = await Evenement.findOne({_id: req.body.id_evenement})

        if(event.nb_place_restant > 0){

          const participant= await Participant.create(req.body)
          participant.save() 
   

    

          const updateparticipant = await Evenement.updateOne(
            {_id: req.body.id_evenement},
            {
              $inc:{nb_place_restant:-1}
            }
           );

            res.status(200).json({
              result: true
            });

            var path = "generated/qrCode/" + req.body.id_evenement + ".png";

            try {
                pdfGenerator({
                  id: event._id,
                  nom: event.nom,
                  description: event.description,
                  nb_participant: event.nb_participant,
                  date_debut: event.date_debut,
                  date_fin: event.date_fin,
                  pourcentage: event.pourcentage,
                  qrCodeImage: path,
                  nomUser: user.firstname,
                  prenomUser: user.lastname
                })
         
            } catch (error) {
              console.error("Error generating PDF:", error);
            }

        } else {
          res.status(200).json({
            result: false,
            message: "desolé pas assez de place"
          });
        }
       
       } catch(error){
        res.status(500).json({
          result: false
        });
       }
 }

 export async function updateParticipantEvent(req,res) {
  try {
        
    await Participant.updateOne(
    {_id:mongoose.Types.ObjectId(req.body.id)} ,
    {
      $set:req.body
    }
   )
    
     res.status(200).json({
       result: true
     });
   
} catch (error) {
 res.status(500).json({
  result: false
});
} 
}

export async function approuveParticipant(req,res){

  try{

    if(req.body.status == 1){
        await Evenement.updateOne(
            {_id:mongoose.Types.ObjectId(req.body.id_evenement)} ,
            {
              $inc:{nb_place_restant:-1}
            }
           );
        }
           await Participant.updateOne(
            {_id:mongoose.Types.ObjectId(req.body.id_participant)} ,
            {
              etat:req.body.status
            }
           );
           ///TODO envoi email en cas d'accept participation

  } catch (error) {
    res.status(500).json({
     result: false
   });
   } 


}