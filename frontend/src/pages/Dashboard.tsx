import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

interface User {
  id: number
  name: string
  email: string
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Verificar se há token salvo (localStorage ou sessionStorage)
    const token =
      localStorage.getItem('token') ?? sessionStorage.getItem('token')
    const raw =
      localStorage.getItem('user') ?? sessionStorage.getItem('user')

    if (!token || !raw) {
      navigate('/')
      return
    }

    try {
      setUser(JSON.parse(raw) as User)
    } catch {
      navigate('/')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    navigate('/')
  }

  if (!user) return null

  return (
    <main className="dashboard-page">
      <div className="dashboard-card">
        <header className="dashboard-header">
          <div className="avatar">{user.name.charAt(0).toUpperCase()}</div>
          <div>
            <h1>Olá, {user.name}! 👋</h1>
            <p className="dashboard-email">{user.email}</p>
          </div>
        </header>

        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-icon">🔐</span>
            <span className="stat-label">Conta ativa</span>
            <span className="stat-value">Verificada</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🗄️</span>
            <span className="stat-label">Banco de dados</span>
            <span className="stat-value">MySQL</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⚡</span>
            <span className="stat-label">Backend</span>
            <span className="stat-value">TypeScript</span>
          </div>
        </div>

        <div className="dashboard-info">
          <p>
            Você está autenticado com sucesso. Seu token JWT está salvo e será
            usado para requisições autenticadas.
          </p>
          <p className="user-id">ID do usuário: <strong>#{user.id}</strong></p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Sair da conta
        </button>
      </div>
    </main>
  )
}
