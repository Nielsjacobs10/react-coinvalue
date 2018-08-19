import React, { Component } from 'react';
// import { store, Provider } from 'react-redux';
import './App.css';
import Coinview from '../components/coinview';
import Footer from '../components/footer';
import NavComponent from '../components/navbar';;
// const store

class App extends Component {
  render() {
    return (
    // <Provider store={store}>
      <div className="App">
       <NavComponent />
        <main>
        <Coinview />
        </main>
        <Footer />
      </div>
      // </Provider>
    )
  }
}

export default App;