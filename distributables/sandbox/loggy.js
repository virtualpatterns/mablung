'use strict';

require('babel-polyfill');

var _index = require('../index');

// import { Log, Process } from '../index'

// Log.createLog({ 'level': 'trace', 'messageKey': 'babo' })
_index.Log.createFormattedLog({ 'level': 'trace' });
// Log.createFormattedLog({ 'level': 'trace', 'prettyPrint': true })
// Log.createFormattedLog({ 'level': 'trace', 'messageKey': 'babo', 'prettyPrint': { 'messageKey': 'babo' } })
// Log.createFormattedLog(`${Process.env.HOME}/Library/Logs/mablung/mablung.loggy.log`)
// Log.createFormattedLog({ 'level': 'trace', 'prettyPrint': true }, `${Process.env.HOME}/Library/Logs/mablung/mablung.loggy.log`)

// Log.error(new Error('Error'))
// Log.info(Log.levels.values, 'Info')
// Log.debug('Debug')
_index.Log.trace('Trace');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9zYW5kYm94L2xvZ2d5LmpzIl0sIm5hbWVzIjpbImNyZWF0ZUZvcm1hdHRlZExvZyIsInRyYWNlIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBOztBQUNBOztBQUVBO0FBQ0EsV0FBSUEsa0JBQUosQ0FBdUIsRUFBRSxTQUFTLE9BQVgsRUFBdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFJQyxLQUFKLENBQVUsT0FBViIsImZpbGUiOiJsb2dneS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYmFiZWwtcG9seWZpbGwnXG5cbmltcG9ydCB7IExvZyB9IGZyb20gJy4uL2luZGV4J1xuLy8gaW1wb3J0IHsgTG9nLCBQcm9jZXNzIH0gZnJvbSAnLi4vaW5kZXgnXG5cbi8vIExvZy5jcmVhdGVMb2coeyAnbGV2ZWwnOiAndHJhY2UnLCAnbWVzc2FnZUtleSc6ICdiYWJvJyB9KVxuTG9nLmNyZWF0ZUZvcm1hdHRlZExvZyh7ICdsZXZlbCc6ICd0cmFjZScgfSlcbi8vIExvZy5jcmVhdGVGb3JtYXR0ZWRMb2coeyAnbGV2ZWwnOiAndHJhY2UnLCAncHJldHR5UHJpbnQnOiB0cnVlIH0pXG4vLyBMb2cuY3JlYXRlRm9ybWF0dGVkTG9nKHsgJ2xldmVsJzogJ3RyYWNlJywgJ21lc3NhZ2VLZXknOiAnYmFibycsICdwcmV0dHlQcmludCc6IHsgJ21lc3NhZ2VLZXknOiAnYmFibycgfSB9KVxuLy8gTG9nLmNyZWF0ZUZvcm1hdHRlZExvZyhgJHtQcm9jZXNzLmVudi5IT01FfS9MaWJyYXJ5L0xvZ3MvbWFibHVuZy9tYWJsdW5nLmxvZ2d5LmxvZ2ApXG4vLyBMb2cuY3JlYXRlRm9ybWF0dGVkTG9nKHsgJ2xldmVsJzogJ3RyYWNlJywgJ3ByZXR0eVByaW50JzogdHJ1ZSB9LCBgJHtQcm9jZXNzLmVudi5IT01FfS9MaWJyYXJ5L0xvZ3MvbWFibHVuZy9tYWJsdW5nLmxvZ2d5LmxvZ2ApXG5cbi8vIExvZy5lcnJvcihuZXcgRXJyb3IoJ0Vycm9yJykpXG4vLyBMb2cuaW5mbyhMb2cubGV2ZWxzLnZhbHVlcywgJ0luZm8nKVxuLy8gTG9nLmRlYnVnKCdEZWJ1ZycpXG5Mb2cudHJhY2UoJ1RyYWNlJylcbiJdfQ==