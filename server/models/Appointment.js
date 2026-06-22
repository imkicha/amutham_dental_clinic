const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    email: { type: String, trim: true, lowercase: true, maxlength: 120 },
    treatment: { type: String, required: true, trim: true, maxlength: 80 },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    message: { type: String, trim: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ['new', 'confirmed', 'completed', 'cancelled'],
      default: 'new',
      index: true,
    },
    source: { type: String, default: 'website' },
  },
  { timestamps: true }
);

AppointmentSchema.index({ createdAt: -1 });
AppointmentSchema.index({ name: 'text', phone: 'text', treatment: 'text' });

module.exports = mongoose.model('Appointment', AppointmentSchema);
