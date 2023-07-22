import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const RoleSchema = new Schema(
  {
    name: {
      type: String, // Allow only "user" and "admin" as role names
      unique: true // Ensure that each role name is unique
    }
  },
  {
    timestamps: true
  }
);

export default model('Role', RoleSchema);
