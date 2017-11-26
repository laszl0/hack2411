var html = require('choo/html')

module.exports = view

function view(state, emit) {

    return html `
    <nav class="bt bb tc mw7 center">
    <a class="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" href="/">Home</a>
    <a class="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l" href="/holders">Holders</a>
    </nav>
  `

//   <a class="f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l" href="/about">About</a>
//   <a class="f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l" href="/contact">Contact</a>
  

    function handleClick() {
        emit('clicks:add', 1)
    }
}