import ReCAPTCHA from "react-google-recaptcha"
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Asistir() {
  const router = useRouter()
  const [documento, setDocumento] = useState('')
  const [celular, setCelular] = useState('')
  const [captcha, setCaptcha] = useState(null)
  const [mensaje, setMensaje] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (process.env.NODE_ENV !== 'development' && !captcha) {
      setMensaje('Por favor completá el reCAPTCHA.')
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
        <input
          type="text"
          placeholder="Documento (sin puntos ni guiones)"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Celular (solo números)"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          className="border p-2 rounded"
        />
        {process.env.NODE_ENV !== 'development' && (
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={setCaptcha}
          />
        )}
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Confirmar asistencia
        </button>
        {mensaje && <p className="text-center mt-2 text-red-600">{mensaje}</p>}
      </form>
    </main>
  )
}