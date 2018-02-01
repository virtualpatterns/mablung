import Is from '@pwn/is'
import Puppeteer from 'puppeteer'

const Page = Object.create({})

Page.evaluateConsole = function (fn, ...parameters) {

  let _function = fn
  let _parameters = parameters

  let count = _parameters.length > 0 ? _parameters[_parameters.length - 1] : null

  if (Is.number(count)) {
    _parameters = _parameters.length - 1 > 0 ? _parameters.slice(0, _parameters.length - 1) : []
  } else {
    count = 1
  }

  let messages = []

  return new Promise(async (resolve, reject) => {

    let page = Object.getPrototypeOf(Page)
    let onConsole = null

    try {

      page.on('console', onConsole = async (message) => {

        let [ handle ] = message.args()
        messages.push(await handle.jsonValue())

        if (messages.length >= count) {
          page.removeListener('console', onConsole)
          resolve(messages)
        }

      })

      await page.evaluate.apply(page, [_function, ..._parameters])

    } catch (error) {
      reject(error)
    }

  })

}

const Browser = Object.create({})

Browser.open = async function (url, options) {

  let browser = await Puppeteer.launch(options)
  let [ page ] = await browser.pages()

  page.on('pageerror', (error) => {
    console.log(`\nAn error occurred opening the page at ${url} ...\n\n${error.stack}\n`) // eslint-disable-line no-console
  })

  await page.goto(url, { 'waitUntil': 'domcontentloaded' })

  Object.setPrototypeOf(Page, page)
  Object.setPrototypeOf(Browser, browser)

}

Browser.close = async function () {

  try {
    await Object.getPrototypeOf(Browser).close()
  } finally {
    Object.setPrototypeOf(Browser, {})
    Object.setPrototypeOf(Page, {})
  }

}

export { Browser, Page }
