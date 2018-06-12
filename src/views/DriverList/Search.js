'use strict'

import React from 'react'
import {
    Search
} from 'material-ui-icons';
import { Input } from 'material-ui';
import { CustomInput, IconButton as SearchButton } from 'components';

const FilterType = {
  word: 'word',
  district: 'district',
  date: 'date'
}

export default class SearchData extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      word: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (evt) {
    let {name, value} = evt.target
    let newState = Object.assign({}, this.state)
    newState[name] = value.trim()
    this.setState(newState)
    this.props.onSearch(newState)
  }

  

  render () {
    const { classes } = this.props;
    return (
      <div>
       
        <Input onChange={this.handleChange} name={FilterType.word}/>
        <SearchButton color="white" aria-label="edit">
        </SearchButton>
      </div>
    )
  }
}
