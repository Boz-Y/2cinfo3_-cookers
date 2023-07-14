import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }, 
        phone: {
            type: Number,
            required: true
        },
        mail: {
            type: String,
            required: true,
            unique: true
          },
          password: {
            type: String,
            required: true
          },
        Role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            required: true
          }
    },
    {
        timestamps: true
    }
);

export default model('Users', userSchema); 