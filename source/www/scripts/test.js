const Mocha = mocha

document.addEventListener('DOMContentLoaded', () => {

  if (window.initMochaPhantomJS) {
    window.initMochaPhantomJS()
  }

  Mocha.setup({
    'bail': true,
    'timeout': 0,
    'ui': 'bdd'
  })

  require('./tests/log')

  Mocha.run()

})
