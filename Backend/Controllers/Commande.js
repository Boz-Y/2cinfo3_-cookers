// Import the required models
import Commande  from '../Models/Commande.js';
import LigneCommande from '../Models/Ligne_commande.js';

// LigneCommande Controllers

// Create a new LigneCommande
export function createLigneCommande(req, res) {
  try {
    ligneCommande =  LigneCommande.create(req.body);
    res.status(201).json(ligneCommande);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create LigneCommande'+error });
  }
  
};

// Get all LigneCommandes
export function getAllLigneCommandes(req, res) {
  try {
     ligneCommandes =  LigneCommande.find();
    res.json(ligneCommandes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch LigneCommandes' });
  }
};

// Get a single LigneCommande by ID
export function getLigneCommandeById(req, res){
  try {
     ligneCommande =  LigneCommande.findById(req.params.id);
    if (!ligneCommande) {
      return res.status(404).json({ error: 'LigneCommande not found' });
    }
    res.json(ligneCommande);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch LigneCommande' });
  }
};

// Update a LigneCommande
export function updateLigneCommande(req, res){
  try {
     ligneCommande =  LigneCommande.findByIdAndUpdate(
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

// Delete a LigneCommande
export function deleteLigneCommande(req, res){
  try {
     ligneCommande =  LigneCommande.findByIdAndRemove(req.params.id);
    if (!ligneCommande) {
      return res.status(404).json({ error: 'LigneCommande not found' });
    }
    res.json({ message: 'LigneCommande deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete LigneCommande' });
  }
};

// Commande Controllers

// Create a new Commande
export function createCommande(req, res){

  
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

// Get all Commandes
export function getAllCommandes(req, res){

  Commande
  .find({})

  .then(docs => {
    res.status(200).json(docs);
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });
};

// Get a single Commande by ID
export function getCommandeById(req, res){
  try {
     commande =  Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ error: 'Commande not found' });
    }
    res.json(commande);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Commande' });
  }
};

// Update a Commande
export function updateCommande(req, res){
  try {
     commande =  Commande.findByIdAndUpdate(
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

// Delete a Commande
export function deleteCommande(req, res){
  try {
     commande =  Commande.findByIdAndRemove(req.params.id);
    if (!commande) {
      return res.status(404).json({ error: 'Commande not found' });
    }
    res.json({ message: 'Commande deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Commande' });
  }
};


// Calculate the total price for a Commande
export function calculateCommandeTotalPrice(req, res){
  try {
     ligneCommandes =  LigneCommande.find({ id_commande: commandeId });
    let totalPrice = 0;

    ligneCommandes.forEach((ligneCommande) => {
      totalPrice += ligneCommande.quantite * ligneCommande.id_ingredient.prix;
    });

    return totalPrice;
  } catch (error) {
    throw new Error('Failed to calculate Commande total price');
  }
};
