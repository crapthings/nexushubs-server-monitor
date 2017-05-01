import _ from 'lodash'

import os from 'os'

import pusage from 'pidusage'

export default (props) => {

  const connection = DDP.connect('http://localhost:3000')

  const { name } = props

  Meteor.setTimeout(function() {

    Meteor.setInterval(function () {

      pusage.stat(process.pid, Meteor.bindEnvironment(function(err, stat) {
        connection.call('servers.update.stat', name, {
          ...stat,
          freemem: os.freemem(),
          node: process.version,
          meteor: Meteor.release,
        })
      }))

    }, 1 * 1000)

  }, 10 * 1000)

}
