import 'babel-polyfill'
import Puppeteer from 'puppeteer'

import Configuration from '../configuration'

(async () => {

  try {

    let browser = null
    browser = await Puppeteer.launch({ 'devtools': true })

    try {

      let page = null
      page = await browser.newPage()

      await page.goto(`${Configuration.tests.serverUrl}/www/index.html`)
      await page.screenshot({ path: Configuration.tests.screenshotPath })

      await page.waitForFunction(() => false, { 'timeout': 20 * 60 * 1000 })

    } finally {
      await browser.close()
    }

  } catch (error) {
    console.log(error)
  }

})()
