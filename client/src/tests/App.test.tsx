import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App, {UpButton,DownButton SimpleTable, InputBar} from '../App'
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
    it('enter key press posts question', () => {//this is a test to verify if the enter key was pressed it does something
        let fn = jest.fn()
        let dummy = jest.fn()
        const mockData = QuestionMOCK_DATA
        let theInputBar = mount(<InputBar onQuestionTextChange = {dummy} onQuestionSubmitChange = {fn} questionText = {""}  />)
        let theTextField = theInputBar.find('input')
        theTextField.simulate('keypress', {key:'Enter')
        expect(fn).toBeCalled()
    })
    it('Keypress handler is not called', () => { //this was a test i had hadded to make sure the handler isnt called when enter is not pressed
        let fn = jest.fn()
        let dummy = jest.fn()
        const mockData = QuestionMOCK_DATA
        let theInputBar = mount(<InputBar onQuestionTextChange = {dummy} onQuestionSubmitChange = {fn} questionText = {""}  />)
        let theTextField = theInputBar.find('input')
        theTextField.simulate('keypress', {key:'p')
        expect(fn).not.toBeCalled()
    })
    it('submit button press posts question', () => {
        let fn = jest.fn()
        let dummy = jest.fn()
        const mockData = QuestionMOCK_DATA
        let theInputBar = mount(<InputBar onQuestionTextChange = {dummy} onQuestionSubmitChange = {fn} questionText = {""}  />)
        let theTextField = theInputBar.find('button')
        theTextField.simulate('click')
        expect(fn).toBeCalled()
    })

    it('notUpVote is counted', () => {
        const mockData = QuestionMOCK_DATA
        let theApp = mount(<App testQList={mockData} api_url={''}/>)
        let appInstance = theApp.instance() as App
        let oldLikeCount=appInstance.state.questionList[0].numUpVotes // get the current numUpVotes
        let theID = appInstance.state.questionList[0]._id
        let theUpButton = theApp.find('[id="' + theID + ':unLike"]')  // find the button & click it
        theUpButton.simulate('click')

        expect(appInstance.state.questionList[0].numUpVotes).toEqual(oldLikeCount-1)
    })

    it('unable to click downVote when already upVoted', () => {
        const mockData = QuestionMOCK_DATA
        let theApp = mount(<App testQList={mockData} api_url={''}/>)
        let appInstance = theApp.instance() as App
        let oldLikeCount=appInstance.state.questionList[0].numUpVotes // get the current numUpVotes
        let oldDislikeCount=appInstance.state.questionList[0].numDownVotes // get the current numDownVotes
        let theID = appInstance.state.questionList[0]._id
        let theUpButton = theApp.find('[id="' + theID + ':like"]')  // find like button
        let theDownButton = theApp.find('[id="' + theID + ':dislike"]')  // find dislike button
        theDownButton.simulate('click')
        theUpButton.simulate('click')

        expect(appInstance.state.questionList[0].numUpVotes).toEqual(oldLikeCount)
        expect(appInstance.state.questionList[0].numDownVotes).toEqual(oldDislikeCount)
    })

    it('list sorted by upvotes', () => {
        const mockData = QuestionMOCK_DATA
        let theApp = mount(<App testQList={mockData} api_url={''}/>)
        let appInstance = theApp.instance() as App
        let flag = true
          for(let ix = 0; ix <  appInstance.state.questionList.length -2; ix++){
            if(appInstance.state.questionList[ix].numUpvotes < appInstance.state.questionList[ix+1].numUpvotes)
            flag = false
          }
        expect(flag)
    })
})
