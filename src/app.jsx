import './index.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Application from './components/Application'

/**
 * Load the application
 */
export const App = () => {
  // TODO: Toggleable Dark mode
  return <Application darkMode={true} />
}

ReactDOM.render(<App />, document.getElementById('root'))
