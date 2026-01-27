'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, Bot } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

interface ChatInterfaceProps {
  messages: Message[]
  onSendMessage: (message: string) => void
  isGenerating: boolean
}

export default function ChatInterface({ messages, onSendMessage, isGenerating }: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isGenerating) {
      onSendMessage(input)
      setInput('')
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-codex-dark/50 border border-purple-900/20 rounded-lg backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-purple-900/20 bg-codex-darker/50">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-codex-purple" />
          <h3 className="font-semibold">Delta Codex AI</h3>
          {isGenerating && (
            <div className="ml-auto flex items-center gap-2 text-xs text-codex-purple">
              <div className="w-2 h-2 bg-codex-purple rounded-full animate-pulse"></div>
              Thinking...
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Sparkles className="w-16 h-16 text-codex-purple/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Start Building Something Amazing</h3>
            <p className="text-gray-400 max-w-md">
              Tell me what app or game you want to build. I can create anything from simple tools to complex games!
            </p>
            <div className="mt-6 space-y-2 text-sm text-left w-full max-w-md">
              <div className="p-3 bg-codex-darker/50 border border-purple-900/20 rounded-lg">
                💡 Example: "Create a todo app with React"
              </div>
              <div className="p-3 bg-codex-darker/50 border border-blue-900/20 rounded-lg">
                🎮 Example: "Build a snake game in JavaScript"
              </div>
              <div className="p-3 bg-codex-darker/50 border border-green-900/20 rounded-lg">
                🚀 Example: "Make a weather dashboard with API"
              </div>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-codex-purple text-white'
                    : 'bg-codex-darker/80 border border-purple-900/20'
                }`}
              >
                {message.role === 'assistant' ? (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                )}
                <div className="text-xs opacity-50 mt-2">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-purple-900/20 bg-codex-darker/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to build..."
            className="flex-1 bg-codex-dark border border-purple-900/20 rounded-lg px-4 py-2 focus:outline-none focus:border-codex-purple transition-colors"
            disabled={isGenerating}
          />
          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="px-6 py-2 bg-codex-purple hover:bg-codex-purple/80 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
