import { getGA4Dashboard } from './_lib/ga4.js'

export default async function handler(req, res) {
  const range = ['today', '7d', '30d'].includes(req.query.range) ? req.query.range : 'today'

  try {
    const propertyId = process.env.GA4_PROPERTY_ID_ORDI
    const data = await getGA4Dashboard(propertyId, range)
    res.status(200).json(data)
  } catch (err) {
    console.error('ga4-ordi error', err)
    res.status(500).json({ error: true, message: err.message || 'Failed to fetch GA4 data' })
  }
}
