import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ParticipantSchema = new Schema(
    {
        etat: {
            type: Number,
            required: true,
            default: 0,
        },
        id_participant: {
            type: Schema.Types.ObjectId, 
            ref:"utilisateur",
            required: true
        },
        id_evenement: {
            type: Schema.Types.ObjectId,
            ref:"evenements",
            required: true
        },
        id_plat: {
            type: Schema.Types.ObjectId,
            ref:"plat",
            required: true
        },
        votes: {
            type:[Schema.Types.ObjectId],
            ref:"vote"
        }
    },
    {
        timestamps: true
    } 
);

export default model('Participant', ParticipantSchema);