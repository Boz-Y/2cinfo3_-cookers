import { validationResult } from "express-validator";
import match from "../Models/match.js";

export function matchs(req, res) {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
    }else {
    match.create({
      date: req.body.date,
      teamHome: req.body.teamHome,
      teamAway: req.body.teamAway,
      nbPlaces: req.body.nbPlaces,
    })
      .then((newmatch) => {
        res.status(201).json({
            date: newmatch.date,
            teamHome: newmatch.teamHome,
            teamAway: newmatch.teamAway,
            nbPlaces: newmatch.nbPlaces,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
    }
  }
  
  export function getAll(req, res) {
    match.find({})
      .then((docs) => {
        let list = [];
        for (let i = 0; i < docs.length; i++) {
                list.push({
                    id: docs[i]._id,
                    date: docs[i].date,
                    teamHome: docs[i].teamHome,
                    teamAway: docs[i].teamAway,
                    nbPlaces: docs[i].nbPlaces,
                  });
        }
        res.status(200).json(list);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  export function getOnce(req, res) {
    match.findById(req.params.id)
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }