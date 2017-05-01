import System from '/collections/system'

import prettyBytes from 'pretty-bytes'

const tracker = (props, onData) => {
  const ready = Meteor.subscribe('system').ready()
  if (ready) {
    const system = System.findOne({ isCore: true })
    const cpu = _.get(system, 'stat.cpu', 0)
    const memory = _.get(system, 'stat.memory', 0)
    const freemem = _.get(system, 'stat.freemem', 0)
    const node = _.get(system, 'stat.node', 0)
    const meteor = _.get(system, 'stat.meteor', 0)
    const updatedAt = _.get(system, 'updatedAt')
    const updatedAtStr = updatedAt.toISOString()

    const now = moment()

    onData(null, { system, cpu, memory, freemem, node, meteor, updatedAt, updatedAtStr })
  } else {
    onData(null, {})
  }
}

const component = ({ system, cpu = 0, memory = 0, freemem = 0, node, meteor, updatedAt, updatedAtStr }) => <div>
  <table>
    <thead>
      <tr>
        <th width={80}>status</th>
        <th width={60}>cpu</th>
        <th width={200}>memory</th>
        <th width={120}>node</th>
        <th width={120}>meteor</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{updatedAtStr}</td>
        <td>{cpu}</td>
        <td>{prettyBytes(memory)}/{prettyBytes(freemem)}</td>
        <td>{node}</td>
        <td>{meteor}</td>
      </tr>
    </tbody>
  </table>
</div>

export default Container(tracker)(component)
