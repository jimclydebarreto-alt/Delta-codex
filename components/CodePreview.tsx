'use client'

import { useState } from 'react'
import { Code2, Download, Play, Copy, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Project {
  id: string
  name: string
  description: string
  code: string
  language: string
  createdAt: number
}

interface CodePreviewProps {
  project: Project | null
}

export default function CodePreview({ project }: CodePreviewProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (project?.code) {
      navigator.clipboard.writeText(project.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDownload = () => {
    if (project?.code) {
      const blob = new Blob([project.code], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${project.name}.${getFileExtension(project.language)}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const getFileExtension = (language: string): string => {
    const extensions: { [key: string]: string } = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      html: 'html',
      css: 'css',
      react: 'jsx',
      vue: 'vue',
      java: 'java',
      cpp: 'cpp',
      csharp: 'cs',
      go: 'go',
      rust: 'rs',
      php: 'php',
      ruby: 'rb',
      swift: 'swift',
    }
    return extensions[language.toLowerCase()] || 'txt'
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-codex-dark/50 border border-purple-900/20 rounded-lg backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-purple-900/20 bg-codex-darker/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-codex-blue" />
            <h3 className="font-semibold">Code Preview</h3>
          </div>
          {project && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-codex-darker rounded-lg transition-colors"
                title="Copy code"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-codex-green" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={handleDownload}
                className="p-2 hover:bg-codex-darker rounded-lg transition-colors"
                title="Download code"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Code Content */}
      <div className="flex-1 overflow-auto">
        {project ? (
          <div>
            <div className="px-4 py-3 bg-codex-darker/80 border-b border-purple-900/20">
              <h4 className="font-semibold text-sm">{project.name}</h4>
              <p className="text-xs text-gray-400 mt-1">{project.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-codex-purple/20 text-codex-purple text-xs rounded">
                  {project.language}
                </span>
              </div>
            </div>
            <SyntaxHighlighter
              language={project.language.toLowerCase()}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '1rem',
                background: 'transparent',
                fontSize: '0.875rem',
              }}
              showLineNumbers
            >
              {project.code}
            </SyntaxHighlighter>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Code2 className="w-16 h-16 text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Code Yet</h3>
            <p className="text-gray-400 max-w-md">
              Start a conversation with Delta Codex AI to generate code. Your code will appear here in real-time.
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {project && (
        <div className="px-4 py-3 border-t border-purple-900/20 bg-codex-darker/50">
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2 bg-codex-blue hover:bg-codex-blue/80 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Run Code
            </button>
            <button className="flex-1 px-4 py-2 bg-codex-green hover:bg-codex-green/80 rounded-lg font-semibold transition-colors">
              Publish
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
