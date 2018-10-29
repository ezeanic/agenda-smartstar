import * as React from 'react';
import './App.css';
import {QuestionEntry} from './QuestionEntry'
import {FetchQuestions} from './API_Interface'

import logo from './logo.svg';

type AppProps = {api_url: string}

class SimpleTable extends React.Component <{entries:QuestionEntry[]},{}> {
    public render() {
        let rows:any = []
        let entries = this.props.entries
        for (let ix in entries) {
            rows.push(<tr key={ix}><td className="App-table">{entries[ix].question}</td><td className="App-table">{entries[ix].upVoteCookies}</td></tr>)
        }
        return <table  className="App-center">
                <tbody>
                <tr><th className="App-table">First Name</th><th className="App-table">Last Name</th></tr>
                {rows}
               </tbody>
               </table>
    }
}

class App extends React.Component <AppProps, {contactList: QuestionEntry []}> {

  constructor(props: AppProps) {
    super(props)
    let emptyContactList: QuestionEntry[] = []
    this.state = {contactList: emptyContactList}
    this.doFetch()
  }

  public async doFetch() {
    if (this.props.api_url.length) { // only fetch if the api_url is real
        FetchQuestions(this.props.api_url, (theList: QuestionEntry[]) => {
          this.setState({contactList: theList})
        })
    }
  }

  public render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Questions</h1>
        </header>
        <SimpleTable entries={this.state.contactList}/>
      </div>
    );
  }
}

export default App;
