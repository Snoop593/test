import React from 'react';
import Input from 'arui-feather/input';
import Label from 'arui-feather/label';

const TextField = ({meta}) => (
	<div>
   	 	<Label>{meta.title}</Label>
    	<Input
    	size='m'/>
    </div>
);

export default TextField;