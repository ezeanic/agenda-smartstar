import * as React from 'react';
import './App.css';
import {QuestionEntry, VoteValidation} from './QuestionEntry'
import {FetchQuestions, UpVote, DownVote, NotUpVote, NotDownVote} from './API_Interface'

import {QuestionMOCK_DATA} from './Mockdata'


import logo from './logo.svg';

type AppProps = {api_url: string, testQList?:QuestionEntry[]}

function checkTest() {
    // this works with VSCode and the shell environment
    return (process.env.NODE_ENV === 'test') || (process.env.REACT_APP_API_ENV === 'test')
}

export class UpButton extends React.Component <{entry:QuestionEntry, clickHandler?:(e:any)=>void}> {
  public render() {
    //replace the alert functions with the actual upVote and notUpVote funcitons
     let entry = this.props.entry
    if(entry.canUpVote){
      return <button onClick={this.props.clickHandler} type="button" id={entry._id + ':like'}>Like</button>
    } else {
      return <button onClick={this.props.clickHandler} type="button" id={entry._id + ':unLike'}>unLike</button>
    }

  }
}


export class DownButton extends React.Component <{entry:QuestionEntry, clickHandler?:(e:any)=>void}> {
  public render() {
    //replace the alert functions with the actual downVote and notDownVote funcitons
     let entry = this.props.entry
      if(entry.canDownVote){
        return <button onClick={this.props.clickHandler}  type="button" id={entry._id + ":dislike"}>Dislike</button>
      } else {
        return <button onClick={this.props.clickHandler} type="button" id={entry._id + ":unDislike"}>unDislike</button>
      }
    }
}
export class InputBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Input Question" />
      </form>
      //Send input to postQuestion function
    );
  }
}

export class SimpleTable extends React.Component <{entries:QuestionEntry[], clickHandler?:(e:any)=>void}> {
    public render() {

        let rows:any = []
        let entries = this.props.entries
        for (let ix in entries) {
            rows.push(<tr key={ix}><td className="App-table">{entries[ix].question}</td>
            <td className="App-table"><UpButton entry={entries[ix]} clickHandler={this.props.clickHandler}/><span>{entries[ix].numUpVotes}</span></td>
            <td className="App-table"><DownButton entry={entries[ix]} clickHandler={this.props.clickHandler}/><span>{entries[ix].numDownVotes}</span></td>
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
    constructor(props: AppProps) {
        super(props)
        let defaultList: QuestionEntry[] = []
        if (this.props.testQList) {
            defaultList = this.props.testQList
        }
        this.state = {questionList: defaultList}
        this.handleClick = this.handleClick.bind(this)
    }
  

    public handleClick(e:any) {
        let [id, direct] = e.target.id.split(':')
        let ix = this.state.questionList.findIndex((obj:QuestionEntry) => {
                return(obj._id === id)
        })
        if (ix != -1){
            this.doVote(ix, id, direct)
        }
    }
      
    public componentDidMount() {
        this.doFetch()
    }

  public doFetch() {
    if (!checkTest()) { // only fetch if we're not in test mode
        FetchQuestions(this.props.api_url, (theList: QuestionEntry[]) => {
          this.setState({questionList: theList})
        })
    } else {
        if (this.props.testQList === undefined) {
            this.setState({questionList: QuestionMOCK_DATA}) // if we haven't been send anything via props
        }
    }
  }

    public handleUpVote(newQuestionList: QuestionEntry[], ix:number) {
        newQuestionList[ix].numUpVotes += 1
        newQuestionList[ix].canUpVote = !newQuestionList[ix].canUpVote
        this.setState({questionList: newQuestionList})
    }
    
    public handleNotUpVote(newQuestionList: QuestionEntry[], ix:number) {
        newQuestionList[ix].numUpVotes -= 1
        newQuestionList[ix].canUpVote = !newQuestionList[ix].canUpVote
        this.setState({questionList: newQuestionList})
    }
    
    public handleDownVote(newQuestionList: QuestionEntry[], ix:number) {
        newQuestionList[ix].numDownVotes += 1
        newQuestionList[ix].canDownVote = !newQuestionList[ix].canDownVote
        this.setState({questionList: newQuestionList})
    }
    
    public handleNotDownVote(newQuestionList: QuestionEntry[], ix:number) {
        newQuestionList[ix].numDownVotes -= 1
        newQuestionList[ix].canDownVote = !newQuestionList[ix].canDownVote
        this.setState({questionList: newQuestionList})
    }
    
    

  public doVote(ix:number, id:string, dir:string) {
    let newQuestionList =[...this.state.questionList]
    switch (dir) {
        case 'like':
            if (!checkTest()) { // only fetch if we're not in test mode
                UpVote(this.props.api_url, id, (result: VoteValidation) => {
                    if (!result.err) {
                        this.handleUpVote(newQuestionList, ix)
                    }
                })
            } else {
                this.handleUpVote(newQuestionList, ix)
            }
            break;

        case 'unLike':
            if (!checkTest()) { // only fetch if we're not in test mode
                NotUpVote(this.props.api_url, id, (result: VoteValidation) => {
                    if (!result.err) {
                        this.handleNotUpVote(newQuestionList, ix)
                    }
                })
            } else {
                this.handleNotUpVote(newQuestionList, ix)
            }
            break

        case 'dislike':
            if (!checkTest()) { // only fetch if we're not in test mode
                DownVote(this.props.api_url, id, (result: VoteValidation) => {
                    if (!result.err) {
                        this.handleDownVote(newQuestionList, ix)
                    }
                })
            } else {
                this.handleDownVote(newQuestionList, ix)
            }
            break
        
        case 'unDislike':
            if (!checkTest()) { // only fetch if we're not in test mode
                NotDownVote(this.props.api_url, id, (result: VoteValidation) => {
                    if (!result.err) {
                        this.handleNotDownVote(newQuestionList, ix)
                    }
                })
            } else {
                this.handleNotDownVote(newQuestionList, ix)
            }
            break

        default:
            console.log("No such case")
    }
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Questions ({process.env.NODE_ENV}:{process.env.REACT_APP_API_ENV})</h1>
        </header>
        <InputBar/>
        <SimpleTable entries={this.state.questionList} clickHandler={this.handleClick} />
      </div>
    )
  }
}

export default App
