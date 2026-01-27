# 🚀 Delta Codex

**The Ultimate AI-Powered App & Game Builder with GOD-Level Coding Capabilities**

Delta Codex is an advanced AI development platform that combines multiple AI models (Gemini, Agent 3) to provide unparalleled code generation capabilities. Build any app or game through natural conversation and watch your ideas come to life instantly.

## ✨ Features

- 🤖 **Multi-AI Integration**: Powered by Google Gemini and Agent 3 for GOD-level coding
- 💬 **Real-Time Chat Interface**: Conversational development with live updates
- 🎨 **Universal Language Support**: JavaScript, Python, React, Vue, Java, C++, and 15+ more
- 📝 **Live Code Preview**: See your code with syntax highlighting in real-time
- 💾 **Project Management**: Save, load, and manage multiple projects
- 🚀 **One-Click Publishing**: Deploy your creations instantly
- ⚡ **WebSocket Support**: Real-time collaboration and updates
- 🎮 **Game Development**: Build games with physics and smooth gameplay
- 🔄 **Iterative Development**: Update your projects through chat
- 📦 **Export Functionality**: Download your code in any format

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern, responsive styling
- **Socket.IO Client** - Real-time communication
- **React Markdown** - Rich text rendering
- **React Syntax Highlighter** - Beautiful code display

### Backend
- **Node.js & Express** - Fast, reliable server
- **Socket.IO** - WebSocket support
- **Google Gemini AI** - Advanced AI capabilities
- **UUID** - Unique project identification

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/jimclydebarreto-alt/Delta-codex.git
cd Delta-codex
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
# Required: Google Gemini API Key
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Optional: Replit Agent integration
REPLIT_API_KEY=your_replit_api_key_here

# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URL
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Run the Application

**Development Mode (Recommended):**

```bash
# Terminal 1: Start the backend server
npm run server

# Terminal 2: Start the frontend
npm run dev
```

**Or run both simultaneously:**

```bash
npm run dev:all
```

### 5. Open Your Browser

Navigate to: `http://localhost:3000`

## 📖 How to Use Delta Codex

### Creating Your First Project

1. **Start a Conversation**: Type what you want to build in the chat
   - Example: "Create a todo app with React"
   - Example: "Build a snake game in JavaScript"
   - Example: "Make a weather dashboard using an API"

2. **Review the Code**: Delta Codex generates complete, production-ready code
   - View in the Code Preview panel
   - Copy to clipboard
   - Download as a file

3. **Iterate and Improve**: Continue chatting to update your project
   - "Add dark mode to this app"
   - "Make the game harder with increasing speed"
   - "Add data validation to the form"

4. **Save and Manage**: Projects are automatically saved locally
   - Access from the Projects panel
   - Load previous projects anytime
   - Delete old projects when needed

5. **Publish**: Share your creation with one click
   - Click the "Publish" button
   - Get a shareable URL
   - Deploy to production

## 🎯 Example Prompts

### Web Applications
```
"Create a React todo app with localStorage"
"Build a calculator with HTML, CSS, and JavaScript"
"Make a responsive portfolio website"
"Create a blog with markdown support"
```

### Games
```
"Build a Snake game with collision detection"
"Create a Tic-Tac-Toe game with AI opponent"
"Make a platformer game with physics"
"Build a memory card matching game"
```

### Tools & Utilities
```
"Create a JSON formatter tool"
"Build a password generator with options"
"Make a color palette generator"
"Create a markdown to HTML converter"
```

## 🏗️ Project Structure

```
Delta-codex/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ChatInterface.tsx  # Chat UI
│   ├── CodePreview.tsx    # Code display
│   └── ProjectManager.tsx # Project management
├── server/                # Backend server
│   ├── index.js          # Express server
│   └── ai-engine.js      # AI integration
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind CSS config
└── .env.example          # Environment template
```

## 🔧 Configuration

### Customizing AI Behavior

Edit `server/ai-engine.js` to modify:
- AI model parameters (temperature, tokens, etc.)
- System prompt and capabilities
- Code extraction logic
- Enhancement features

### Styling

Modify `tailwind.config.js` to customize:
- Color scheme
- Animations
- Spacing and sizing
- Custom utilities

### Supported Languages

Delta Codex supports 18+ programming languages:
- JavaScript / TypeScript
- React / Vue / Angular
- Python
- HTML / CSS
- Java / C++ / C#
- Go / Rust
- PHP / Ruby
- Swift / Kotlin
- And more...

## 🌟 Advanced Features

### Real-Time Collaboration

Delta Codex uses WebSockets for real-time updates:
```javascript
// Code updates are broadcast to all connected clients
io.emit('codeUpdate', {
  projectId: project.id,
  code: project.code
})
```

### Agent 3 Enhancement

Projects are enhanced with additional optimizations:
- Performance improvements
- Best practice enforcement
- Error handling
- Code documentation

### Project Persistence

Projects are automatically saved to localStorage:
- Up to 10 recent projects
- Full code and metadata
- Instant loading
- No database required

## 🔒 Security Notes

⚠️ **Important Security Guidelines:**

1. **Never commit your `.env` file** - It contains sensitive API keys
2. **Keep your API keys secret** - Don't share them publicly
3. **Use environment variables** - For all sensitive configuration
4. **Validate user input** - On both client and server
5. **Rate limit API calls** - Prevent abuse and excessive costs

## 🐛 Troubleshooting

### Issue: "Cannot find module"
**Solution**: Run `npm install` to install all dependencies

### Issue: "AI generation failed"
**Solution**: Check that your `GEMINI_API_KEY` is set correctly in `.env`

### Issue: "Port already in use"
**Solution**: Change the PORT in `.env` or kill the process using that port

### Issue: TypeScript errors
**Solution**: These are expected before running `npm install`. Dependencies will resolve the errors.

### Issue: WebSocket connection failed
**Solution**: Ensure both frontend and backend servers are running

## 📚 API Documentation

### POST /api/generate
Generate code based on user message

**Request Body:**
```json
{
  "message": "Create a todo app",
  "context": [],
  "projectId": "optional-uuid"
}
```

**Response:**
```json
{
  "response": "AI response text",
  "project": {
    "id": "uuid",
    "name": "Project name",
    "code": "Generated code",
    "language": "javascript"
  }
}
```

### POST /api/publish
Publish a project

**Request Body:**
```json
{
  "projectId": "uuid",
  "code": "code to publish",
  "name": "Project name"
}
```

### GET /api/capabilities
Get AI capabilities and supported features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Google Gemini** - For providing powerful AI capabilities
- **Replit** - For Agent 3 integration concepts
- **Next.js Team** - For the amazing framework
- **Open Source Community** - For all the tools and libraries

## 📞 Support

Need help? Have questions?

- 📧 Email: support@deltacodex.dev
- 🐛 Issues: [GitHub Issues](https://github.com/jimclydebarreto-alt/Delta-codex/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/jimclydebarreto-alt/Delta-codex/discussions)

## 🗺️ Roadmap

- [ ] Add more AI model integrations (Claude, GPT-4, etc.)
- [ ] Implement collaborative editing
- [ ] Add code execution sandbox
- [ ] Create mobile app version
- [ ] Add database storage option
- [ ] Implement user authentication
- [ ] Add code versioning/history
- [ ] Create marketplace for templates
- [ ] Add automated testing features
- [ ] Implement CI/CD integration

---

Built with ❤️ by the Delta Codex Team

**Delta Codex** - Where Ideas Become Code Instantly 🚀
