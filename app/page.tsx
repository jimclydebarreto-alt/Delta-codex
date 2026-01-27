'use client'

import { useState, useEffect } from 'react'
import ChatInterface from '@/components/ChatInterface'
import CodePreview from '@/components/CodePreview'
import ProjectManager from '@/components/ProjectManager'
import { Sparkles, Code2, Zap } from 'lucide-react'
import io from 'socket.io-client'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface Project {
  id: string
  name: string
  description: string
  code: string
  language: string
  createdAt: number
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [socket, setSocket] = useState<any>(null)

  useEffect(() => {
    // Connect to Socket.IO server for real-time updates
    const socketConnection = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001')
    setSocket(socketConnection)

    socketConnection.on('connect', () => {
      console.log('Connected to Delta Codex server')
    })

    socketConnection.on('codeUpdate', (data: any) => {
      if (currentProject && data.projectId === currentProject.id) {
        setCurrentProject(prev => prev ? { ...prev, code: data.code } : null)
      }
    })

    return () => {
      socketConnection.disconnect()
    }
  }, [])

  const handleSendMessage = async (message: string) => {
    const newMessage: Message = {
      role: 'user',
      content: message,
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, newMessage])
    setIsGenerating(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          context: messages,
          projectId: currentProject?.id
        }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, assistantMessage])

      if (data.project) {
        setCurrentProject(data.project)
      }
    } catch (error) {
      console.error('Error generating response:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNewProject = () => {
    setCurrentProject(null)
    setMessages([])
  }

  const handleLoadProject = (project: Project) => {
    setCurrentProject(project)
    setMessages([])
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-codex-darker via-codex-dark to-codex-darker">
      {/* Header */}
      <header className="border-b border-purple-900/20 bg-codex-darker/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-codex-purple/20 blur-xl rounded-full animate-pulse-slow"></div>
                <Sparkles className="w-8 h-8 text-codex-purple relative z-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-codex-purple to-codex-blue bg-clip-text text-transparent">
                  Delta Codex
                </h1>
                <p className="text-xs text-gray-400">GOD-Level AI Development</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-codex-green/10 border border-codex-green/20">
                <Zap className="w-4 h-4 text-codex-green" />
                <span className="text-sm text-codex-green">Enhanced AI Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Project Manager */}
          <div className="lg:col-span-1">
            <ProjectManager
              currentProject={currentProject}
              onNewProject={handleNewProject}
              onLoadProject={handleLoadProject}
            />
          </div>

          {/* Middle - Chat Interface */}
          <div className="lg:col-span-1">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isGenerating={isGenerating}
            />
          </div>

          {/* Right - Code Preview */}
          <div className="lg:col-span-1">
            <CodePreview project={currentProject} />
          </div>
        </div>
      </div>

      {/* Feature Banner */}
      {messages.length === 0 && !currentProject && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-codex-purple via-codex-blue to-codex-green bg-clip-text text-transparent">
              Build Anything with AI
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Delta Codex combines multiple AI models including Gemini and Agent 3 to deliver GOD-level coding capabilities
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-codex-dark/50 border border-purple-900/20 rounded-lg p-6 backdrop-blur-sm">
                <Code2 className="w-12 h-12 text-codex-purple mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Multi-Language Support</h3>
                <p className="text-gray-400 text-sm">Build apps in any language or framework</p>
              </div>
              <div className="bg-codex-dark/50 border border-blue-900/20 rounded-lg p-6 backdrop-blur-sm">
                <Sparkles className="w-12 h-12 text-codex-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Real-Time Chat</h3>
                <p className="text-gray-400 text-sm">Iterate and update your projects instantly</p>
              </div>
              <div className="bg-codex-dark/50 border border-green-900/20 rounded-lg p-6 backdrop-blur-sm">
                <Zap className="w-12 h-12 text-codex-green mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">One-Click Publishing</h3>
                <p className="text-gray-400 text-sm">Deploy your creations with ease</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
