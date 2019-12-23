// setupTests.js

const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const ReactDOM = require('react-dom')

ReactDOM.createPortal = node => node
Enzyme.configure({ adapter: new Adapter() })