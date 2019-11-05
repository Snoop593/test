import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import {getForm} from './../redux/actions'
import axios from 'axios';
import axiosCancel from 'axios-cancel';

class App extends Component {
  componentWillMount() {
    this.props.load()
  }
  
  render() {
    let loadState = this.props.state.data.loadState
    return (
      <div>
      	{loadState==="" && <div>Загрузка ...</div>}
      	{loadState==="ready" &&  <Form/>}
      </div>
    );
  }
}

export default connect(
state=>({state}),
dispatch => ({
  	load:() =>{
  		axios.post('/getDataForm')
      		.then(json => dispatch(getForm(json.data)))
          .catch(err => console.log(err))
  		}
  })
)(App);

