import * as React from 'react';
import './App.css';
import {QuestionEntry} from './QuestionEntry'
//import {FetchQuestions} from './API_Interface'
import {MOCK_DATA} from './Mockdata'


import logo from './logo.svg';

type AppProps = {api_url: string}

class UpButton extends React.Component <{entry:QuestionEntry}> {
  public render() {
    let entry = this.props.entry
    if(entry.canUpVote == true){
      return <button type="button" id="likeButton">Like</button>
    } else {
      return <button type="button" id="unLikeButton">unLike</button>
    }
  }
}

class DownButton extends React.Component <{entry:QuestionEntry}> {
  public render() {
    let entry = this.props.entry
      if(entry.canDownVote == true){
        return <button type="button" id="dislikeButton">Like</button>
      } else {
        return <button type="button" id="unDislikeButton">unDislike</button>
      }
    }
}

class SimpleTable extends React.Component <{entries:QuestionEntry[]},{}> {
    public render() {
        let rows:any = []
        let entries = this.props.entries
        for (let ix in entries) {
            rows.push(<tr key={ix}><td className="App-table">{entries[ix].question}</td>
            <td className="App-table"><UpButton entry={entries[ix]}/></td>
            <td className="App-table"><DownButton entry={entries[ix]}/></td>
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

class App extends React.Component <AppProps, {questionList: QuestionEntry []}> {

  //constructor(props: AppProps) {
    //super(props)
  //  let emptyQuestionList: QuestionEntry[] = []
    //this.state = {questionList: emptyQuestionList}
    //this.doFetch()
  //}

  // public async doFetch() {
  //   if (this.props.api_url.length) { // only fetch if the api_url is real
  //       FetchQuestions(this.props.api_url, (theList: QuestionEntry[]) => {
  //         this.setState({questionList: theList})
  //       })
  //   }
  // }

  public render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Questions</h1>
        </header>
        <SimpleTable entries={MOCK_DATA}/>
      </div>
    );
  }
}

export default App;
//this.state.questionList
