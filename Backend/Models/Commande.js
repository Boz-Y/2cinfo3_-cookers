import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const Commande = new Schema(
    { 
        
        id_user: {
            type: Schema.Types.ObjectId,
            ref : "Users",
            required: true
        },

        etat: {
            type: Number,
            required: true
        },

        pourcentage_reduction: {
            type: Number,
            required: true
        }
                
    },
    {
        timestamps: true
    }
    
   
);

export default model('Commande',Commande);