// Import the required models
import Commande from '../Models/Commande.js';
import LigneCommande from '../Models/Ligne_commande.js';

// LigneCommande Controllers

const createLigneCommande = (req, res) => {
  try {
    const ligneCommande =  LigneCommande.create(req.body);
    res.status(201).json(ligneCommande);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create LigneCommande' + error });
  }
};

const getAllLigneCommandes = (req, res) => {
  try {
    const ligneCommandes =  LigneCommande.find();
    res.json(ligneCommandes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch LigneCommandes' });
  }
};

const getLigneCommandeById = (req, res) => {
  try {
    const ligneCommande =  LigneCommande.findById(req.params.id);
    if (!ligneCommande) {
      return res.status(404).json({ error: 'LigneCommande not found' });
    }
    res.json(ligneCommande);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch LigneCommande' });
  }
};

const updateLigneCommande = (req, res) => {
  try {
    const ligneCommande =  LigneCommande.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!ligneCommande) {
      return res.status(404).json({ error: 'LigneCommande not found' });
    }
    res.json(ligneCommande);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update LigneCommande' });
  }
};

const deleteLigneCommande = (req, res) => {
  try {
    const ligneCommande =  LigneCommande.findByIdAndRemove(req.params.id);
    if (!ligneCommande) {
      return res.status(404).json({ error: 'LigneCommande not found' });
    }
    res.json({ message: 'LigneCommande deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete LigneCommande' });
  }
};

// Commande Controllers

const createCommande = (req, res) => {
  Commande.create({
    id_user: req.body.id_user,
    etat: req.body.etat,
    pourcentage_reduction: req.body.pourcentage_reduction,
  })
  .then((Commande) => {
    res.status(200).json({
      id_user: Commande.id_user,
      etat: Commande.etat,
      pourcentage_reduction: Commande.pourcentage_reduction,
    });
  })
  .catch((err) => {
    res.status(404).json({ error: err });
  });
};

const getAllCommandes = (req, res) => {
  Commande
  .find({})
  .then(docs => {
    res.status(200).json(docs);
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
};

const getCommandeById = (req, res) => {
  try {
    const commande =  Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ error: 'Commande not found' });
    }
    res.json(commande);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Commande' });
  }
};

const updateCommande = (req, res) => {
  try {
    const commande =  Commande.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!commande) {
      return res.status(404).json({ error: 'Commande not found' });
    }
    res.json(commande);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update Commande' });
  }
};

const deleteCommande = (req, res) => {
  try {
    const commande =  Commande.findByIdAndRemove(req.params.id);
    if (!commande) {
      return res.status(404).json({ error: 'Commande not found' });
    }
    res.json({ message: 'Commande deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Commande' });
  }
};

// Calculate the total price for a Commande
const calculateCommandeTotalPrice = (req, res) => {
  try {
    const ligneCommandes =  LigneCommande.find({ id_commande: commandeId });
    let totalPrice = 0;

    ligneCommandes.forEach((ligneCommande) => {
      totalPrice += ligneCommande.quantite * ligneCommande.id_ingredient.prix;
    });

    return totalPrice;
  } catch (error) {
    throw new Error('Failed to calculate Commande total price');
  }
};
export {   createLigneCommande,
  getAllLigneCommandes,
  getLigneCommandeById,
  updateLigneCommande,
  deleteLigneCommande,
  createCommande,
  getAllCommandes,
  getCommandeById,
  updateCommande,
  deleteCommande,
  calculateCommandeTotalPrice, };