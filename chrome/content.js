// Pass state between browser action & injected script
const inFlightRequests = new Map()

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const id = +new Date()
  inFlightRequests.set(id, sendResponse)
  window.postMessage({
    id,
    sender: 'gmgv_content',
    ...message
  })
  return true
})

window.addEventListener("message", event => {
  if (event.source !== window) return // Only accept messages from ourselves
  if (event.data.sender !== 'gmgv_user') return
  const sendResponse = inFlightRequests.get(event.data.id)
  inFlightRequests.delete(event.data.id)
  delete event.data.id
  delete event.data.sender
  if (sendResponse) sendResponse(event.data)
})

// Add our user script
var s = document.createElement('script')
s.src = chrome.extension.getURL('grid.user.js')
document.body.appendChild(s)
