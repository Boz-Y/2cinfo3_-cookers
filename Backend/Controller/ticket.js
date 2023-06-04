import ticket from "../Models/ticket.js";

  export function getAll(req, res) {
    Ticket.findById(req.params.FanID)
      .then((docs) => {
        let list = [];
        for (let i = 0; i < docs.length; i++) {
                list.push({
                    id: docs[i]._id,
                    FanID: docs[i].FanID,
                    MatchID: docs[i].MatchID,
                    createdAt: docs[i].createdAt,
                    updatedAt: docs[i].updatedAt,
                  });
        }
        res.status(200).json(list);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  export function getOnce(req, res) {
    ticket.findById(req.params.FanID)
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
