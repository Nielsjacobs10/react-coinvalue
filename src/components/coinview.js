import React, { Component } from 'react';
import axios from 'axios';
import Detail from './detail';
// import Detail from './detail';
import { BrowserRouter as Router,Route, Link } from "react-router-dom";
var NumberFormat = require('react-number-format');


class Coinview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptos: []
    }
  }

  componentDidMount() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=EUR')
      .then(res => {
        const cryptos = res.data;
        console.log(cryptos);
        this.setState({cryptos: cryptos});
      })
  }
  // const find = id => cryptos.find(p => p.fsyms == fsyms);


  render() {

    return (
      <Router>
      <div className="coinview">
        {Object.keys(this.state.cryptos).map((key) => (
          <div id="crypto-container">
           <Link to={`/Detail/${key}`}>{key}</Link>
           <span className ="right">
          <NumberFormat value={this.state.cryptos[key].EUR} displayType={'text'} decimalPrecision={2} thousandSeparator={true} prefix={'€'} />
          </span>
          {/* <NumberFormat value={this.state.cryptos[key].USD} displayType={'text'} decimalPrecision={2} thousandSeparator={true} prefix={'$'} /> */}

          </div>
        ))}
            <Route path='/Detail/:Key' component={Detail}/>

      </div>

      </Router>
    )
  }

}



export default Coinview;