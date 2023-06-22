
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

var specialiteSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
         plats: [{ type: Schema.Types.ObjectId, ref: 'Plats' }]

    },
    {
        timestamps: true
    }
);

export default model('Specialite', specialiteSchema);