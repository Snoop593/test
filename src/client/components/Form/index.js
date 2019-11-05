import TextField from './../Text';
import SelectField from './../Select';
import NumberField from './../Number';
import {postResult,breakResult,successResult} from './../../redux/actions'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import axiosCancel from 'axios-cancel';
import {
    FieldGroup,
    FieldControl
 } from "react-reactive-form";
import FormA from 'arui-feather/form';
import FormField from 'arui-feather/form-field';
import Button from 'arui-feather/button';
import Spin from 'arui-feather/spin';
import './style.css';

const obj = {
  LIST : SelectField,
  TEXT : TextField,
  NUMERIC: NumberField
}

class Form extends Component {

  constructor(props) {
    super(props);
    this.names = [];
  }

	postResult(e){
    e.preventDefault();
    const form = e.target  
    let obj = {}
    for(let i=0;i<this.names.length;i++){
      obj[`${this.names[i]}`] = form[i].value
    }
    let json = JSON.stringify(obj)
		this.props.sendResult(json)
	}
  breakResult(e){
    e.preventDefault();
    let cancel = axios.CancelToken;
    cancel.source().cancel()
    this.props.sendResult("",cancel)
  }

	render() {
    let {title,image,fields,resultState} = this.props.state.data
    this.names = fields.map(e=>e.name)
    return (
     <div>
     <FormA onSubmit={this.postResult.bind(this)}>
     {fields.map(e=>(
      <FormField size='m'>
        {takeType(e)}
       </FormField>
     ))}
     <div class="image"><img src={image} alt="Картинка" /></div>  
     <Button type='submit'>Отправить</Button>      
      </FormA>
       {resultState==="ready" && <div><Spin size='xl' visible={ true }/><Button onClick={this.breakResult.bind(this)}>Отмена</Button></div>}
      </div>
    )
  }
}

function takeType(e){
  switch(e.type){
    case "TEXT":{
      return <TextField meta={{ title: e.title}}/>
    }
    case "NUMERIC":{
       return <NumberField meta={{ title: e.title}}/>
    }
     case "LIST":{
        return <SelectField meta={{ title: e.title,options: e.values}}/>
      }
  }
}

export default connect(
state=>({state}),
dispatch => ({
  sendResult:(json,cancel) =>{	
  		dispatch(postResult())
  		axios.put(`/putFormValue`,json,{
        cancelToken: cancel
      })
      .then(json => dispatch(successResult(json)))
      .catch(err => {
        if (axios.isCancel(err)) {
         console.log(err)
        } else {
          return dispatch(breakResult());
        }
      })
  }
}))(Form);

/* <div>
      <FieldGroup
      render={({ get, invalid }) => (
      <FormA onSubmit={this.postResult.bind(this)}>
      {fields.map(e=>
        
        <FormField>
            <FieldControl
                    name={e.name}
                    render={obj[e.type]}
                    meta={{ title: e.title,options: e.values}}
                  />
        </FormField>)}
        <div class="image"><img src={image} alt="Картинка" /></div>  
      <Button type='submit'>Отправить</Button>
      
      </FormA>
      )}
              />
      {resultState==="ready" && <div><Spin size='xl' visible={ true }/><Button onClick={this.breakResult.bind(this)}>Отмена</Button></div>}
      </div>*/

      /*switch(e.type){
              case "TEXT":{
                return <TextField meta={{ title: e.title}}/>
              }
              case "NUMERIC":{
                return <NumberField meta={{ title: e.title}}/>
              }
              case "LIST":{
                return <SelectField meta={{ title: e.title,options: e.values}}/>
              }
          }*/