;(async function () {
  // Translations -- copied from grid.user.js - please edit there
  const translations = {
    ca: {
      showOnlyVideo: 'Mostra només els participants amb video',
      highlightSpeaker: 'Ressalta el que parla',
      includeOwnVideo: 'Inclou el meu video a la graella',
    },
    da: {
      showOnlyVideo: 'Vis kun deltagere med video',
      highlightSpeaker: 'Fokus på talene personer',
      includeOwnVideo: 'Vis mig selv i Grid',
      autoEnable: 'Tænd for Grid automatisk',
      notRunning: 'Grid View kører ikke på denne side',
      noMeeting: 'Grid View kører ikke indtil du deltager i et møde',
      enabled: 'Aktiver Grid View',
      sourceCode: 'Kildekoden er tilgøngelig på Github',
      screenCaptureMode: 'Aktiver skærmoptager',
      screenCaptureModeDescription: 'Gennemtvinger 16:9, Deaktiverer navne, Låser video-positioner',
      unauthorizedWarning: 'Advarsel: Dette er ikke en autoriseret tilføjelse. Installer venligst den officielle, ved at klikke her.',
    },
    de: {
      showOnlyVideo: 'Nur Teilnehmer mit Video anzeigen',
      highlightSpeaker: 'Sprecher hervorheben',
      includeOwnVideo: 'Mich im Raster anzeigen',
    },
    en: {
      showOnlyVideo: 'Only show participants with video',
      highlightSpeaker: 'Highlight speakers',
      includeOwnVideo: 'Include yourself in the grid',
      autoEnable: 'Enable grid view by default',
      notRunning: 'Grid View is not running on this page',
      noMeeting: 'Grid View does not run until you join the meeting',
      enabled: 'Enable Grid View',
      sourceCode: 'Source Code available on Github',
      screenCaptureMode: 'Enable Screen Capture Mode',
      screenCaptureModeDescription: 'Forces 16:9, Disables names, Locks videos in place',
      unauthorizedWarning: 'WARNING: This is an unauthorized extension. Please install the official release by clicking here.',
    },
    es: {
      showOnlyVideo: 'Unicamente mostrar participantes con video',
      highlightSpeaker: 'Resaltar participantes',
      includeOwnVideo: 'Incluir mi video en el grid',
      autoEnable: 'Habilitar grid view por defect',
      notRunning: 'Grid View no funciona en esta página',
      noMeeting: 'Grid View no funciona hasta que no estés en una reunión',
      enabled: 'Habilitar Grid View',
      sourceCode: 'Código fuente disponible en Github',
      screenCaptureMode: 'Habilitar modo captura de pantalla',
      screenCaptureModeDescription: 'Forzar 16:9, Deshabilita nombres, Fija el video en su lugar',
      unauthorizedWarning: 'ATENCIÓN: Esta es una extensión no autorizada. Por favor, instale la versión oficial haciendo click aquí.',
    },
    fr: {
      showOnlyVideo: 'Ne montrer que les participants avec caméra',
      highlightSpeaker: 'Surligner ceux qui parlent',
      includeOwnVideo: 'Vous inclure dans la grille',
    },
    hr: {
      showOnlyVideo: 'Prikaži samo sudionike sa kamerom',
      highlightSpeaker: 'Naglasi govornike',
      includeOwnVideo: 'Uključi sebe u mrežnom prikazu',
    },
    it: {
      showOnlyVideo: 'Mostra solo i partecipanti con la fotocamera attiva',
      highlightSpeaker: 'Illumina chi sta parlando',
      includeOwnVideo: 'Includi te stesso nella griglia',
      autoEnable: 'Attiva sempre la griglia',
      notRunning: 'Grid View non funziona in questa pagina',
      noMeeting: 'Grid View non funziona se non sei connesso',
      enabled: 'Attiva Grid View',
      sourceCode: 'Il codice sorgente è disponibile su Github',
      screenCaptureMode: 'Attiva la modalià registrazione della schermata',
      screenCaptureModeDescription: 'Forza 16:9, Disattiva i nomi, Blocca i video nella posizione',
      unauthorizedWarning: 'ATTENZIONE: Questa estensione non è autorizzata. Installa la versione ufficiale cliccando qua.',
    },
    ja: {
      showOnlyVideo: 'カメラをオンにしている参加者のみ',
      highlightSpeaker: '発言者をハイライト',
      includeOwnVideo: '自分を含める',
    },
    nl: {
      showOnlyVideo: 'Toon alleen deelnemers met video',
      highlightSpeaker: 'Highlight sprekers',
      includeOwnVideo: 'Toon jezelf in het raster',
      autoEnable: 'Raster standaard automatisch inschakelen',
      notRunning: 'Het raster staat niet aan op deze pagina',
      noMeeting: 'Het raster is pas zichtbaar als er aan een meeting wordt deelgenomen',
      enabled: 'Zet het raster aan',
      sourceCode: 'Broncode is beschikbaar op Github',
      screenCaptureMode: 'Zet Screen Capture Mode aan',
      screenCaptureModeDescription: "Forceer 16:9, Schakel namen uit, Zet video's vast op hun plek",
    },
    pl: {
      showOnlyVideo: 'Pokaż tylko uczestników z wideo',
      highlightSpeaker: 'Wyróżnij osobę prezentującą',
      includeOwnVideo: 'Uwzględnij siebie',
    },
    pt: {
      showOnlyVideo: 'Mostrar somente participantes com vídeo',
      highlightSpeaker: 'Destacar quem está falando',
      includeOwnVideo: 'Incluir meu vídeo no grid',
      autoEnable: 'Habilitar visualização em grid por padrão',
      notRunning: 'Visualização em grid não está habilitado nesta página',
      noMeeting: 'Visualização em grid não funciona até que vocie entre em uma conferência',
      enabled: 'Habilitar visualização em grid',
      sourceCode: 'Código fonte disponível no Github',
      screenCaptureMode: 'Habilitar captura de tela',
      screenCaptureModeDescription: 'Forçar aspecto 16:9, Desabilitar nomes, Travar posição dos vídeos',
      unauthorizedWarning: 'ATENÇÃO: Esta é uma extensão não autorizada. Por favor, instale a versão oficial clicando aqui.',
    },
    sv: {
      showOnlyVideo: 'Visa endast deltagare med video',
      highlightSpeaker: 'Markera/följ talare',
      includeOwnVideo: 'Inkludera mig i rutnätet',
      autoEnable: 'Använd rutnätet som standard',
      notRunning: 'Rutnätet körs inte på denna sidan',
      noMeeting: 'Grid View körs inte till dess att du har gått med i mötet',
      enabled: 'Slå på rutnätet',
      sourceCode: 'Källkod tillgänglig på Github',
      screenCaptureMode: 'Slå på skärminspelnings läge',
      screenCaptureModeDescription: 'Tvingar 16:9, Inaktiverar namn, Låser videor på plats',
      unauthorizedWarning: 'VARNING: Detta är inte ett auktoriserat tillägg. Installera det officiella tillägget genom att klicka här.',
    },
    uk: {
      showOnlyVideo: 'Показати лише учасників з відео',
      highlightSpeaker: 'Виділити ведучого',
      includeOwnVideo: 'Включити себе',
    },
    zh: {
      showOnlyVideo: '仅显示有视讯的与会者',
      highlightSpeaker: '强调发言者',
      includeOwnVideo: '将自己的视讯显示于网格中',
    },
    'zh-TW': {
      showOnlyVideo: '僅顯示有視訊的與會者',
      highlightSpeaker: '強調發言者',
      includeOwnVideo: '將自己的視訊顯示於網格中',
    },
  }
  const T = key =>
    navigator.languages
      .concat(['en'])
      .map(l => (translations[l] && translations[l][key]) || (translations[l.split('-')[0]] && translations[l.split('-')[0]][key]))
      .find(t => t)

  // Construct HTML
  document.body.classList = 'not-running'
  document.body.innerHTML = `
    <div id="not-running">${T('notRunning')}</div>
    <div id="no-meeting">${T('noMeeting')}</div>
    <label id="enabled">
      <input type="checkbox" />
      <span>${T('enabled')}</span>
    </label>

    <div class="spacer"></div>

    <label id="show-only-video">
      <input type="checkbox" />
      <span>${T('showOnlyVideo')}</span>
    </label>
    <label id="highlight-speaker">
      <input type="checkbox" />
      <span>${T('highlightSpeaker')}</span>
    </label>
    <label id="include-own-video">
      <input type="checkbox" />
      <span>${T('includeOwnVideo')}</span>
    </label>
    <label id="auto-enable">
      <input type="checkbox" />
      <span>${T('autoEnable')}</span>
    </label>

    <div class="spacer"></div>

    <label id="screen-capture-mode">
      <input type="checkbox" />
      <span>${T('screenCaptureMode')}</span>
      <small>${T('screenCaptureModeDescription')}</small>
    </label>

    <div class="spacer"></div>

    <a id="source-code" href="https://github.com/Fugiman/google-meet-grid-view" target="_blank">
      ${T('sourceCode')}
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
  document.querySelector('#show-only-video input').checked = state.showOnlyVideo
  document.querySelector('#highlight-speaker input').checked = state.highlightSpeaker
  document.querySelector('#include-own-video input').checked = state.includeOwnVideo
  document.querySelector('#auto-enable input').checked = state.autoEnable
  document.querySelector('#screen-capture-mode input').checked = state.screenCaptureMode

  const updateScreenCaptureMode = enabled => {
    document.querySelector('#show-only-video input').checked = !enabled && state.showOnlyVideo
    document.querySelector('#show-only-video input').disabled = enabled
    document.querySelector('#show-only-video').classList.toggle('disabled', enabled)

    document.querySelector('#highlight-speaker input').checked = !enabled && state.highlightSpeaker
    document.querySelector('#highlight-speaker input').disabled = enabled
    document.querySelector('#highlight-speaker').classList.toggle('disabled', enabled)
  }
  const setDisabled = v => {
    document.querySelectorAll('label:not(#enabled)').forEach(el => el.classList.toggle('disabled', v))
    document.querySelectorAll('label:not(#enabled) input').forEach(el => (el.disabled = v))
    if (!v) updateScreenCaptureMode(document.querySelector('#screen-capture-mode input').checked)
  }

  setDisabled(!state.enabled)

  document.querySelectorAll('label').forEach(el => {
    const titleCaseID = el.id
      .split('-')
      .map(s => s.charAt(0).toUpperCase() + s.slice(1))
      .join('')
    const name = titleCaseID.charAt(0).toLowerCase() + titleCaseID.slice(1)
    const type = 'set' + titleCaseID
    el.querySelector('input').onchange = async e => {
      try {
        const response = await browser.tabs.sendMessage(tabs[0].id, { type, value: e.target.checked })
        if (response.error) throw new Error(response.error)
        state[name] = e.target.checked
        if (name === 'enabled') setDisabled(!e.target.checked)
        if (name === 'screenCaptureMode') updateScreenCaptureMode(e.target.checked)
      } catch {
        e.target.checked = !e.target.checked
      }
    }
  })
})()
