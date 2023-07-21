import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      enum: ["user", "admin"], // Allow only "user" and "admin" as role names
      default: "user", // Set "user" as the default role value
      unique: true // Ensure that each role name is unique
    }
  },
  {
    timestamps: true
  }
);

export default model('Role', RoleSchema);
