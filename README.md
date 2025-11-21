# Chatbot Project

A modern, interactive chatbot application built with React and Vite. This project features a clean chat interface with persistent message history, predefined responses, and a smooth user experience.

## 🚀 Features

- **Interactive Chat Interface**: Clean and intuitive chat UI with user and bot messages
- **Message Persistence**: Chat history is automatically saved to localStorage and restored on page reload
- **Predefined Responses**: Intelligent chatbot with a variety of predefined responses to common questions
- **Loading States**: Visual feedback with a loading spinner while waiting for bot responses
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
- **supersimpledev** - Chatbot library for handling responses
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

## 🎯 Usage

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

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
│   ├── App.jsx            # Main application component
│   ├── App.css            # Main application styles
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🎨 Customization

### Adding New Chatbot Responses

Edit the `Chatbot.addResponses()` call in `src/App.jsx` to add or modify chatbot responses:

```javascript
Chatbot.addResponses({
  "Your question": "Your answer",
  // Add more responses here
});
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

## 📝 Notes

- Chat messages are stored in browser localStorage under the key `'messages'`
- The chatbot uses the `supersimpledev` library for response handling
- All timestamps are formatted using `dayjs` (e.g., "3:45pm")
- The app uses React 19 with modern hooks and functional components

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using React and Vite
