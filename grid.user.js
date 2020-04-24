// ==UserScript==
// @name         Google Meet Grid View
// @namespace    https://fugi.tech/
// @version      1.26
// @description  Adds a toggle to use a grid layout in Google Meets
// @author       Chris Gamble
// @include      https://meet.google.com/*
// @grant        none
// @run-at       document-idle
// @inject-into  content
// ==/UserScript==

;(function () {
  // If included by our extension's icon page, export translation factory
  if (
    (document.currentScript && document.currentScript.src === window.location.href.replace('popup.html', 'grid.user.js')) ||
    window.location.href === 'chrome-extension://kklailfgofogmmdlhgmjgenehkjoioip/popup.html' // Chrome v1.19
  ) {
    // If imported, export the translation factory
    window.TranslationFactory = TranslationFactory
  } else if (document.currentScript && document.currentScript.src === 'https://cdn.jsdelivr.net/gh/Fugiman/google-meet-grid-view/grid.user.min.js') {
    // We're running the cached CDN version, load the uncached version (rotates hourly)
    const s = document.createElement('script')
    s.src = 'https://cdn.jsdelivr.net/gh/Fugiman/google-meet-grid-view/grid.user.js?t=' + Math.floor(new Date() / 3600000)
    s.setAttribute('nonce', window._F_getIjData().csp_nonce)
    document.body.appendChild(s)
  } else if (typeof unsafeWindow !== 'undefined') {
    // If running in a sandbox, break out of the sandbox
    const scriptData = `(function(){
      Main();
      ${TranslationFactory.toString()};
      ${Main.toString()};
    })()`

    const s = document.createElement('script')
    s.setAttribute('data-version', GM.info.script.version)
    s.src = URL.createObjectURL(new Blob([scriptData], { type: 'text/javascript' }))
    document.body.appendChild(s)
  } else {
    // Otherwise we're running as an unsandboxed user script
    // and we should just do the thing
    Main()
  }

  function TranslationFactory() {
    const translations = {
      ca: {
        showOnlyVideo: 'Mostra només els participants amb video',
        highlightSpeaker: 'Ressalta els que parlen',
        includeOwnVideo: 'Inclou el meu video a la graella',
        autoEnable: 'Habilita la vista en graella de manera predeterminada',
        notRunning: "La vista en graella no s'està executant en aquesta pàgina",
        noMeeting: "La vista en graella no s'executarà fins que no et connectis a una trucada",
        enabled: 'Activar vista en graella',
        sourceCode: 'Codi font disponible a Github',
        screenCaptureMode: 'Activar mode de captura',
        screenCaptureModeDescription: 'Força 16:9, desactiva els noms, bloqueja vídeos al seu lloc',
        unauthorizedWarning: "ATENCIÓ: es tracta d'una extensió no autoritzada. Instal·leu l'extensió oficial fent clic aquí.",
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
        autoEnable: 'Rasteransicht automatisch aktivieren',
        notRunning: 'Rasteransicht ist für diese Seite nicht aktiv',
        noMeeting: 'Rasteransicht ist solange nicht aktiv, bis Sie dem Meeting beitreten',
        enabled: 'Rasteransicht anschalten',
        sourceCode: 'Der Quellcode ist auf Github zugänglich',
        screenCaptureMode: 'Aktiviere Bildschirmaufnahme Modus',
        screenCaptureModeDescription: 'Erwingt 16:9, entfernt Namen, fixiert Video Position',
        unauthorizedWarning: 'WARNUNG: Dieses ist eine nicht autorisiert Erweiterung. Bitte installieren Sie die offizielle Version, klicken Sie dafür hier.',
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
        showOnlyVideo: 'Mostrar solo participantes con vídeo',
        highlightSpeaker: 'Resaltar los que hablan',
        includeOwnVideo: 'Incluir mi vídeo en la cuadrícula',
        autoEnable: 'Habilitar vista en cuadrícula por defecto',
        notRunning: 'La vista en cuadrícula no funciona en esta página',
        noMeeting: 'La vista en cuadrícula no funciona hasta que no estés en una llamada',
        enabled: 'Habilitar vista en cuadrícula',
        sourceCode: 'Código fuente disponible en Github',
        screenCaptureMode: 'Habilitar modo captura de pantalla',
        screenCaptureModeDescription: 'Forzar 16:9, deshabilita nombres, fija el vídeo en su lugar',
        unauthorizedWarning: 'ATENCIÓN: Esta es una extensión no autorizada. Por favor, instale la versión oficial haciendo clic aquí.',
      },
      fr: {
        showOnlyVideo: 'Ne montrer que les participants avec caméra',
        highlightSpeaker: 'Surligner ceux qui parlent',
        includeOwnVideo: 'Vous inclure dans la grille',
        autoEnable: 'Activer la vue grille par défaut',
        notRunning: 'La vue grille ne fonctionne pas sur cette page',
        noMeeting: 'La vue grille ne fonctionne pas tant que vous ne rejoignez pas de réunion',
        enabled: 'Activer la vue grille',
        sourceCode: 'Code source disponible sur Github',
        screenCaptureMode: "Activer le mode capture d'écran",
        screenCaptureModeDescription: "Force l'affichage 16:9, désactive les noms, vérrouille les positions des vidéos",
        unauthorizedWarning: "ATTENTION : Il s'agit d'une extension non autorisée. Installez la version officielle en cliquant ici.",
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
        autoEnable: '初期状態でグリッド表示を有効化',
        screenCaptureMode: '画面キャプチャモードを有効化',
        screenCaptureModeDescription: '画面比率を16:9, 名前を非表示, ビデオの位置を固定にします。',
      },
      nl: {
        showOnlyVideo: 'Toon alleen deelnemers met video',
        highlightSpeaker: 'Highlight sprekers',
        includeOwnVideo: 'Toon jezelf in het raster',
        autoEnable: 'Raster automatisch inschakelen',
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
        showOnlyVideo: 'Mostrar apenas participantes com vídeo',
        highlightSpeaker: 'Realçar quem está a falar',
        includeOwnVideo: 'Incluir o meu vídeo na grelha',
        autoEnable: 'Ativar visualização em grelha por defeito',
        notRunning: 'Visualização em grelha não está activada nesta página',
        noMeeting: 'Visualização em grelha não funciona até que entre numa conferência',
        enabled: 'Ativar visualização em grelha',
        sourceCode: 'Código fonte disponível no Github',
        screenCaptureMode: 'Ativar captura de ecrã',
        screenCaptureModeDescription: 'Forçar aspeto 16:9, Remover nomes, Parar posição dos vídeos',
        unauthorizedWarning: 'ATENÇÃO: Esta é uma extensão não autorizada. Por favor, clique aqui para instalar a versão oficial.',
      },
      'pt-BR': {
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

    return T
  }

  function Main() {
    const T = TranslationFactory()

    // SVGs
    const gridOff =
      '<path fill="currentColor" d="M0,2.77L1.28,1.5L22.5,22.72L21.23,24L19.23,22H4C2.92,22 2,21.1 2,20V4.77L0,2.77M10,4V7.68L8,5.68V4H6.32L4.32,2H20A2,2 0 0,1 22,4V19.7L20,17.7V16H18.32L16.32,14H20V10H16V13.68L14,11.68V10H12.32L10.32,8H14V4H10M16,4V8H20V4H16M16,20H17.23L16,18.77V20M4,8H5.23L4,6.77V8M10,14H11.23L10,12.77V14M14,20V16.77L13.23,16H10V20H14M8,20V16H4V20H8M8,14V10.77L7.23,10H4V14H8Z" />'
    const gridOn =
      '<path fill="currentColor" d="M10,4V8H14V4H10M16,4V8H20V4H16M16,10V14H20V10H16M16,16V20H20V16H16M14,20V16H10V20H14M8,20V16H4V20H8M8,14V10H4V14H8M8,8V4H4V8H8M10,14H14V10H10V14M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4C2.92,22 2,21.1 2,20V4A2,2 0 0,1 4,2Z" />'

    // Create the styles we need
    const s = document.createElement('style')
    s.innerHTML = `
    .__gmgv-vid-container {
      display: grid;
      grid-auto-rows: 1fr;
      top: 50px !important;
      right: 2px !important;
      left: 2px !important;
      bottom: 2px !important;
    }
    .__gmgv-vid-container.__gmgv-chat-enabled {
      right: 325px !important;
    }
    .__gmgv-vid-container.__gmgv-bottombar-enabled {
      bottom: 90px !important;
    }
    .__gmgv-vid-container.__gmgv-captions-enabled {
      bottom: 202px !important;
    }
    .__gmgv-vid-container.__gmgv-screen-capture-mode {
      right: 325px !important;
      bottom: 90px !important;
      z-index: 10;
      background: #111;
    }
    .__gmgv-vid-container.__gmgv-screen-capture-mode .__gmgv-screen-capture-mode-unknown-participant,
    .__gmgv-vid-container.__gmgv-screen-capture-mode [data-self-name] {
      display: none;
    }
    .__gmgv-vid-container > div {
      position: relative !important;
      margin-top: 0 !important;
      top: 0 !important;
      left: 0 !important;
      height: 100% !important;
      width: 100% !important;
      background: 0 0 !important;
    }
    .__gmgv-vid-container > div:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 0.4em solid #64ffda;
      box-sizing: border-box;

      transition: opacity 300ms linear 500ms;
      opacity: 0;
      z-index: -1;
    }
    .__gmgv-vid-container > div > div:first-child,
    .__gmgv-vid-container > div > div:nth-child(2) {
      z-index: -2;
    }
    .__gmgv-vid-container:not(.__gmgv-screen-capture-mode) > div.__gmgv-speaking:after {
      transition: opacity 60ms linear;
      opacity: 1;
      z-index: 1;
    }
    .__gmgv-button {
      display: flex;
      overflow: visible !important;
    }
    .__gmgv-button > svg {
      height: 24px;
      width: 24px;
    }
    .__gmgv-button > div {
      box-sizing: border-box;
      display: none;
      position: absolute;
      top: 40px;
      left: 0;
      width: 300px;
      padding: 12px;
      background: white;
      border-radius: 0 0 0 8px;
      text-align: left;
      cursor: auto;
      line-height: 0;
    }
    .__gmgv-button:hover > div {
      display: block;
    }
    .__gmgv-button > div label {
      display: flex;
      align-items: center;
      color: #999999;
      margin: 4px 0;
      line-height: 18px;
    }
    .__gmgv-button > div label:not(.disabled) {
      cursor: pointer;
      color: #000000;
    }
    .__gmgv-button input {
      margin-right: 8px;
    }
    .__gmgv-button > div small {
      line-height: 12px;
      font-weight: 400;
    }
    .__gmgv-button > div hr {
      border: 0;
      height: 1px;
      background: #f1f3f4;
    }
    .__gmgv-button .__gmgv-source-code {
      line-height: 16px;
    }
    .__gmgv-button .__gmgv-source-code small {
      border-right: 0.5px solid #f1f3f4;
      padding-right: 5px;
      margin-right: 2px;
    }
    .__gmgv-button .__gmgv-source-code a {
      font-size: 12px;
    }
    .__gmgv-button > div > a {
      display: inline-block;
      line-height: 20px;
    }
  `
    document.body.append(s)

    // Variables
    let runInterval = null
    let container = null
    let pinnedIndex = -1
    let screenCaptureModeAllocations = new Map() // participantID -> order index
    let screenCaptureModeLookup = new Map() // `${name}|${presentation}|${dedupeID}` -> {id,active,order}
    let toggleButton = null
    let settings = {
      'show-only-video': localStorage.getItem('gmgv-show-only-video') === 'true',
      'highlight-speaker': localStorage.getItem('gmgv-highlight-speaker') === 'true',
      'include-own-video': localStorage.getItem('gmgv-include-own-video') === 'true',
      'auto-enable': localStorage.getItem('gmgv-auto-enable') === 'true',
      'screen-capture-mode': localStorage.getItem('gmgv-screen-capture-mode') === 'true',
    }

    // This continually probes the number of participants & screen size to ensure videos are max possible size regardless of window layout
    const calculateVideoSize = n => {
      let col
      let rows = []
      const w = (innerWidth - 4) / 14
      const h = (innerHeight - 52) / 9
      const hasPin = pinnedIndex >= 0 && pinnedIndex < n
      let size = 0
      for (col = 1; col < 30; col++) {
        rows[col] = !hasPin ? Math.ceil(n / col) : Math.ceil((Math.ceil(col / 2) ** 2 + n - 1) / col)
        if (hasPin && rows[col] > col) continue // If hasPin ensure rows <= cols to ensure pin is at least 1/4th the screen
        let s = Math.min(w / col, h / rows[col])
        if (s <= size) {
          col--
          break
        }
        size = s
      }
      return {
        col,
        height: (innerHeight - 52) / rows[col],
      }
    }
    const gridUpdateLoop = () => {
      let col
      if (settings['screen-capture-mode']) {
        col = Math.ceil(Math.sqrt(screenCaptureModeLookup.size))
        const mul = Math.floor(Math.min((innerWidth - 327) / (col * 16), (innerHeight - 140) / (col * 9)))
        container.style.marginLeft = `${innerWidth - 325 - mul * col * 16}px`
        container.style.marginTop = `${innerHeight - 140 - mul * col * 9}px`
      } else {
        const size = calculateVideoSize(container.children.length)
        col = size.col
        container.style.marginLeft = ''
        container.style.marginTop = ''
      }
      container.classList.toggle('__gmgv-screen-capture-mode', settings['screen-capture-mode'])
      container.style.gridTemplateColumns = `repeat(${col}, 1fr)`
      container.style.gridTemplateRows = settings['screen-capture-mode'] ? `repeat(${col}, 1fr)` : ''
      for (let v of container.children) {
        if (settings['screen-capture-mode']) {
          const unknown = !screenCaptureModeAllocations.has(v.dataset.requestedParticipantId)
          v.classList.toggle('__gmgv-screen-capture-mode-unknown-participant', unknown)
          v.style.order = ''
          if (!unknown) {
            const idx = screenCaptureModeAllocations.get(v.dataset.requestedParticipantId)
            v.style.gridArea = `${1 + Math.floor(idx / col)} / ${1 + (idx % col)}` // row / column
          }
        } else if (+v.dataset.allocationIndex === pinnedIndex) {
          const span = Math.ceil(col / 2)
          v.style.order = -1
          v.style.gridArea = `span ${span} / span ${span}`
        } else {
          v.style.order = v.dataset.allocationIndex
          v.style.gridArea = ''
        }
      }
    }

    // Define run functions
    const disableGrid = () => {
      clearInterval(runInterval)
      runInterval = null
      container.classList.remove('__gmgv-vid-container')
      toggleButton.querySelector('svg').innerHTML = gridOff
      container.style.marginLeft = ''
      container.style.marginTop = ''
    }
    const enableGrid = () => {
      if (runInterval) clearInterval(runInterval)
      runInterval = setInterval(gridUpdateLoop, 250)
      container.classList.add('__gmgv-vid-container')
      toggleButton.querySelector('svg').innerHTML = gridOn
    }
    const toggleGrid = () => {
      runInterval ? disableGrid() : enableGrid()
    }

    // Make the button to perform the toggle
    // This runs on a loop since you can join/leave the meeting repeatedly without changing the page
    const authorized =
      (document.currentScript && document.currentScript.src.startsWith('https://cdn.jsdelivr.net/gh/Fugiman/google-meet-grid-view/grid.user.')) || // v1.19
      (document.currentScript && document.currentScript.src === 'chrome-extension://kklailfgofogmmdlhgmjgenehkjoioip/grid.user.js') || // Chrome
      (document.currentScript && document.currentScript.src === 'chrome-extension://ogbbehbkcmdciebilbkpjgopohnpfolj/grid.user.js') || // Microsoft
      (document.currentScript && document.currentScript.src.startsWith('moz-extension://')) || // Firefox regenerates the URL for each browser, so we can't detect if it's valid :(
      (typeof GM !== 'undefined' && GM && GM.info && GM.info.script && GM.info.script.namespace === 'https://fugi.tech/') || // user script
      (document.currentScript && document.currentScript.src.startsWith('blob:')) // recursive user script
    const version =
      (document.currentScript && document.currentScript.dataset.version) || (typeof GM !== 'undefined' && GM && GM.info && GM.info.script && GM.info.script.version) || '?.?.?'
    let firstRun = true
    setInterval(() => {
      // Find the UI elements we need to modify. If they don't exist we haven't entered the meeting yet and will try again later
      const participantVideo = document.querySelector('[data-allocation-index]')
      const _container = participantVideo && participantVideo.parentElement
      if (_container && _container !== container) {
        container = _container
        if (runInterval) enableGrid() // When someone starts a presentation `container` will change under us, so we need to restart the grid
      }

      const ownVideoPreview = document.querySelector('[data-fps-request-screencast-cap]')
      const buttons = ownVideoPreview && ownVideoPreview.parentElement.parentElement.parentElement
      if (buttons && !buttons.__grid_ran) {
        buttons.__grid_ran = true
        buttons.parentElement.parentElement.parentElement.style.zIndex = 10 // Prevent options getting cut off by pin/mute overlay or speaker overlay

        // Find the button container element and copy the divider
        buttons.prepend(buttons.children[1].cloneNode())

        // Add our button to to enable/disable the grid
        toggleButton = document.createElement('div')
        toggleButton.classList = buttons.children[1].classList
        toggleButton.classList.add('__gmgv-button')
        toggleButton.onclick = toggleGrid
        buttons.prepend(toggleButton)

        toggleButton.innerHTML = `
          <svg viewBox="0 0 24 24">${gridOff}</svg>
          <div>
            <label><input data-gmgv-setting="show-only-video" type="checkbox" /> ${T('showOnlyVideo')}</label>
            <label><input data-gmgv-setting="highlight-speaker" type="checkbox" /> ${T('highlightSpeaker')}</label>
            <label><input data-gmgv-setting="include-own-video" type="checkbox" /> ${T('includeOwnVideo')}</label>
            <label><input data-gmgv-setting="auto-enable" type="checkbox" /> ${T('autoEnable')}</label>
            <hr>
            <label><input data-gmgv-setting="screen-capture-mode" type="checkbox" /> ${T('screenCaptureMode')}</label>
            <small>${T('screenCaptureModeDescription')}</small>
            <hr>
            <div class="__gmgv-source-code">
              <small>v${version}</small>
              <a href="https://github.com/Fugiman/google-meet-grid-view" target="_blank">${T('sourceCode')}</a>
            </div>
            ${
              authorized
                ? ''
                : `
            <hr>
            <a href="https://github.com/Fugiman/google-meet-grid-view#official-releases" target="_blank">${T('unauthorizedWarning')}</a>
            `
            }
          </div>
        `

        toggleButton.querySelector('div').onclick = e => e.stopPropagation()
        toggleButton.querySelectorAll('input').forEach(el => {
          const settingName = el.dataset.gmgvSetting
          el.checked = !!settings[settingName]
          el.onchange = e => {
            settings[settingName] = e.target.checked
            localStorage.setItem('gmgv-' + settingName, e.target.checked)
            if (settingName === 'screen-capture-mode') updateScreenCaptureMode(e.target.checked)
          }
        })

        updateScreenCaptureMode(settings['screen-capture-mode'])
      }

      // Find the functions inside google meets code that we need to override for our functionality
      // Notably we're looking for the function that handles video layout, and the function that detects volume
      // This code is fairly hairy but basically just iterates through all the exposed functions until we find the
      // ones that roughly match the code we're looking for by running regexs on the function source code.
      // We can then parse that code to get variable names out and use javascript Proxys to override them.
      if (window.default_MeetingsUi) {
        let m
        for (let [_k, v] of Object.entries(window.default_MeetingsUi)) {
          if (v && v.prototype) {
            for (let k of Object.keys(v.prototype)) {
              const p = Object.getOwnPropertyDescriptor(v.prototype, k)
              if (p && p.value && !v.prototype[k].__grid_ran) {
                // this.XX.get(_).YY(this._)
                m = /this\.([A-Za-z]+)\.get\([A-Za-z]+\)\.([A-Za-z]+)\(this\.[A-Za-z]+\)/.exec(p.value.toString())
                if (m) {
                  console.log('[google-meet-grid-view] Successfully hooked into rendering pipeline', v.prototype[k])
                  const p = new Proxy(v.prototype[k], RefreshVideoProxyHandler(m[1], m[2]))
                  p.__grid_ran = true
                  v.prototype[k] = p
                }

                // this.XX.getVolume()
                m = /this\.([A-Za-z]+)\.getVolume\(\)/.exec(p.value.toString())
                if (m) {
                  console.log('[google-meet-grid-view] Successfully hooked into volume detection', v.prototype[k])
                  const p = new Proxy(v.prototype[k], VolumeDetectionProxyHandler(m[1]))
                  p.__grid_ran = true
                  v.prototype[k] = p
                }
              }
            }
          }
          if (v && typeof v === 'function' && !v.__grid_ran) {
            m = /function\(a,b,c\){return!0===c\?/.exec(v.toString())
            if (m) {
              console.log('[google-meet-grid-view] Successfully hooked into chat/bottom-bar toggle', v)
              const p = new Proxy(v, ToggleProxyHandler())
              p.__grid_ran = true
              window.default_MeetingsUi[_k] = p
            }

            m = /function\(a,b\){a\.style\.display=b\?/.exec(v.toString())
            if (m) {
              console.log('[google-meet-grid-view] Successfully hooked into caption toggle', v)
              const p = new Proxy(v, CaptionProxyHandler())
              p.__grid_ran = true
              window.default_MeetingsUi[_k] = p
            }

            m = /\.([A-Za-z]+)\.get\(.*window\.innerWidth,window\.innerHeight\)\);[A-Za-z]+=[A-Za-z]+\.([A-Za-z]+)\(/.exec(v.toString())
            if (m) {
              console.log('[google-meet-grid-view] Successfully hooked into rendering pipeline v2', v)
              const p = new Proxy(v, RefreshVideoProxyHandlerV2(m[1], m[2]))
              p.__grid_ran = true
              window.default_MeetingsUi[_k] = p
            }
          }
        }
      }

      // Auto-enable
      if (firstRun && container && buttons) {
        firstRun = false
        if (settings['auto-enable']) enableGrid()
      }
    }, 250)

    // This overrides the function that handles laying out video.
    // All we do here is install another proxy on the Map that returns which layout to use
    function RefreshVideoProxyHandler(objKey, funcKey) {
      return {
        apply: function (target, thisArg, argumentsList) {
          if (!thisArg[objKey].__grid_ran) {
            const p = new Proxy(thisArg[objKey], LayoutVideoProxyHandler(thisArg, funcKey))
            p.__grid_ran = true
            thisArg[objKey] = p
          }
          return target.apply(thisArg, argumentsList)
        },
      }
    }
    function RefreshVideoProxyHandlerV2(objKey, funcKey) {
      return {
        apply: function (target, thisArg, argumentsList) {
          if (!argumentsList[0][objKey].__grid_ran) {
            const p = new Proxy(argumentsList[0][objKey], LayoutVideoProxyHandler(argumentsList[0], funcKey))
            p.__grid_ran = true
            argumentsList[0][objKey] = p
          }
          return target.apply(thisArg, argumentsList)
        },
      }
    }

    // This overrides the Map that returns which layout to use, as called by the above Proxy
    // If grid view is enabled we always try to call our custom layout function.
    // If our layout function errors, or grid view is disabled, we return the actual function.
    function LayoutVideoProxyHandler(parent, funcKey) {
      return {
        get: function (target, name) {
          let ret = Reflect.get(target, name)
          if (typeof ret === 'function') {
            ret = ret.bind(target)
          }

          if (runInterval && name == 'get') {
            return idx => ({
              [funcKey]: (videoOrdering, windowData) => {
                try {
                  return GridLayout.call(parent, videoOrdering, windowData)
                } catch (e) {
                  console.error(e)
                  return ret(idx)[funcKey](videoOrdering, windowData)
                }
              },
            })
          }

          return ret
        },
      }
    }

    // This overrides the volume detection code that powers the wiggly bars next to each participant's name
    // We still call the underlying function, but if grid view is enabled we also add or remove a class to the
    // video container depending on volume level. This allows us to add visual effects like a border.
    function VolumeDetectionProxyHandler(objKey) {
      return {
        apply: function (target, thisArg, argumentsList) {
          if (!thisArg.isDisposed()) {
            if (!thisArg.__grid_videoElem) {
              for (let v of Object.values(thisArg)) {
                if (v instanceof HTMLElement) {
                  thisArg.__grid_videoElem = v.parentElement.parentElement.parentElement
                }
              }
            }
            if (thisArg.__grid_videoElem.dataset.allocationIndex) {
              if (thisArg[objKey].getVolume() > 0 && runInterval && settings['highlight-speaker']) {
                thisArg.__grid_videoElem.classList.add('__gmgv-speaking')
              } else {
                thisArg.__grid_videoElem.classList.remove('__gmgv-speaking')
              }
            }
          }
          return target.apply(thisArg, argumentsList)
        },
      }
    }

    function ToggleProxyHandler() {
      return {
        apply: function (target, thisArg, argumentsList) {
          if (argumentsList.length === 3 && container) {
            const elems = Object.values(argumentsList[0])
              .filter(v => Array.isArray(v))
              .flat()
              .filter(v => v instanceof HTMLElement)
            const v = argumentsList[2]
            if (elems.length === 1) {
              const el = elems[0]
              if (el.parentElement === container.parentElement.parentElement && el.clientWidth === 320) {
                container.classList.toggle('__gmgv-chat-enabled', v)
              }
              if (el.parentElement === container.parentElement.parentElement && el.clientHeight === 88) {
                container.classList.toggle('__gmgv-bottombar-enabled', v)
              }
            }
          }
          return target.apply(thisArg, argumentsList)
        },
      }
    }

    function CaptionProxyHandler() {
      return {
        apply: function (target, thisArg, argumentsList) {
          if (argumentsList.length === 2 && container) {
            const el = argumentsList[0]
            const v = argumentsList[1]
            if (el.parentElement === container.parentElement.parentElement) {
              container.classList.toggle('__gmgv-captions-enabled', v)
            }
          }
          return target.apply(thisArg, argumentsList)
        },
      }
    }

    // This is a custom layout function to power grid view.
    // Notably it forces every participant to load (or just those with video in only-video mode)
    // and consistently sorts by participant name (rather than who has talked last)
    function GridLayout(orderingInput) {
      // Extract constructors from the Meets code
      const VideoList = orderingInput.constructor
      const VideoElem = Object.values(window.default_MeetingsUi)
        .filter(i => typeof i === 'function')
        .filter(i => i.toString().includes('.attribution'))[0]

      // Figure out what field of VideoElem is used to store the participant data
      const magicKey = Object.entries(new VideoElem(999)).find(e => e[1] === 999)[0]

      // Convert participant data to a VideoElem and add to the list
      // but only if it hasn't already been added. Also run a callback if provided.
      const addUniqueVideoElem = (a, b) => {
        if (b && !a.some(e => e[magicKey] === b)) {
          a.push(new VideoElem(b, { attribution: !settings['screen-capture-mode'] }))
        }
      }

      // Convience function
      const isSpacesStr = i => typeof i === 'string' && i.startsWith('spaces/')

      // This allows us to set values without knowing the property key
      // Important because the keys keep changing but the types don't.
      // magicSet(true) enables the "You're presenting to everyone" screen
      // magicSet(1 || 2) ensures multiple screens can be shown. Unsure the difference between 1 and 2
      const magicSet = val => {
        return elem => {
          for (const [k, v] of Object.entries(elem)) {
            if (typeof v === typeof val && k !== 'attribution') {
              elem[k] = val
            }
          }
        }
      }

      // Finds the listing of map keys, and the object that contains it
      let videoKeys, importantObject
      for (let v of Object.values(this)) {
        if (v && typeof v === 'object') {
          for (let vv of Object.values(v)) {
            if (Array.isArray(vv) && vv.length && vv.every(isSpacesStr)) {
              if (videoKeys && vv != videoKeys) {
                console.log('Invalid videoKeys search!', videoKeys, vv)
                throw new Error('Failed')
              } else {
                videoKeys = vv
                importantObject = v
              }
            }
          }
        }
      }
      if (!importantObject) {
        throw new Error('No other participants, using default layout')
      }

      // Reusing the object we found earlier, find the map of participant data
      let videoMap
      for (let v of Object.values(importantObject)) {
        if (v instanceof Map && v.size && Array.from(v.keys()).every(isSpacesStr)) {
          videoMap = v
        }
      }

      // Find our own participant data
      let ownVideo = null
      for (let v of Object.values(importantObject)) {
        if (v && typeof v === 'object' && v.$goog_Thenable) {
          for (let vv of Object.values(v)) {
            if (isSpacesStr(vv)) {
              ownVideo = videoMap.get(vv) || null
            }
          }
        }
      }

      // Use the map & map keys we found earlier to add every participant
      let ret = []
      for (const v of videoKeys) {
        addUniqueVideoElem(ret, videoMap.get(v))
      }
      if (settings['include-own-video']) {
        addUniqueVideoElem(ret, ownVideo)
      }

      // If in only-video mode, remove any without video
      if (settings['show-only-video'] && !settings['screen-capture-mode']) {
        // ret[idx][magicKey].wr.Aa.Aa.Ca.Ea.Ws.Ea.state // mu (no) li (yes)
        const tests = [/\.call\(this\)/, /\.call\(this,.*,"a"\)/, /new Set;this\.\w+=new _/, /new Map.*new Set/, /"un".*"li"/, /new Map/, /Object/]
        ret = ret.filter(e => {
          let values = [e[magicKey]]
          for (let t of tests) {
            let newValues = []
            for (let v of values) {
              newValues = newValues.concat(Object.values(v).filter(vv => vv && vv.constructor && t.test(vv.constructor.toString())))
            }
            values = newValues
          }
          return values.some(v => v && v.state && v.state === 'li')
        })
      }

      // If there are no participants, add ourselves
      if (!ret.length) {
        addUniqueVideoElem(ret, ownVideo)
      }

      // sort by participant name, or video id if the name is the same (when someone is presenting)
      ret.sort((a, b) => a[magicKey].name.localeCompare(b[magicKey].name) || a[magicKey].id.localeCompare(b[magicKey].id))

      // Set Pinned Index for use in CSS loop. If there is no pin, use the presenter if available
      pinnedIndex = ret.findIndex(v => v[magicKey].isPinned())
      if (pinnedIndex < 0) {
        pinnedIndex = ret.findIndex(v => !!v[magicKey].parent)
      }

      // Set video quality based on estimated video height
      // 0=highest 1=low 2=high
      const size = calculateVideoSize(ret.length)
      const setVideoQuality = magicSet(settings['screen-capture-mode'] ? 0 : size.height >= 200 ? 2 : 1)
      ret.forEach(setVideoQuality)

      // Allocate slots for screen capture mode
      if (settings['screen-capture-mode']) {
        const activeIDs = new Set(ret.map(v => v[magicKey].getId()))

        screenCaptureModeLookup.forEach(v => {
          v.active = activeIDs.has(v.id)
        })

        ret.forEach(v => {
          const participant = v[magicKey]
          const id = participant.getId()
          const name = participant.getName()
          const presenting = !!participant.parent

          if (screenCaptureModeAllocations.has(id)) return

          for (let dedupeID = 0; dedupeID <= screenCaptureModeLookup.size; dedupeID++) {
            const key = `${name}|${presenting}|${dedupeID}`
            let l = screenCaptureModeLookup.get(key)
            if (l && l.active && l.id !== id) continue
            if (!l) l = { order: screenCaptureModeLookup.size }
            l.active = true
            l.id = id
            screenCaptureModeLookup.set(key, l)
            screenCaptureModeAllocations.set(id, l.order)
            return
          }
        })

        for (let id of screenCaptureModeAllocations.keys()) {
          if (!activeIDs.has(id)) screenCaptureModeAllocations.delete(id)
        }
      }

      // Build a video list from the ordered output
      return new VideoList(ret)
    }

    function updateScreenCaptureMode(enabled) {
      const showOnlyVideo = toggleButton.querySelector('input[data-gmgv-setting="show-only-video"]')
      showOnlyVideo.checked = !enabled && settings['show-only-video']
      showOnlyVideo.disabled = enabled
      showOnlyVideo.parentElement.classList.toggle('disabled', enabled)

      const highlightSpeaker = toggleButton.querySelector('input[data-gmgv-setting="highlight-speaker"]')
      highlightSpeaker.checked = !enabled && settings['highlight-speaker']
      highlightSpeaker.disabled = enabled
      highlightSpeaker.parentElement.classList.toggle('disabled', enabled)

      // Reset the mappings to reduce clutter on toggle
      if (!enabled) {
        screenCaptureModeAllocations = new Map()
        screenCaptureModeLookup = new Map()
      }
    }

    // Extension communication
    window.addEventListener('message', event => {
      if (event.source !== window) return // Only accept messages from ourselves
      if (event.data.sender !== 'gmgv_content') return
      try {
        switch (event.data.type) {
          case 'getState':
            window.postMessage({
              id: event.data.id,
              sender: 'gmgv_user',
              inMeeting: !!container,
              enabled: !!runInterval,
              settings,
            })
            break
          case 'setEnabled':
            event.data.value ? enableGrid() : disableGrid()
            window.postMessage({
              id: event.data.id,
              sender: 'gmgv_user',
              success: true,
            })
            break
          case 'updateSetting':
            toggleButton.querySelector(`input[data-gmgv-setting="${event.data.name}"]`).checked = event.data.value
            settings[event.data.name] = event.data.value
            localStorage.setItem('gmgv-' + event.data.name, event.data.value)
            if (event.data.name === 'screen-capture-mode') updateScreenCaptureMode(event.data.value)
            window.postMessage({
              id: event.data.id,
              sender: 'gmgv_user',
              success: true,
            })
            break
          default:
            window.postMessage({
              id: event.data.id,
              sender: 'gmgv_user',
              error: 'unknown message',
            })
            break
        }
      } catch (error) {
        window.postMessage({
          id: event.data.id,
          sender: 'gmgv_user',
          error,
        })
      }
    })
  }
})()
