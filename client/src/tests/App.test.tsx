import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {QuestionEntry} from '../QuestionEntry'
import {UpButton} from '../App'
import App from '../App'
import {QuestionMOCK_DATA} from '../Mockdata'
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter() });

describe('App UI tests', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<App api_url={''} />, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    it('renders and reads H1 text', () => {
        const wrapper = shallow(<App />)
        const welcome = <h2>Welcome to React</h2>
        expect(wrapper.contains(welcome)).toEqual(true)
    });

    it('handles like click', () => {
        let fn = jest.fn()
        const div = document.createElement('div')
        const anEntry = QuestionMOCK_DATA[0]
        ReactDOM.render(<UpButton entry={anEntry}/>, div)
        div.
    })

})