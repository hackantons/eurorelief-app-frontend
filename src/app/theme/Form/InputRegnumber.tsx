import React from 'react';
import Input from './Input';

const InputRegnumber = props =>
  Input({ ...props, type: 'regnumber', subtype: props.type });

export default InputRegnumber;
