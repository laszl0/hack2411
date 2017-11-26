var html = require('choo/html')
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
      
      <article class="mw7 center pa4 black-80">
        In order to be able to transfer, you have to have the address of the receiver.
        <br>
        <br>
        The holders tab lists all active addresses.
        
        
        </article>

    </body>
  `

    function handleClick() {
        emit('clicks:add', 1)
    }
}