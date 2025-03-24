import { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'


export default function Admin() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [autorizado, setAutorizado] = useState(false)
  const [mensaje, setMensaje] = useState(null)
  const [token, setToken] = useState(null)

 const handleLogin = async () => {
  const res = await fetch('/api/login-admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, pass })
  })

  const data = await res.json()
  if (data.ok) {
    setAutorizado(true)
    setMensaje(null)
  } else {
    setMensaje(data.msg || 'Error de autenticación')
  }
}
const handleLogin = async () => {
    const res = await fetch('/api/login-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, pass })
    })
  
    const data = await res.json()
    if (data.ok) {
      setAutorizado(true)
      setMensaje(null)
    } else {
      setMensaje(data.msg || 'Error de autenticación')
    }
  }
  
  const cambiarEstado = async (estado) => {
    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: estado, password: 'chatgon1' })
    })
    const data = await res.json()
    setMensaje(data.msg)
    if (data.token) setToken(data.token)
  }

  if (!autorizado) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-gray-100">
        <input placeholder="Usuario" value={user} onChange={(e) => setUser(e.target.value)} className="border p-2 rounded w-64" />
        <input type="password" placeholder="Contraseña" value={pass} onChange={(e) => setPass(e.target.value)} className="border p-2 rounded w-64" />
        <button onClick={handleLogin} className="bg-blue-600 text-white py-2 px-6 rounded">Ingresar</button>
        {mensaje && <p className="mt-2 text-red-600">{mensaje}</p>}
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 gap-4 bg-white">
      <h1 className="text-2xl font-bold mb-2">Panel de Asistencia</h1>
      <div className="flex flex-wrap gap-3">
        <button onClick={() => cambiarEstado('open')} className="bg-green-600 text-white px-4 py-2 rounded">Abrir asistencia</button>
        <button onClick={() => cambiarEstado('closed')} className="bg-red-600 text-white px-4 py-2 rounded">Cerrar asistencia</button>
        <button onClick={() => window.open("/api/exportar", "_blank")} className="bg-gray-700 text-white px-4 py-2 rounded">Descargar CSV Total</button>
        <button onClick={() => window.open("/api/exportar-semanal", "_blank")} className="bg-gray-700 text-white px-4 py-2 rounded">CSV Semana Actual</button>
      </div>
      {token && (
  <div className="bg-yellow-100 text-yellow-800 px-4 py-2 mt-4 rounded text-center">
    Asistencia abierta — Token: <strong>{token}</strong><br />
    URL: <a className="underline" href={`/asistir?token=${token}`} target="_blank" rel="noreferrer">
      /asistir?token={token}
    </a>
    <div className="mt-4 flex justify-center">
      <QRCodeCanvas
        value={`${window.location.origin}/asistir?token=${token}`}
        size={200}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
        includeMargin={true}
      />
    </div>
  </div>
)}

      {mensaje && <p className="mt-4 text-center text-blue-600">{mensaje}</p>}
    </main>
  )
}
