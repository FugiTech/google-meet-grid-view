// Pass state between browser action & injected script
const inFlightRequests = new Map()

browser.runtime.onMessage.addListener(message => {
  const id = +new Date()
  const p = new Promise(resolve => {
    inFlightRequests.set(id, resolve)
  })
  window.postMessage({
    id,
    sender: 'gmgv_content',
    ...message,
  })
  return p
})

window.addEventListener('message', event => {
  if (event.source !== window) return // Only accept messages from ourselves
  if (event.data.sender !== 'gmgv_user') return
  const sendResponse = inFlightRequests.get(event.data.id)
  inFlightRequests.delete(event.data.id)
  delete event.data.id
  delete event.data.sender
  if (sendResponse) sendResponse(event.data)
})

// Add our user script
var scripts = ['grid.user.js']
scripts.forEach(function(script) {
  var s = document.createElement('script')
  s.setAttribute('data-version', browser.runtime.getManifest().version)
  s.src = browser.extension.getURL(script)
  document.body.appendChild(s)
});

