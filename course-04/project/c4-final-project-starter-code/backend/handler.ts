'use strict'

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go serverless! Your function excuted successfully!',
        input: event
      },
      null,
      2
    )
  }
}
