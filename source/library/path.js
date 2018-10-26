import _Path from 'path'
import IsRelative from 'is-relative'

const Process = process

const Path = Object.create(_Path)

Path.isRelative = function(path) {
  return IsRelative(path)
}

Path.trim = function (path) {
  return Process.cwd() == '/' ? path : path.replace(Process.cwd(), '.')
}

export default Path
