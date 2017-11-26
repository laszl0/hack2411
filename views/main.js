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

      <article class="fl w-50 center ph3 ph5-ns tc br2 pv5 bg-washed-green dark-green mb5">
        <h1 class="fw6 f3 f2-ns lh-title mt0 mb3">
          Exchange Ether for ${state.account.tokenName}
        </h1>
        <h2 class="fw2 f4 lh-copy mt0 mb3">
          Is your balance 0 or to low, don't worry you can top it up in exchange for Ether.
        </h2>
        <p class="fw1 f5 mt0 mb3">
          Current exchange rate is 1 Ether = ${state.exchange.price} ${state.account.tokenName}
        </p>
        <div>
          <a class="f6 br-pill dark-green no-underline ba grow pv2 ph3 dib"
            href="/exchange">
            Learn More
          </a>
        </div>
      </article>

      <article class="fl w-50 center ph3 ph5-ns tc br2 pv5 bg-washed-blue dark-blue mb5">
        <h1 class="fw6 f3 f2-ns lh-title mt0 mb3">
          Transfer ${state.account.tokenName}
        </h1>
        <h2 class="fw2 f4 lh-copy mt0 mb3">
          Is there someone friend, family or foe who needs your help, you can easily send ${state.account.tokenName} to them.
        </h2>
        <p class="fw1 f5 mt0 mb3">
          Cost of transaction fee very small.
        </p>
        <div>
          <a class="f6 br-pill dark-blue no-underline ba grow pv2 ph3 dib"
            href="/transfer">
            Learn More
          </a>
        </div>
      </article>
    </body>
  `


  function handleClick() {
    emit(state.events.RENDER)
  }
}