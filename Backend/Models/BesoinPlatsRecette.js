import mongoose from 'mongoose';
const { Schema, model } = mongoose;

var besoinsSchema = new Schema(
    {
        idIng: {
            type: Schema.Types.ObjectId,
            ref: 'Ingredients'
        },
        idRec: {
            type: Schema.Types.ObjectId,
            ref: 'Recettes'
        },
        quantite: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);



export default model('BesoinPlatsRecette', besoinsSchema);