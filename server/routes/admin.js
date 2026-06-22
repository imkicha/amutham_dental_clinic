const express = require('express');
const { Parser } = require('json2csv');
const Appointment = require('../models/Appointment');
const authRequired = require('../middleware/auth');

const router = express.Router();

router.use(authRequired);

router.get('/appointments', async (req, res, next) => {
  try {
    const { q, status, from, to, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status && status !== 'all') filter.status = status;
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }
    if (q) {
      const rx = new RegExp(String(q).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [{ name: rx }, { phone: rx }, { email: rx }, { treatment: rx }];
    }

    const skip = (Math.max(1, Number(page)) - 1) * Number(limit);
    const [items, total, stats] = await Promise.all([
      Appointment.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
      Appointment.countDocuments(filter),
      Appointment.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ]);

    res.json({
      items,
      total,
      page: Number(page),
      limit: Number(limit),
      stats: stats.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {}),
    });
  } catch (err) {
    next(err);
  }
});

router.patch('/appointments/:id', async (req, res, next) => {
  try {
    const allowed = ['status'];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }
    const appt = await Appointment.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    res.json(appt);
  } catch (err) {
    next(err);
  }
});

router.delete('/appointments/:id', async (req, res, next) => {
  try {
    const appt = await Appointment.findByIdAndDelete(req.params.id);
    if (!appt) return res.status(404).json({ error: 'Appointment not found' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

router.get('/appointments/export.csv', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status && req.query.status !== 'all') filter.status = req.query.status;
    const items = await Appointment.find(filter).sort({ createdAt: -1 }).lean();
    const fields = ['name', 'phone', 'email', 'treatment', 'preferredDate', 'preferredTime', 'message', 'status', 'createdAt'];
    const parser = new Parser({ fields });
    const csv = parser.parse(items);
    res.header('Content-Type', 'text/csv');
    res.attachment(`appointments-${Date.now()}.csv`);
    res.send(csv);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
