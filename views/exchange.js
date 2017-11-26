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
        Use the Metamask Chrome plugin to exchange Ether into ${state.token.name}.
        <br>
        <br>
        The address of ${state.token.name} token is ${state.exchange.address}.
        
        </article>

    </body>
  `

    function handleClick() {
        emit('clicks:add', 1)
    }
}