import redis from '@/lib/upstash'

export default async function handler(req, res) {
  // Calcular semana actual (formato: 2025-W13)
  const hoy = new Date()
  const semana = `${hoy.getFullYear()}-W${Math.ceil((hoy.getDate() + 6 - hoy.getDay()) / 7)}`
  const key = `asistencia:${semana}`

  const estudiantes = await redis.hgetall(key)
  if (!estudiantes || Object.keys(estudiantes).length === 0) {
    return res.status(404).send(`No hay datos de asistencia para la semana ${semana}.`)
  }

  // Generar CSV
  let csv = 'Documento,Celular\n'
  for (const documento in estudiantes) {
    csv += `${documento},${estudiantes[documento]}\n`
  }

  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', `attachment; filename="asistencia_${semana}.csv"`)
  res.status(200).send(csv)
}
