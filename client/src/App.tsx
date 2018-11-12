import * as React from 'react';
import './App.css';
import {QuestionEntry} from './QuestionEntry'
import {FetchQuestions} from './API_Interface'
import {QuestionMOCK_DATA} from './Mockdata'


import logo from './logo.svg';

type AppProps = {api_url: string}

class UpButton extends React.Component <{entry:QuestionEntry, clickHandler?:(e:any)=>void}> {
  public render() {
     let entry = this.props.entry
    if(entry.canUpVote){
      return <button onClick={this.props.clickHandler} type="button" id={entry._id + ':like'}>Like</button>
    } else {
      return <button onClick={this.props.clickHandler} type="button" id={entry._id + ':unLike'}>unLike</button>
    }

    }
  }


class DownButton extends React.Component <{entry:QuestionEntry, clickHandler?:(e:any)=>void}> {
  public render() {
     let entry = this.props.entry
      if(entry.canDownVote){
        return <button onClick={this.props.clickHandler}  type="button" id={entry._id + ":dislike"}>Dislike</button>
      } else {
        return <button onClick={this.props.clickHandler} type="button" id={entry._id + ":unDislike"}>unDislike</button>
      }
    }
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

class SimpleTable extends React.Component <{entries:QuestionEntry[], clickHandler?:(e:any)=>void}> {
    public render() {

        let rows:any = []
        let entries = this.props.entries
        for (let ix in entries) {
            rows.push(<tr key={ix}><td className="App-table">{entries[ix].question}</td>
            <td className="App-table"><UpButton entry={entries[ix]} clickHandler={this.props.clickHandler}/>
            <span>{entries[ix].numUpVotes}</span></td>
            <td className="App-table"><DownButton entry={entries[ix]} clickHandler={this.props.clickHandler}/>
            <span>{entries[ix].numDownVotes}</span></td>
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
  public handleClick(e:any) {
           let [id, direct] = e.target.id.split(':')
            let ix = this.state.questionList.findIndex((obj:QuestionEntry) => {
                    return(obj._id === id)
            })
            if (ix != -1){
                let newQuestionList =[...this.state.questionList]
                if (direct === 'like'){
                  newQuestionList[ix].numUpVotes += 1
                  newQuestionList[ix].canUpVote = !newQuestionList[ix].canUpVote
                } else if (direct === 'unLike'){
                  newQuestionList[ix].numUpVotes -= 1
                  newQuestionList[ix].canUpVote = !newQuestionList[ix].canUpVote
                } else if (direct === 'dislike') {
                  newQuestionList[ix].numDownVotes += 1
                  newQuestionList[ix].canDownVote = !newQuestionList[ix].canDownVote
                } else if (direct === 'unDislike') {
                  newQuestionList[ix].numDownVotes -= 1
                  newQuestionList[ix].canDownVote = !newQuestionList[ix].canDownVote
                }
                this.setState({questionList: newQuestionList})
             }
         }

  constructor(props: AppProps) {
    super(props)
    let emptyQuestionList: QuestionEntry[] = []
    this.state = {questionList: emptyQuestionList}
    this.state = {questionList: QuestionMOCK_DATA}
    this.handleClick = this.handleClick.bind(this)
  }
  public componentDidMount() {
    this.doFetch()
}
    public doFetch() {
    if (this.props.api_url.length) { // only fetch if the api_url is real
        FetchQuestions(this.props.api_url, (theList: QuestionEntry[]) => {
          this.setState({questionList: theList})
        })
    } else{
      this.setState({questionList: QuestionMOCK_DATA})
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
        <SimpleTable entries ={this.state.questionList} clickHandler={this.handleClick}/>
      </div>
    )
  }
}

export default App
