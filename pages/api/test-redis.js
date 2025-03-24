import redis from '@/lib/upstash'

export default async function handler(req, res) {
  try {
    // Guardamos una prueba
    await redis.set('testeo_gonza', 'funciona')

    // Leemos la misma clave
    const resultado = await redis.get('testeo_gonza')

    res.status(200).json({ ok: true, resultado })
  } catch (error) {
    console.error('Error en test-redis:', error)
    res.status(500).json({ ok: false, error: error.message })
  }
}
