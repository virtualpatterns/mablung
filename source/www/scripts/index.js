import { Log } from '../../index'

document.addEventListener('DOMContentLoaded', () => {
  Log.createFormattedLog()
  Log.debug({ 'yes': true }, 'document.addEventListener(\'DOMContentLoaded\', () => { ... }')
  Log.error({ 'yes': true }, new Error('Bogo!'))
  Log.trace()
})
