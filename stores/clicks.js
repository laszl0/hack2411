import {
  stat
} from "fs";
import {
  token,
  exchange
} from './contracts'


module.exports = store

function store(state, emitter) {

  state.account = {
    address: null,
    profileUrl: '',
    tokenName: null,
    balance: 0
  }

  state.exchange = {
    address: null,
    price: 0
  }

  state.token = {
    address: null,
    holders: []
  }

  state.transfer = {
    amount: 0,
    loading: false
  }

  emitter.on('DOMContentLoaded', function () {

  })

  emitter.on('DOMContentLoaded', function () {

    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      alert("This demo can't be run. Sorry :(");
    }
    state.account.address = web3.eth.accounts[0];
    state.account.profileUrl = "https://robohash.org/" + web3.eth.defaultAccount

    emitter.emit(state.events.RENDER)

    var contract = web3.eth.contract(token.abi)
    var contractAt = contract.at(token.address)

    contractAt.name((err, resp) => {
      state.token.address = token.address
      state.token.name = resp

      emitter.emit(state.events.RENDER)
    })

    contractAt.balanceOf(state.account.address, (err, resp) => {
      state.account.balance = resp.toString(10)

      emitter.emit(state.events.RENDER)
    })

    contractAt.getApprovedAccounts((err, resp) => {
      for (let i = 0; i < resp.length; i++) {
        contractAt.balanceOf(resp[i], (err, resp2) => {
          console.log(resp[i])
          state.token.holders.push({
            address: resp[i],
            amount: resp2.toString(10)
          })
          emitter.emit(state.events.RENDER)
        })

      }
    })

    // var event = contractAt.Transfer({from: state.account.address}, null,function(err, result){
    //   console.log('event')
    //   console.log(err)
    // })

    var myEvent = contractAt.Transfer({from: state.account.address}, {fromBlock: 0, toBlock: 'latest'});
    myEvent.watch(function(error, result){
      console.log('event')
      console.log(error)
    })

    var exchange1 = web3.eth.contract(exchange.abi)
    var exchangeAt = exchange1.at(exchange.address)

    exchangeAt.price((err, resp) => {
      console.log(err)
      console.log(resp)

      state.exchange.address = exchange.address
      state.exchange.price = resp

      emitter.emit(state.events.RENDER)
    })



    emitter.on('transfer:send', function (target) {
      console.log(state.transfer.amount)
      state.transfer.loading = true

      contractAt.transfer(target, state.transfer.amount, (err, resp)=>{
        console.log(err)
        console.log(resp)
      })
      
      emitter.emit(state.events.RENDER)
    })

    emitter.on('transfer:amount', function (count) {
      state.transfer.amount = count
      emitter.emit(state.events.RENDER)
    })
  })
}