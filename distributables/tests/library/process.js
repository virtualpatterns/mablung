// import Assert from 'assert'
// import ChildProcess from 'child_process'
// import Sinon from 'sinon'
//
// import FileSystem from '../library/file-system'
// import Package from '../package.json'
// import Path from '../library/path'
// import Process from '../library/process'
//
// import ArgumentError from '../library/errors/argument-error'
//
// const LOGS_PATH = Path.join(__dirname, '..', 'process', 'logs')
// const PIDS_PATH = Path.join(__dirname, '..', 'process', 'pids')
//
// const PID_PATH = Path.join(PIDS_PATH, `${Package.name}.mocha.pid`)
//
// const MODULE_PATH = Path.join(__dirname, 'resources', 'process.killPID.js')
// const MODULE_LOG_PATH = Path.join(LOGS_PATH, 'process.killPID.log')
// const MODULE_PID_PATH = Path.join(PIDS_PATH, 'process.killPID.pid')
//
// describe('Process', () => {
//
//   before(() => {
//
//     FileSystem.mkdirp.sync(LOGS_PATH)
//     FileSystem.mkdirp.sync(PIDS_PATH)
//
//   })
//
//   describe('when', () => {
//
//     describe('(when a test succeeds)', () => {
//
//       it('should resolve the promise', (callback) => {
//         Process.when(250, 1000, (callback) => callback())
//           .then(() => callback())
//           .catch((error) => callback(error))
//       })
//
//     })
//
//     describe('(when a test fails)', () => {
//
//       it('should reject the promise', (callback) => {
//         Process.when(250, 1000, (callback) => callback(true))
//           .then(() => callback(new Error()))
//           .catch(() => callback())
//       })
//
//     })
//
//   })
//
//   describe('existsPID', () => {
//
//     describe('(return true)', () => {
//
//       describe('(when the file exists and contains a valid pid)', () => {
//
//         before((callback) => {
//
//           Promise.resolve()
//             .then(() => FileSystem.Promise.accessUnlink(PID_PATH, FileSystem.F_OK))
//             .then(() => {
//               return FileSystem.Promise.writeFile(PID_PATH, Process.pid, {
//                 encoding: 'utf-8'
//               })
//             })
//             .then(() => callback())
//             .catch((error) => callback(error))
//
//         })
//
//         it('should return true', () => {
//           Assert.equal(Process.existsPID(PID_PATH), true)
//         })
//
//         after((callback) => {
//           FileSystem.unlink(PID_PATH, callback)
//         })
//
//       })
//
//     })
//
//     describe('(return false)', () => {
//
//       describe('(when the file doesn\'t exist)', () => {
//
//         before((callback) => {
//           FileSystem.accessUnlink(PID_PATH, FileSystem.F_OK, callback)
//         })
//
//         it('should return false', () => {
//           Assert.equal(Process.existsPID(PID_PATH), false)
//         })
//
//       })
//
//       describe('(when the file exists and contains an invalid pid)', () => {
//
//         before((callback) => {
//
//           Promise.resolve()
//             .then(() => FileSystem.Promise.accessUnlink(PID_PATH, FileSystem.F_OK))
//             .then(() => FileSystem.Promise.writeFile(PID_PATH, 2^16, {
//               encoding: 'utf-8'
//             }))
//             .then(() => callback())
//             .catch((error) => callback(error))
//
//         })
//
//         it('should return false', () => {
//           Assert.equal(Process.existsPID(PID_PATH), false)
//         })
//
//       })
//
//       describe('(when the file contains an invalid pid)', () => {
//
//         before((callback) => {
//
//           Promise.resolve()
//             .then(() => FileSystem.Promise.accessUnlink(PID_PATH, FileSystem.F_OK))
//             .then(() => FileSystem.Promise.writeFile(PID_PATH, 2^16, {
//               encoding: 'utf-8'
//             }))
//             .then(() => Assert.equal(Process.existsPID(PID_PATH), false))
//             .then(() => callback())
//             .catch((error) => callback(error))
//
//         })
//
//         it('should delete the file', (callback) => {
//           FileSystem.access(PID_PATH, FileSystem.F_OK, (error) => {
//             if (error)
//               callback()
//             else
//               callback(new Error(`The file ${Path.trim(PID_PATH)} exists.`))
//           })
//         })
//
//       })
//
//     })
//
//   })
//
//   describe('createPID', () => {
//
//     describe('(call)', () => {
//
//       before(() => {
//         return Promise.resolve()
//           .then(() => {
//             Sinon.spy(Process, 'createPID')
//             Sinon.spy(Process, 'on')
//           })
//           .then(() => FileSystem.Promise.accessUnlink(PID_PATH, FileSystem.F_OK))
//           .then(() => Process.createPID(PID_PATH))
//       })
//
//       it('should call Process.on', () => {
//         Assert.ok(Process.on.calledOnce)
//       })
//
//       it('should call Process.on with arguments', () => {
//         Assert.ok(Process.on.calledWith('exit'))
//       })
//
//       it('should return Process', () => {
//         Assert.ok(Process.createPID.returned(Process))
//       })
//
//       after(() => {
//         return Promise.resolve()
//           .then(() => FileSystem.Promise.accessUnlink(PID_PATH, FileSystem.F_OK))
//           .then(() => {
//             Process.on.restore()
//             Process.createPID.restore()
//           })
//       })
//
//     })
//
//     describe('(parent process)', () => {
//
//       before((callback) => {
//
//         Promise.resolve()
//           .then(() => FileSystem.Promise.accessUnlink(PID_PATH, FileSystem.F_OK))
//           .then(() => Process.createPID(PID_PATH))
//           .then(() => callback())
//           .catch((error) => callback(error))
//
//       })
//
//       it('should create the file', (callback) => {
//         FileSystem.access(PID_PATH, FileSystem.F_OK, callback)
//       })
//
//       it('should create the file with a valid pid', () => {
//         FileSystem.readFile(PID_PATH, {
//           encoding: 'utf-8'
//         }, (pid) => Assert.equal(pid, Process.pid))
//       })
//
//       it('should fail if the file exists', () => {
//         Assert.throws(() => Process.createPID(PID_PATH), ArgumentError)
//       })
//
//     })
//
//     describe('(child process)', () => {
//
//       describe('(on fork)', () => {
//
//         let childProcess = null
//
//         before((callback) => {
//
//           Promise.resolve()
//             .then(() => FileSystem.Promise.accessUnlink(MODULE_PID_PATH, FileSystem.F_OK))
//             .then(() => {
//               childProcess = ChildProcess.fork(MODULE_PATH, [
//                 '--logPath',
//                 MODULE_LOG_PATH,
//                 '--pidPath',
//                 MODULE_PID_PATH
//               ], {
//                 'silent': true
//               })
//               // return Promise.resolve()
//             })
//             .then(() => callback())
//             .catch((error) => callback(error))
//
//         })
//
//         it('should create the file', (callback) => {
//           FileSystem.whenFileExists(250, 5000, MODULE_PID_PATH)
//             .then(() => callback())
//             .catch((error) => callback(error))
//         })
//
//         after((callback) => {
//
//           Promise.resolve()
//             .then(() => childProcess.send({}))
//             .then(() => FileSystem.whenFileNotExists(250, 10000, MODULE_PID_PATH))
//             .then(() => callback())
//             .catch((error) => callback(error))
//
//         })
//
//       })
//
//       describe('(on exit)', () => {
//
//         let childProcess = null
//
//         before((callback) => {
//
//           Promise.resolve()
//             .then(() => FileSystem.Promise.accessUnlink(MODULE_PID_PATH, FileSystem.F_OK))
//             .then(() => {
//               childProcess = ChildProcess.fork(MODULE_PATH, [
//                 '--logPath',
//                 MODULE_LOG_PATH,
//                 '--pidPath',
//                 MODULE_PID_PATH
//               ], {
//                 'silent': true
//               })
//               // return Promise.resolve()
//             })
//             .then(() => FileSystem.whenFileExists(250, 5000, MODULE_PID_PATH))
//             .then(() => childProcess.send({}))
//             .then(() => callback())
//             .catch((error) => callback(error))
//
//         })
//
//         it('should delete the file on exit', (callback) => {
//           FileSystem.whenFileNotExists(250, 10000, MODULE_PID_PATH)
//             .then(() => callback())
//             .catch((error) => callback(error))
//         })
//
//       })
//
//     })
//
//   })
//
//   describe('killPID', () => {
//
//     describe('(when the file exists and contains a valid pid)', () => {
//
//       before((callback) => {
//
//         Promise.resolve()
//           .then(() => FileSystem.Promise.accessUnlink(MODULE_PID_PATH, FileSystem.F_OK))
//           .then(() => {
//             ChildProcess.fork(MODULE_PATH, [
//               '--logPath',
//               MODULE_LOG_PATH,
//               '--pidPath',
//               MODULE_PID_PATH
//             ], {
//               'silent': true
//             })
//             // return Promise.resolve()
//           })
//           .then(() => FileSystem.whenFileExists(250, 5000, MODULE_PID_PATH))
//           .then(() => Process.killPID(MODULE_PID_PATH))
//           .then(() => callback())
//           .catch((error) => callback(error))
//
//       })
//
//       it('should delete the file', (callback) => {
//         FileSystem.whenFileNotExists(250, 10000, MODULE_PID_PATH)
//           .then(() => callback())
//           .catch((error) => callback(error))
//       })
//
//     })
//
//     describe('(when the file doesn\'t exist)', () => {
//
//       before((callback) => {
//         FileSystem.Promise.accessUnlink(MODULE_PID_PATH, FileSystem.F_OK)
//           .then(() => callback())
//           .catch((error) => callback(error))
//       })
//
//       it('should fail', () => {
//         Assert.throws(() => Process.killPID(MODULE_PID_PATH), ArgumentError)
//       })
//
//     })
//
//     describe('(when the file exists and contains an invalid pid)', () => {
//
//       before((callback) => {
//
//         Promise.resolve()
//           .then(() => FileSystem.Promise.accessUnlink(MODULE_PID_PATH, FileSystem.F_OK))
//           .then(() => FileSystem.Promise.writeFile(MODULE_PID_PATH, 2^16, {
//             encoding: 'utf-8'
//           }))
//           .then(() => callback())
//           .catch((error) => callback(error))
//
//       })
//
//       it('should fail', () => {
//         Assert.throws(() => Process.killPID(MODULE_PID_PATH), ArgumentError)
//       })
//
//     })
//
//   })
//
// })
"use strict";
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS90ZXN0cy9saWJyYXJ5L3Byb2Nlc3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoicHJvY2Vzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBBc3NlcnQgZnJvbSAnYXNzZXJ0J1xuLy8gaW1wb3J0IENoaWxkUHJvY2VzcyBmcm9tICdjaGlsZF9wcm9jZXNzJ1xuLy8gaW1wb3J0IFNpbm9uIGZyb20gJ3Npbm9uJ1xuLy9cbi8vIGltcG9ydCBGaWxlU3lzdGVtIGZyb20gJy4uL2xpYnJhcnkvZmlsZS1zeXN0ZW0nXG4vLyBpbXBvcnQgUGFja2FnZSBmcm9tICcuLi9wYWNrYWdlLmpzb24nXG4vLyBpbXBvcnQgUGF0aCBmcm9tICcuLi9saWJyYXJ5L3BhdGgnXG4vLyBpbXBvcnQgUHJvY2VzcyBmcm9tICcuLi9saWJyYXJ5L3Byb2Nlc3MnXG4vL1xuLy8gaW1wb3J0IEFyZ3VtZW50RXJyb3IgZnJvbSAnLi4vbGlicmFyeS9lcnJvcnMvYXJndW1lbnQtZXJyb3InXG4vL1xuLy8gY29uc3QgTE9HU19QQVRIID0gUGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ3Byb2Nlc3MnLCAnbG9ncycpXG4vLyBjb25zdCBQSURTX1BBVEggPSBQYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAncHJvY2VzcycsICdwaWRzJylcbi8vXG4vLyBjb25zdCBQSURfUEFUSCA9IFBhdGguam9pbihQSURTX1BBVEgsIGAke1BhY2thZ2UubmFtZX0ubW9jaGEucGlkYClcbi8vXG4vLyBjb25zdCBNT0RVTEVfUEFUSCA9IFBhdGguam9pbihfX2Rpcm5hbWUsICdyZXNvdXJjZXMnLCAncHJvY2Vzcy5raWxsUElELmpzJylcbi8vIGNvbnN0IE1PRFVMRV9MT0dfUEFUSCA9IFBhdGguam9pbihMT0dTX1BBVEgsICdwcm9jZXNzLmtpbGxQSUQubG9nJylcbi8vIGNvbnN0IE1PRFVMRV9QSURfUEFUSCA9IFBhdGguam9pbihQSURTX1BBVEgsICdwcm9jZXNzLmtpbGxQSUQucGlkJylcbi8vXG4vLyBkZXNjcmliZSgnUHJvY2VzcycsICgpID0+IHtcbi8vXG4vLyAgIGJlZm9yZSgoKSA9PiB7XG4vL1xuLy8gICAgIEZpbGVTeXN0ZW0ubWtkaXJwLnN5bmMoTE9HU19QQVRIKVxuLy8gICAgIEZpbGVTeXN0ZW0ubWtkaXJwLnN5bmMoUElEU19QQVRIKVxuLy9cbi8vICAgfSlcbi8vXG4vLyAgIGRlc2NyaWJlKCd3aGVuJywgKCkgPT4ge1xuLy9cbi8vICAgICBkZXNjcmliZSgnKHdoZW4gYSB0ZXN0IHN1Y2NlZWRzKScsICgpID0+IHtcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIHJlc29sdmUgdGhlIHByb21pc2UnLCAoY2FsbGJhY2spID0+IHtcbi8vICAgICAgICAgUHJvY2Vzcy53aGVuKDI1MCwgMTAwMCwgKGNhbGxiYWNrKSA9PiBjYWxsYmFjaygpKVxuLy8gICAgICAgICAgIC50aGVuKCgpID0+IGNhbGxiYWNrKCkpXG4vLyAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gY2FsbGJhY2soZXJyb3IpKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyh3aGVuIGEgdGVzdCBmYWlscyknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgaXQoJ3Nob3VsZCByZWplY3QgdGhlIHByb21pc2UnLCAoY2FsbGJhY2spID0+IHtcbi8vICAgICAgICAgUHJvY2Vzcy53aGVuKDI1MCwgMTAwMCwgKGNhbGxiYWNrKSA9PiBjYWxsYmFjayh0cnVlKSlcbi8vICAgICAgICAgICAudGhlbigoKSA9PiBjYWxsYmFjayhuZXcgRXJyb3IoKSkpXG4vLyAgICAgICAgICAgLmNhdGNoKCgpID0+IGNhbGxiYWNrKCkpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICB9KVxuLy9cbi8vICAgfSlcbi8vXG4vLyAgIGRlc2NyaWJlKCdleGlzdHNQSUQnLCAoKSA9PiB7XG4vL1xuLy8gICAgIGRlc2NyaWJlKCcocmV0dXJuIHRydWUpJywgKCkgPT4ge1xuLy9cbi8vICAgICAgIGRlc2NyaWJlKCcod2hlbiB0aGUgZmlsZSBleGlzdHMgYW5kIGNvbnRhaW5zIGEgdmFsaWQgcGlkKScsICgpID0+IHtcbi8vXG4vLyAgICAgICAgIGJlZm9yZSgoY2FsbGJhY2spID0+IHtcbi8vXG4vLyAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKClcbi8vICAgICAgICAgICAgIC50aGVuKCgpID0+IEZpbGVTeXN0ZW0uUHJvbWlzZS5hY2Nlc3NVbmxpbmsoUElEX1BBVEgsIEZpbGVTeXN0ZW0uRl9PSykpXG4vLyAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4vLyAgICAgICAgICAgICAgIHJldHVybiBGaWxlU3lzdGVtLlByb21pc2Uud3JpdGVGaWxlKFBJRF9QQVRILCBQcm9jZXNzLnBpZCwge1xuLy8gICAgICAgICAgICAgICAgIGVuY29kaW5nOiAndXRmLTgnXG4vLyAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgLnRoZW4oKCkgPT4gY2FsbGJhY2soKSlcbi8vICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGNhbGxiYWNrKGVycm9yKSlcbi8vXG4vLyAgICAgICAgIH0pXG4vL1xuLy8gICAgICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlJywgKCkgPT4ge1xuLy8gICAgICAgICAgIEFzc2VydC5lcXVhbChQcm9jZXNzLmV4aXN0c1BJRChQSURfUEFUSCksIHRydWUpXG4vLyAgICAgICAgIH0pXG4vL1xuLy8gICAgICAgICBhZnRlcigoY2FsbGJhY2spID0+IHtcbi8vICAgICAgICAgICBGaWxlU3lzdGVtLnVubGluayhQSURfUEFUSCwgY2FsbGJhY2spXG4vLyAgICAgICAgIH0pXG4vL1xuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyhyZXR1cm4gZmFsc2UpJywgKCkgPT4ge1xuLy9cbi8vICAgICAgIGRlc2NyaWJlKCcod2hlbiB0aGUgZmlsZSBkb2VzblxcJ3QgZXhpc3QpJywgKCkgPT4ge1xuLy9cbi8vICAgICAgICAgYmVmb3JlKChjYWxsYmFjaykgPT4ge1xuLy8gICAgICAgICAgIEZpbGVTeXN0ZW0uYWNjZXNzVW5saW5rKFBJRF9QQVRILCBGaWxlU3lzdGVtLkZfT0ssIGNhbGxiYWNrKVxuLy8gICAgICAgICB9KVxuLy9cbi8vICAgICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UnLCAoKSA9PiB7XG4vLyAgICAgICAgICAgQXNzZXJ0LmVxdWFsKFByb2Nlc3MuZXhpc3RzUElEKFBJRF9QQVRIKSwgZmFsc2UpXG4vLyAgICAgICAgIH0pXG4vL1xuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBkZXNjcmliZSgnKHdoZW4gdGhlIGZpbGUgZXhpc3RzIGFuZCBjb250YWlucyBhbiBpbnZhbGlkIHBpZCknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgICBiZWZvcmUoKGNhbGxiYWNrKSA9PiB7XG4vL1xuLy8gICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpXG4vLyAgICAgICAgICAgICAudGhlbigoKSA9PiBGaWxlU3lzdGVtLlByb21pc2UuYWNjZXNzVW5saW5rKFBJRF9QQVRILCBGaWxlU3lzdGVtLkZfT0spKVxuLy8gICAgICAgICAgICAgLnRoZW4oKCkgPT4gRmlsZVN5c3RlbS5Qcm9taXNlLndyaXRlRmlsZShQSURfUEFUSCwgMl4xNiwge1xuLy8gICAgICAgICAgICAgICBlbmNvZGluZzogJ3V0Zi04J1xuLy8gICAgICAgICAgICAgfSkpXG4vLyAgICAgICAgICAgICAudGhlbigoKSA9PiBjYWxsYmFjaygpKVxuLy8gICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gY2FsbGJhY2soZXJyb3IpKVxuLy9cbi8vICAgICAgICAgfSlcbi8vXG4vLyAgICAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlJywgKCkgPT4ge1xuLy8gICAgICAgICAgIEFzc2VydC5lcXVhbChQcm9jZXNzLmV4aXN0c1BJRChQSURfUEFUSCksIGZhbHNlKVxuLy8gICAgICAgICB9KVxuLy9cbi8vICAgICAgIH0pXG4vL1xuLy8gICAgICAgZGVzY3JpYmUoJyh3aGVuIHRoZSBmaWxlIGNvbnRhaW5zIGFuIGludmFsaWQgcGlkKScsICgpID0+IHtcbi8vXG4vLyAgICAgICAgIGJlZm9yZSgoY2FsbGJhY2spID0+IHtcbi8vXG4vLyAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKClcbi8vICAgICAgICAgICAgIC50aGVuKCgpID0+IEZpbGVTeXN0ZW0uUHJvbWlzZS5hY2Nlc3NVbmxpbmsoUElEX1BBVEgsIEZpbGVTeXN0ZW0uRl9PSykpXG4vLyAgICAgICAgICAgICAudGhlbigoKSA9PiBGaWxlU3lzdGVtLlByb21pc2Uud3JpdGVGaWxlKFBJRF9QQVRILCAyXjE2LCB7XG4vLyAgICAgICAgICAgICAgIGVuY29kaW5nOiAndXRmLTgnXG4vLyAgICAgICAgICAgICB9KSlcbi8vICAgICAgICAgICAgIC50aGVuKCgpID0+IEFzc2VydC5lcXVhbChQcm9jZXNzLmV4aXN0c1BJRChQSURfUEFUSCksIGZhbHNlKSlcbi8vICAgICAgICAgICAgIC50aGVuKCgpID0+IGNhbGxiYWNrKCkpXG4vLyAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBjYWxsYmFjayhlcnJvcikpXG4vL1xuLy8gICAgICAgICB9KVxuLy9cbi8vICAgICAgICAgaXQoJ3Nob3VsZCBkZWxldGUgdGhlIGZpbGUnLCAoY2FsbGJhY2spID0+IHtcbi8vICAgICAgICAgICBGaWxlU3lzdGVtLmFjY2VzcyhQSURfUEFUSCwgRmlsZVN5c3RlbS5GX09LLCAoZXJyb3IpID0+IHtcbi8vICAgICAgICAgICAgIGlmIChlcnJvcilcbi8vICAgICAgICAgICAgICAgY2FsbGJhY2soKVxuLy8gICAgICAgICAgICAgZWxzZVxuLy8gICAgICAgICAgICAgICBjYWxsYmFjayhuZXcgRXJyb3IoYFRoZSBmaWxlICR7UGF0aC50cmltKFBJRF9QQVRIKX0gZXhpc3RzLmApKVxuLy8gICAgICAgICAgIH0pXG4vLyAgICAgICAgIH0pXG4vL1xuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgIH0pXG4vL1xuLy8gICBkZXNjcmliZSgnY3JlYXRlUElEJywgKCkgPT4ge1xuLy9cbi8vICAgICBkZXNjcmliZSgnKGNhbGwpJywgKCkgPT4ge1xuLy9cbi8vICAgICAgIGJlZm9yZSgoKSA9PiB7XG4vLyAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuLy8gICAgICAgICAgIC50aGVuKCgpID0+IHtcbi8vICAgICAgICAgICAgIFNpbm9uLnNweShQcm9jZXNzLCAnY3JlYXRlUElEJylcbi8vICAgICAgICAgICAgIFNpbm9uLnNweShQcm9jZXNzLCAnb24nKVxuLy8gICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgLnRoZW4oKCkgPT4gRmlsZVN5c3RlbS5Qcm9taXNlLmFjY2Vzc1VubGluayhQSURfUEFUSCwgRmlsZVN5c3RlbS5GX09LKSlcbi8vICAgICAgICAgICAudGhlbigoKSA9PiBQcm9jZXNzLmNyZWF0ZVBJRChQSURfUEFUSCkpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICAgIGl0KCdzaG91bGQgY2FsbCBQcm9jZXNzLm9uJywgKCkgPT4ge1xuLy8gICAgICAgICBBc3NlcnQub2soUHJvY2Vzcy5vbi5jYWxsZWRPbmNlKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIGNhbGwgUHJvY2Vzcy5vbiB3aXRoIGFyZ3VtZW50cycsICgpID0+IHtcbi8vICAgICAgICAgQXNzZXJ0Lm9rKFByb2Nlc3Mub24uY2FsbGVkV2l0aCgnZXhpdCcpKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIHJldHVybiBQcm9jZXNzJywgKCkgPT4ge1xuLy8gICAgICAgICBBc3NlcnQub2soUHJvY2Vzcy5jcmVhdGVQSUQucmV0dXJuZWQoUHJvY2VzcykpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICAgIGFmdGVyKCgpID0+IHtcbi8vICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4vLyAgICAgICAgICAgLnRoZW4oKCkgPT4gRmlsZVN5c3RlbS5Qcm9taXNlLmFjY2Vzc1VubGluayhQSURfUEFUSCwgRmlsZVN5c3RlbS5GX09LKSlcbi8vICAgICAgICAgICAudGhlbigoKSA9PiB7XG4vLyAgICAgICAgICAgICBQcm9jZXNzLm9uLnJlc3RvcmUoKVxuLy8gICAgICAgICAgICAgUHJvY2Vzcy5jcmVhdGVQSUQucmVzdG9yZSgpXG4vLyAgICAgICAgICAgfSlcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgIH0pXG4vL1xuLy8gICAgIGRlc2NyaWJlKCcocGFyZW50IHByb2Nlc3MpJywgKCkgPT4ge1xuLy9cbi8vICAgICAgIGJlZm9yZSgoY2FsbGJhY2spID0+IHtcbi8vXG4vLyAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpXG4vLyAgICAgICAgICAgLnRoZW4oKCkgPT4gRmlsZVN5c3RlbS5Qcm9taXNlLmFjY2Vzc1VubGluayhQSURfUEFUSCwgRmlsZVN5c3RlbS5GX09LKSlcbi8vICAgICAgICAgICAudGhlbigoKSA9PiBQcm9jZXNzLmNyZWF0ZVBJRChQSURfUEFUSCkpXG4vLyAgICAgICAgICAgLnRoZW4oKCkgPT4gY2FsbGJhY2soKSlcbi8vICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBjYWxsYmFjayhlcnJvcikpXG4vL1xuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSB0aGUgZmlsZScsIChjYWxsYmFjaykgPT4ge1xuLy8gICAgICAgICBGaWxlU3lzdGVtLmFjY2VzcyhQSURfUEFUSCwgRmlsZVN5c3RlbS5GX09LLCBjYWxsYmFjaylcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgICAgaXQoJ3Nob3VsZCBjcmVhdGUgdGhlIGZpbGUgd2l0aCBhIHZhbGlkIHBpZCcsICgpID0+IHtcbi8vICAgICAgICAgRmlsZVN5c3RlbS5yZWFkRmlsZShQSURfUEFUSCwge1xuLy8gICAgICAgICAgIGVuY29kaW5nOiAndXRmLTgnXG4vLyAgICAgICAgIH0sIChwaWQpID0+IEFzc2VydC5lcXVhbChwaWQsIFByb2Nlc3MucGlkKSlcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHRoZSBmaWxlIGV4aXN0cycsICgpID0+IHtcbi8vICAgICAgICAgQXNzZXJ0LnRocm93cygoKSA9PiBQcm9jZXNzLmNyZWF0ZVBJRChQSURfUEFUSCksIEFyZ3VtZW50RXJyb3IpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICB9KVxuLy9cbi8vICAgICBkZXNjcmliZSgnKGNoaWxkIHByb2Nlc3MpJywgKCkgPT4ge1xuLy9cbi8vICAgICAgIGRlc2NyaWJlKCcob24gZm9yayknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgICBsZXQgY2hpbGRQcm9jZXNzID0gbnVsbFxuLy9cbi8vICAgICAgICAgYmVmb3JlKChjYWxsYmFjaykgPT4ge1xuLy9cbi8vICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKVxuLy8gICAgICAgICAgICAgLnRoZW4oKCkgPT4gRmlsZVN5c3RlbS5Qcm9taXNlLmFjY2Vzc1VubGluayhNT0RVTEVfUElEX1BBVEgsIEZpbGVTeXN0ZW0uRl9PSykpXG4vLyAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4vLyAgICAgICAgICAgICAgIGNoaWxkUHJvY2VzcyA9IENoaWxkUHJvY2Vzcy5mb3JrKE1PRFVMRV9QQVRILCBbXG4vLyAgICAgICAgICAgICAgICAgJy0tbG9nUGF0aCcsXG4vLyAgICAgICAgICAgICAgICAgTU9EVUxFX0xPR19QQVRILFxuLy8gICAgICAgICAgICAgICAgICctLXBpZFBhdGgnLFxuLy8gICAgICAgICAgICAgICAgIE1PRFVMRV9QSURfUEFUSFxuLy8gICAgICAgICAgICAgICBdLCB7XG4vLyAgICAgICAgICAgICAgICAgJ3NpbGVudCc6IHRydWVcbi8vICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgLy8gcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgLnRoZW4oKCkgPT4gY2FsbGJhY2soKSlcbi8vICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGNhbGxiYWNrKGVycm9yKSlcbi8vXG4vLyAgICAgICAgIH0pXG4vL1xuLy8gICAgICAgICBpdCgnc2hvdWxkIGNyZWF0ZSB0aGUgZmlsZScsIChjYWxsYmFjaykgPT4ge1xuLy8gICAgICAgICAgIEZpbGVTeXN0ZW0ud2hlbkZpbGVFeGlzdHMoMjUwLCA1MDAwLCBNT0RVTEVfUElEX1BBVEgpXG4vLyAgICAgICAgICAgICAudGhlbigoKSA9PiBjYWxsYmFjaygpKVxuLy8gICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gY2FsbGJhY2soZXJyb3IpKVxuLy8gICAgICAgICB9KVxuLy9cbi8vICAgICAgICAgYWZ0ZXIoKGNhbGxiYWNrKSA9PiB7XG4vL1xuLy8gICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpXG4vLyAgICAgICAgICAgICAudGhlbigoKSA9PiBjaGlsZFByb2Nlc3Muc2VuZCh7fSkpXG4vLyAgICAgICAgICAgICAudGhlbigoKSA9PiBGaWxlU3lzdGVtLndoZW5GaWxlTm90RXhpc3RzKDI1MCwgMTAwMDAsIE1PRFVMRV9QSURfUEFUSCkpXG4vLyAgICAgICAgICAgICAudGhlbigoKSA9PiBjYWxsYmFjaygpKVxuLy8gICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gY2FsbGJhY2soZXJyb3IpKVxuLy9cbi8vICAgICAgICAgfSlcbi8vXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICAgIGRlc2NyaWJlKCcob24gZXhpdCknLCAoKSA9PiB7XG4vL1xuLy8gICAgICAgICBsZXQgY2hpbGRQcm9jZXNzID0gbnVsbFxuLy9cbi8vICAgICAgICAgYmVmb3JlKChjYWxsYmFjaykgPT4ge1xuLy9cbi8vICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKVxuLy8gICAgICAgICAgICAgLnRoZW4oKCkgPT4gRmlsZVN5c3RlbS5Qcm9taXNlLmFjY2Vzc1VubGluayhNT0RVTEVfUElEX1BBVEgsIEZpbGVTeXN0ZW0uRl9PSykpXG4vLyAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4vLyAgICAgICAgICAgICAgIGNoaWxkUHJvY2VzcyA9IENoaWxkUHJvY2Vzcy5mb3JrKE1PRFVMRV9QQVRILCBbXG4vLyAgICAgICAgICAgICAgICAgJy0tbG9nUGF0aCcsXG4vLyAgICAgICAgICAgICAgICAgTU9EVUxFX0xPR19QQVRILFxuLy8gICAgICAgICAgICAgICAgICctLXBpZFBhdGgnLFxuLy8gICAgICAgICAgICAgICAgIE1PRFVMRV9QSURfUEFUSFxuLy8gICAgICAgICAgICAgICBdLCB7XG4vLyAgICAgICAgICAgICAgICAgJ3NpbGVudCc6IHRydWVcbi8vICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgLy8gcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgLnRoZW4oKCkgPT4gRmlsZVN5c3RlbS53aGVuRmlsZUV4aXN0cygyNTAsIDUwMDAsIE1PRFVMRV9QSURfUEFUSCkpXG4vLyAgICAgICAgICAgICAudGhlbigoKSA9PiBjaGlsZFByb2Nlc3Muc2VuZCh7fSkpXG4vLyAgICAgICAgICAgICAudGhlbigoKSA9PiBjYWxsYmFjaygpKVxuLy8gICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gY2FsbGJhY2soZXJyb3IpKVxuLy9cbi8vICAgICAgICAgfSlcbi8vXG4vLyAgICAgICAgIGl0KCdzaG91bGQgZGVsZXRlIHRoZSBmaWxlIG9uIGV4aXQnLCAoY2FsbGJhY2spID0+IHtcbi8vICAgICAgICAgICBGaWxlU3lzdGVtLndoZW5GaWxlTm90RXhpc3RzKDI1MCwgMTAwMDAsIE1PRFVMRV9QSURfUEFUSClcbi8vICAgICAgICAgICAgIC50aGVuKCgpID0+IGNhbGxiYWNrKCkpXG4vLyAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBjYWxsYmFjayhlcnJvcikpXG4vLyAgICAgICAgIH0pXG4vL1xuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgIH0pXG4vL1xuLy8gICBkZXNjcmliZSgna2lsbFBJRCcsICgpID0+IHtcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyh3aGVuIHRoZSBmaWxlIGV4aXN0cyBhbmQgY29udGFpbnMgYSB2YWxpZCBwaWQpJywgKCkgPT4ge1xuLy9cbi8vICAgICAgIGJlZm9yZSgoY2FsbGJhY2spID0+IHtcbi8vXG4vLyAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpXG4vLyAgICAgICAgICAgLnRoZW4oKCkgPT4gRmlsZVN5c3RlbS5Qcm9taXNlLmFjY2Vzc1VubGluayhNT0RVTEVfUElEX1BBVEgsIEZpbGVTeXN0ZW0uRl9PSykpXG4vLyAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuLy8gICAgICAgICAgICAgQ2hpbGRQcm9jZXNzLmZvcmsoTU9EVUxFX1BBVEgsIFtcbi8vICAgICAgICAgICAgICAgJy0tbG9nUGF0aCcsXG4vLyAgICAgICAgICAgICAgIE1PRFVMRV9MT0dfUEFUSCxcbi8vICAgICAgICAgICAgICAgJy0tcGlkUGF0aCcsXG4vLyAgICAgICAgICAgICAgIE1PRFVMRV9QSURfUEFUSFxuLy8gICAgICAgICAgICAgXSwge1xuLy8gICAgICAgICAgICAgICAnc2lsZW50JzogdHJ1ZVxuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC8vIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuLy8gICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgLnRoZW4oKCkgPT4gRmlsZVN5c3RlbS53aGVuRmlsZUV4aXN0cygyNTAsIDUwMDAsIE1PRFVMRV9QSURfUEFUSCkpXG4vLyAgICAgICAgICAgLnRoZW4oKCkgPT4gUHJvY2Vzcy5raWxsUElEKE1PRFVMRV9QSURfUEFUSCkpXG4vLyAgICAgICAgICAgLnRoZW4oKCkgPT4gY2FsbGJhY2soKSlcbi8vICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBjYWxsYmFjayhlcnJvcikpXG4vL1xuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIGRlbGV0ZSB0aGUgZmlsZScsIChjYWxsYmFjaykgPT4ge1xuLy8gICAgICAgICBGaWxlU3lzdGVtLndoZW5GaWxlTm90RXhpc3RzKDI1MCwgMTAwMDAsIE1PRFVMRV9QSURfUEFUSClcbi8vICAgICAgICAgICAudGhlbigoKSA9PiBjYWxsYmFjaygpKVxuLy8gICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGNhbGxiYWNrKGVycm9yKSlcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgIH0pXG4vL1xuLy8gICAgIGRlc2NyaWJlKCcod2hlbiB0aGUgZmlsZSBkb2VzblxcJ3QgZXhpc3QpJywgKCkgPT4ge1xuLy9cbi8vICAgICAgIGJlZm9yZSgoY2FsbGJhY2spID0+IHtcbi8vICAgICAgICAgRmlsZVN5c3RlbS5Qcm9taXNlLmFjY2Vzc1VubGluayhNT0RVTEVfUElEX1BBVEgsIEZpbGVTeXN0ZW0uRl9PSylcbi8vICAgICAgICAgICAudGhlbigoKSA9PiBjYWxsYmFjaygpKVxuLy8gICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGNhbGxiYWNrKGVycm9yKSlcbi8vICAgICAgIH0pXG4vL1xuLy8gICAgICAgaXQoJ3Nob3VsZCBmYWlsJywgKCkgPT4ge1xuLy8gICAgICAgICBBc3NlcnQudGhyb3dzKCgpID0+IFByb2Nlc3Mua2lsbFBJRChNT0RVTEVfUElEX1BBVEgpLCBBcmd1bWVudEVycm9yKVxuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgZGVzY3JpYmUoJyh3aGVuIHRoZSBmaWxlIGV4aXN0cyBhbmQgY29udGFpbnMgYW4gaW52YWxpZCBwaWQpJywgKCkgPT4ge1xuLy9cbi8vICAgICAgIGJlZm9yZSgoY2FsbGJhY2spID0+IHtcbi8vXG4vLyAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpXG4vLyAgICAgICAgICAgLnRoZW4oKCkgPT4gRmlsZVN5c3RlbS5Qcm9taXNlLmFjY2Vzc1VubGluayhNT0RVTEVfUElEX1BBVEgsIEZpbGVTeXN0ZW0uRl9PSykpXG4vLyAgICAgICAgICAgLnRoZW4oKCkgPT4gRmlsZVN5c3RlbS5Qcm9taXNlLndyaXRlRmlsZShNT0RVTEVfUElEX1BBVEgsIDJeMTYsIHtcbi8vICAgICAgICAgICAgIGVuY29kaW5nOiAndXRmLTgnXG4vLyAgICAgICAgICAgfSkpXG4vLyAgICAgICAgICAgLnRoZW4oKCkgPT4gY2FsbGJhY2soKSlcbi8vICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBjYWxsYmFjayhlcnJvcikpXG4vL1xuLy8gICAgICAgfSlcbi8vXG4vLyAgICAgICBpdCgnc2hvdWxkIGZhaWwnLCAoKSA9PiB7XG4vLyAgICAgICAgIEFzc2VydC50aHJvd3MoKCkgPT4gUHJvY2Vzcy5raWxsUElEKE1PRFVMRV9QSURfUEFUSCksIEFyZ3VtZW50RXJyb3IpXG4vLyAgICAgICB9KVxuLy9cbi8vICAgICB9KVxuLy9cbi8vICAgfSlcbi8vXG4vLyB9KVxuIl19