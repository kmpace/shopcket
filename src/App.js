import React, { Component } from 'react';

class App extends Component {


  state = {
    item: ''

  };
  
  fetchItem = (evt) => {
    evt.preventDefault();
    console.log('Fetch Item for', this.state.item);

  }


newItem = (evt) => {
  this.setState({
    item: evt.target.value

  })


} 



  render() {
    return (
      <div>
      <h1>Price Scanner</h1>
      <form onSubmit={this.fetchItem}>
      <label>I want to track
        <input placeholder={"Paste URL Here"} 
               type="text"
               value={this.state.item}
               onChange={this.newItem}
            /> 
    </label>
  </form>
</div>



    );
  }
}

export default App;
