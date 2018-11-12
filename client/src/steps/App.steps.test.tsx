import * as React from 'react'
import App from '../App'
import {QuestionMOCK_DATA} from '../Mockdata'
import {QuestionEntry} from '../QuestionEntry'
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'

configure({ adapter: new ReactSixteenAdapter() })

import {loadFeature, defineFeature} from 'jest-cucumber'

const feature = loadFeature('./src/features/voting.feature')

defineFeature(feature, (test) => {
    test('Should be able to `Up Vote` a question', ({ given, when, then, pending }) => {
        let mockData: QuestionEntry[]
        let mockItem: QuestionEntry
        let appWrapper: any
        let appInstance: App
        let oldLikeCount: number

        given('John, a new voter, wants to `Up Vote` a question', () => {
            mockData = [...QuestionMOCK_DATA]
            mockItem = mockData[0]
            mockItem.canUpVote = true // make sure the user is able to vote
            oldLikeCount=mockItem.numUpVotes // get the current numUpVotes
            appWrapper = mount(<App testQList={mockData} api_url={''}/>)
            appInstance = appWrapper.instance() as App
        });

        when('John indicates he wants to `Up Vote`', () => {
            let theUpButton = appWrapper.find('[id="' + mockItem._id + ':like"]')  // find the button & click it
            theUpButton.simulate('click')
        });

        then('the up vote count on that item increases by one.', () => {
            let ix = appInstance.state.questionList.findIndex( (item: QuestionEntry) => {
                return item._id === mockItem._id // get the index of the item with the correct _id.
            })
            if (ix !== -1) {
                expect(appInstance.state.questionList[ix].numUpVotes).toEqual(oldLikeCount+1)
            } else {
                throw new Error("Where did it go? It was there a minute ago.")
            }
        });
    });
})
