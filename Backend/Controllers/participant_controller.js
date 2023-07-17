
import Participant from "../Models/participant_model.js";
import Evenement from "../Models/evenement_model.js"
import mongoose from "mongoose";
import User from "../Models/user.js";
import { pdfGenerator } from "./utils/pdfEvent.js";

import nodemailer from 'nodemailer';
import fs from 'fs'
import handlebars from 'handlebars'
import { generatorOTP ,mailTransport,generateToken } from './utils/mail.js'
import {formatDate} from './utils/formatDate.js'

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
          ///decrementer nb de place
          const updateparticipant = await Evenement.updateOne(
            {_id: req.body.id_evenement},
            {
              $inc:{nb_place_restant:-1}
            }
           );
            res.status(200).json({
              result: true
            });

            var path = "generated/qrCode/" + event._id + ".png";
                try {
                  pdfGenerator({
                    id: participant._id,
                    nom: event.nom,
                    description: event.description,
                    nb_participant: event.nb_participant,
                    date_debut: formatDate(event.date_debut),
                    date_fin: formatDate(event.date_fin),
                    pourcentage: event.pourcentage,
                    qrCodeImage: path,
                    nomUser: user.firstname,
                    prenomUser: user.lastname
                  })

                  var PdfPath = "./generated/pdf/" + participant._id + ".pdf";
                  
        
                  const html = fs.readFileSync('../Backend/utils/content_invitation.html', 'utf-8');
                  const template = handlebars.compile(html);
                
                  const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                      user: 'Bozyacine1@gmail.com',
                      pass: process.env.pass,
                    },
                  });
                
                  const replacements = {
                    name: ``,
                    action_url: "http://localhost:3000/reset-password",
                  };
                  const htmlToSend = template(replacements);
                
                  transporter.sendMail({
                    from: 'devtestmailer101@gmail.com',
                    to: user.mail,
                    subject: 'Participation événement',
                    html: htmlToSend,
                    attachments: [
                      {
                        path: PdfPath
                      }
                    ]
                  }, (error, info) => {
                    if (error) {
                      console.error('Error sending email:', error);
                      res.status(500).json({ message: 'Failed to send email' });
                    } else {
                      console.log('Email sent:', info.response);
                      res.json({ message: 'Email sent successfully' });
                    }
                  });
                } catch (error) {
                  console.error('Error reading file or compiling template:', error);
                  res.status(500).json({ message: 'Failed to send email' });
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