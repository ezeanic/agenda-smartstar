import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App, {SearchBar, SimpleTable} from '../App'
import {QuestionMOCK_DATA} from '../Mockdata'
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16'
import { configure, shallow, mount } from 'enzyme'


configure({ adapter: new ReactSixteenAdapter() });

describe('App UI tests', () => {

    it('search bar responds to change', () => {
        let fn = jest.fn()
        const mockData = QuestionMOCK_DATA
        let theSearchBar = mount(<SearchBar onFilterTextChange = {fn} filterText = {""}  />)
        let newText = theSearchBar.find('input')
        newText.simulate('change')
        expect(fn).toBeCalled()
    })

})