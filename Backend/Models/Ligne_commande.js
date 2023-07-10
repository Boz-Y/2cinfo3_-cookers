import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const Ligne_commande = new Schema(
    { 
        
        id_ingredient: {
            type: Schema.Types.ObjectId,
            ref : "Ingredients",
            required: true
        },

        id_commande: {
            type: Schema.Types.ObjectId,
            ref : "commande",
            required: true
        },

        quantite: {
            type: Number,
            required: true
        },

                
    },
    {
        timestamps: true
    }
    
   
);

export default model('LigneCommande',Ligne_commande);