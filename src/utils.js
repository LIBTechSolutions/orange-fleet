export function toDateString (date) {
    return date.toISOString().slice(0, 10)
  }
  
  export function generateId () {
    return 'OR' + (Math.floor(Math.random() * 1e15) + 1e12).toString(36)
    .replace(/i|o/, '').substring(0, 4).toUpperCase()
  }

  export function receiptId () {
    return '001' + (Math.floor(Math.random() * 1e15) + 1e12).toString(36)
    .replace(/i|o/, '').substring(0, 14).toUpperCase()
  }
