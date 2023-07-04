import Ingredients from '../models/Ingredients.js';


import { validationResult } from "express-validator";


export  function addOnceIngredients (req, res){
  

            Ingredients.create({
            name: req.body.name,
            quantite: req.body.quantite,
            description: req.body.description,
          })
            .then((newIngredients) => {
              
              res.status(200).json({
                name: newIngredients.name,
                quantite: newIngredients.quantite,
                description: newIngredients.description,                
              });
            })
            .catch((err) => {
              res.status(404).json({ error: err });
            });
        }
      
  


export function getAll(req, res) {
  Ingredients
    .find({})

    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}

export async function DeleteIngredients(req, res) {
  const id =req.params.id
  const ingredients = await Ingredients.findByIdAndDelete(id);
  res.status(200).json({"message":"Ingredient suprimé"});
}

export function getIngredientsById(req, res){
  Ingredients.findById(req.params.id)
          .then((doc) => {
            res.status(200).json(doc);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      }


export function putOnce(req, res) {
  let newIngredients = {};
    if(req.file == undefined) {
      newIngredients = {
        name: req.body.name,
        quantite: req.body.quantite,
        description: req.body.description,
      }
    }
    else {
      newIngredients = {
        name: req.body.name,
        quantite: req.body.quantite,
        description: req.body.description,
      }
    }
  Ingredients.findByIdAndUpdate(req.params.id, newIngredients)
    .then((doc1) => {
        Ingredients.findById(req.params.id)
        .then((doc2) => {
            res.status(200).json(doc2);
              })
        .catch((err) => {
            res.status(500).json({ error: err });
              });
          })
      .catch((err) => {
            res.status(500).json({ error: err });
          });
      }


