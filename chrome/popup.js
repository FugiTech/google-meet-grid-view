chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { type: 'getState' }, function(response) {
    if (chrome.runtime.lastError || response.error) {
      document.body.classList = 'not-running'
      return
    }
    if (!response.inMeeting) {
      document.body.classList = 'no-meeting'
      return
    }

    document.body.classList = 'in-meeting'
    document.querySelector('#enabled input').checked = response.enabled
    document.querySelector('#show-only-video input').checked = response.showOnlyVideo
    document.querySelector('#highlight-speaker input').checked = response.highlightSpeaker
    document.querySelector('#include-own-video input').checked = response.includeOwnVideo

    const setDisabled = v => {
      document.querySelector('#show-only-video').classList = v ? 'disabled' : ''
      document.querySelector('#highlight-speaker').classList = v ? 'disabled' : ''
      document.querySelector('#include-own-video').classList = v ? 'disabled' : ''
      document.querySelector('#show-only-video input').disabled = v
      document.querySelector('#highlight-speaker input').disabled = v
      document.querySelector('#include-own-video input').disabled = v
    }

    setDisabled(!response.enabled)

    document.querySelector('#enabled input').onchange = e => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'setEnabled', value: e.target.checked }, response => {
        if (chrome.runtime.lastError || response.error) e.target.checked = !e.target.checked
        setDisabled(!e.target.checked)
      })
    }
    document.querySelector('#show-only-video input').onchange = e => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'setShowOnlyVideo', value: e.target.checked }, response => {
        if (chrome.runtime.lastError || response.error) e.target.checked = !e.target.checked
      })
    }
    document.querySelector('#highlight-speaker input').onchange = e => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'setHighlightSpeaker', value: e.target.checked }, response => {
        if (chrome.runtime.lastError || response.error) e.target.checked = !e.target.checked
      })
    }
    document.querySelector('#include-own-video input').onchange = e => {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'setIncludeOwnVideo', value: e.target.checked }, response => {
        if (chrome.runtime.lastError || response.error) e.target.checked = !e.target.checked
      })
    }
  })
})
