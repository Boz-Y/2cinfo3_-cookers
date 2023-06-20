import { validationResult } from "express-validator";

import Evenement from "../Models/evenement_model.js"
import mongoose from "mongoose";


export async function getEvent(req, res) {
  try {

      const event = await Evenement.find({ user_createur: req.body.id_user });
    
    res.status(200).json({
      result: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({ result: false, });
  }
}


export async function addEvent(req, res) {
       try {
          const event= await Evenement.create(req.body)
          event.save() 
            res.status(200).json({
              result: true
            });

       } catch (error) {
          res.status(500).json({
        result: false
      });
       } 
    }

 export async function updateEvent(req, res) {
      try {
          
          await Evenement.updateOne(
          {_id:mongoose.Types.ObjectId(req.body.eventId)} ,
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


   
   

   
