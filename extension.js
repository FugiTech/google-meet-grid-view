;(async function () {
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

    <div id="advanced-settings">
      <a href="#">${T('advancedSettingsLink')}</a>
    </div>

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
  for (let [k, v] of Object.entries(state.settings)) {
    const i = document.querySelector(`#${k} input`)
    if (i) i.checked = v
  }

  const updateSettings = () => {
    document.querySelectorAll('label:not(#enabled)').forEach(el => el.classList.toggle('disabled', !state.settings['enabled']))
    document.querySelectorAll('label:not(#enabled) input').forEach(el => (el.disabled = !state.settings['enabled']))

    if (state.settings['enabled']) {
      document.querySelector('#show-only-video input').checked = state.settings['show-only-video'] && !state.settings['screen-capture-mode']
      document.querySelector('#show-only-video input').disabled = state.settings['screen-capture-mode']
      document.querySelector('#show-only-video').classList.toggle('disabled', state.settings['screen-capture-mode'])

      document.querySelector('#highlight-speaker input').checked = state.settings['highlight-speaker'] && !state.settings['screen-capture-mode']
      document.querySelector('#highlight-speaker input').disabled = state.settings['screen-capture-mode']
      document.querySelector('#highlight-speaker').classList.toggle('disabled', state.settings['screen-capture-mode'])
    }
  }

  updateSettings()

  document.querySelectorAll('label').forEach(el => {
    const name = el.id
    el.querySelector('input').onchange = async e => {
      try {
        const response = await browser.tabs.sendMessage(tabs[0].id, { type: 'updateSetting', name, value: e.target.checked })
        if (response.error) throw new Error(response.error)
        state.settings[name] = e.target.checked
        updateSettings()
      } catch {
        e.target.checked = !e.target.checked
      }
    }
  })
  document.querySelector('#advanced-settings a').onclick = e => {
    e.preventDefault()
    browser.tabs.sendMessage(tabs[0].id, { type: 'updateSetting', name: 'show-settings-overlay', value: true })
  }
})()
