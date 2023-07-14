import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const RoleSchema = new Schema(
    {
        name: {
            type: String,
            enum: ['admin', 'client'],
            default: 'client'
          }
    },
    {
        timestamps: true
    }
);

export default model('Role', RoleSchema); 