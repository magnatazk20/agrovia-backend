import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from './db'
import type { RowDataPacket } from 'mysql2'

dotenv.config()

const app  = express()
const PORT = process.env.PORT     ?? 3333
const JWT_SECRET   = process.env.JWT_SECRET   ?? 'fallback_secret'
const JWT_EXPIRES  = process.env.JWT_EXPIRES_IN ?? '7d'

app.use(cors())
app.use(express.json())

// ─── Health check ────────────────────────────────────────────────────────────
app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true, message: 'Backend + MySQL rodando 🚀' })
  } catch {
    res.status(500).json({ ok: false, message: 'Banco de dados indisponível' })
  }
})

// ─── Register ────────────────────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body as {
    name?: string
    email?: string
    password?: string
  }

  if (!name || !email || !password) {
    res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' })
    return
  }

  if (password.length < 6) {
    res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres.' })
    return
  }

  try {
    // Verificar se e-mail já existe
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    )

    if (rows.length > 0) {
      res.status(409).json({ error: 'E-mail já cadastrado.' })
      return
    }

    // Hash da senha
    const hash = await bcrypt.hash(password, 10)

    // Inserir usuário
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hash]
    ) as any

    const userId = result.insertId

    // Gerar JWT
    const token = jwt.sign({ id: userId, email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES as any,
    })

    res.status(201).json({
      message: `Conta criada com sucesso! Bem-vindo, ${name}.`,
      token,
      user: { id: userId, name, email },
    })
  } catch (err) {
    console.error('[register]', err)
    res.status(500).json({ error: 'Erro interno no servidor.' })
  }
})

// ─── Login ───────────────────────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body as {
    email?: string
    password?: string
  }

  if (!email || !password) {
    res.status(400).json({ error: 'E-mail e senha são obrigatórios.' })
    return
  }

  try {
    // Buscar usuário
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, name, email, password FROM users WHERE email = ?',
      [email]
    )

    if (rows.length === 0) {
      res.status(401).json({ error: 'E-mail ou senha incorretos.' })
      return
    }

    const user = rows[0]

    // Verificar senha
    const valid = await bcrypt.compare(password, user.password as string)
    if (!valid) {
      res.status(401).json({ error: 'E-mail ou senha incorretos.' })
      return
    }

    // Gerar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES as any }
    )

    res.json({
      message: `Bem-vindo de volta, ${user.name}!`,
      token,
      user: { id: user.id, name: user.name, email: user.email },
    })
  } catch (err) {
    console.error('[login]', err)
    res.status(500).json({ error: 'Erro interno no servidor.' })
  }
})

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})
