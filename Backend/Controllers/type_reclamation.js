import { validationResult } from "express-validator";
import reclam_type from "../Models/type_reclamation.js";


export function add_type_reclamation(req, res) {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
    }else {
        reclam_type.create({
            type: req.body.type,
          
            })
      .then((reclam_type) => {
        res.status(201).json({
            type: reclam_type.type,
          
        });
      })
      .catch((err) => {
        res.status(500).json({ result:false });
      });
    }
  }


  export function getOnce_byId(req, res) { reclam_type.findById(req.params.id)
    .then((doc) => {
      res.status(200).json({result:true});
    })
    .catch((err) => {
      res.status(500).json({ result:false});
    });
  }


  export function getAll(req, res) {
    reclam_type.find({})
      .then((docs) => {
        let list = [];
        for (let i = 0; i < docs.length; i++) {
                list.push({
                    id: docs[i]._id,
                    id_user: docs[i].id_user,
                    type: docs[i].type,
                    
                  });
        }
        res.status(200).json({result:true});
      })
      .catch((err) => {
        res.status(500).json({ result:false });
      });
  }



  export function update_reclamation_type(req, res) {
    const { id } = req.params;
    const {  type } = req.body;
  
    reclamSchema.findByIdAndUpdate(
      id,
      { type },
      { new: true }
    )
      .then((updatedReclamation) => {
        if (!updatedReclamation) {
          return res.status(404).json({ error: "Reclamation not found" ,result:true});
        }
        res.status(200).json(updatedReclamation);
      })
      .catch((err) => {
        res.status(500).json({ error: err ,result:false });
      });
  }