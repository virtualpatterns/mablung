'use strict';

// import { Path } from './index'
// import WebPack from 'webpack'

module.exports = {
  'entry': __dirname + '/www/scripts/index.js',
  'node': {
    'fs': 'mock',
    'process': 'mock'
  },
  'output': {
    'path': __dirname + '/www/bundles',
    'filename': 'index.js'
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS93ZWJwYWNrLmNvbmZpZ3VyYXRpb24uanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIl9fZGlybmFtZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2YsV0FBWUMsU0FBWiwwQkFEZTtBQUVmLFVBQVE7QUFDTixVQUFNLE1BREE7QUFFTixlQUFXO0FBRkwsR0FGTztBQU1mLFlBQVU7QUFDUixZQUFXQSxTQUFYLGlCQURRO0FBRVIsZ0JBQVk7QUFGSjtBQU5LLENBQWpCIiwiZmlsZSI6IndlYnBhY2suY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IFBhdGggfSBmcm9tICcuL2luZGV4J1xuLy8gaW1wb3J0IFdlYlBhY2sgZnJvbSAnd2VicGFjaydcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICdlbnRyeSc6IGAke19fZGlybmFtZX0vd3d3L3NjcmlwdHMvaW5kZXguanNgLFxuICAnbm9kZSc6IHtcbiAgICAnZnMnOiAnbW9jaycsXG4gICAgJ3Byb2Nlc3MnOiAnbW9jaydcbiAgfSxcbiAgJ291dHB1dCc6IHtcbiAgICAncGF0aCc6IGAke19fZGlybmFtZX0vd3d3L2J1bmRsZXNgLFxuICAgICdmaWxlbmFtZSc6ICdpbmRleC5qcydcbiAgfVxufVxuIl19