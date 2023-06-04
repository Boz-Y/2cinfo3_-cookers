import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const TicketSchema = new Schema(
    {
        FanID: {
            type: String,
            required: true
        },
        MatchID: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        },
        updatedAt: {
            type: Date,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default model('Ticket', TicketSchema);