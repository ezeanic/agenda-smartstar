import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App, {UpButton, SimpleTable, InputBar} from '../App'
import {QuestionMOCK_DATA} from '../Mockdata'
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16'
import { configure, shallow, mount } from 'enzyme'
import {QuestionEntry} from './QuestionEntry'
//import Question
type AppProps = {api_url: string, testQList?:QuestionEntry[]}

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
        let appInstance = theApp.instance() as App
        let oldLikeCount=appInstance.state.questionList[0].numUpVotes // get the current numUpVotes
        let theID = appInstance.state.questionList[0]._id
        let theUpButton = theApp.find('[id="' + theID + ':unLike"]')  // find the button & click it
        theUpButton.simulate('click')
        
        expect(appInstance.state.questionList[0].numUpVotes).toEqual(oldLikeCount-1)
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
    it('user tries to write a space first', () => {
        const mockData = QuestionMOCK_DATA
        let theApp = mount(<App testQList={mockData} api_url={''}/>)
        let appInstance = theApp.instance() as App
        appInstance.handleQuestionTextChange(' i')
        //console.log(q5)
        expect(appInstance.state.questionText).toEqual("")

    }) 
    it('user tries to write just a space', () => {
        const mockData = QuestionMOCK_DATA
        let theApp = mount(<App testQList={mockData} api_url={''}/>)
        let appInstance = theApp.instance() as App
        appInstance.handleQuestionTextChange(' ')
        //console.log(q5)
        expect(appInstance.state.questionText).toEqual("")

    }) 
    it('user tries to write many spaces', () => {
        const mockData = QuestionMOCK_DATA
        let theApp = mount(<App testQList={mockData} api_url={''}/>)
        let appInstance = theApp.instance() as App
        appInstance.handleQuestionTextChange('         ')
        //console.log(q5)
        expect(appInstance.state.questionText).toEqual("")

    }) 
    it('user tries to write spaces with a char at end', () => {
        const mockData = QuestionMOCK_DATA
        let theApp = mount(<App testQList={mockData} api_url={''}/>)
        let appInstance = theApp.instance() as App
        appInstance.handleQuestionTextChange('        t')
        //console.log(q5)
        expect(appInstance.state.questionText).toEqual("")

    }) 
    it('user tries to write a char first', () => {
        const mockData = QuestionMOCK_DATA
        let theApp = mount(<App testQList={mockData} api_url={''}/>)
        let appInstance = theApp.instance() as App
        appInstance.handleQuestionTextChange('t')
        //console.log(q5)
        expect(appInstance.state.questionText).toEqual("t")

    }) 
    it('user tries to write a spaces between chars', () => {
        const mockData = QuestionMOCK_DATA
        let theApp = mount(<App testQList={mockData} api_url={''}/>)
        let appInstance = theApp.instance() as App
        appInstance.handleQuestionTextChange('        t       r')
        //console.log(q5)
        expect(appInstance.state.questionText).toEqual("")

    }) 




})