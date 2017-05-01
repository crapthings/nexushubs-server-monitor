import { render } from 'react-dom'

import Layout from './components/layout'

Meteor.startup(function () {

  render(<Layout />, document.getElementById('app'))

})
