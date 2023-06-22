import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ReducUserSchema = new Schema(
    {

        id_ReducUser: {
            type: Schema.Types.ObjectId, 
            ref:"utilisateur",
            required: true
        },
        id_evenement: {
            type: Schema.Types.ObjectId, ref:"evenement",
            required: true
        },
        consome: {
            type: Boolean,
            required: true,
            default: false
        }

    },
    {
        timestamps: true
    } 
);

export default model('ReducUser', ReducUserSchema);