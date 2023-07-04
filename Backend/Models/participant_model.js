import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ParticipantSchema = new Schema(
    {
        etat: {
            type: Number,
            default: 1,
        },
        id_participant: {
            type: Schema.Types.ObjectId, 
            ref:"Users",
            required: true
        },
        id_evenement: {
            type: Schema.Types.ObjectId,
            ref:"Evenement",
            required: true
        },
        id_plat: {
            type: Schema.Types.ObjectId,
            ref:"Plats",
            required: true
        },
        votes: {
            type:[Schema.Types.ObjectId],
            ref:"Vote"
        }
    },
    {
        timestamps: true
    } 
);

export default model('Participant', ParticipantSchema);