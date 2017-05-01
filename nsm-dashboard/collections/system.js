import pusage from 'pidusage'

const System = new Mongo.Collection('system')

export default System

if (Meteor.isServer) {

  Meteor.publish('system', function () {
    // if (!this.userId) return this.error(new Meteor.Error('401'))

    return System.find({ isCore: true })
  })

  Meteor.startup(function () {

    System.upsert({ isCore: true }, {
      $set: { isCore: true }
    })

  })

}
