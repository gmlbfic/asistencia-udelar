import redis from '@/lib/upstash'

export default async function handler(req, res) {
  const estudiantes = await redis.hgetall('asistencia_total')
  if (!estudiantes || Object.keys(estudiantes).length === 0) {
    return res.status(404).send('No hay datos para exportar.')
  }

  // Generar CSV
  let csv = 'Documento,Celular\n'
  for (const documento in estudiantes) {
    csv += `${documento},${estudiantes[documento]}\n`
  }

  res.setHeader('Content-Type', 'text/csv')
  res.setHeader('Content-Disposition', 'attachment; filename="asistencia_total.csv"')
  res.status(200).send(csv)
}
