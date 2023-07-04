
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

var recetteSchema = new Schema(
    {
        order: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        plats: { 
            type: Schema.Types.ObjectId,
            ref: 'Plats' 
        }

    },
    {
        timestamps: true
    }
);

export default model('Recettes', recetteSchema);