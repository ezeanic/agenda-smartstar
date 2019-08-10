import * as React from 'react';
import './App.css';
import {QuestionEntry, VoteValidation} from './QuestionEntry'
import {FetchQuestions,PostQuestions, UpVote, DownVote, NotUpVote, NotDownVote} from './API_Interface'

import {QuestionMOCK_DATA} from './Mockdata'
import logo from './logo.svg';

type AppProps = {api_url: string, testQList?:QuestionEntry[]}
type InputBarProps = {onQuestionTextChange:(value:string)=>void, onQuestionSubmitChange:()=>void, questionText:string} //just added to create props for input bar
type SearchBarProps = {onFilterTextChange:(value:string)=> void , filterText:string } //new

function checkTest() {
    // this works with VSCode and the shell environment
    return (process.env.NODE_ENV === 'test') || (process.env.REACT_APP_API_ENV === 'test')
}

export class UpButton extends React.Component <{entry:QuestionEntry, clickHandler?:(e:any)=>void}> {
  public render() {
      //console.log("reaching up")
    //replace the alert functions with the actual upVote and notUpVote funcitons
     let entry = this.props.entry
    if(entry.canUpVote == true && entry.canDownVote == true){
      return <button onClick={this.props.clickHandler} type="button" id={entry._id + ':like'}>Like</button>
    } else if(entry.canUpVote == false && entry.canDownVote == true){
      return <button onClick={this.props.clickHandler} type="button" id={entry._id + ':unLike'}>unLike</button>
    } else {
      return <button type="button" id={entry._id + ':like'}>Like</button>
    }

  }
}


export class DownButton extends React.Component <{entry:QuestionEntry, clickHandler?:(e:any)=>void}> {
  public render() {
    //replace the alert functions with the actual downVote and notDownVote funcitons
     let entry = this.props.entry
      if(entry.canDownVote == true && entry.canUpVote == true){
        return <button onClick={this.props.clickHandler}  type="button" id={entry._id + ":dislike"}>Dislike</button>
      } else if(entry.canDownVote == false && entry.canUpVote == true){
        return <button onClick={this.props.clickHandler} type="button" id={entry._id + ":unDislike"}>unDislike</button>
      } else {
        return <button type="button" id={entry._id + ':dislike'}>Dislike</button>
      }
    }
}
export class InputBar extends React.Component<InputBarProps>{
constructor(props:InputBarProps){
    super(props);
    this.handleQuestionTextChange = this.handleQuestionTextChange.bind(this)
    this.handleQuestionSubmitChange = this.handleQuestionSubmitChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)

}

handleQuestionTextChange(e:any){
    this.props.onQuestionTextChange(e.target.value);
}

handleQuestionSubmitChange(e:any){ // button action
    this.props.onQuestionSubmitChange();
}
handleKeyPress(e:any){
    if (e.key === 'Enter'){
        e.preventDefault()
        this.props.onQuestionSubmitChange();
    }
}
    render() {
    return (
      <form>     
        <input type="text" placeholder="Input Question" value={this.props.questionText} onChange={this.handleQuestionTextChange}
        onKeyPress={this.handleKeyPress} 
        />
        <button type="button" onClick={this.handleQuestionSubmitChange}> Submit </button>
      </form>
      //Send input to postQuestion function
      //could use print default if we get rid of the on keypress for submit
    );
  }
}



export class SimpleTable extends React.Component <{filterText:string, entries:QuestionEntry[], clickHandler?:(e:any)=>void}> {
    public render() {
        const filterText = this.props.filterText; //new
        //new

        let searchQuestions:any = []
        let rows:any = []
        let entries = this.props.entries
        entries.sort(function(a:any, b:any){
          return b.numUpVotes - a.numUpVotes
        })

        entries.forEach((entry) =>{
            if(entry.question.toLowerCase().indexOf(filterText.toLowerCase()) === -1){
                return;
            }
           
            searchQuestions.push(entry)})
         
        for (let ix in searchQuestions) {
            rows.push(<tr key={ix}><td className="App-table">{searchQuestions[ix].question}</td>
            <td className="App-table"><UpButton entry={searchQuestions[ix]} clickHandler={this.props.clickHandler}/><span>{searchQuestions[ix].numUpVotes}</span></td>
            <td className="App-table"><DownButton entry={searchQuestions[ix]} clickHandler={this.props.clickHandler}/><span>{searchQuestions[ix].numDownVotes}</span></td>
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

export class SearchBar extends React.Component <SearchBarProps>  {
    constructor(props:SearchBarProps) {
      super(props);
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
    
    handleFilterTextChange(e:any) {
      this.props.onFilterTextChange(e.target.value);
    }
    
   
    
    render() {
      return (
        <form>
          <input
            type="text"
            placeholder="Search..."
            value={this.props.filterText}
            onChange={this.handleFilterTextChange}
          />
        </form>
      );
    }
  }

class App extends React.Component <AppProps, {questionList: QuestionEntry[], questionText: string , filterText: string}> {
    constructor(props: AppProps) {
        super(props)
        let defaultList: QuestionEntry[] = []
        if (this.props.testQList) {
            defaultList = this.props.testQList
        }
        this.state = {questionList: defaultList, questionText: '' , filterText: '' }
        this.handleClick = this.handleClick.bind(this) //should we change this name to handleVote?

        this.handleQuestionTextChange=this.handleQuestionTextChange.bind(this)
        this.handleQuestionSubmitChange=this.handleQuestionSubmitChange.bind(this)
        this.handleFilterTextChange=this.handleFilterTextChange.bind(this)
       

    }

    public handleQuestionTextChange(questionText: string){
        let count:number = 0
        let i:number = 0
        for(i; i < questionText.length; i++){
            if(questionText.charAt(i) ==  ' '){
                count++;
            }
        }
        if(count == questionText.length && count != 0) {
            return
        }
        else if(questionText.charAt(0) == ' ' ){
            return
        }
        else { 
            //console.log("reaching handler:" + questionText + ':')
            this.setState({questionText: questionText})
        }
    }

    public handleQuestionSubmitChange(){
        //alert(this.state.questionText)
        //console.log(this.state.questionText)
        PostQuestions(this.props.api_url, this.state.questionText, (refreshQuestions: QuestionEntry) =>{
            this.doFetch()
            this.setState({questionText: ""});
        })

    }
    
  public handleFilterTextChange(filterText:string) {
    this.setState({filterText: filterText});
  }

  
    public handleClick(e:any) {
        let [id, direct] = e.target.id.split(':')
        let ix = this.state.questionList.findIndex((obj:QuestionEntry) => {
                return(obj._id === id)
        })
        if (ix !== -1){
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
  // public sortUpVotes(entries: QuestionEntry[], numUpVotes:number){

  // }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Questions ({process.env.NODE_ENV}:{process.env.REACT_APP_API_ENV})</h1>
        </header>
        <InputBar questionText={this.state.questionText} onQuestionTextChange={this.handleQuestionTextChange} onQuestionSubmitChange={this.handleQuestionSubmitChange}/>
        <SearchBar filterText={this.state.filterText} onFilterTextChange={this.handleFilterTextChange}/>
        <SimpleTable entries={this.state.questionList} clickHandler={this.handleClick} filterText={this.state.filterText}/>
      </div>
    )
  }
}

export default App