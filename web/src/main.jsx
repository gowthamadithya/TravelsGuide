import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { StoreProvider } from './Store/Store.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
    {/* <StoreProvider passedDownElements={<App />} /> */}
  </StrictMode>,
)
