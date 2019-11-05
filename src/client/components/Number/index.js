import React, { Component } from 'react';
import Input from 'arui-feather/input';
import Label from 'arui-feather/label';


class NumberField extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: '',
            error: true
        };
    }
    render(){
    return (
         <div>
   	 	<Label>{this.props.meta.title}</Label>
    	<Input
    	error={ this.state.error ? 'Только цифры' : null }
    	size='m'
        value={ this.state.value }
                    onChange={ value => this.setState({
                        value,
                        error: value.search(/[^0-9\.]/i) !== -1
                    }) }
    	/>
    </div>
)}}

export default NumberField;