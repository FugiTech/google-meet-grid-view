chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { type: 'getState' }, function (response) {
    if (chrome.runtime.lastError || response.error) {
      document.body.classList = 'not-running'
      return
    }

    const T = key =>
      response.languages
        .concat(['en'])
        .map(l => (response.translations[l] && response.translations[l][key]) || (response.translations[l.split('-')[0]] && response.translations[l.split('-')[0]][key]))
        .find(t => t)

    document.querySelector('#not-running').innerText = T('notRunning')
    document.querySelector('#no-meeting').innerText = T('noMeeting')
    document.querySelector('#enabled span').innerText = T('enabled')
    document.querySelector('#show-only-video span').innerText = T('showOnlyVideo')
    document.querySelector('#highlight-speaker span').innerText = T('highlightSpeaker')
    document.querySelector('#include-own-video span').innerText = T('includeOwnVideo')
    document.querySelector('#auto-enable span').innerText = T('autoEnable')
    document.querySelector('#screen-capture-mode span').innerText = T('screenCaptureMode')
    document.querySelector('#screen-capture-mode small').innerText = T('screenCaptureModeDescription')
    document.querySelector('#source-code').innerText = T('sourceCode')

    if (!response.inMeeting) {
      document.body.classList = 'no-meeting'
      return
    }

    document.body.classList = 'in-meeting'
    document.querySelector('#enabled input').checked = response.enabled
    document.querySelector('#show-only-video input').checked = response.showOnlyVideo
    document.querySelector('#highlight-speaker input').checked = response.highlightSpeaker
    document.querySelector('#include-own-video input').checked = response.includeOwnVideo
    document.querySelector('#auto-enable input').checked = response.autoEnable
    document.querySelector('#screen-capture-mode input').checked = response.screenCaptureMode

    const updateScreenCaptureMode = enabled => {
      document.querySelector('#show-only-video input').checked = !enabled && response.showOnlyVideo
      document.querySelector('#show-only-video input').disabled = enabled
      document.querySelector('#show-only-video').classList.toggle('disabled', enabled)

      document.querySelector('#highlight-speaker input').checked = !enabled && response.highlightSpeaker
      document.querySelector('#highlight-speaker input').disabled = enabled
      document.querySelector('#highlight-speaker').classList.toggle('disabled', enabled)
    }
    const setDisabled = v => {
      document.querySelectorAll('label:not(#enabled)').forEach(el => el.classList.toggle('disabled', v))
      document.querySelectorAll('label:not(#enabled) input').forEach(el => (el.disabled = v))
      if (!v) updateScreenCaptureMode(document.querySelector('#screen-capture-mode input').checked)
    }

    setDisabled(!response.enabled)

    document.querySelectorAll('label').forEach(el => {
      const titleCaseID = el.id
        .split('-')
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join('')
      const name = titleCaseID.charAt(0).toLowerCase() + titleCaseID.slice(1)
      const type = 'set' + titleCaseID
      el.querySelector('input').onchange = e => {
        chrome.tabs.sendMessage(tabs[0].id, { type, value: e.target.checked }, response => {
          if (chrome.runtime.lastError || response.error) e.target.checked = !e.target.checked
          response[name] = e.target.checked
          if (name === 'enabled') setDisabled(!e.target.checked)
          if (name === 'screenCaptureMode') updateScreenCaptureMode(e.target.checked)
        })
      }
    })
  })
})
