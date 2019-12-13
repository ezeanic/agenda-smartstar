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
    if(entry.canUpVote === true && entry.canDownVote === true){
      return <button onClick={this.props.clickHandler} type="button" id={entry._id + ':like'}>Like</button>
    } else if(entry.canUpVote === false && entry.canDownVote === true){
      return <button onClick={this.props.clickHandler} type="button" id={entry._id + ':unLike'}>unLike</button>
    }else {
      return <button type="button" id={entry._id + ':like'}>Like</button>
    }
  }
}


export class DownButton extends React.Component <{entry:QuestionEntry, clickHandler?:(e:any)=>void}> {
  public render() {
    //replace the alert functions with the actual downVote and notDownVote funcitons
     let entry = this.props.entry
      if(entry.canDownVote === true && entry.canUpVote === true){
        return <button onClick={this.props.clickHandler}  type="button" id={entry._id + ":dislike"}>Dislike</button>
      } else if(entry.canDownVote === false && entry.canUpVote === true){
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

export class SimpleTable extends React.Component <{filterText:string, entries:QuestionEntry[], clickHandler?:(e:any)=>void, sortBy:string, batch:number, start:number, end:number}> {
  public render() {
    const filterText = this.props.filterText; //new

    let searchQuestions:any = []
    let rows:any = []
    let entries = this.props.entries
    let i = 0

    if(this.props.sortBy === "abc"){
      //sort alphabetically
      entries.sort(function(a:any, b:any){
        let quest1 = a.question.toString().toLowerCase()
        let quest2 = b.question.toString().toLowerCase()
        if (quest2 > quest1){
          return -1
        }
        else if (quest2 < quest1){
          return 1
        }
        else{
          return 0
        }
      })
    }else if(this.props.sortBy === "likes"){
      entries.sort(function(a:any, b:any){
        return b.numUpVotes - a.numUpVotes
      })
    }else if(this.props.sortBy === "dislikes"){
      entries.sort(function(a:any, b:any){
        return b.numDownVotes - a.numDownVotes
      })
    }else if(this.props.sortBy === "byDate"){
      entries.sort(function(a:any, b:any){
        if (b.postDate < a.postDate){
          return -1
        }
        else if (b.postDate > a.postDate){
          return 1
        }
        else{
          return 0
        }
      })
    }

    entries.forEach((entry) =>{
      if(entry.question.toLowerCase().indexOf(filterText.toLowerCase()) === -1){
      return;
      }    
    searchQuestions.push(entry)})

    if(this.props.start === 0 && this.props.end === 0){
      for(i = 0; i < searchQuestions.length; i++){
        rows.push(<tr key={i}><td className="App-table">{searchQuestions[i].question}</td>
        <td className="App-table"><UpButton entry={searchQuestions[i]} clickHandler={this.props.clickHandler}/><span>{searchQuestions[i].numUpVotes}</span></td>
        <td className="App-table"><DownButton entry={searchQuestions[i]} clickHandler={this.props.clickHandler}/><span>{searchQuestions[i].numDownVotes}</span></td>
        </tr>)
      }
    }else if(this.props.start < searchQuestions.length && this.props.end >= searchQuestions.length){
      for(i = (this.props.start); i < searchQuestions.length; i++){
        rows.push(<tr key={i}><td className="App-table">{searchQuestions[i].question}</td>
        <td className="App-table"><UpButton entry={searchQuestions[i]} clickHandler={this.props.clickHandler}/><span>{searchQuestions[i].numUpVotes}</span></td>
        <td className="App-table"><DownButton entry={searchQuestions[i]} clickHandler={this.props.clickHandler}/><span>{searchQuestions[i].numDownVotes}</span></td>
        </tr>)
      }
    }    
    else if(this.props.start < searchQuestions.length && this.props.end < searchQuestions.length){
      for(i = this.props.start; i < this.props.start + this.props.batch; i++){
        rows.push(<tr key={i}><td className="App-table">{searchQuestions[i].question}</td>
        <td className="App-table"><UpButton entry={searchQuestions[i]} clickHandler={this.props.clickHandler}/><span>{searchQuestions[i].numUpVotes}</span></td>
        <td className="App-table"><DownButton entry={searchQuestions[i]} clickHandler={this.props.clickHandler}/><span>{searchQuestions[i].numDownVotes}</span></td>
        </tr>)
      }
    }
               
    return <table  className="App-center">
      <tbody>
      <tr><th className="App-table">Question</th><th className="App-table">Like</th><th className="App-table">Dislike</th></tr>
      {rows}
      </tbody>
      </table>
  }
}

export class SortDropDown extends React.Component <{onDropDownMenuChange:(id:string )=>void}>{
  constructor(props:{onDropDownMenuChange:(id:string)=>void} ){
    super(props);
    this.handleSortChange = this.handleSortChange.bind(this)
  }

  public handleSortChange =(e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onDropDownMenuChange(e.target.selectedOptions[0].id)
  }

  public render(){
    return <select onChange = {this.handleSortChange} defaultValue='Most recent'>
      <option hidden>Sort By</option>
      <option id="byDate">Most recent</option>
      <option id="abc">Alphabetical</option>
      <option id="likes">Most likes</option>
      <option id="dislikes">Most dislikes</option>
    </select>
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

export class PageButtons extends React.Component <{onNextPageClick:()=>void, onPrevPageClick:()=>void, setNextDisabled: boolean, setPrevDisabled: boolean}>{
  constructor(props:{onNextPageClick:()=>void, onPrevPageClick:()=>void, setNextDisabled: boolean, setPrevDisabled: boolean}) {
    super(props);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
  }

  handleNextPageClick(e:any){ // button action
    this.props.onNextPageClick();
  }
  handlePrevPageClick(e:any){ // button action
    this.props.onPrevPageClick();
  }

  public render(){
    return <div className="App-batch">
        <button onClick={this.handlePrevPageClick} type="button" disabled={this.props.setPrevDisabled}> Previous Page </button>
        <button onClick={this.handleNextPageClick} type="button" disabled={this.props.setNextDisabled}> Next Page </button>
      </div>
  }
}

export class BatchingDropDown extends React.Component<{onBatchSizeChange:(id:string)=>void}>{
  constructor(props:{onBatchSizeChange:(id:string)=>void} ){
    super(props);
    this.handleBatchSizeChange = this.handleBatchSizeChange.bind(this)
  }
  
  public handleBatchSizeChange =(e: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onBatchSizeChange(e.target.selectedOptions[0].id)
  }

  public render(){
    return <select onChange={this.handleBatchSizeChange} defaultValue='Show all'>
    <option>Show all</option>
    <option id="five">Show 5 Questions</option>
    <option id="ten">Show 10 Questions</option>
    <option id="twenty">Show 20 Questions</option>
    <option id="fifty">Show 50 Questions</option>
  </select>
  }
}

class App extends React.Component <AppProps, {questionList: QuestionEntry[], questionText: string , filterText: string, sortBy:string, batchSize:number, start: number, end: number, setNextDisabled: boolean, setPrevDisabled: boolean}> {
    constructor(props: AppProps) {
        super(props)
        let defaultList: QuestionEntry[] = []
        if (this.props.testQList) {
            defaultList = this.props.testQList
        }
        this.state = {questionList: defaultList, questionText: '' , filterText: '' , sortBy: '', batchSize: 0, start:0, end:0, setPrevDisabled: true, setNextDisabled: true}
        this.handleClick = this.handleClick.bind(this) //should we change this name to handleVote?

        this.handleQuestionTextChange=this.handleQuestionTextChange.bind(this)
        this.handleQuestionSubmitChange=this.handleQuestionSubmitChange.bind(this)
        this.handleFilterTextChange=this.handleFilterTextChange.bind(this)
      
    }

    public handleQuestionTextChange(questionText: string){
        let count:number = 0
        let i:number = 0
        for(i; i < questionText.length; i++){
            if(questionText.charAt(i) ===  ' '){
                count++;
            }
        }
        if(count === questionText.length && count !== 0) {
            return
        }
        else if(questionText.charAt(0) === ' ' ){
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

  public handleSortChange = (id:string) =>{
      this.setState({sortBy:id})
  }

  public onBatchSizeChange = (id:string) =>{
    if(id === 'five'){
      this.setState({batchSize:5, start:0, end:5})
    }else if(id === 'ten'){
      this.setState({batchSize:10, start:0, end:10})
    }else if(id === 'twenty'){
      this.setState({batchSize:20, start:0, end:20})
    }else if(id === 'fifty'){
      this.setState({batchSize:50, start:0, end:50})
    }
    this.setState({setNextDisabled:false})
    this.setState({setPrevDisabled:true})
  }

  public onNextPageClick = ()=>{
    let newStart = this.state.start + this.state.batchSize
    if(newStart < this.state.questionList.length){
      this.setState({start: newStart})
      this.setState({end:newStart+this.state.batchSize})
    }
    if(newStart >= this.state.questionList.length - this.state.batchSize){
      this.setState({setNextDisabled:true})
    }
    this.setState({setPrevDisabled:false})
  }

  public onPrevPageClick = ()=>{
    let newStart = this.state.start - this.state.batchSize  
    if(newStart >= 0){
      this.setState({start:newStart})
      this.setState({end:newStart+this.state.batchSize})
    }
    if(newStart < this.state.batchSize){
      this.setState({setPrevDisabled:true})
    }
    this.setState({setNextDisabled:false})
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Questions ({process.env.NODE_ENV}:{process.env.REACT_APP_API_ENV})</h1>
        </header>
        <InputBar questionText={this.state.questionText} onQuestionTextChange={this.handleQuestionTextChange} onQuestionSubmitChange={this.handleQuestionSubmitChange}/>
        <SearchBar filterText={this.state.filterText} onFilterTextChange={this.handleFilterTextChange}/>
        <BatchingDropDown onBatchSizeChange={this.onBatchSizeChange}/>
        <SortDropDown onDropDownMenuChange={this.handleSortChange}/>
        <SimpleTable entries={this.state.questionList} clickHandler={this.handleClick} filterText={this.state.filterText} sortBy={this.state.sortBy} batch={this.state.batchSize} start={this.state.start} end={this.state.end}/>
        <PageButtons onNextPageClick={this.onNextPageClick} onPrevPageClick={this.onPrevPageClick} setPrevDisabled={this.state.setPrevDisabled} setNextDisabled={this.state.setNextDisabled}/>
      </div>
    )
  }
}

export default App