var css = require('sheetify')
var choo = require('choo')
var store = require('./stores/clicks')

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  // Enable once you want service workers support. At the moment you'll
  // need to insert the file names yourself & bump the dep version by hand.
  // app.use(require('choo-service-worker')())
}

app.use(store)

app.route('/', require('./views/main'))
app.route('/exchange', require('./views/exchange'))
app.route('/transfer', require('./views/transfer'))

app.route('/holders', require('./views/holders'))
app.route('/holders/:address', require('./views/holder-transfer'))

app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app