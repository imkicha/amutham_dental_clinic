const express = require('express');
const validator = require('validator');
const Appointment = require('../models/Appointment');
const { notifyClinicAndPatient } = require('../utils/whatsapp');

const router = express.Router();

const TREATMENTS = [
  'Root Canal Treatment',
  'Teeth Whitening',
  'Dental Implants',
  'Braces & Aligners',
  'Pediatric Dentistry',
  'Cosmetic Dentistry',
  'Emergency Dental Care',
  'General Consultation',
];

function validatePayload(body) {
  const errors = [];
  const { name, phone, treatment, preferredDate, preferredTime, email, message } = body;

  if (!name || String(name).trim().length < 2) errors.push('Name is required');
  if (!phone || !/^[0-9+\-\s]{7,20}$/.test(String(phone))) errors.push('Valid phone number is required');
  if (!treatment || !TREATMENTS.includes(treatment)) errors.push('Please select a valid treatment');
  if (!preferredDate) errors.push('Preferred date is required');
  if (!preferredTime) errors.push('Preferred time is required');
  if (email && !validator.isEmail(String(email))) errors.push('Email is invalid');
  if (message && String(message).length > 1000) errors.push('Message is too long');

  return errors;
}

router.post('/', async (req, res, next) => {
  try {
    const errors = validatePayload(req.body);
    if (errors.length) return res.status(400).json({ error: errors.join(', ') });

    const appt = await Appointment.create({
      name: String(req.body.name).trim(),
      phone: String(req.body.phone).trim(),
      email: req.body.email ? String(req.body.email).trim() : undefined,
      treatment: req.body.treatment,
      preferredDate: req.body.preferredDate,
      preferredTime: req.body.preferredTime,
      message: req.body.message ? String(req.body.message).trim() : undefined,
    });

    let notify = null;
    try {
      notify = await notifyClinicAndPatient(appt);
    } catch (e) {
      console.warn('Notify failed:', e.message);
    }

    res.status(201).json({
      ok: true,
      appointment: { id: appt._id, ...appt.toObject() },
      whatsapp: notify,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/treatments', (_req, res) => res.json({ treatments: TREATMENTS }));

module.exports = router;
