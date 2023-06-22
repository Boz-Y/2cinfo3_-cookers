import mongoose  from 'mongoose';
import bcrypt  from 'bcryptjs';

const verficationTokenSchema = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  vtoken: { type: String, require: true },
  createdAt: { type: Date, expires: 3600, default: Date.now() }
});

verficationTokenSchema.pre("save", async function (next) {
  if (this.isModified("vtoken")) {
    const hash = await bcrypt.hash(this.vtoken, 10);
    this.vtoken = hash;
  }
  next();
});

verficationTokenSchema.methods.compareToken = async function (vtoken) {
  const result = await bcrypt.compare(vtoken, this.vtoken);
  return result;
};

const VerficationToken = mongoose.model('verficationToken', verficationTokenSchema);
export default VerficationToken;
