# Chatbot Project

A modern, interactive chatbot application built with React and Vite. This project features a clean chat interface with AI-powered responses using the Groq API, persistent message history, and a smooth user experience.

## 🚀 Features

- **AI-Powered Chat**: Intelligent responses using Groq's free AI API (Llama 3.1 model)
- **Interactive Chat Interface**: Clean and intuitive chat UI with user and bot messages
- **Message Persistence**: Chat history is automatically saved to localStorage and restored on page reload
- **Conversation Context**: The AI remembers previous messages in the conversation for better responses
- **Loading States**: Visual feedback with a loading spinner while waiting for AI responses
- **Error Handling**: Graceful error messages if API calls fail
- **Auto-scrolling**: Chat automatically scrolls to the latest message
- **Keyboard Shortcuts**: 
  - Press `Enter` to send a message
  - Press `Escape` to clear the input field
- **Clear Functionality**: Reset chat history with a single click
- **Welcome Message**: Friendly welcome message displayed when chat is empty
- **Responsive Design**: Mobile-friendly layout with a centered container

## 🛠️ Tech Stack

- **React 19.1.0** - UI library
- **Vite 6.3.5** - Build tool and dev server
- **Groq API** - Free AI API for intelligent responses (Llama 3.1 model)
- **dayjs** - Date and time formatting
- **ESLint** - Code linting

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chatbot-project
```

2. Install dependencies:
```bash
npm install
```

3. Set up your API key:
   - Create a free account at [Groq Console](https://console.groq.com/)
   - No credit card required for the free tier
   - Navigate to API Keys section and create a new API key
   - Create a `.env` file in the root directory:
   ```bash
   VITE_GROQ_API_KEY=your_api_key_here
   ```
   - Replace `your_api_key_here` with your actual Groq API key

## 🎯 Usage

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

**Important**: Make sure you have set up your `.env` file with the `VITE_GROQ_API_KEY` before running the app.

### Build

Create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check for code issues:
```bash
npm run lint
```

## 🔑 Getting Your Free Groq API Key

1. Visit [https://console.groq.com/](https://console.groq.com/)
2. Sign up for a free account (no credit card required)
3. Navigate to **API Keys** in the dashboard
4. Click **Create API Key**
5. Copy your API key
6. Create a `.env` file in the project root:
   ```
   VITE_GROQ_API_KEY=your_copied_api_key_here
   ```
7. Restart your development server

### Groq Free Tier Benefits

- **Free forever** - No credit card required
- **Fast responses** - Powered by Groq's inference engine
- **Generous limits** - Sufficient for development and personal projects
- **Multiple models** - Access to various AI models including Llama 3.1

## 📁 Project Structure

```
chatbot-project/
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── assets/            # Images and media files
│   │   ├── loading-spinner.gif
│   │   ├── profile-1.jpg
│   │   ├── robot.png
│   │   └── user.png
│   ├── components/        # React components
│   │   ├── ChatInput.jsx      # Input field and controls
│   │   ├── ChatInput.css
│   │   ├── ChatMessage.jsx    # Individual message component
│   │   ├── ChatMessage.css
│   │   ├── ChatMessages.jsx   # Messages container
│   │   └── ChatMessages.css
│   ├── services/          # API services
│   │   └── aiService.js        # Groq API integration
│   ├── App.jsx            # Main application component
│   ├── App.css            # Main application styles
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── .env                   # Environment variables (create this file)
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🎨 Customization

### Changing the AI Model

Edit `src/services/aiService.js` to change the model or adjust parameters:

```javascript
body: JSON.stringify({
  model: 'llama-3.1-8b-instant', // Change this to another model
  // Available models: 'llama-3.1-8b-instant', 'llama-3.1-70b-versatile', etc.
  temperature: 0.7, // Adjust creativity (0.0-1.0)
  max_tokens: 1024  // Maximum response length
})
```

### Customizing System Prompt

Edit the system message in `src/services/aiService.js`:

```javascript
{
  role: 'system',
  content: 'Your custom system prompt here'
}
```

### Styling

- Global styles: `src/index.css`
- App container styles: `src/App.css`
- Component-specific styles: `src/components/*.css`

### Changing Profile Images

Replace the images in `src/assets/`:
- `robot.png` - Bot profile image
- `profile-1.jpg` - User profile image
- `loading-spinner.gif` - Loading animation

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### "API key not found" Error

- Make sure you've created a `.env` file in the project root
- Verify the variable name is exactly `VITE_GROQ_API_KEY`
- Restart your development server after creating/modifying `.env`
- Ensure there are no spaces around the `=` sign in your `.env` file

### API Request Failed

- Check that your API key is valid and active
- Verify you have internet connectivity
- Check the Groq console for any rate limits or account issues
- Review the browser console for detailed error messages

### Messages Not Persisting

- Check browser localStorage is enabled
- Clear browser cache and try again
- Check browser console for any errors

## 📝 Notes

- Chat messages are stored in browser localStorage under the key `'messages'`
- The AI uses conversation context from previous messages for better responses
- All timestamps are formatted using `dayjs` (e.g., "3:45pm")
- The app uses React 19 with modern hooks and functional components
- Environment variables prefixed with `VITE_` are exposed to the client-side code
- Never commit your `.env` file to version control (it's already in `.gitignore`)

## 🔒 Security

- **Never commit your `.env` file** - It contains your API key
- The `.env` file is already included in `.gitignore`
- API keys are client-side in this implementation (for production, consider using a backend proxy)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using React, Vite, and Groq AI
