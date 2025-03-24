export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ msg: 'Método no permitido' })
  
    const { user, pass } = req.body
  
    const USER = process.env.ADMIN_USER || 'chatgon1'
    const PASS = process.env.ADMIN_PASS || 'chatgon1'
  
    if (user === USER && pass === PASS) {
      return res.status(200).json({ ok: true })
    } else {
      return res.status(
  