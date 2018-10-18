import REST from 'restify'

import Configuration from '../configuration'
import { Log } from '../index'
import Path from '../library/path'

Log.createFormattedLog(Configuration.server.logPath)

Log.debug({ 'Configuration': Configuration })

const server = REST.createServer()

server.on('restifyError', (request, response, error, callback) => {
  Log.error('server.on(\'restifyError\', (request, response, error, callback) => { ... })')
  Log.error(error)
  return callback()
})

server.use((request, response, next) => {
  Log.debug(`${request.method} ${request.url}`)
  return next()
})

server.get('/favicon.ico', (request, response, next) => {
  REST.plugins.serveStatic({
    'directory': Path.join(__dirname, '..', 'www', 'resources'),
    'file': 'application.ico',
    'maxAge': 0
  })(request, response, next)
})

server.get('/', (request, response, next) => {
  response.redirect('/www/index.html', next)
})

server.get('/www', (request, response, next) => {
  response.redirect('/www/index.html', next)
})

server.get('/www/*', (request, response, next) => {
  REST.plugins.serveStatic({
    'directory': Path.join(__dirname, '..'),
    'maxAge': 0
  })(request, response, next)

})

server.listen(Configuration.server.port, Configuration.server.address, () => {
  Log.debug(`server.listen(${Configuration.server.port}, '${Configuration.server.address}', () => { ... })`)
  console.log(`Listening at http://${Configuration.server.address}:${Configuration.server.port} ...`) // eslint-disable-line no-console
})
