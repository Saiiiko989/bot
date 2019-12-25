const express = require('express')
const bodyParser = require('body-parser')
const { Botact } = require('botact')
const fs = require('fs')
const  Arraylist  = require('arraylist')
var newStreamMessage
var newFollowMessage
var oldFollowMessage

const server = express()
const bot = new Botact({
  token: '124ae41baaf8432bdbfb4fe480ba8c0fb7ab2e8833b817a83490bfaef99da9cbf1b270350f2799fe13880',
  confirmation: 'b09dfaef'
})

var users = new Arraylist
var commands = new Arraylist
users.add(274611313) //it's Me
commands.add([', oldFollowMessage\n, newFollowMessage\n, newStreamMessage\n, start\n, getUsers'])


bot.on(( ctx ) => {
  if(ctx.peer_id == 274611313) {
    bot.command('help', (ctx) => {
      ctx.reply(commands)
    })

    bot.command('getUsers', (ctx) => {
      ctx.reply(users)
    })

    bot.command('newFollowMessage', (ctx) => {
      ctx.reply('Write a new value for newFollowMessage')
      bot.on(( ctx ) => {
        newFollowMessage = ctx.text
        ctx.reply('New value for newFollowMessage saved')
      })
    })

    bot.command('oldFollowMessage', (ctx) => {
      ctx.reply('Write a new value for oldFollowMessage')
      bot.on(( ctx ) => {
        oldFollowMessage = ctx.text
        ctx.reply('New value for oldFollowMessage saved')
      })
    })

    bot.command('newStreamMessage', (ctx) => {
      ctx.reply('Write a new value for newStreamMessage')
      bot.on(( ctx ) => {
        newStreamMessage = ctx.text
        ctx.reply('New value for newStreamMessage saved');
      })
    })

    bot.command('start', (ctx) => {
      ctx.reply('OK')
      var i = 0
      while (i<users.length) {
        ctx.sendMessage(users.get(i), newStreamMessage)
        i++
      }
    })

  }
})
bot.command('+', (ctx) => {

  if (users.contains(ctx.peer_id)) {
    ctx.reply(oldFollowMessage)
  } else {
    users.add(ctx.peer_id)
    ctx.reply(newFollowMessage)
  }

})

server.use(bodyParser.json())

server.post('/', bot.listen)
server.listen(8080)
