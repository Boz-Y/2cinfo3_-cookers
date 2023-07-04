import mongoose from 'mongoose';
const { Schema, model } = mongoose;

var besoinsSchema = new Schema(
    {
        idIng: {
            type: Schema.Types.ObjectId,
            ref: 'Ingredients'
        },
        idPlats: {
            type: Schema.Types.ObjectId,
            ref: 'Plats'
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



export default model('BesoinPlatsIngredients', besoinsSchema);