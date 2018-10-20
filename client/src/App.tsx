import * as React from 'react';
import './App.css';

import logo from './logo.svg';

type AppProps = {api_url: string}

class ContactEntry {
    firstName: String
    lastName: String
    email: String
    company: String
    phone: Number
    createdDate: Date
}

class SimpleTable extends React.Component <{entries:ContactEntry[]},{}> {
    public render() {
        let rows:any = []
        for (let entry of this.props.entries) {
            rows.push(<tr><td className="App-table">{entry.firstName}</td> <td className="App-table">{entry.lastName}</td></tr>)
        }
        return <table  className="App-center">
                <tr><th className="App-table">First Name</th><th className="App-table">Last Name</th></tr>
                {rows}
               </table>
    }
}

class App extends React.Component <AppProps, {contactList: ContactEntry []}> {

  constructor(props: AppProps) {
    super(props)
    let emptyContactList: ContactEntry[] = []
    this.state = {contactList: emptyContactList}
    this.doFetch()
  }
  
  public doFetch() {
    fetch(this.props.api_url)
    .then( (response) => { 
            return response.json(); }
            )
    .then( (json) => {
            this.setState({contactList: json})
        })
    .catch( (err) => {
            console.log(`err : ${err}`);
    })
  }

  public render() {
  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Contacts</h1>
        </header>
        <SimpleTable entries={this.state.contactList}/>
      </div>
    );
  }
}

export default App;
