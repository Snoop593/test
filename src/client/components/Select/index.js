import React from 'react';
import Select from 'arui-feather/select';
import Label from 'arui-feather/label';

const SelectField = ({meta}) =>{
	const options = [];
	for(let i in meta.options){
		options.push( { value: i, text: meta.options[i] })
	}
	return(
  <div>
   	 	<Label>{meta.title}</Label>
    	<Select
    	size='m'
    	 mode='radio' options={options} />
   </div> 
   )}

export default SelectField;
