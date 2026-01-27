'use client'

import { useState, useEffect } from 'react'
import { FolderOpen, Plus, Trash2, Clock } from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  code: string
  language: string
  createdAt: number
}

interface ProjectManagerProps {
  currentProject: Project | null
  onNewProject: () => void
  onLoadProject: (project: Project) => void
}

export default function ProjectManager({ currentProject, onNewProject, onLoadProject }: ProjectManagerProps) {
  const [savedProjects, setSavedProjects] = useState<Project[]>([])

  useEffect(() => {
    // Load saved projects from localStorage
    const saved = localStorage.getItem('delta-codex-projects')
    if (saved) {
      setSavedProjects(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    // Save current project to localStorage
    if (currentProject) {
      const existingIndex = savedProjects.findIndex(p => p.id === currentProject.id)
      let updatedProjects: Project[]
      
      if (existingIndex >= 0) {
        updatedProjects = [...savedProjects]
        updatedProjects[existingIndex] = currentProject
      } else {
        updatedProjects = [currentProject, ...savedProjects].slice(0, 10) // Keep last 10 projects
      }
      
      setSavedProjects(updatedProjects)
      localStorage.setItem('delta-codex-projects', JSON.stringify(updatedProjects))
    }
  }, [currentProject])

  const handleDelete = (projectId: string) => {
    const updated = savedProjects.filter(p => p.id !== projectId)
    setSavedProjects(updated)
    localStorage.setItem('delta-codex-projects', JSON.stringify(updated))
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-codex-dark/50 border border-purple-900/20 rounded-lg backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-purple-900/20 bg-codex-darker/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-codex-green" />
            <h3 className="font-semibold">Projects</h3>
          </div>
          <button
            onClick={onNewProject}
            className="p-2 hover:bg-codex-darker rounded-lg transition-colors"
            title="New Project"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Current Project */}
      {currentProject && (
        <div className="px-4 py-3 bg-codex-purple/10 border-b border-purple-900/20">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{currentProject.name}</h4>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{currentProject.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 bg-codex-purple/20 text-codex-purple text-xs rounded">
                  {currentProject.language}
                </span>
                <span className="text-xs text-gray-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Projects */}
      <div className="flex-1 overflow-y-auto">
        {savedProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <FolderOpen className="w-16 h-16 text-gray-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Saved Projects</h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Your projects will be saved automatically as you create them
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {savedProjects.map((project) => (
              <div
                key={project.id}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  currentProject?.id === project.id
                    ? 'bg-codex-purple/20 border-codex-purple/40'
                    : 'bg-codex-darker/50 border-purple-900/20 hover:border-purple-900/40'
                }`}
                onClick={() => onLoadProject(project)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{project.name}</h4>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{project.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 bg-codex-blue/20 text-codex-blue text-xs rounded">
                        {project.language}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {formatDate(project.createdAt)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(project.id)
                    }}
                    className="p-1 hover:bg-red-500/20 rounded transition-colors ml-2"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="px-4 py-3 border-t border-purple-900/20 bg-codex-darker/50">
        <div className="text-xs text-gray-400">
          {savedProjects.length} project{savedProjects.length !== 1 ? 's' : ''} saved
        </div>
      </div>
    </div>
  )
}
