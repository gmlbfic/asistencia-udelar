import redis from '@/lib/upstash'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { documento, celular, token } = req.body

  // Verificar si la asistencia está abierta
  const tokenActivo = await redis.get('asistencia_token')
  if (!tokenActivo || tokenActivo !== token) {
    return res.status(403).json({ msg: 'La asistencia no está abierta o el token es inválido.' })
  }

  // Buscar al estudiante
  const clave = `estudiantes:asistencia`
  const estudiantes = await redis.hgetall(clave)

  const encontrado = Object.values(estudiantes || {}).find(est => {
    try {
      const obj = JSON.parse(est)
      return obj.documento === documento && obj.celular === celular
    } catch {
      return false
    }
  })

  if (!encontrado) {
    return res.status(404).json({
      msg: 'No te encontramos en la lista. Enviá tus datos y la fecha de hoy en el espacio de EVA del curso.'
    })
  }

  // Marcar asistencia si lo encontró
  const fecha = new Date().toISOString().split('T')[0]
  await redis.hset(`asistencias:${fecha}`, {
    [documento]: JSON.stringify({ documento, celular, fecha })
  })

  return res.status(200).json({ msg: 'Asistencia registrada con éxito ✅' })
}