;(async function () {
  if (document.currentScript && document.currentScript.src === 'https://cdn.jsdelivr.net/gh/Fugiman/google-meet-grid-view/extension.min.js') {
    // We're running the cached CDN version, load the uncached version (rotates hourly)
    const s = document.createElement('script')
    s.src = 'https://cdn.jsdelivr.net/gh/Fugiman/google-meet-grid-view/extension.js?t=' + Math.floor(new Date() / 3600000)
    document.body.appendChild(s)
    return
  }

  // if we're running v1.19 of popup.html, patch the HTML to match what we expect
  if (typeof TranslationFactory === 'undefined') {
    // Include grid.user.js to get access to TranslationFactory
    await new Promise(resolve => {
      const gridScript = document.createElement('script')
      gridScript.setAttribute('charset', 'utf-8')
      gridScript.onload = resolve
      gridScript.src = 'https://cdn.jsdelivr.net/gh/Fugiman/google-meet-grid-view/grid.user.js?t=' + Math.floor(new Date() / 3600000)
      document.body.appendChild(gridScript)
    })
  }

  const T = TranslationFactory()

  // Construct HTML
  document.body.classList = 'not-running'
  document.body.innerHTML = `
    <div id="not-running">${T('notRunning')}</div>
    <div id="no-meeting">${T('noMeeting')}</div>
    <label id="enabled">
      <input type="checkbox" />
      ${T('enabled')}
    </label>

    <div class="spacer"></div>

    <label id="show-only-video">
      <input type="checkbox" />
      ${T('showOnlyVideo')}
    </label>
    <label id="highlight-speaker">
      <input type="checkbox" />
      ${T('highlightSpeaker')}
    </label>
    <label id="include-own-video">
      <input type="checkbox" />
      ${T('includeOwnVideo')}
    </label>
    <label id="auto-enable">
      <input type="checkbox" />
      ${T('autoEnable')}
    </label>

    <div class="spacer"></div>

    <label id="screen-capture-mode">
      <input type="checkbox" />
      ${T('screenCaptureMode')}
    </label>
    <small id="screen-capture-mode-desc">${T('screenCaptureModeDescription')}</small>

    <div class="spacer"></div>

    <div id="source-code">
      <small>v${browser.runtime.getManifest().version}</small>
      <a href="https://github.com/Fugiman/google-meet-grid-view" target="_blank">
        ${T('sourceCode')}
      </a>
    </div>
  `

  // Get state
  const tabs = await browser.tabs.query({ active: true, currentWindow: true })
  const state = await browser.tabs.sendMessage(tabs[0].id, { type: 'getState' })
  if (state.error) return

  if (!state.inMeeting) {
    document.body.classList = 'no-meeting'
    return
  }

  document.body.classList = 'in-meeting'
  document.querySelector('#enabled input').checked = state.enabled
  for (let [k, v] of Object.entries(state.settings)) {
    document.querySelector(`#${k} input`).checked = v
  }

  const updateScreenCaptureMode = enabled => {
    document.querySelector('#show-only-video input').checked = !enabled && state.settings['show-only-video']
    document.querySelector('#show-only-video input').disabled = enabled
    document.querySelector('#show-only-video').classList.toggle('disabled', enabled)

    document.querySelector('#highlight-speaker input').checked = !enabled && state.settings['highlight-speaker']
    document.querySelector('#highlight-speaker input').disabled = enabled
    document.querySelector('#highlight-speaker').classList.toggle('disabled', enabled)
  }
  const setDisabled = v => {
    document.querySelectorAll('label:not(#enabled)').forEach(el => el.classList.toggle('disabled', v))
    document.querySelectorAll('label:not(#enabled) input').forEach(el => (el.disabled = v))
    if (!v) updateScreenCaptureMode(document.querySelector('#screen-capture-mode input').checked)
  }

  setDisabled(!state.enabled)

  document.querySelector('#enabled input').onchange = async e => {
    try {
      const response = await browser.tabs.sendMessage(tabs[0].id, { type: 'setEnabled', value: e.target.checked })
      if (response.error) throw new Error(response.error)
      state.enabled = e.target.checked
      setDisabled(!e.target.checked)
    } catch {
      e.target.checked = !e.target.checked
    }
  }
  document.querySelectorAll('label:not(#enabled)').forEach(el => {
    const name = el.id
    el.querySelector('input').onchange = async e => {
      try {
        const response = await browser.tabs.sendMessage(tabs[0].id, { type: 'updateSetting', name, value: e.target.checked })
        if (response.error) throw new Error(response.error)
        state.settings[name] = e.target.checked
        if (name === 'screen-capture-mode') updateScreenCaptureMode(e.target.checked)
      } catch {
        e.target.checked = !e.target.checked
      }
    }
  })
})()
