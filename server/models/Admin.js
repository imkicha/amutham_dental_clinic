const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: 'Clinic Admin' },
  },
  { timestamps: true }
);

AdminSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

AdminSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 12);
};

module.exports = mongoose.model('Admin', AdminSchema);
