import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./app.js";

const rootElement = document.getElementById('root'); // Get the root element from your HTML

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />); // Render your React app component
} else {
  console.error('Root element not found!');
}

console.log('index.tsx');
