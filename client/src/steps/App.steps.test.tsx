import * as React from 'react'
import App from '../App'
import {QuestionMOCK_DATA} from '../Mockdata'
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16'
import { configure, shallow, mount } from 'enzyme'

configure({ adapter: new ReactSixteenAdapter() });

import {loadFeature, defineFeature} from 'jest-cucumber'

const feature = loadFeature('./src/features/voting.feature')

defineFeature(feature, (test) => {
    test('Should be able to `Up Vote` a question', ({ given, when, then, pending }) => {
            let mockData
            let mockItem
            let appWrapper
            let appInstance
            let oldLikeCount

            given('John, a new voter, wants to `Up Vote` a question', () => {
                mockData = [...QuestionMOCK_DATA]
                mockData[0].canUpVote = true // make sure the user is able to vote
                oldLikeCount=mockData[0].numUpVotes // get the current numUpVotes
                appWrapper = mount(<App testQList={mockData} api_url={''}/>)
                appInstance = appWrapper.instance() as App
            });
    
            when('John indicates he wants to `Up Vote`', () => {
                let theID=mockData[0]._id
                let theUpButton = appWrapper.find('[id="' + theID + ':like"]')  // find the button & click it
                theUpButton.simulate('click')
            });
    
            then('the up vote count increases by one.', () => {
                expect(appInstance.state.questionList[0].numUpVotes).toEqual(oldLikeCount+1)
            });
        });
})


