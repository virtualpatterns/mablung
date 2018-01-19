// import Assert from 'assert'
//
// import FileSystem from '../../library/file-system'
// import Package from '../../../package.json'
// import Path from '../../library/path'
// import Process from '../../library/process'
//
// const FILE_PATH = Path.join(__dirname, '..', 'process', 'output', `${Package.name}.mocha.out`)
//
// describe('Path', () => {
//
//   before(() => {
//     FileSystem.mkdirp.sync(Path.dirname(FILE_PATH))
//   })
//
//   describe('isRelative', () => {
//
//     it('should return true', () => {
//       Assert.ok(Path.isRelative(`./process/output/${Package.name}.mocha.out`))
//     })
//
//     it('should return false', () => {
//       Assert.ok(!Path.isRelative(Process.env.HOME))
//     })
//
//   })
//
//   describe('trim', () => {
//
//     it('should replace the working directory with .', () => {
//       Assert.equal(Path.trim(FILE_PATH), `./process/output/${Package.name}.mocha.out`)
//     })
//
//   })
//
// })
"use strict";
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS90ZXN0cy9saWJyYXJ5L3BhdGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InBhdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgQXNzZXJ0IGZyb20gJ2Fzc2VydCdcbi8vXG4vLyBpbXBvcnQgRmlsZVN5c3RlbSBmcm9tICcuLi8uLi9saWJyYXJ5L2ZpbGUtc3lzdGVtJ1xuLy8gaW1wb3J0IFBhY2thZ2UgZnJvbSAnLi4vLi4vLi4vcGFja2FnZS5qc29uJ1xuLy8gaW1wb3J0IFBhdGggZnJvbSAnLi4vLi4vbGlicmFyeS9wYXRoJ1xuLy8gaW1wb3J0IFByb2Nlc3MgZnJvbSAnLi4vLi4vbGlicmFyeS9wcm9jZXNzJ1xuLy9cbi8vIGNvbnN0IEZJTEVfUEFUSCA9IFBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdwcm9jZXNzJywgJ291dHB1dCcsIGAke1BhY2thZ2UubmFtZX0ubW9jaGEub3V0YClcbi8vXG4vLyBkZXNjcmliZSgnUGF0aCcsICgpID0+IHtcbi8vXG4vLyAgIGJlZm9yZSgoKSA9PiB7XG4vLyAgICAgRmlsZVN5c3RlbS5ta2RpcnAuc3luYyhQYXRoLmRpcm5hbWUoRklMRV9QQVRIKSlcbi8vICAgfSlcbi8vXG4vLyAgIGRlc2NyaWJlKCdpc1JlbGF0aXZlJywgKCkgPT4ge1xuLy9cbi8vICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlJywgKCkgPT4ge1xuLy8gICAgICAgQXNzZXJ0Lm9rKFBhdGguaXNSZWxhdGl2ZShgLi9wcm9jZXNzL291dHB1dC8ke1BhY2thZ2UubmFtZX0ubW9jaGEub3V0YCkpXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UnLCAoKSA9PiB7XG4vLyAgICAgICBBc3NlcnQub2soIVBhdGguaXNSZWxhdGl2ZShQcm9jZXNzLmVudi5IT01FKSlcbi8vICAgICB9KVxuLy9cbi8vICAgfSlcbi8vXG4vLyAgIGRlc2NyaWJlKCd0cmltJywgKCkgPT4ge1xuLy9cbi8vICAgICBpdCgnc2hvdWxkIHJlcGxhY2UgdGhlIHdvcmtpbmcgZGlyZWN0b3J5IHdpdGggLicsICgpID0+IHtcbi8vICAgICAgIEFzc2VydC5lcXVhbChQYXRoLnRyaW0oRklMRV9QQVRIKSwgYC4vcHJvY2Vzcy9vdXRwdXQvJHtQYWNrYWdlLm5hbWV9Lm1vY2hhLm91dGApXG4vLyAgICAgfSlcbi8vXG4vLyAgIH0pXG4vL1xuLy8gfSlcbiJdfQ==