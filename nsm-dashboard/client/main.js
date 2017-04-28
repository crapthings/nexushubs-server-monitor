import { render } from 'react-dom'

Meteor.startup(function () {

  render(<h1>hello</h1>, document.getElementById('app'))

})
