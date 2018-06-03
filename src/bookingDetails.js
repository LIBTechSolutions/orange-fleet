import { toDateString, generateId } from './utils'
import { toIndexableString } from 'pouchdb-collate'

/** Simple model for an IDSR case.
 *
 * The details returned will be part of a React component's state and it's
 * properties directly manipulated.
 *
 * */
export function getVehicles () {
  
  let vehicleModel = {
    created: new Date().getTime(),
    vehicleInfo: {
        docId: generateId(),
        bookingID: generateId(),
        date: toDateString(new Date()),
        employeeID: '',
        name: '',
        title: '',
        department: '',
        startPlace: '',
        destination: '',
        purpose: '',
        bookingDate: '',
        timeout: '',
        timein: ''
    }
  }
  return Object.assign({}, vehicleModel, {
    vehicleInfo: Object.assign({}, vehicleModel.vehicleInfo)
  })
}



/**
 * Return a PouchId for a case
 *
 * Use toIndexableString to create an id with relevant fields suitable for
 * sorting.
 * */
export function getId (vehicleDetail) {
  return toIndexableString([
    // vehicleDetail.vehicleInfo.date,
    vehicleDetail.created
  ]).replace(/\u0000/g, '\u0001') // Workaround for replication bug due to Chromium's URL handling
}

export function getVehicleID (vehicleDetail) {
  const info = vehicleDetail.vehicleInfo
  return `${info.regNumber} - ${info.registrationDueDate} - ${info.engineSize}`
}

/**
 * Complete a case
 *
 * Initialize id:s if necessary and mark the case completed
 * */
export function completeInfo (vehicleDetail) {
  if (!vehicleDetail._id) {
    vehicleDetail._id = getId(vehicleDetail)
  }

  vehicleDetail.vehicleInfo.vehicleId = getVehicleID(vehicleDetail)
  vehicleDetail.complete = true

  return vehicleDetail
}