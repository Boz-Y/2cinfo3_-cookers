
import Vote from "../Models/vote_model.js";
import mongoose from "mongoose";

export async function getVoteParticipant(req,res) {
    try{

      const vote = Vote.find({id_participant: req.body.id_participant});
      res.status(200).json({
        result: true,
        data: vote
      });

    }  catch(error) {
      res.status(500).json({ result: false });
    }

}

 export async function addVote(req,res) {
       try{
        const vote= await Vote.create(req.body)
        vote.save() 
          res.status(200).json({
            result: true
          });
       } catch(error){
        res.status(500).json({
          result: false
        });
       }
 }

 export async function updateVote(req,res) {
  try {
        
    await Vote.updateOne(
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