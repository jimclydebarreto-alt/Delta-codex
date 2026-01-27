require('dotenv').config()
const express = require('express')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const { generateWithAI } = require('./ai-engine')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Store active sessions
const sessions = new Map()

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Delta Codex server is running' })
})

// Code generation endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { message, context, projectId } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Generate response using AI
    const result = await generateWithAI(message, context, projectId)

    // Emit real-time update via Socket.IO
    if (result.project) {
      io.emit('codeUpdate', {
        projectId: result.project.id,
        code: result.project.code
      })
    }

    res.json(result)
  } catch (error) {
    console.error('Generation error:', error)
    res.status(500).json({ 
      error: 'Failed to generate response',
      details: error.message 
    })
  }
})

// Project publishing endpoint
app.post('/api/publish', async (req, res) => {
  try {
    const { projectId, code, name } = req.body

    if (!projectId || !code) {
      return res.status(400).json({ error: 'Project ID and code are required' })
    }

    // In a real application, this would deploy to a hosting service
    // For now, we'll just return a success message
    const publishedUrl = `https://delta-codex.app/projects/${projectId}`

    res.json({
      success: true,
      url: publishedUrl,
      message: 'Project published successfully'
    })
  } catch (error) {
    console.error('Publishing error:', error)
    res.status(500).json({ 
      error: 'Failed to publish project',
      details: error.message 
    })
  }
})

// Get AI capabilities
app.get('/api/capabilities', (req, res) => {
  res.json({
    models: ['Gemini Pro', 'Agent 3', 'Delta Codex Engine'],
    languages: [
      'JavaScript', 'TypeScript', 'Python', 'HTML', 'CSS',
      'React', 'Vue', 'Angular', 'Node.js', 'Java', 'C++',
      'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin'
    ],
    features: [
      'Real-time code generation',
      'Multi-language support',
      'Interactive chat interface',
      'Code preview and editing',
      'One-click publishing',
      'Project management',
      'GOD-level AI capabilities'
    ]
  })
})

// Start server
server.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║              🚀 Delta Codex Server                    ║
║                                                       ║
║  Status: Running                                      ║
║  Port: ${PORT}                                        ║
║  AI Engine: Ready                                     ║
║  WebSocket: Active                                    ║
║                                                       ║
║  GOD-Level AI Development Platform                    ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `)
})

module.exports = { app, io }
