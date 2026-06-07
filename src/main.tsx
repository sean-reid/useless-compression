import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

console.log(
  '%c USE %cLOSSLESS COMPRESSION ',
  'background:#ff2ea5;color:#fff;font:bold 18px "Comic Sans MS";padding:4px;',
  'background:#000;color:#fffb00;font:bold 18px Impact;padding:4px;',
)
console.log('%cthere is nothing for you in the console.', 'font: 13px monospace; color:#888;')
console.log('%cnot true. there is greg.', 'font: 13px monospace; color:#ff2ea5;')
console.log('%csay hi back if you can hear this.', 'font: 13px monospace; color:#0a0a0a;')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
