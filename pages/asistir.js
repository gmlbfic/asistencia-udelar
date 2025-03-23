import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Asistir() {
  const router = useRouter()
  const [documento, setDocumento] = useState('')
  const [celular, setCelular] = useState('')
  const [captchaPregunta, setCaptchaPregunta] = useState('')
  const [captchaRespuesta, setCaptchaRespuesta] = useState(null)
  const [respuestaUsuario, setRespuestaUsuario] = useState('')
  const [mensaje, setMensaje] = useState(null)

  useEffect(() => {
    generarCaptcha()
  }, [])

  const generarCaptcha = () => {
    const a = Math.floor(Math.random() * 10)
    const b = Math.floor(Math.random() * 10)
    const op = Math.random() > 0.5 ? '+' : '-'
    setCaptchaPregunta(`${a} ${op} ${b}`)
    setCaptchaRespuesta(eval(`${a}${op}${b}`))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (parseInt(respuestaUsuario.trim()) !== captchaRespuesta) {
      setMensaje('Captcha incorrecto. IntentÃ¡ de nuevo.')
      generarCaptcha()
      return
    }

    const res = await fetch('/api/asistencia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        documento,
        celular,
        token: router.query.token
      })
    })

    const data = await res.json()
    setMensaje(data.msg)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-xl font-semibold mb-4">Confirmar Asistencia</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm">
        <input type="text" placeholder="Documento (sin puntos ni guiones)" value={documento} onChange={(e) => setDocumento(e.target.value)} className="border p-2 rounded" required />
        <input type="text" placeholder="Celular (solo nÃºmeros)" value={celular} onChange={(e) => setCelular(e.target.value)} className="border p-2 rounded" required />
        <input type="text" placeholder={`Â¿CuÃ¡nto es ${captchaPregunta}?`} value={respuestaUsuario} onChange={(e) => setRespuestaUsuario(e.target.value)} className="border p-2 rounded" required />
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Confirmar asistencia</button>
        {mensaje && <p className="text-center mt-2">{mensaje}</p>}
      </form>
    </main>
  )
}