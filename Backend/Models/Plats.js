
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

var platSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        timeOfCook: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        withIngredients: [
            { type: Schema.Types.ObjectId, 
              ref: 'Ingredients' }
        ],
        specialite: { 
            type: Schema.Types.ObjectId,
            ref: 'Specialite' 
        },
        // withIngredients: [{ 
        //     type: Schema.Types.ObjectId,
        //     ref: 'BesoinPlatsIngredients' 
        // }],
        recette:  [
            { type: Schema.Types.ObjectId, 
              ref: 'Recettes' }
        ]

    },
    {
        timestamps: true
    }
);

export default model('Plats', platSchema);