import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const MatchSchema = new Schema(
    {
        date: {
            type: String,
            required: true
        },
        teamHome: {
            type: String,
            required: true
        },
        teamAway: {
            type: String,
            required: true
        },
        nbPlaces: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default model('Match', MatchSchema);