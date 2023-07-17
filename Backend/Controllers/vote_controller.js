import Vote from "../Models/vote_model.js";
import Participant from "../Models/participant_model.js";
import mongoose from "mongoose";

export async function getVoteParticipant(req, res) {
  try {
    const vote = Vote.find({ id_participant: req.body.id_participant });
    res.status(200).json({
      result: true,
      data: vote,
    });
  } catch (error) {
    res.status(500).json({ result: false });
  }
}

///with id participant on params
export async function addVote(req, res) {
  try {
    const vote = await Vote.create(req.body);
    vote.save();
    try {
      const participant = await Participant.updateOne(
        { _id: req.params.id_participant },
        { $push: { votes: vote._id } }
      );
      res.status(200).json({
        result: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "error add vote to participant",
        result: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "error create vote",
      result: false,
    });
  }
}

export async function updateVote(req, res) {
  try {
    await Vote.updateOne(
      { _id: mongoose.Types.ObjectId(req.body.id) },
      {
        $set: req.body,
      }
    );

    res.status(200).json({
      result: true,
    });
  } catch (error) {
    res.status(500).json({
      result: false,
    });
  }
}

export async function calculeVote(req, res) {
  const id_event = new mongoose.Types.ObjectId(req.body.id_evenement);
  console.log(id_event)
  
  try {
    const pipeline = [
      {
        $match: {
          id_evenement: req.body.id_evenement,
        },
      },
      {
        $lookup: {
          from: 'votes', 
          localField: 'votes',
          foreignField: '_id',
          as: 'votes',
        },
      },
      {
        $group: {
          _id: '$id_participant',
          totalVotes: { $sum: { $size: '$votes' } },
        },
      },
    ];
    

    const nbVote = await Participant.aggregate([
      {
        $match: {
          id_evenement: id_event,
        },
      },
      {
        $lookup: {
          from: 'votes', 
          localField: 'votes',
          foreignField: '_id',
          as: 'votes',
        },
      },
      {
        $group: {
          _id: '$id_participant',
          totalVotes: { $sum: { $size: '$votes' } },
        },
      },
    ])
    console.log(nbVote)

    res.status(200).json({ result: true, data: nbVote });
  } catch (error) {
    res.status(500).json({ result: false });
  }

}
