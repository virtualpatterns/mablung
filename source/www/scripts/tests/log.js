import Log from '../../../library/log'

describe('Log', () => {

  it('should output to console/debug', () => {
    Log.debug('- it(\'should output to console/debug ...\', () => { ... }')
  })

  it('should output to console/errors', () => {
    Log.error('- it(\'should output to console/errors ...\', () => { ... }')
  })

  it('should output to console/info', () => {
    Log.info('- it(\'should output to console/info ...\', () => { ... }')
  })

  it('should output to console/logs', () => {
    Log.log('LOG', '- it(\'should output to console/logs ...\', () => { ... }')
  })

  it('should output to console/warnings', () => {
    Log.warn('- it(\'should output to console/warnings ...\', () => { ... }')
  })

})
