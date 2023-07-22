import mongoose from 'mongoose';
const { Schema, model } = mongoose;

var ingredientsSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        ingImg: {
            type: String,
          },
    },
    {
        timestamps: true
    }
);



export default model('Ingredients', ingredientsSchema);