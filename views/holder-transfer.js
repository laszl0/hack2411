var html = require('choo/html')
var navbar = require('./navigation')
var header = require('./header')
var TITLE = '🚂🚋🚋'

module.exports = view

function view(state, emit) {
    if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

    var target = state.params.address
    var amount = state.transfer.amount
    var profileUrl = "https://robohash.org/" + target
    var status = state.transfer.loading ? "Transfer in progress" : "Send"

    return html `
    <body class="sans-serif">
    
    ${header(state)}

      ${navbar()}
      
      <article class="mw7 center black-80">
        <form action="sign-up_submit" method="get" accept-charset="utf-8">
            <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
            <legend class="ph0 mh0 fw6 clip">Sign Up</legend>
            <div class="mt3">
            <img class="w2 h2 w3-ns h3-ns br-100" src="${profileUrl}" />
            </div>
            <div class="mt3">
                <label class="db fw4 lh-copy f6" for="email-address">Address</label>
                <input class="pa2 input-reset ba bg-transparent w-100 measure" type="text" name="address" id="address" value="${target}" readonly >
            </div>
            <div class="mt3">
                <label class="db fw4 lh-copy f6" for="password">Amount</label>
                <input class="b pa2 input-reset ba bg-transparent" type="number" name="amount" id="amount" value="${amount}" oninput=${updateAmount}>
            </div>
            </fieldset>
            <div class="mt3"><button class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" onclick=${handleClick}>${status}</button></div>
        </form>
    </article>

    </body>
  `

  function updateAmount(evt){
    emit('transfer:amount', evt.target.value)
}

    function handleClick(evt) {
        evt.preventDefault()
        if(state.transfer.loading === false){
            emit('transfer:send', target)
        }
    }
}