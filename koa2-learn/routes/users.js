const router = require('koa-router')()
const Redis = require('koa-redis')
const Person = require('../dbs/models/person')

const Store = new Redis().client

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/addPerson',async(ctx)=>{
  const person = new Person({
    name:ctx.request.body.name,
    age:ctx.request.body.age
  })
  let code 
  try {
    await person.save()
    code = 0
  } catch (error) {
    code = -1
  }
  
  ctx.body = {
    code
  }
})

router.post('/getPerson',async(ctx)=>{
  let result = await Person.findOne({name:ctx.request.body.name})
  let results = await Person.find({name:ctx.request.body.name})
  ctx.body = {
    code:0,
    result,
    results
  }
})

router.post('/updatePerson',async(ctx)=>{
  // const result = await Person.where({name:ctx.request.body.name}).update({age:ctx.request.body.age})
  const result = await Person.update({name:ctx.request.body.name},{$set:{age:ctx.request.body.age}})
  ctx.body = {
    code:0
  }
})

router.post('/removePerson',async(ctx)=>{
  // const result = await Person.where({name:ctx.request.body.name}).remove()
  const result = await Person.remove({name:ctx.request.body.name})
  ctx.body = {
    code:0
  }
})

router.get ('/fix',async(ctx)=>{
  const st = await Store.hset('fix','name',Math.random())
  ctx.body = {
    code:0
  }
})




module.exports = router
