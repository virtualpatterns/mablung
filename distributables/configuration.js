'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  'process': {
    'logPath': process.env.HOME + '/Library/Logs/mablung/mablung-process.log',
    'pidPath': process.env.HOME + '/Library/Logs/mablung/mablung-process.pid',
    'timeouts': {
      'exit': 5000,
      'wait': 15000
    }
  },

  'server': {
    'address': '0.0.0.0',
    'logPath': process.env.HOME + '/Library/Logs/mablung/mablung-server.log',
    'port': 8080
  },

  'tests': {
    'logPath': process.env.HOME + '/Library/Logs/mablung/mablung-tests.log'
  }

};

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9jb25maWd1cmF0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUFlOztBQUViLGFBQVc7QUFDVCxlQUFjLFFBQVEsR0FBUixDQUFZLElBQTFCLDhDQURTO0FBRVQsZUFBYyxRQUFRLEdBQVIsQ0FBWSxJQUExQiw4Q0FGUztBQUdULGdCQUFZO0FBQ1YsY0FBUSxJQURFO0FBRVYsY0FBUTtBQUZFO0FBSEgsR0FGRTs7QUFXYixZQUFVO0FBQ1IsZUFBVyxTQURIO0FBRVIsZUFBYyxRQUFRLEdBQVIsQ0FBWSxJQUExQiw2Q0FGUTtBQUdSLFlBQVE7QUFIQSxHQVhHOztBQWlCYixXQUFTO0FBQ1AsZUFBYyxRQUFRLEdBQVIsQ0FBWSxJQUExQjtBQURPOztBQWpCSSxDIiwiZmlsZSI6ImNvbmZpZ3VyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG5cbiAgJ3Byb2Nlc3MnOiB7XG4gICAgJ2xvZ1BhdGgnOiBgJHtwcm9jZXNzLmVudi5IT01FfS9MaWJyYXJ5L0xvZ3MvbWFibHVuZy9tYWJsdW5nLXByb2Nlc3MubG9nYCxcbiAgICAncGlkUGF0aCc6IGAke3Byb2Nlc3MuZW52LkhPTUV9L0xpYnJhcnkvTG9ncy9tYWJsdW5nL21hYmx1bmctcHJvY2Vzcy5waWRgLFxuICAgICd0aW1lb3V0cyc6IHtcbiAgICAgICdleGl0JzogNTAwMCxcbiAgICAgICd3YWl0JzogMTUwMDBcbiAgICB9XG4gIH0sXG5cbiAgJ3NlcnZlcic6IHtcbiAgICAnYWRkcmVzcyc6ICcwLjAuMC4wJyxcbiAgICAnbG9nUGF0aCc6IGAke3Byb2Nlc3MuZW52LkhPTUV9L0xpYnJhcnkvTG9ncy9tYWJsdW5nL21hYmx1bmctc2VydmVyLmxvZ2AsXG4gICAgJ3BvcnQnOiA4MDgwXG4gIH0sXG5cbiAgJ3Rlc3RzJzoge1xuICAgICdsb2dQYXRoJzogYCR7cHJvY2Vzcy5lbnYuSE9NRX0vTGlicmFyeS9Mb2dzL21hYmx1bmcvbWFibHVuZy10ZXN0cy5sb2dgXG4gIH1cblxufVxuIl19