var html = require('choo/html')

module.exports = view

function view(state, emit) {

    return html `
    <header class="tc pv4">
    <img src="${state.account.profileUrl}" class="br3 ba b--black-10 h3 w3" alt="avatar">
    <h1 class="f5 f4-ns fw6 black-70">${state.account.address}</h1>
    <h2 class="f6 black-70 fw2 ttu tracked">Balance: ${state.account.balance} (${state.token.name})</h2>
  </header>
  `
}