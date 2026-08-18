import { getGA4Dashboard } from './_lib/ga4.js'

export default async function handler(req, res) {
  const range = ['today', '7d', '30d'].includes(req.query.range) ? req.query.range : 'today'
  res.setHeader('Cache-Control', 'no-store, max-age=0')

  try {
    const propertyId = process.env.GA4_PROPERTY_ID_HAREL
    const data = await getGA4Dashboard(propertyId, range)
    res.status(200).json(data)
  } catch (err) {
    console.error('ga4-harel error', err)
    res.status(500).json({ error: true, message: err.message || 'Failed to fetch GA4 data' })
  }
}
