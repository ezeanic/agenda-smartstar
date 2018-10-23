import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from '../App'

// setting api_url to '' turns off fetching in App. 

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App api_url={''} />, div)
  ReactDOM.unmountComponentAtNode(div)
});

