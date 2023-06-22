import mongoose from 'mongoose';
const { Schema, model } = mongoose;

var ingredientsSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        quantite: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);



export default model('Ingredients', ingredientsSchema);