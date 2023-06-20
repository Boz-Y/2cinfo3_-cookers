
import Participant from "../Models/participant_model.js";
import Evenement from "../Models/evenement_model.js"
import mongoose from "mongoose";

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
        const participant= await Participant.create(req.body)
        participant.save() 
          res.status(200).json({
            result: true
          });
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