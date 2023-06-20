import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const VoteSchema = new Schema(
    {

        note: {
            type: Number, 
            required: true
        },
        commentaire: {
            type: String,
        },
        id_utilisateur:{
            type: Schema.Types.ObjectId, 
            ref:"utilisateur",
            required: true
        }

    },
    {
        timestamps: true
    } 
);

export default model('Vote', VoteSchema);