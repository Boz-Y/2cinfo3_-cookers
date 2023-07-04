import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const type_reclamation = new Schema(
    {
        type: {
            type: String,
            required: true
        }
        
        
    },
    
    {
        timestamps: true
    }
   
   
   
);

export default model('type_reclamation',type_reclamation);