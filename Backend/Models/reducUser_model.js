import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ReducUserSchema = new Schema(
    {

        id_user: {
            type: Schema.Types.ObjectId, 
            ref:"Users",
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
        },

        code: {
            type: String,
            required: true,
        }

    },
    {
        timestamps: true
    } 
);

export default model('ReducUser', ReducUserSchema);