import { Log } from '../../index'

document.addEventListener('DOMContentLoaded', () => {
  Log.createFormattedLog({ 'level': 'trace' })
  Log.trace('document.addEventListener(\'DOMContentLoaded\', () => { ... }')
})
