var html = require('choo/html')
var holder = require('./holder')
var navbar = require('./navigation')
var header = require('./header')
var TITLE = '🚂🚋🚋'

module.exports = view

function view(state, emit) {
    if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

    return html `
    <body class="sans-serif">
      
      ${header(state)}

      ${navbar()}

      <ul class="list pl0 mt0 mw7 center">      
      ${state.token.holders.map(holderMap)}
    </ul>

    </body>
  `

    function handleClick() {
        emit('clicks:add', 1)
    }

    function holderMap(obj, i){
        return holder(obj, i)
    }
}