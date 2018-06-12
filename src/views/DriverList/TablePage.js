import React from 'react'
import SearchData from './Search'
import DriverList from './TableList'

export default class TablePage extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        currentSearchTerm: '',
        DriverDetails: props.driverDetails,
        filteredDriverDetails: props.driverDetails
      }
      this.filterCases = this.filterCases.bind(this)
      this.handleSearch = this.handleSearch.bind(this)
    }

    filterCases (searchTerm, driverDetails) {
      let result = driverDetails
      const stringContains = (haystack, needle) => {
        return haystack ? haystack.toLowerCase().includes(needle.toLowerCase()) : false
      }

      if (searchTerm.length > 0) {
        result = result.filter((driverDetail) => {
          if (stringContains(driverDetail.driverInfo.regNumber, searchTerm) ||
            stringContains(driverDetail.driverInfo.model, searchTerm) ||
            stringContains(driverDetail.driverInfo.driverCategory, searchTerm) ||
            stringContains(driverDetail.driverInfo.expiryDate, searchTerm)) {
            return true
          }
          return false
        })
      }
      return result
    }

    handleSearch (search) {
      this.setState({
        filteredDriverDetails: this.filterCases(search.word, this.state.driverDetails),
        currentSearchTerm: search.word
      })
    }

    componentWillReceiveProps (nextProps) {
      this.setState({
        driverDetails: nextProps.driverDetails,
        filteredDriverDetails: this.filterCases(this.state.currentSearchTerm, nextProps.driverDetails)
      })
    }

    render () {
      const filteredDriverDetails = this.state.filteredDriverDetails

      const complete = filteredDriverDetails.filter(driverDetail => !!driverDetail.driverInfo && !!driverDetail.complete && !driverDetail.driverInfo.regNumber)
    //   const incomplete = filteredDriverDetails.filter(driverDetail => !!driverDetail.caseInfo && !driverDetail.complete)


      return (
        <div>
        <div>
          <SearchData onSearch={this.handleSearch} /><br/>
          <DriverList limit={5} docs={complete} {...this.props} />
        </div>
      </div>
      )
    }
  }
