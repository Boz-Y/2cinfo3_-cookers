import express from 'express';
import { body } from "express-validator";
import multer from "../Middelware/multer-config.js";

import {
  createLigneCommande,
  getAllLigneCommandes,
  getLigneCommandeById,
  updateLigneCommande,
  deleteLigneCommande,
  createCommande,
  getAllCommandes,
  getCommandeById,
  updateCommande,
  deleteCommande,
  calculateCommandeTotalPrice,
  
} from '../Controllers/commande.js';;

const router = express.Router();
router.route('/')
.get(getAllLigneCommandes
  
  );
// LigneCommande Routes
router.post('/ligneCommandes', createLigneCommande);
router.get('/ligneCommandes', getAllLigneCommandes);
router.get('/ligneCommandes/:id', getLigneCommandeById);
router.put('/ligneCommandes/:id', updateLigneCommande);
router.delete('/ligneCommandes/:id', deleteLigneCommande);
// router.get('/commandes/:id/ligneCommandes', getLigneCommandeByCommandeId);

// Commande Routes
router.post('/createCommande', createCommande);
router.get('/getAllCommandes', getAllCommandes);
router.get('getCommandeById/:id', getCommandeById);
router.put('/:id', updateCommande);
router.delete('/:id', deleteCommande);
router.get('/commandes/:id/totalPrice', async (req, res) => {
  try {
    const totalPrice = await calculateCommandeTotalPrice(req.params.id);
    res.json({ totalPrice });
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate Commande total price' });
  }
});

export default router;