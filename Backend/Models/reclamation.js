import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const reclamation = new Schema(
    {         
        id_user: {
            type: Schema.Types.ObjectId,
            ref : "utilisateur",
            required: true
        },
        etat: {
            type: Number,
            required: true
        },
        commentaire: {
            type: String,
            required: true
        },
        id_type: {
            type: Schema.Types.ObjectId,
            ref : "type_reclamations",
            required: true
        }
        
        
    

        
        
    },
    {
        timestamps: true
    }
    
   
);

export default model('reclamation',reclamation);