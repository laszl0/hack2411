// import choo's template helper
var html = require('choo/html')

// export module
module.exports = function (holder) {

var profileUrl = "https://robohash.org/" + holder.address
  // create html template
  return html`
    <li class="flex items-center lh-copy pa3 ph0-l bb b--black-10">
        <img class="w2 h2 w3-ns h3-ns br-100" src="${profileUrl}" />
        <div class="pl3 flex-auto">
        <span class="f6 db black-70">${holder.address}</span>
        <span class="f6 db black-70">${holder.amount}</span>
        </div>
        <div>
        <a href="/holders/${holder.address}" class="f6 link blue hover-dark-gray">Transfer</a>
        </div>
    </li>
  `
}