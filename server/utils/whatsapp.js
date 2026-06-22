/**
 * WhatsApp notification utility.
 *
 * Two modes:
 *  1. Twilio mode — if TWILIO_* env vars are set, send programmatically.
 *  2. Link mode — return wa.me deep links the frontend can open in a new tab.
 */

let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  try {
    const twilio = require('twilio');
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  } catch (e) {
    console.warn('Twilio init failed, falling back to link mode:', e.message);
  }
}

const CLINIC = process.env.CLINIC_NAME || 'Amutham Dental Clinic';
const CLINIC_WA = (process.env.CLINIC_WHATSAPP || '').replace(/[^0-9]/g, '');

function normalizePhone(phone) {
  const digits = String(phone || '').replace(/[^0-9]/g, '');
  if (!digits) return '';
  if (digits.length === 10) return `91${digits}`; // default India country code
  return digits;
}

function buildClinicMessage(appt) {
  return [
    `*New Appointment Request — ${CLINIC}*`,
    ``,
    `Name: ${appt.name}`,
    `Phone: ${appt.phone}`,
    appt.email ? `Email: ${appt.email}` : null,
    `Treatment: ${appt.treatment}`,
    `Preferred: ${appt.preferredDate} at ${appt.preferredTime}`,
    appt.message ? `Note: ${appt.message}` : null,
    ``,
    `Booked via website on ${new Date().toLocaleString('en-IN')}`,
  ].filter(Boolean).join('\n');
}

function buildPatientMessage(appt) {
  return [
    `Hello ${appt.name}, thank you for booking with *${CLINIC}*.`,
    ``,
    `We have received your appointment request:`,
    `• Treatment: ${appt.treatment}`,
    `• Preferred: ${appt.preferredDate} at ${appt.preferredTime}`,
    ``,
    `Our team will call you shortly to confirm the slot.`,
    `For urgent help, reply to this message.`,
  ].join('\n');
}

function waLink(toDigits, message) {
  return `https://wa.me/${toDigits}?text=${encodeURIComponent(message)}`;
}

async function sendViaTwilio(toDigits, body) {
  if (!twilioClient) return null;
  return twilioClient.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM,
    to: `whatsapp:+${toDigits}`,
    body,
  });
}

async function notifyClinicAndPatient(appt) {
  const clinicMsg = buildClinicMessage(appt);
  const patientMsg = buildPatientMessage(appt);
  const patientDigits = normalizePhone(appt.phone);

  const result = {
    mode: twilioClient ? 'twilio' : 'link',
    clinicLink: CLINIC_WA ? waLink(CLINIC_WA, clinicMsg) : null,
    patientLink: patientDigits ? waLink(patientDigits, patientMsg) : null,
    twilio: { clinic: null, patient: null, error: null },
  };

  if (twilioClient) {
    try {
      if (CLINIC_WA) result.twilio.clinic = await sendViaTwilio(CLINIC_WA, clinicMsg);
      if (patientDigits) result.twilio.patient = await sendViaTwilio(patientDigits, patientMsg);
    } catch (e) {
      result.twilio.error = e.message;
      console.warn('Twilio send failed:', e.message);
    }
  }

  return result;
}

module.exports = { notifyClinicAndPatient, normalizePhone, waLink };
