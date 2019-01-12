import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import wechat from 'wechat'

dotenv.config()

const app = express()

const config = {
  token: process.env.TOKEN,
  appid: process.env.APP_ID,
}

app.use(express.query())
app.use(
  '/wechat',
  wechat(config, (req, res, next) => {
    // All WeChat related info are in req.weixin
    var message = req.weixin
    console.log(message)
    // Wechat expects you to respond, or else it will tell the user that the service is unavailable after three tries.
    res.reply([
      {
        title: '解读Go语言的2018：怎么就在中国火成这样了？',
        description:
          '本篇文章是 Go 语言 2018 年终盘点，力求客观、深入分析 2018 年 Go 语言的技术发展现状，同时对明年可能的发展情况进行预测和展望。',
        picurl: 'https://www.javatpoint.com/go/images/go-tutorial.jpg',
        url:
          'http://mp.weixin.qq.com/s?__biz=MjM5MDE0Mjc4MA==&mid=2651012041&idx=1&sn=6fba2b6b9f2b08bca346414fc5c58eab&chksm=bdbec39a8ac94a8c6569c274c3a17fa602c4a0ab6bcdb5325d0913192e346389e833d6b94f18&mpshare=1&scene=24&srcid=#rd',
      },
    ])
    // Doc: https://github.com/node-webot/wechat/blob/master/README.en.md
  })
)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

var port = process.env.PORT || '3000'
app.set('port', port)

/**
 * Create HTTP server.
 */

var server = http.createServer(app)

server.on('error', onError)
server.on('listening', onListening)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  console.log(process.env.TOKEN)

  console.log('Listening on ' + bind)
}
