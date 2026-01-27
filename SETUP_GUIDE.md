# 🚀 Delta Codex Setup Guide

A comprehensive step-by-step guide to get Delta Codex up and running.

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Getting API Keys](#getting-api-keys)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Verification](#verification)
7. [Troubleshooting](#troubleshooting)

## System Requirements

### Minimum Requirements
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: 4GB minimum, 8GB recommended
- **Internet Connection**: Required for AI API calls

### Check Your Current Versions

```bash
node --version
npm --version
```

If you need to install or update Node.js, visit: https://nodejs.org/

## Getting API Keys

### Google Gemini API Key (Required)

1. **Visit Google AI Studio**
   - Go to: https://makersuite.google.com/app/apikey
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key"
   - Select your project or create a new one
   - Copy the generated API key

3. **Important Notes**
   - Keep your API key secret
   - Don't share it publicly or commit it to Git
   - Google Gemini offers a free tier with generous limits

### Replit API Key (Optional)

1. **Visit Replit**
   - Go to: https://replit.com/
   - Sign up or log in

2. **Access API Settings**
   - Navigate to Account Settings
   - Find API Keys section
   - Generate a new API key

3. **Note**: This is optional and for future enhancements

## Installation

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/jimclydebarreto-alt/Delta-codex.git

# Or using SSH
git clone git@github.com:jimclydebarreto-alt/Delta-codex.git

# Navigate to the project directory
cd Delta-codex
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js and React
- Express and Socket.IO
- Google Generative AI
- Tailwind CSS
- And all other dependencies

**Installation may take 2-5 minutes depending on your internet speed.**

## Configuration

### Step 1: Create Environment File

```bash
# Copy the example environment file
cp .env.example .env
```

Or on Windows:
```cmd
copy .env.example .env
```

### Step 2: Edit Environment Variables

Open the `.env` file in your text editor and add your API keys:

```env
# REQUIRED: Add your Google Gemini API Key
GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE

# Optional: Replit Agent integration
REPLIT_API_KEY=your_replit_key_if_you_have_one

# Server Configuration (default values are fine)
PORT=3001
NODE_ENV=development

# Frontend URL (default is fine for local development)
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Important**: Replace `YOUR_ACTUAL_API_KEY_HERE` with your real Gemini API key!

### Step 3: Verify Configuration

Your `.env` file should look like this (with your actual keys):

```env
GEMINI_API_KEY=AIzaSyAbc123DefGhiJklMnoPqrStUvWxYz...
REPLIT_API_KEY=
PORT=3001
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Running the Application

### Option 1: Run Both Services Together (Recommended)

```bash
npm run dev:all
```

This starts both the frontend and backend simultaneously.

### Option 2: Run Services Separately

**Terminal 1 - Backend Server:**
```bash
npm run server
```

Wait until you see:
```
╔═══════════════════════════════════════════════════════╗
║              🚀 Delta Codex Server                    ║
║  Status: Running                                      ║
║  Port: 3001                                          ║
╚═══════════════════════════════════════════════════════╝
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Wait until you see:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in X.XXs
```

## Verification

### Step 1: Open Your Browser

Navigate to: **http://localhost:3000**

### Step 2: Check the Interface

You should see:
- ✅ Delta Codex header with logo
- ✅ Three panels: Projects, Chat, Code Preview
- ✅ "Enhanced AI Active" badge
- ✅ Welcome message with examples

### Step 3: Test the AI

1. **Type in the chat**: "Create a simple hello world in JavaScript"
2. **Press Send** or hit Enter
3. **Wait 3-10 seconds** for AI response
4. **Check the Code Preview** panel for generated code

### Step 4: Verify Features

- ✅ Chat messages appear correctly
- ✅ Code appears in preview panel with syntax highlighting
- ✅ Project is saved in Projects panel
- ✅ Copy and download buttons work

## Troubleshooting

### Problem: `npm install` fails

**Solution 1**: Clear npm cache
```bash
npm cache clean --force
npm install
```

**Solution 2**: Delete node_modules and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problem: "Module not found" errors

**Solution**: Ensure all dependencies are installed
```bash
npm install
```

If the error persists, check that you're in the correct directory:
```bash
pwd  # Should show path/to/Delta-codex
ls   # Should show package.json and other files
```

### Problem: Port already in use

**Error**: `EADDRINUSE: address already in use :::3000`

**Solution 1**: Kill the process using the port
```bash
# On macOS/Linux
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

**Solution 2**: Change the port in `.env`
```env
PORT=3002
```

### Problem: AI not generating responses

**Check 1**: Verify API key is set
```bash
# On macOS/Linux
cat .env | grep GEMINI_API_KEY

# On Windows
type .env | findstr GEMINI_API_KEY
```

**Check 2**: Verify backend is running
- Open: http://localhost:3001/health
- Should return: `{"status":"ok","message":"Delta Codex server is running"}`

**Check 3**: Check browser console
- Press F12 in your browser
- Look for any error messages in the Console tab

**Check 4**: Check server logs
- Look at the terminal running `npm run server`
- Check for any error messages

### Problem: TypeScript errors in editor

**Solution**: These are expected before installing dependencies. Run:
```bash
npm install
```

The errors should disappear once all packages are installed.

### Problem: Styles not loading

**Solution**: Ensure Tailwind is properly configured
```bash
# Restart the development server
# Press Ctrl+C to stop
npm run dev
```

### Problem: WebSocket connection failed

**Check**: Both servers must be running
- Backend on port 3001
- Frontend on port 3000

**Solution**: Make sure you're running both servers:
```bash
npm run dev:all
```

### Problem: API quota exceeded

**Error**: "Resource has been exhausted"

**Solution**: 
- You've exceeded your free Gemini API quota
- Wait for quota to reset (usually daily)
- Or upgrade to a paid plan at https://ai.google.dev/pricing

## Advanced Configuration

### Custom Port Configuration

Edit `.env`:
```env
PORT=4000
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Then restart both servers.

### Production Build

```bash
# Build the Next.js app
npm run build

# Start production server
npm start
```

### Docker Deployment (Optional)

If you want to use Docker:

```dockerfile
# Create a Dockerfile in the project root
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000 3001
CMD ["npm", "run", "dev:all"]
```

Build and run:
```bash
docker build -t delta-codex .
docker run -p 3000:3000 -p 3001:3001 delta-codex
```

## Next Steps

Now that Delta Codex is running:

1. **Read the README**: Check out the full feature list
2. **Try Examples**: Test different project types
3. **Explore Features**: Try saving, loading, and editing projects
4. **Customize**: Modify colors and themes in `tailwind.config.js`
5. **Contribute**: Submit improvements via Pull Request

## Getting Help

If you're still having issues:

1. **Check GitHub Issues**: https://github.com/jimclydebarreto-alt/Delta-codex/issues
2. **Ask Questions**: Create a new discussion
3. **Read Documentation**: Check the main README.md
4. **Check Logs**: Look at terminal output for errors

## Security Reminders

⚠️ **Important**:
- Never commit your `.env` file
- Keep your API keys secret
- Don't share your `.env` file with anyone
- Use environment variables in production

## Success! 🎉

If you can:
- ✅ See the Delta Codex interface
- ✅ Send messages in chat
- ✅ Get AI responses
- ✅ See generated code
- ✅ Save and load projects

**You're all set!** Start building amazing apps and games with Delta Codex!

---

**Happy Coding!** 🚀

Need more help? Check the main [README.md](README.md) or create an issue on GitHub.
