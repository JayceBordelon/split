import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// initialize firestore
import "./firestore/initialize"

import "./styles/tailwind.css"

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
