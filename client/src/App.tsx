import * as React from 'react';
import './App.css';
import {QuestionEntry} from './QuestionEntry'
import {FetchQuestions, upVote, downVote, notUpVote, notDownVote} from './API_Interface'
import {MOCK_DATA} from './Mockdata'


import logo from './logo.svg';

type AppProps = {api_url: string}

class UpButton extends React.Component <{entry:QuestionEntry, clickHandler?:(e:any)=>void}> {
  public render() {
    //replace the alert functions with the actual upVote and notUpVote funcitons
    let entry = this.props.entry
    if(entry.canUpVote == true){
      return <button onClick={this.props.clickHandler} type="button" id={entry._id + ':like'}>Like</button>
    } else {
      return <button onClick={this.props.clickHandler} type="button" id={entry._id + ':unLike'}>unLike</button>
    }

    }
  }


class DownButton extends React.Component <{entry:QuestionEntry, clickHandler?:(e:any)=>void}> {
  public render() {
    //replace the alert functions with the actual downVote and notDownVote funcitons
    let entry = this.props.entry
      if(entry.canDownVote == true){
        return <button onClick={this.props.clickHandler}  type="button" id={entry._id + ":dislike"}>Dislike</button>
      } else {
        return <button onClick={this.props.clickHandler} type="button" id={entry._id + ":unDislike"}>unDislike</button>
      }
    }
}

public handleClick(e:any) {

}

class InputBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Input Question" />
      </form>
      //Send input to postQuestion function
    );
  }
}

class SimpleTable extends React.Component <{entries:QuestionEntry[]},{}> {
    public render() {

        let rows:any = []
        let entries = this.props.entries
        for (let ix in entries) {
            rows.push(<tr key={ix}><td className="App-table">{entries[ix].question}</td>
            <td className="App-table"><UpButton entry={entries[ix]}/>upVoteCookies.size()</td>
            <td className="App-table"><DownButton entry={entries[ix]}/>downVoteCookies.size()</td>
            </tr>)
        }
        return <table  className="App-center">
                <tbody>
                <tr><th className="App-table">Question</th><th className="App-table">Like</th><th className="App-table">Dislike</th></tr>
                {rows}
               </tbody>
               </table>
    }
}

class App extends React.Component <AppProps, {questionList: QuestionEntry []}, {}> {
  //Do we need these or are they somebody elses job?
  // public flipValueUp =() =>{
  //   this.setState({canUpVote: !this.state.canUpVote});
  // }
  // public flipValueDown =() =>{
  //   this.setState({canDownVote: !this.state.canDownVote});
  // }
  constructor(props: AppProps) {
    super(props)
   let emptyQuestionList: QuestionEntry[] = []
    this.state = {questionList: emptyQuestionList}
    this.doFetch()
  }

  public async doFetch() {
    if (this.props.api_url.length) { // only fetch if the api_url is real
        FetchQuestions(this.props.api_url, (theList: QuestionEntry[]) => {
          this.setState({questionList: theList})
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
        <InputBar/>
        <SimpleTable entries={MOCK_DATA/*this.state.questionList*/}/>
      </div>
    );
  }
}

export default App;
