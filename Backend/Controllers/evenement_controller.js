import { validationResult } from "express-validator";

import Evenement from "../Models/evenement_model.js";
import mongoose from "mongoose";
import { qrCodeGenerator } from "./utils/qrCode.js";


export async function getEvent(req, res) {
  try {

      const event = await Evenement.find({ user_createur: req.body.id_user });
      console.log(event)
    res.status(200).json({
      result: true,
      data: event
    });
  } catch (error) {
    res.status(500).json({ result: false });
  }
}

export async function getEventById(req, res) {
  try {
    const event = await Evenement.findById({ _id: req.params.id });

    res.status(200).json({
      result: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({ result: false });
  }
}


///TODO ajout liste image 
export async function addEvent(req, res) {
  try {
    
    var files = [];
    if(req.files != null){
    files = req.files.map((file) => `public/images/evenement/${file.filename}`);
    }

    console.log(files);

   // const specialites = req.body.specialites.map((spec) => new mongoose.Types.ObjectId(spec) );
    var data = {
      nom: req.body.nom,
      description: req.body.description,
      nb_participant: req.body.nb_participant,
      date_debut: req.body.date_debut,
      date_fin: req.body.date_fin,
      date_fin_vote: req.body.date_fin_vote,
      pourcentage: req.body.prix_reduction,
      images: files,
      user_createur: new mongoose.Types.ObjectId(req.body.user_createur),
     // specialites: specialites
    }

    console.log(data)

    const event = await Evenement.create(data);
    event.save();
    res.status(200).json({
      result: true,
    });
    try{
      await qrCodeGenerator(event._id);
    } catch (error) {
      res.status(500).json({
        result: false,
        message: "QR code not generated"
      });
    }
  } catch (error) {
    res.status(500).json({
      result: false,
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


   
   

   