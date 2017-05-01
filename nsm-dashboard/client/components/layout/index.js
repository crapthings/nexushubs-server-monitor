import _ from 'lodash'

import { composeWithTracker as Container } from 'react-komposer'

import System from '/collections/system'

import prettyBytes from 'pretty-bytes'

const tracker = (props, onData) => {
  const ready = Meteor.subscribe('system').ready()
  if (ready) {
    const system = System.findOne({ isCore: true })
    const cpu = _.get(system, 'stat.cpu', 0)
    const memory = _.get(system, 'stat.memory', 0)
    onData(null, { system, cpu, memory })
  } else {
    onData(null, {})
  }
}

const component = ({ system, cpu = 0, memory = 0 }) => <div>
  <h1>cpu: {cpu}</h1>
  <h1>memory: {prettyBytes(memory)}</h1>
</div>

export default Container(tracker)(component)
