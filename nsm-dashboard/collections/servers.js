import System from '/collections/system'

const Servers = new Mongo.Collection('servers')

export default Servers

Meteor.methods({

  'servers.update.stat'(name, stat) {
    console.log(name, stat)
    Servers.upsert({ name }, {
      $set: { stat }
    })
  }

})

if (Meteor.isServer) {

  Meteor.publish('servers', function () {

    const system = System.find({ isCore: true })
    const servers = Servers.find()

    return [system, servers]

  })

}
