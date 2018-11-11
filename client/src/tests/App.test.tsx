import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {QuestionEntry} from '../QuestionEntry'
import {UpButton} from '../App'
import App from '../App'
import {QuestionMOCK_DATA} from '../Mockdata'
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16'
import { configure, shallow, mount } from 'enzyme'

configure({ adapter: new ReactSixteenAdapter() });

describe('App UI tests', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<App api_url={''} />, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    xit('renders and reads H1 text', () => {
        const wrapper = shallow(<App />)
        const welcome = <h1>Welcome to React Questions ({process.env.REACT_APP_API_ENV})</h1>
        console.log("Wrapper text:" + welcome.props.children.join(''))
        expect(wrapper.find('.App-title').text() == welcome.props.children.join('')).toEqual(true)
    });

    it('upButton handles like click', () => {
        let fn = jest.fn()
        const anEntry = QuestionMOCK_DATA[0]
        let myUpButton = shallow(<UpButton entry={anEntry} clickHandler={fn}/>)
        myUpButton.simulate('click')
        expect(fn).toBeCalled()
    })

    it('upButton handles like click', () => {
        let fn = jest.fn()
        const anEntry = QuestionMOCK_DATA[0]
        let myUpButton = mount(<UpButton entry={anEntry} clickHandler={fn}/>)
        myUpButton.simulate('click')
        expect(fn).toBeCalled()
    })

})