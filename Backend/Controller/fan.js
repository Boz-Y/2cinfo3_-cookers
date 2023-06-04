import { validationResult } from "express-validator";
import fan from "../Models/fan.js";

export function fans(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  }else {
    fan.create({
    fullname: req.body.fullname,
    phone: req.body.phone,
    team: req.body.team,
    image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
  })
    .then((newfan) => {
      res.status(201).json({
        fullname: newfan.fullname,
        phone: newfan.phone,
        team: newfan.team,
        image: newfan.image,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  }
}


export function getOnce(req, res) {
  fan.findById(req.params.team)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export function getAll(req, res) {
  fan.find({})
    .then((docs) => {
      let list = [];
      for (let i = 0; i < docs.length; i++) {
              list.push({
                  id: docs[i]._id,
                  fullname: docs[i].fullname,
                  phone: docs[i].phone,
                  team: docs[i].team,
                  image: docs[i].image,
                });
      }
      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}