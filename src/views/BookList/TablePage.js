import React from 'react'
import SearchData from './Search'
import TableList from './TableList'

export default class TablePage extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        currentSearchTerm: '',
        VehicleDetails: props.vehicleDetails,
        filteredVehicleDetails: props.vehicleDetails
      }
      this.filterCases = this.filterCases.bind(this)
      this.handleSearch = this.handleSearch.bind(this)
    }
  
    filterCases (searchTerm, vehicleDetails) {
      let result = vehicleDetails
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
        filteredVehicleDetails: this.filterCases(search.word, this.state.vehicleDetails),
        currentSearchTerm: search.word
      })
    }
  
    componentWillReceiveProps (nextProps) {
      this.setState({
        vehicleDetails: nextProps.vehicleDetails,
        filteredVehicleDetails: this.filterCases(this.state.currentSearchTerm, nextProps.vehicleDetails)
      })
    }
  
    render () {
      const filteredVehicleDetails = this.state.filteredVehicleDetails
  
      const complete = filteredVehicleDetails.filter(vehicleDetail => !!vehicleDetail.vehicleInfo && !!vehicleDetail.complete && !vehicleDetail.vehicleInfo.regNumber)
    //   const incomplete = filteredVehicleDetails.filter(vehicleDetail => !!vehicleDetail.caseInfo && !vehicleDetail.complete)
  
      
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
