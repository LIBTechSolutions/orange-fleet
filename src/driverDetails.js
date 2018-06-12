import { toDateString, receiptId, generateId } from './utils'
import { toIndexableString } from 'pouchdb-collate'

/** Simple model for an IDSR case.
 *
 * The details returned will be part of a React component's state and it's
 * properties directly manipulated.
 *
 * */
export function getdrivers () {

  let driverModel = {
    created: new Date().getTime(),
    driverInfo: {
        docId: receiptId(),
        driverID: generateId(),
        date: toDateString(new Date()),
        driverType: '',
        make: '',
        model: '',
        engineNumber: '',
        plateNumber: '',
        registrationDate: '',
        expiryDate: '',
        department: '',
        tracking: ''
    }
  }
  return Object.assign({}, driverModel, {
    driverInfo: Object.assign({}, driverModel.driverInfo)
  })
}



/**
 * Return a PouchId for a case
 *
 * Use toIndexableString to create an id with relevant fields suitable for
 * sorting.
 * */
export function getId (driverDetail) {
  return toIndexableString([
    // driverDetail.driverInfo.date,
    driverDetail.created
  ]).replace(/\u0000/g, '\u0001') // Workaround for replication bug due to Chromium's URL handling
}

export function getDriverID (driverDetail) {
  const info = driverDetail.driverInfo
  return `${info.driverType} - ${info.registrationDueDate} - ${info.engineSize}`
}

/**
 * Complete a case
 *
 * Initialize id:s if necessary and mark the case completed
 * */
export function completeInfo (driverDetail) {
  if (!driverDetail._id) {
    driverDetail._id = getId(driverDetail)
  }

  driverDetail.driverInfo.driverId = getDriverID(driverDetail)
  driverDetail.complete = true

  return driverDetail
}
