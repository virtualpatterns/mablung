import Assert from 'assert'

let message = `1973-05-28T21:00:00.000Z INFO  MESSAGE

TestError: MESSAGE
    at <anonymous>:6:34


`

Assert.ok(/^1973-05-28T21:00:00.000Z INFO {2}MESSAGE/.test(message))
