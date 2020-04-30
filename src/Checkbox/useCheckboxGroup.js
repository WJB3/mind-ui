import * as React from 'react';
import CheckGroupContext from './CheckGroupContext';

export default function useCheckboxGroup() {
  return React.useContext(CheckGroupContext);
}
