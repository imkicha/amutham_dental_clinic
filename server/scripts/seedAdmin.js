require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

(async () => {
  const email = (process.env.ADMIN_EMAIL || '').toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);
  const existing = await Admin.findOne({ email });
  const passwordHash = await Admin.hashPassword(password);
  if (existing) {
    existing.passwordHash = passwordHash;
    await existing.save();
    console.log(`Admin password updated for ${email}`);
  } else {
    await Admin.create({ email, passwordHash, name: 'Clinic Admin' });
    console.log(`Admin created: ${email}`);
  }
  await mongoose.disconnect();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
