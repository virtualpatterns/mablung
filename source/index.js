// import IsNode from 'detect-node'
//
// let index = null
//
// if (IsNode) {
//
//   index = {
//     'FileSystem': require('./library/file-system'),
//     'Log': require('./library/log'),
//     'Path': require('./library/path'),
//     'Process': require('./library/process')
//   }
//
// } else {
//
//   index = {
//     'Log': require('./library/log')
//   }
//
// }
//
// export default index

import FileSystem from './library/file-system'
import Log from './library/log'
import Path from './library/path'
import Process from './library/process'

export { FileSystem, Log, Path, Process }
