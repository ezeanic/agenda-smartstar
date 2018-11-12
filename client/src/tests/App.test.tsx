import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App, {UpButton, SimpleTable} from '../App'
import {QuestionMOCK_DATA} from '../Mockdata'
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16'
import { configure, shallow, mount } from 'enzyme'

configure({ adapter: new ReactSixteenAdapter() });

describe('App UI tests', () => {

    it('is in test mode', () => {
        expect(process.env.NODE_ENV).toEqual('test')
    })

    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<App api_url={''} />, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    it('upButton handles like click', () => {
        let fn = jest.fn()
        const anEntry = QuestionMOCK_DATA[0]
        let myUpButton = mount(<UpButton entry={anEntry} clickHandler={fn}/>)
        myUpButton.simulate('click')
        expect(fn).toBeCalled()
    })

    it('click handler is installed in button', () => {
        let fn = jest.fn()
        const mockData = QuestionMOCK_DATA
        let theApp = mount(<SimpleTable entries={mockData} clickHandler={fn} />)
        let theUpButton = theApp.find('[id="acbxyz0002:unLike"]')
        theUpButton.simulate('click')
        expect(fn).toBeCalled()
    })

    it('notUpVote is counted', () => {
        const mockData = QuestionMOCK_DATA
        let theApp = mount(<App testQList={mockData} api_url={''}/>)
        let oldLikeCount=mockData[0].numUpVotes // get the current numUpVotes
        let theID=mockData[0]._id
        let theUpButton = theApp.find('[id="' + theID + ':unLike"]')  // find the button & click it
        theUpButton.simulate('click')
        expect(theApp.instance().state.questionList[0].numUpVotes).toEqual(oldLikeCount-1)
    })
})