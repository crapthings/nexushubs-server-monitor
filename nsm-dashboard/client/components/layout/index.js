import System from '/collections/system'

import Servers from '/collections/servers'

import prettyBytes from 'pretty-bytes'

const tracker = (props, onData) => {

  const ready = Meteor.subscribe('servers').ready()
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

    const servers = Servers.find().fetch()

    onData(null, { servers, system, cpu, memory, freemem, node, meteor, updatedAt, updatedAtStr })
  } else {
    onData(null, null)
  }

}

const component = ({ servers, system, cpu = 0, memory = 0, freemem = 0, node, meteor, updatedAt, updatedAtStr }) => <div>
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
      {servers.map(server => <tr key={server._id}>
        <td></td>
        <td>{_.get(server, 'stat.cpu')}</td>
        <td>{_.get(server, 'stat.memory')}</td>
        <td>{_.get(server, 'stat.node')}</td>
        <td>{_.get(server, 'stat.meteor')}</td>
      </tr>)}
    </tbody>
  </table>
</div>

export default Container(tracker)(component)
