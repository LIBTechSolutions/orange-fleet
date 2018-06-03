import React from 'react'
import SearchData from './Search'
import TableList from './TableList'

export default class TablePage extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        currentSearchTerm: '',
        idsrCases: props.idsrCases,
        filteredIdsrCases: props.idsrCases
      }
      this.filterCases = this.filterCases.bind(this)
      this.handleSearch = this.handleSearch.bind(this)
    }
  
    filterCases (searchTerm, idsrCases) {
      let result = idsrCases
      const stringContains = (haystack, needle) => {
        return haystack ? haystack.toLowerCase().includes(needle.toLowerCase()) : false
      }
  
      if (searchTerm.length > 0) {
        result = result.filter((vehicleDetail) => {
          if (stringContains(vehicleDetail.vehicleInfo.regNumber, searchTerm) ||
            stringContains(vehicleDetail.vehicleInfo.model, searchTerm) ||
            stringContains(vehicleDetail.vehicleInfo.vehicleCategory, searchTerm) ||
            stringContains(vehicleDetail.vehicleInfo.expiryDate, searchTerm)) {
            return true
          }
          return false
        })
      }
      return result
    }
  
    handleSearch (search) {
      this.setState({
        filteredIdsrCases: this.filterCases(search.word, this.state.idsrCases),
        currentSearchTerm: search.word
      })
    }
  
    componentWillReceiveProps (nextProps) {
      this.setState({
        vehicleDetails: nextProps.idsrCases,
        filteredIdsrCases: this.filterCases(this.state.currentSearchTerm, nextProps.idsrCases)
      })
    }
  
    render () {
      const filteredIdsrCases = this.state.filteredIdsrCases
      console.log(filteredIdsrCases)
  
      const complete = filteredIdsrCases.filter(vehicleDetail => !!vehicleDetail.vehicleInfo && !!vehicleDetail.complete && !vehicleDetail.vehicleInfo.employeeID)
    //   const incomplete = filteredIdsrCases.filter(idsrCase => !!idsrCase.caseInfo && !idsrCase.complete)
  
      
      return (
        <div>
        <div>
          <SearchData onSearch={this.handleSearch} /><br/>
          <TableList limit={5} docs={complete} {...this.props} />
        </div>
      </div>
      )
    }
  }
