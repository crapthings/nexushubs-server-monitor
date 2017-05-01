import os from 'os'

import pusage from 'pidusage'

import System from '/collections/system'

Meteor.startup(waitToPollStats)

function waitToPollStats() {
  Meteor.setTimeout(pollStats, 10 * 1000)
}

function pollStats() {
  Meteor.setInterval(getStats, 1 * 1000)
}

function getStats() {
  pusage.stat(process.pid, Meteor.bindEnvironment(function(err, stat) {
    System.update({ isCore: true }, {
      $set: {
        stat: {
          ...stat,
          freemem: os.freemem(),
          node: process.version,
          meteor: Meteor.release,
        },
        updatedAt: new Date(),
      }
    })
  }))
}
