// ==UserScript==
// @name         Google Meet Grid View
// @namespace    https://fugi.tech/
// @version      1.37
// @description  Adds a toggle to use a grid layout in Google Meets
// @author       Chris Gamble
// @include      https://meet.google.com/*
// @grant        none
// @run-at       document-idle
// @inject-into  content
// ==/UserScript==

;(function () {
  // If included by our extension's icon page, export translation factory
  if (document.currentScript && document.currentScript.src === window.location.href.replace('popup.html', 'grid.user.js')) {
    // If imported, export the translation factory
    window.TranslationFactory = TranslationFactory
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
        showOnlyVideo: 'Mostra només els participants amb vídeo',
        highlightSpeaker: 'Ressalta els que parlen',
        includeOwnVideo: 'Inclou el propi vídeo a la graella',
        autoEnable: 'Habilita la visualització en graella de manera predeterminada',
        notRunning: "La visualització en graella no s'està executant en aquesta pàgina",
        noMeeting: "La visualització en graella no s'executarà fins que no us uniu a una reunió",
        enabled: 'Activa la visualització en graella',
        sourceCode: 'Codi font disponible a GitHub',
        screenCaptureMode: 'Activa el mode captura de pantalla',
        screenCaptureModeDescription: 'Força 16:9, desactiva els noms, bloqueja els vídeos al seu lloc',
        unauthorizedWarning: "ATENCIÓ: es tracta d'una extensió no autoritzada. Instal·leu l'extensió oficial fent clic aquí.",
        hideParticipant: 'Amaga el participant',
        showParticipant: 'Mostra el participant',
        advancedSettingsLink: 'Mostra la configuració avançada',
        advancedSettingsTitle: 'Configuració avançada de Google Meet Grid View',
        bottomToolbarBehavior: "Comportament de la barra d'eines inferior",
        btbNative: "Tapa la graella quan es mostri la barra d'eines",
        btbResize: "Canvia la mida de la graella quan es mostri la barra d'eines",
        btbForce: "Mostra sempre la barra d'eines i canvia la mida de la graella",
        rightToolbarBehavior: 'Comportament del xat i el llistat de persones',
        rtbNative: 'Tapa la graella quan es mostri el xat',
        rtbResize: 'Canvia la mida de la graella quan es mostri el xat',
        ownVideoBehavior: 'Comportament del propi vídeo',
        ovbNative: "Mantén l'efecte mirall",
        ovbFlip: 'Capgira el vídeo tal com et veuen els altres',
        presentationBehavior: 'Comportament de la pròpia presentació',
        pbNever: 'No mostris mai la presentació a la graella',
        pbOwnVideo: 'Mostra la presentació a la graella quan s\'hagi seleccionat "Inclou el propi vídeo a la graella"',
        pbAlways: 'Mostra sempre la presentació a la graella',
        modifyNames: 'Canvi dels noms dels participants',
        mnNative: 'Sense canvis ("Marta Vila Puig")',
        mnFirstSpace: 'Mou la primera paraula al final ("Vila Puig, Marta")',
        mnLastSpace: 'Mou l\'última paraula al principi ("Puig, Marta Vila")',
      },
      da: {
        showOnlyVideo: 'Vis kun deltagere med video',
        highlightSpeaker: 'Fokuser på talene personer',
        includeOwnVideo: 'Vis mig selv i Grid',
        autoEnable: 'Tænd for Grid automatisk',
        notRunning: 'Grid View kører ikke på denne side',
        noMeeting: 'Grid View kører ikke indtil du deltager i et møde',
        enabled: 'Aktiver Grid View',
        sourceCode: 'Kildekoden er tilgængelig på GitHub',
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
        enabled: 'Rasteransicht einschalten',
        sourceCode: 'Der Quellcode ist auf GitHub zugänglich',
        screenCaptureMode: 'Aktiviere Bildschirmaufnahmemodus',
        screenCaptureModeDescription: 'Erzwingt 16:9, entfernt Namen, fixiert Videoposition',
        unauthorizedWarning: 'WARNUNG: Dies ist keine autorisierte Erweiterung. Bitte installieren Sie die offizielle Version. Klicken Sie dafür hier.',
        hideParticipant: 'Teilnehmer verbergen',
        showParticipant: 'Teilnehmer anzeigen',
      },
      en: {
        showOnlyVideo: 'Only show participants with video',
        highlightSpeaker: 'Highlight speakers',
        includeOwnVideo: 'Include yourself in the grid',
        autoEnable: 'Enable grid view by default',
        notRunning: 'Grid View is not running on this page',
        noMeeting: 'Grid View does not run until you join the meeting',
        enabled: 'Enable Grid View',
        sourceCode: 'Source code available on GitHub',
        screenCaptureMode: 'Enable Screen Capture Mode',
        screenCaptureModeDescription: 'Forces 16:9, Disables names, Locks videos in place',
        unauthorizedWarning: 'WARNING: This is an unauthorized extension. Please install the official release by clicking here.',
        duplicateWarning: 'Multiple Grid View extensions detected. Please uninstall duplicates.',
        hideParticipant: 'Hide Participant',
        showParticipant: 'Show Participant',
        advancedSettingsLink: 'View Advanced Settings',
        advancedSettingsTitle: 'Google Meet Grid View Advanced Settings',
        bottomToolbarBehavior: 'Bottom Toolbar Behavior',
        btbNative: 'Obscure grid when toolbar is showing',
        btbResize: 'Resize grid when toolbar is showing',
        btbForce: 'Always show toolbar and resize grid',
        rightToolbarBehavior: 'Chat & People Behavior',
        rtbNative: 'Obscure grid when chat is showing',
        rtbResize: 'Resize grid when chat is showing',
        ownVideoBehavior: 'Own Video In Grid Behavior',
        ovbNative: 'Keep video mirrored',
        ovbFlip: 'Flip video to match what others see',
        presentationBehavior: 'Own Presentation Behavior',
        pbNever: 'Never show presentation in grid',
        pbOwnVideo: 'Show presentation in grid when "Include yourself in the grid" is selected',
        pbAlways: 'Always show presentation in grid',
        modifyNames: 'Modify Participant Names',
        mnNative: 'No modification ("Alpha Bravo Charlie")',
        mnFirstSpace: 'Move first word to end ("Bravo Charlie, Alpha")',
        mnLastSpace: 'Move last word to start ("Charlie, Alpha Bravo")',
        forceQuality: 'Video Quality',
        fqAuto: 'Automatic based on video size and number of participants',
        fqGood: 'Good',
        fqMediocre: 'Mediocre',
        fqBad: 'Bad',
        fqWorst: 'Worst',
      },
      es: {
        showOnlyVideo: 'Mostrar solo participantes con vídeo',
        highlightSpeaker: 'Resaltar los que hablan',
        includeOwnVideo: 'Incluir mi vídeo en la cuadrícula',
        autoEnable: 'Habilitar vista en cuadrícula por defecto',
        notRunning: 'La vista en cuadrícula no funciona en esta página',
        noMeeting: 'La vista en cuadrícula no funciona hasta que no estés en una llamada',
        enabled: 'Habilitar vista en cuadrícula',
        sourceCode: 'Código fuente disponible en GitHub',
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
        sourceCode: 'Code source disponible sur GitHub',
        screenCaptureMode: "Activer le mode capture d'écran",
        screenCaptureModeDescription: "Force l'affichage 16:9, désactive les noms, vérrouille les positions des vidéos",
        unauthorizedWarning: "ATTENTION : Il s'agit d'une extension non autorisée. Installez la version officielle en cliquant ici.",
        hideParticipant: 'Cacher le participant',
        showParticipant: 'Afficher le participant',
      },
      hr: {
        showOnlyVideo: 'Prikaži samo sudionike sa kamerom',
        highlightSpeaker: 'Naglasi govornike',
        includeOwnVideo: 'Uključi sebe u mrežnom prikazu',
      },
      id: {
        showOnlyVideo: 'Hanya tampilkan peserta dengan video',
        highlightSpeaker: 'Utamakan pembicara',
        includeOwnVideo: 'Masukkan dirimu di grid',
        autoEnable: 'Aktifkan grid dari awal',
        notRunning: 'Grid View tidak aktif pada laman ini',
        noMeeting: 'Grid View tidak akan aktif sampai kamu bergabung ke Meet',
        enabled: 'Aktifkan Grid View',
        sourceCode: 'Source code ada di GitHub',
        screenCaptureMode: 'Aktifkan Screen Capture Mode',
        screenCaptureModeDescription: 'Paksa 16:9, Nonaktifkan nama, kunci video pada tempatnya',
        unauthorizedWarning: 'PERINGATAN: Ini adalah ekstensi yang tidak resmi. Silakan pasang rilis resmi dengan mengklik di sini.',
        hideParticipant: 'Sembunyikan Peserta',
        showParticipant: 'Tampilkan Peserta',
      },
      it: {
        showOnlyVideo: 'Mostra solo i partecipanti con videocamera',
        highlightSpeaker: 'Evidenzia sta parlando',
        includeOwnVideo: 'Includi te stesso nella griglia',
        autoEnable: 'Attiva sempre la vista a griglia',
        notRunning: 'Grid View non è in esecuzione su questa pagina',
        noMeeting: 'Grid View non funzionerà finché non entrerai nella riunione',
        enabled: 'Attiva Grid View',
        sourceCode: 'Codice sorgente disponibile su GitHub',
        screenCaptureMode: 'Attiva la modalità di cattura dello schermo',
        screenCaptureModeDescription: 'Forza il 16:9, nasconde i nomi e blocca i video nella loro posizione attuale',
        unauthorizedWarning: "ATTENZIONE: Questa è un'estenzione non autorizzata. Per favore, installa la versione ufficiale cliccando qui.",
        duplicateWarning: 'Sono state rilevate diverse estenzioni Grid View. Per favore, rimuovi i duplicati.',
        hideParticipant: 'Nascondi partecipante',
        showParticipant: 'Mostra partecipante',
        advancedSettingsLink: 'Impostazioni avanzate',
        advancedSettingsTitle: 'Impostazioni avanzate di Google Meet Grid View',
        bottomToolbarBehavior: 'Comportamento della barra inferiore',
        btbNative: 'Copri la griglia mentre la barra è visibile',
        btbResize: 'Ridimensiona la griglia mentre la barra è visibile',
        btbForce: 'Mostra sempre la barra ridimensionando la griglia',
        rightToolbarBehavior: 'Comportamento della chat',
        rtbNative: 'Copri la griglia mentre la chat è visibile',
        rtbResize: 'Ridimensiona la griglia mentre la chat è visibile',
        ownVideoBehavior: 'Comportamento del proprio video nella griglia',
        ovbNative: 'Tieni il video capovolto',
        ovbFlip: 'Capovolgi il video per renderlo uguale a come viene visto dagli altri',
        presentationBehavior: 'Comportamento della propria presentazione',
        pbNever: 'Non mostrare mai la propria presentazione nella griglia',
        pbOwnVideo: 'Mostra la presentazione quando "Includi te stesso nella griglia" è attivo',
        pbAlways: 'Mostra sempre la propria presentazione nella griglia',
        modifyNames: 'Modifica il nome dei partecipanti',
        mnNative: 'Nessuna modifica ("Alfa Bravo Charlie")',
        mnFirstSpace: 'Sposta la prima parola alla fine ("Bravo Charlie, Alfa")',
        mnLastSpace: 'Sposta l\'ultima parola all\'inizio ("Charlie, Alfa Bravo")',
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
        sourceCode: 'Broncode is beschikbaar op GitHub',
        screenCaptureMode: 'Zet Screen Capture Mode aan',
        screenCaptureModeDescription: "Forceer 16:9, Schakel namen uit, Zet video's vast op hun plek",
        unauthorizedWarning: 'LET OP: dit is geen geautoriseerde extensie. Installeer de officiele versie door hier te klikken.',
        hideParticipant: 'Verberg deelnemer',
        showParticipant: 'Toon deelnemer',
        advancedSettingsLink: 'Toon de geavanceerde instellingen',
        advancedSettingsTitle: 'Geavanceerde Instellingen van Google Meet Grid View',
        bottomToolbarBehavior: 'De balk aan de onderkant',
        btbNative: 'Toon de balk gedeeltelijk over het raster',
        btbResize: 'Verklein het raster als de balk zichtbaar is',
        btbForce: 'Verklein het raster en toon de balk continu',
        rightToolbarBehavior: 'De Chat/Mensen zijbalk',
        rtbNative: 'Toon de zijbalk gedeeltelijk over het raster',
        rtbResize: 'Verklein het raster als de zijbalk zichtbaar is',
        ownVideoBehavior: 'Je eigen video in het raster',
        ovbNative: 'Hou de video gespiegeld',
        ovbFlip: 'Spiegeling weer ongedaan maken, gelijk met wat de rest ziet',
        modifyNames: 'Deelnemersnamen aanpassen',
        mnNative: 'Niet aanpassen ("Jantje van de Berg")',
        mnFirstSpace: 'Eerste woord als laatste ("van de Berg, Jantje")',
        mnLastSpace: 'Laatste woord als eerste ("Berg, Jantje van de")',
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
        sourceCode: 'Código fonte disponível no GitHub',
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
        noMeeting: 'Visualização em grid não funciona até que você entre em uma conferência',
        enabled: 'Habilitar visualização em grid',
        sourceCode: 'Código fonte disponível no GitHub',
        screenCaptureMode: 'Habilitar captura de tela',
        screenCaptureModeDescription: 'Forçar aspecto 16:9, Desabilitar nomes, Travar posição dos vídeos',
        unauthorizedWarning: 'ATENÇÃO: Esta é uma extensão não autorizada. Por favor, instale a versão oficial clicando aqui.',
        duplicateWarning: 'Detectadas várias extensões "Multiple Grid View". Desinstale as duplicatas.',
        hideParticipant: 'Ocultar participante',
        showParticipant: 'Mostrar participante',
        advancedSettingsLink: 'Exibir configurações avançadas',
        advancedSettingsTitle: 'Configurações avançadas do Google Meet Grid View',
        bottomToolbarBehavior: 'Comportamento da barra de ferramentas inferior',
        btbNative: 'Ocultar grid quando a barra de ferramentas está sendo exibida',
        btbResize: 'Redimensionar o grid quando a barra de ferramentas estiver sendo exibida',
        btbForce: 'Sempre mostrar a barra de ferramentas e redimensionar o grid',
        rightToolbarBehavior: 'Bate-papo e comportamento das pessoas',
        rtbNative: 'Ocultar grid quando o bate-papo está sendo exibido',
        rtbResize: 'Redimensionar grid quando o bate-papo está sendo exibido',
        ownVideoBehavior: 'Seu vídeo no grid',
        ovbNative: 'Manter o vídeo espelhado',
        ovbFlip: 'Girar vídeo para combinar com o que os outros veem',
        presentationBehavior: 'Comportamento da própria apresentação',
        pbNever: 'Nunca mostrar apresentação no grid',
        pbOwnVideo: 'Mostrar apresentação no grid quando "Incluir-se na grade" está habilitado',
        pbAlways: 'Sempre mostrar a apresentação no grid',
        modifyNames: 'Modificar nomes de participantes',
        mnNative: 'Nenhuma modificação ("Alpha Bravo Charlie")',
        mnFirstSpace: 'Mover o primeiro nome para o final ("Bravo Charlie, Alpha")',
        mnLastSpace: 'Mover o último nome para o início ("Charlie, Alpha Bravo")',
      },
      ru: {
        showOnlyVideo: 'Показывать участников только с видео',
        highlightSpeaker: 'Подсвечивать участника со звуком',
        includeOwnVideo: 'Включить себя в сетку',
        autoEnable: 'Разрешить вид сетки по умолчанию',
        notRunning: 'Сетка не работает на этой странице',
        noMeeting: 'Сетка не будет работать пока вы не подключитесь к конференции',
        enabled: 'Включить вид сетки',
        sourceCode: 'Исходный код доступен на GitHub',
        unauthorizedWarning: 'ВНИМАНИЕ: Это не авторизированное расширение. Пожалуйста, установите оффициальную версию тут.',
        hideParticipant: 'Скрыть участника',
        showParticipant: 'Показать участника',
      },
      sv: {
        showOnlyVideo: 'Visa endast deltagare med video',
        highlightSpeaker: 'Markera/följ talare',
        includeOwnVideo: 'Inkludera mig i rutnätet',
        autoEnable: 'Använd rutnätet som standard',
        notRunning: 'Rutnätet körs inte på denna sidan',
        noMeeting: 'Grid View körs inte till dess att du har gått med i mötet',
        enabled: 'Slå på rutnätet',
        sourceCode: 'Källkod tillgänglig på GitHub',
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
    const visibilityOff =
      '<path fill="currentColor" d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" />'
    const visibilityOn =
      '<path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />'
    const close = '<path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />'
    const alert = '<path fill="currentColor" d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />'

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
    .__gmgv-vid-container.__gmgv-rtb-resize.__gmgv-chat-enabled {
      right: 325px !important;
    }
    .__gmgv-vid-container.__gmgv-btb-resize.__gmgv-bottombar-enabled:not(.__gmgv-captions-enabled),
    .__gmgv-vid-container.__gmgv-btb-force:not(.__gmgv-captions-enabled) {
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
      z-index: 1;
      pointer-events: none;
    }
    .__gmgv-vid-container > div > div:first-child {
      z-index: -2;
    }
    .__gmgv-vid-container > div > div {
      display: flex !important;
      opacity: 1 !important;
    }
    .__gmgv-vid-container:not(.__gmgv-screen-capture-mode) > div.__gmgv-speaking:after {
      transition: opacity 60ms linear;
      opacity: 1;
    }
    .__gmgv-vid-container.__gmgv-flip-self video {
      transform: scaleX(1) !important;
    }

    .__gmgv-duplicate-warning {
      color: #d93025;
      font-size: 1rem;
      display: flex;
      align-items: center;
      margin: 0 12px;
      font-weight: bold;
    }
    .__gmgv-duplicate-warning > svg {
      height: 36px;
      width: 36px;
      margin-right: 6px;
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

    .__gmgv-hide svg,
    .__gmgv-show-hide svg {
      height: 24px;
      width: 24px;
    }
    .__gmgv-hide > div {
      margin: 0 0 0 3px;
      color: #e8eaed;
      display: none;
    }
    .__gmgv-vid-container .__gmgv-hide > div,
    .__gmgv-show-hide > div {
      display: flex;
    }
    .__gmgv-hide > div,
    .__gmgv-show-hide > div {
      position: relative;
      overflow: visible;
      justify-content: center;
    }
    .__gmgv-hide > div > div,
    .__gmgv-show-hide > div > div {
      position: absolute;
      border-radius: 2px;
      background-color: rgba(95,99,104,0.9);
      color: #ffffff;
      pointer-events: none;
      font-size: 10px;
      font-weight: 500;
      padding: 5px 8px 6px;
      white-space: nowrap;
      transition: all 0.3s ease-in-out 0.3s;
      top: 31px;
      opacity: 0;
    }
    .__gmgv-hide:hover > div > div,
    .__gmgv-show-hide:hover > div > div {
      top: 46px;
      opacity: 1;
    }

    .__gmgv-settings {
      display: none;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 6000;
      background: rgba(0,0,0,0.6);
      align-items: center;
      justify-content: center;
    }
    .__gmgv-settings > div {
      max-height: 70vh;
      max-width: 80vw;
      overflow: auto;
      background: white;
      border-radius: 8px;
      padding: 24px;
    }
    .__gmgv-settings > div > div {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
    }
    .__gmgv-settings > div > div > span:first-child {
      flex: 1 1 auto;
      margin-right: 20px;
    }
    .__gmgv-settings .__gmgv-close {
      line-height: 0;
      cursor: pointer;
      position: relative;
    }
    .__gmgv-settings .__gmgv-close svg {
      height: 24px;
      width: 24px;
    }
    .__gmgv-settings .__gmgv-close:before {
      content: "";
      display: block;
      position: absolute;
      top: -12px;
      left: -12px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      transition: background 300ms;
    }
    .__gmgv-settings .__gmgv-close:hover:before {
      background: rgba(0,0,0,0.12);
    }
    .__gmgv-settings label {
      display: block;
      margin-top: 24px;
    }
    .__gmgv-settings label > span {
      display: block;
      color: #00796b;
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
    }
    .__gmgv-settings label > select {
      display: block;
      height: 36px;
      width: 100%;
      padding: 8px 0;
      border: 0;
      border-bottom: 1px solid rgba(0,0,0,0.12);
      font-family: inherit;
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
    }
    .__gmgv-settings label option {
      padding: 0;
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
    }
  `
    document.body.append(s)

    // Variables
    let container = null
    let toggleButton = null
    let settingsOverlay = null
    let forceReflow = () => {}
    let lastStyles = []
    let screenCaptureModeAllocations = new Map() // participantID -> order index
    let screenCaptureModeLookup = new Map() // `${name}|${presentation}|${dedupeID}` -> {id,active,order}
    let hiddenIDs = new Set()
    let ownID = null
    let sizingFuncOverwritten = false
    let settings = {
      enabled: false,
      'show-settings-overlay': false,
      'show-only-video': localStorage.getItem('gmgv-show-only-video') === 'true',
      'highlight-speaker': localStorage.getItem('gmgv-highlight-speaker') === 'true',
      'include-own-video': localStorage.getItem('gmgv-include-own-video') === 'true',
      'auto-enable': localStorage.getItem('gmgv-auto-enable') === 'true',
      'screen-capture-mode': localStorage.getItem('gmgv-screen-capture-mode') === 'true',
      'bottom-toolbar': ['native', 'resize', 'force'].find(v => v === localStorage.getItem('gmgv-bottom-toolbar')) || 'resize',
      'right-toolbar': ['native', 'resize'].find(v => v === localStorage.getItem('gmgv-right-toolbar')) || 'resize',
      'own-video': ['native', 'flip'].find(v => v === localStorage.getItem('gmgv-own-video')) || 'native',
      presentation: ['never', 'own-video', 'always'].find(v => v === localStorage.getItem('gmgv-presentation')) || 'never',
      names: ['native', 'first-space', 'last-space'].find(v => v === localStorage.getItem('gmgv-names')) || 'native',
      'force-quality': ['auto', '2', '3', '4', '5'].find(v => v === localStorage.getItem('gmgv-force-quality')) || 'auto',
    }

    // Make the button to perform the toggle
    // This runs on a loop since you can join/leave the meeting repeatedly without changing the page
    const authorized =
      (document.currentScript && document.currentScript.src === 'chrome-extension://kklailfgofogmmdlhgmjgenehkjoioip/grid.user.js') || // Chrome
      (document.currentScript && document.currentScript.src === 'chrome-extension://ogbbehbkcmdciebilbkpjgopohnpfolj/grid.user.js') || // Microsoft
      (document.currentScript && document.currentScript.src.startsWith('moz-extension://')) || // Firefox regenerates the URL for each browser, so we can't detect if it's valid :(
      (typeof GM !== 'undefined' && GM && GM.info && GM.info.script && GM.info.script.namespace === 'https://fugi.tech/') || // user script
      (document.currentScript && document.currentScript.src.startsWith('blob:')) // recursive user script
    const performDuplicateCheck = document.currentScript && document.currentScript.src === 'chrome-extension://kklailfgofogmmdlhgmjgenehkjoioip/grid.user.js'
    const version =
      (document.currentScript && document.currentScript.dataset.version) || (typeof GM !== 'undefined' && GM && GM.info && GM.info.script && GM.info.script.version) || '?.?.?'
    let firstRun = true
    setInterval(() => {
      // Find the UI elements we need to modify. If they don't exist we haven't entered the meeting yet and will try again later
      const participantVideo = document.querySelector('[data-allocation-index]')
      const _container = participantVideo && participantVideo.parentElement
      if (_container && _container !== container) {
        container = _container
        updateSetting('enabled', settings['enabled']) // When someone starts a presentation `container` will change under us, so we need to restart the grid
      }

      if (_container && !settingsOverlay) {
        settingsOverlay = document.createElement('div')
        settingsOverlay.classList.add('__gmgv-settings')
        document.body.appendChild(settingsOverlay)
        settingsOverlay.innerHTML = `
          <div>
            <div>
              <span>${T('advancedSettingsTitle')}</span>
              <span class="__gmgv-close"><svg viewBox="0 0 24 24">${close}</svg></span>
            </div>
            <label>
              <span>${T('bottomToolbarBehavior')}</span>
              <select data-gmgv-setting="bottom-toolbar">
                <option value="native">${T('btbNative')}</option>
                <option value="resize">${T('btbResize')}</option>
                <option value="force">${T('btbForce')}</option>
              </select>
            </label>
            <label>
              <span>${T('rightToolbarBehavior')}</span>
              <select data-gmgv-setting="right-toolbar">
                <option value="native">${T('rtbNative')}</option>
                <option value="resize">${T('rtbResize')}</option>
              </select>
            </label>
            <label>
              <span>${T('ownVideoBehavior')}</span>
              <select data-gmgv-setting="own-video">
                <option value="native">${T('ovbNative')}</option>
                <option value="flip">${T('ovbFlip')}</option>
              </select>
            </label>
            <label>
              <span>${T('presentationBehavior')}</span>
              <select data-gmgv-setting="presentation">
                <option value="never">${T('pbNever')}</option>
                <option value="own-video">${T('pbOwnVideo')}</option>
                <option value="always">${T('pbAlways')}</option>
              </select>
            </label>
            <label>
              <span>${T('modifyNames')}</span>
              <select data-gmgv-setting="names">
                <option value="native">${T('mnNative')}</option>
                <option value="first-space">${T('mnFirstSpace')}</option>
                <option value="last-space">${T('mnLastSpace')}</option>
              </select>
            </label>
            <label>
              <span>${T('forceQuality')}</span>
              <select data-gmgv-setting="force-quality">
                <option value="auto">${T('fqAuto')}</option>
                <option value="2">${T('fqGood')}</option>
                <option value="3">${T('fqMediocre')}</option>
                <option value="4">${T('fqBad')}</option>
                <option value="5">${T('fqWorst')}</option>
              </select>
            </label>
          </div>
        `
        settingsOverlay.onclick = () => updateSetting('show-settings-overlay', false)
        settingsOverlay.querySelector('div').onclick = e => e.stopPropagation()
        settingsOverlay.querySelector('.__gmgv-close').onclick = () => updateSetting('show-settings-overlay', false)
        settingsOverlay.querySelectorAll('select').forEach(el => {
          const settingName = el.dataset.gmgvSetting
          el.value = settings[settingName]
          el.onchange = e => updateSetting(settingName, e.target.value)
        })
      }

      const ownVideoPreview = document.querySelector('[data-fps-request-screencast-cap]')
      const buttons = ownVideoPreview && ownVideoPreview.parentElement.parentElement.parentElement
      // If user has other grid view extensions installed, warn them
      if (buttons && !buttons.__grid_ran2) {
        buttons.__grid_ran2 = true

        const hasDuplicates = Array.from(document.querySelectorAll('script'))
          .map(s => s.src)
          .filter(src =>
            [
              'chrome-extension://bjkegbgpfgpikgkfidhcihhiflbjgfic/js/gridview.js',
              'chrome-extension://lipelfbeppnkhoaegfgceghpbamchmpn/assets/js/meet-grid.min.js',
              'chrome-extension://joeanbdpecniicldgpbnobefjflfeedj/js/google-meet-grid-view/grid.user.js',
              'chrome-extension://gdoepoildlikigihojgpedhakkfpjaac/js/google-meet-grid-view/grid.user.js',
              'chrome-extension://pbnakhjodkkmiedpebpnlbdldeedhpej/js/google-meet-grid-view/grid.user.js',
              'chrome-extension://hjkmjeofhbkhmhpbdmmcbgjgihadjgnl/grid.user.js',
            ].includes(src),
          )
        if (performDuplicateCheck && hasDuplicates.length > 0) {
          console.log('[google-meet-grid-view] Duplicates detected', hasDuplicates)
          const duplicateWarning = document.createElement('div')
          duplicateWarning.classList.add('__gmgv-duplicate-warning')
          duplicateWarning.innerHTML = `<svg viewBox="0 0 24 24">${alert}</svg><span>${T('duplicateWarning')}</span>`
          buttons.parentElement.prepend(duplicateWarning)
        }
      }
      if (buttons && !buttons.__grid_ran) {
        buttons.__grid_ran = true
        buttons.parentElement.parentElement.parentElement.style.zIndex = 10 // Prevent options getting cut off by pin/mute overlay or speaker overlay

        // Find the button container element and copy the divider
        buttons.prepend(buttons.children[1].cloneNode())

        // Add our button to to enable/disable the grid
        toggleButton = document.createElement('div')
        toggleButton.classList = buttons.children[1].classList
        toggleButton.classList.add('__gmgv-button')
        toggleButton.onclick = () => {
          updateSetting('enabled', !settings['enabled'])
        }
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
            <a href="#">${T('advancedSettingsLink')}</a>
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
          el.onchange = e => updateSetting(settingName, e.target.checked)
        })
        toggleButton.querySelector('a').onclick = e => {
          e.preventDefault()
          updateSetting('show-settings-overlay', true)
        }

        updateSetting('screen-capture-mode', settings['screen-capture-mode'])
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

                // reflow()
                m = /=arguments;.*\(this\)/.exec(p.value.toString())
                if (m) {
                  console.log('[google-meet-grid-view] Successfully hooked into reflow trigger', v.prototype[k])
                  const p = new Proxy(v.prototype[k], ReflowProxyHandler())
                  p.__grid_ran = true
                  v.prototype[k] = p
                }

                m = /function\(a\){return .*\.appendChild\(/.exec(p.value.toString())
                if (m) {
                  console.log('[google-meet-grid-view] Successfully hooked into append handler', v.prototype[k])
                  const p = new Proxy(v.prototype[k], AppendProxyHandler())
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
        if (!window.default_MeetingsUi.__grid_ran) {
          console.log('[google-meet-grid-view] Successfully hooked into meetings UI')
          const p = new Proxy(window.default_MeetingsUi, MeetingsUIProxyHandler())
          p.__grid_ran = true
          window.default_MeetingsUi = p
        }
      }

      // Auto-enable
      if (firstRun && container && buttons) {
        firstRun = false
        if (settings['auto-enable']) updateSetting('enabled', true)
      }
    }, 1000)

    // This overrides the function that handles laying out video.
    // All we do here is install another proxy on the Map that returns which layout to use
    function RefreshVideoProxyHandler(objKey, funcKey) {
      return {
        apply: function (target, thisArg, argumentsList) {
          if (!thisArg[objKey].__grid_ran) {
            console.log('[google-meet-grid-view] Successfully hooked into video layout', thisArg[objKey])
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
            console.log('[google-meet-grid-view] Successfully hooked into video layout', argumentsList[0][objKey])
            const p = new Proxy(argumentsList[0][objKey], LayoutVideoProxyHandler(argumentsList[0], funcKey))
            p.__grid_ran = true
            argumentsList[0][objKey] = p
          }
          return target.apply(thisArg, argumentsList)
        },
      }
    }
    // When this inevitably fails again run the following: Object.values(default_MeetingsUi).filter(v => v && typeof v === 'function' && /this\.([A-Za-z]+)=[A-Za-z]+\(this\)/.test(v.toString()))
    function MeetingsUIProxyHandler() {
      return {
        set: function (obj, prop, value) {
          if (value && typeof value === 'function') {
            const m = /\.([A-Za-z]+)\([a-zA-Z,.]+\{[^\x05]*?this\.([A-Za-z]+)=[A-Za-z]+\(this\)/.exec(value.toString())
            if (m) {
              console.log('[google-meet-grid-view] Successfully hooked into rendering pipeline v3', value)
              value = new Proxy(value, RefreshVideoProxyHandlerV3(m[2], m[1]))
            }
          }
          return Reflect.set(obj, prop, value)
        },
      }
    }
    function RefreshVideoProxyHandlerV3(objKey, funcKey) {
      return {
        construct: function (target, argumentsList) {
          const ret = Reflect.construct(target, argumentsList)
          console.log('[google-meet-grid-view] Successfully hooked into video layout', ret)
          ret[objKey] = new Proxy(ret[objKey], LayoutVideoProxyHandler(ret, funcKey))
          return ret
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

          if (name == 'get') {
            return idx => ({
              [funcKey]: (videoOrdering, windowData) => {
                // idx mapping:
                // 2 = tiled?
                // 3 = spotlight
                // 4 = sidebar
                // 5 = auto?
                if (!settings['enabled']) {
                  return ret(idx)[funcKey](videoOrdering, windowData)
                }
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
              if (thisArg[objKey].getVolume() > 0 && settings['enabled'] && settings['highlight-speaker']) {
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

    function ReflowProxyHandler() {
      return {
        apply: function (target, thisArg, argumentsList) {
          forceReflow = () => {
            // reflow.call(this, undefined)
            target.call(thisArg, argumentsList)
          }
          return target.apply(thisArg, argumentsList)
        },
      }
    }

    function AppendProxyHandler() {
      return {
        apply: function (target, thisArg, argumentsList) {
          // Detect when a participant video is added
          if (argumentsList.length === 1 && argumentsList[0] && argumentsList[0].dataset && argumentsList[0].dataset.allocationIndex) {
            const v = argumentsList[0]
            injectHideButton(v)
            if (settings['enabled']) {
              const i = +v.dataset.allocationIndex
              if (i < lastStyles.length) {
                lastStyles[i].el = v
                applyStyles(lastStyles[i])
              }
            }
          }
          // Detect when participant options are expanded
          const participantOptions = Object.values(thisArg)
            .map(Object.values)
            .flat()
            .filter(v => v && v instanceof HTMLElement && v.dataset.sortKey)
          if (participantOptions.length === 1) {
            const v = Object.values(argumentsList[0]).map(Object.values).flat()[0]
            injectShowHideButton(v, participantOptions[0])
          }
          return target.apply(thisArg, argumentsList)
        },
      }
    }

    // This is a custom layout function to power grid view.
    // Notably it forces every participant to load (or just those with video in only-video mode)
    // and consistently sorts by participant name (rather than who has talked last)
    function GridLayout(orderingInput) {
      // If we try to run without overwriting Google Meet's video sizing code we'll accidentally cause an infinite loop
      // So ensure we've overwritten it or error (and fall back to original layout) if we haven't
      if (!sizingFuncOverwritten) {
        const [sizeFuncName, sizeFunc] = Object.entries(window.default_MeetingsUi).find(([k, v]) => v && typeof v === 'function' && /bb_/.test(v.toString()))
        const sizeConstructor = Object.values(window.default_MeetingsUi).find(v => v && typeof v === 'function' && /this\.left=a/.test(v.toString()))
        if (!sizeFuncName || !sizeConstructor || !(sizeFuncName in window.default_MeetingsUi)) {
          throw new Error('could not overwrite sizing function')
        }

        window.default_MeetingsUi[sizeFuncName] = new Proxy(sizeFunc, {
          apply: function (target, thisArg, argumentsList) {
            const [a, b, c, d, e] = argumentsList
            if (settings['enabled'] || c > 16) {
              const r = []
              for (let i = 0; i < c; i++) {
                r.push(new sizeConstructor(0, 0, b.width, b.height))
              }
              return r
            }
            return target.apply(thisArg, argumentsList)
          },
        })

        sizingFuncOverwritten = true
        console.log('[google-meet-grid-view] Successfully overwrote sizing function')
      }

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

      const importantObject = Object.values(this).find(v => v && v.constructor && /listener=new/.test(v.constructor.toString()))
      const videoKeys = Object.values(importantObject).find(v => Array.isArray(v) && v.length && v.every(isSpacesStr)) || []
      const videoMap = Object.values(importantObject).find(v => v instanceof Map && v.size && Array.from(v.keys()).every(isSpacesStr))
      const ownVideo =
        Object.values(importantObject)
          .filter(v => v && typeof v === 'object' && v.$goog_Thenable)
          .map(v => videoMap.get(Object.values(v).find(isSpacesStr)))
          .find(v => v) || null
      ownID = ownVideo.id

      // Use the map & map keys we found earlier to add every participant
      let ret = []
      for (const v of videoKeys) {
        addUniqueVideoElem(ret, videoMap.get(v))
      }
      if (settings['include-own-video']) {
        addUniqueVideoElem(ret, ownVideo)
      }
      if (settings['presentation'] === 'always' || (settings['presentation'] === 'own-video' && settings['include-own-video'])) {
        if (ownVideo.children && ownVideo.children.length) {
          for (let child of ownVideo.children) {
            addUniqueVideoElem(ret, child)
          }
        }
      }

      // Set special values for later use
      // ret[idx][magicKey].wr.Aa.Aa.Ca.Ea.Ws.Ea.state // mu (no) li (yes)
      const tests = [/\.call\(this\)/, /\.call\(this,.*,"a"\)/, /new Set;this\.\w+=new _/, /new Map.*new Set/, /"un".*"li"/, /new Map/, /Object/]
      ret.forEach(e => {
        let values = [e[magicKey]]
        for (let t of tests) {
          let newValues = []
          for (let v of values) {
            newValues = newValues.concat(Object.values(v).filter(vv => vv && vv.constructor && t.test(vv.constructor.toString())))
          }
          values = newValues
        }
        e.__gmgvHasVideo = values.some(v => v && v.state && v.state === 'li')
        e.__gmgvIsPresentation = values.some(v => v && v.content && v.content === 'sc')
      })

      // If in only-video mode, remove any without video
      if (settings['show-only-video'] && !settings['screen-capture-mode']) {
        ret = ret.filter(e => e.__gmgvHasVideo)
      }

      // Remove all those explicitly hidden
      const activeIDs = new Set(ret.map(v => v[magicKey].id))
      ret = ret.filter(e => !hiddenIDs.has(e[magicKey].id))

      // Allocate slots for screen capture mode
      const hiddenSize = Array.from(screenCaptureModeLookup.values()).filter(v => hiddenIDs.has(v.id)).length
      if (settings['screen-capture-mode']) {
        // Remove gaps caused by hidden elements
        let fullOrdering = []
        screenCaptureModeLookup.forEach(v => {
          v.active = activeIDs.has(v.id)
          v.hidden = hiddenIDs.has(v.id)
          if (!v.hidden) fullOrdering[v.order] = v
        })
        let hiddenOffset = 0
        for (let i = 0; i < fullOrdering.length; i++) {
          if (fullOrdering[i]) {
            fullOrdering[i].order -= hiddenOffset
            screenCaptureModeAllocations.set(fullOrdering[i].id, fullOrdering[i].order)
          } else {
            hiddenOffset++
          }
        }

        ret = ret.filter(v => {
          const participant = v[magicKey]
          const id = participant.id
          const name = participant.name
          const presenting = !!participant.parent

          if (screenCaptureModeAllocations.has(id)) return true

          for (let dedupeID = 0; dedupeID <= screenCaptureModeLookup.size; dedupeID++) {
            const key = `${name}|${presenting}|${dedupeID}`
            let l = screenCaptureModeLookup.get(key)
            if (l && l.active && l.id !== id) continue
            if (!l) l = { order: screenCaptureModeLookup.size - hiddenSize }
            l.active = true
            l.id = id
            screenCaptureModeLookup.set(key, l)
            if (l.hidden) {
              hiddenIDs.add(id)
              return false
            }
            screenCaptureModeAllocations.set(id, l.order)
            return true
          }
        })

        for (let id of screenCaptureModeAllocations.keys()) {
          if (!activeIDs.has(id)) screenCaptureModeAllocations.delete(id)
        }
      }

      // If there are no participants, add ourselves
      if (!ret.length) {
        addUniqueVideoElem(ret, ownVideo)
      }

      // sort by id to avoid google meet swapping elements under us
      ret.sort((a, b) => a[magicKey].id.localeCompare(b[magicKey].id))

      // Transform participant names as requested
      ret.forEach(a => {
        const transform = {
          native: n => n,
          'first-space': n => {
            let p = n.split(' ')
            p[p.length - 1] += ','
            p.push(p.shift())
            return p.join(' ')
          },
          'last-space': n => {
            let p = n.split(' ')
            p[p.length - 1] += ','
            p.unshift(p.pop())
            return p.join(' ')
          },
        }[settings['names']]

        a[magicKey].__gmgvName = a[magicKey].__gmgvName || a[magicKey].name
        const name = transform(a[magicKey].__gmgvName)
        for (let v of Object.values(a[magicKey])) {
          if (v && typeof v === 'object') {
            for (let vv of Object.values(v)) {
              if (Array.isArray(vv) && vv.length > 3 && vv[0] === a[magicKey].id && vv[2].includes('googleusercontent.com')) {
                vv[1] = name
              }
            }
          }
        }
      })

      // Calculate actual ordering based on name & id
      const ordering = ret.map(a => ({ name: a[magicKey].name, id: a[magicKey].id }))
      ordering.sort((a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id))

      // Set Pinned Index for use in CSS loop. If there is no pin, use the presenter if available
      let pinnedIndex = ret.findIndex(v => v[magicKey].isPinned())
      if (pinnedIndex < 0) {
        pinnedIndex = ret.findIndex(v => v.__gmgvIsPresentation)
      }

      // Set video quality based on estimated video height & number of videos
      // 0=best? 1=_ 2=good 3=ok 4=bad 5=worst
      const numVideo = ret.filter(e => e.__gmgvHasVideo).length
      const size = calculateVideoSize(ret.length, pinnedIndex >= 0)
      let setVideoQuality = magicSet(5)
      if (settings['screen-capture-mode']) {
        setVideoQuality = magicSet(0)
      } else if (settings['force-quality'] !== 'auto') {
        setVideoQuality = magicSet(+settings['force-quality'])
      } else if (size.height >= 300 && numVideo <= 9) {
        setVideoQuality = magicSet(2)
      } else if (size.height >= 200 && numVideo <= 16) {
        setVideoQuality = magicSet(3)
      } else if (size.height >= 100 && numVideo <= 25) {
        setVideoQuality = magicSet(4)
      }
      ret.forEach(setVideoQuality)
      if (pinnedIndex >= 0) magicSet(0)(ret[pinnedIndex])

      // Build CSS changes
      if (container) {
        let { cols, rows } = size
        if (settings['screen-capture-mode']) {
          cols = rows = Math.ceil(Math.sqrt(screenCaptureModeLookup.size - hiddenSize))
          const mul = Math.floor(Math.min((innerWidth - 327) / (cols * 16), (innerHeight - 140) / (cols * 9)))
          container.style.marginLeft = `${innerWidth - 325 - mul * cols * 16}px`
          container.style.marginTop = `${innerHeight - 140 - mul * cols * 9}px`
        } else {
          container.style.marginLeft = ''
          container.style.marginTop = ''
        }
        container.classList.toggle('__gmgv-screen-capture-mode', settings['screen-capture-mode'])
        container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
        container.style.gridTemplateRows = settings['screen-capture-mode'] ? `repeat(${rows}, 1fr)` : ''

        const divTests = [/this\.src=/, /Object/, /Array/, /this\.listener=/, /\.model.*\(this\)/, /HTMLDivElement/]
        const children = ret.map(e => {
          let values = [e[magicKey]]
          for (let t of divTests) {
            let newValues = []
            for (let v of values) {
              newValues = newValues.concat(Object.values(v).filter(vv => vv && vv.constructor && t.test(vv.constructor.toString())))
            }
            values = newValues
          }
          return values.filter(v => v.parentElement === container)[0]
        })

        lastStyles = []
        for (let i = 0; i < ret.length; i++) {
          const v = (lastStyles[i] = { el: children[i], name: ret[i][magicKey].name })
          if (settings['screen-capture-mode']) {
            const idx = screenCaptureModeAllocations.get(ret[i][magicKey].id)
            v.order = ''
            v.gridArea = `${1 + Math.floor(idx / cols)} / ${1 + (idx % cols)}` // row / column
          } else if (i === pinnedIndex) {
            v.order = -1
            v.gridArea = `span ${size.pinnedRows} / span ${size.pinnedCols}`
          } else {
            v.order = ordering.findIndex(o => o.id === ret[i][magicKey].id)
            v.gridArea = ''
          }
        }

        lastStyles.forEach(applyStyles)
      }

      // Build a video list from the ordered output
      return new VideoList(ret)
    }

    function calculateVideoSize(n, hasPin) {
      let sizes = []
      const iw = innerWidth - 4
      const ih = innerHeight - 52
      const w = iw / 14 // width normalized to 14/9
      const h = ih / 9 // height normalized to 14/9
      for (let cols = 1; cols <= 30; cols++) {
        let rows = Math.ceil(n / cols)
        let pinnedCols = 1
        let pinnedRows = 1
        if (hasPin) {
          // We want the pinned area to be 1/4th the screen but a 16/9 ratio
          const pinnedArea = (iw * ih) / 4
          const pw = Math.sqrt(pinnedArea * (16 / 9))
          const ph = (9 / 16) * pw
          pinnedCols = Math.ceil((cols * pw) / iw)
          for (let canFit = false; !canFit; rows++) {
            pinnedRows = Math.ceil((rows * ph) / ih)
            canFit = rows * cols >= pinnedRows * pinnedCols + n - 1
          }
          rows--
        }
        const size = Math.min(w / cols, h / rows)
        sizes.push({
          cols,
          rows,
          size,
          height: ih / rows,
          pinnedRows,
          pinnedCols,
        })
      }
      return sizes.reduce((a, b) => (a.size >= b.size ? a : b), {})
    }

    function applyStyles({ el, order, gridArea, name }) {
      if (!el) return
      el.style.order = order
      el.style.gridArea = gridArea
      el.querySelectorAll('[data-self-name]').forEach(d => {
        d.innerText = name
      })
    }

    function injectHideButton(el) {
      const buttons = el.lastChild.firstChild
      const refButton = buttons.firstChild.firstChild
      const b = document.createElement('div')
      b.classList = '__gmgv-hide'
      b.innerHTML = `
        <div class="${refButton.classList}">
          <span class="${refButton.children[1].classList}">
            <svg viewBox="0 0 24 24">${visibilityOn}</svg>
          </span>
          <div>${T('hideParticipant')}</div>
        </div>
      `
      b.onmousedown = e => e.stopPropagation()
      b.onclick = e => {
        e.preventDefault()
        const id = el.dataset.requestedParticipantId
        if (id === ownID) {
          updateSetting('include-own-video', false)
        } else {
          hiddenIDs.add(id)
          forceReflow()
        }
      }
      buttons.insertBefore(b, buttons.lastChild)
    }

    function injectShowHideButton(el, parent) {
      const id = parent.dataset.participantId
      const hidden = hiddenIDs.has(id)
      const refButton = el.lastChild.children[0]
      parent.parentElement.parentElement.style.overflow = 'visible'
      el.style.overflow = 'visible'
      const b = document.createElement('div')
      b.classList = '__gmgv-show-hide'
      b.style.display = settings['enabled'] ? '' : 'none'
      b.innerHTML = `
      <div class="${refButton.classList}">
        <span class="${refButton.children[1].classList}">
          <svg viewBox="0 0 24 24">${hidden ? visibilityOff : visibilityOn}</svg>
        </span>
        <div>${hidden ? T('showParticipant') : T('hideParticipant')}</div>
      </div>
      `
      b.onclick = e => {
        e.preventDefault()
        if (hiddenIDs.has(id)) {
          hiddenIDs.delete(id)
        } else {
          hiddenIDs.add(id)
        }
        b._refresh()
        forceReflow()
      }
      b._refresh = () => {
        const hidden = hiddenIDs.has(id)
        b.querySelector('.__gmgv-show-hide > div > div').innerHTML = hidden ? T('showParticipant') : T('hideParticipant')
        b.querySelector('svg').innerHTML = hidden ? visibilityOff : visibilityOn
      }
      el.insertBefore(b, el.lastChild)
    }

    function updateSetting(name, value) {
      settings[name] = value
      localStorage.setItem('gmgv-' + name, value)

      // Update the menu CSS
      if (toggleButton) {
        toggleButton.querySelector('svg').innerHTML = settings['enabled'] ? gridOn : gridOff
        const i = toggleButton.querySelector(`input[data-gmgv-setting="${name}"]`)
        if (i) i.checked = value

        const showOnlyVideo = toggleButton.querySelector('input[data-gmgv-setting="show-only-video"]')
        showOnlyVideo.checked = settings['show-only-video'] && !settings['screen-capture-mode']
        showOnlyVideo.disabled = settings['screen-capture-mode']
        showOnlyVideo.parentElement.classList.toggle('disabled', settings['screen-capture-mode'])

        const highlightSpeaker = toggleButton.querySelector('input[data-gmgv-setting="highlight-speaker"]')
        highlightSpeaker.checked = settings['highlight-speaker'] && !settings['screen-capture-mode']
        highlightSpeaker.disabled = settings['screen-capture-mode']
        highlightSpeaker.parentElement.classList.toggle('disabled', settings['screen-capture-mode'])
      }

      // Update container CSS
      if (container) {
        container.classList.toggle('__gmgv-vid-container', settings['enabled'])
        container.classList.toggle('__gmgv-btb-resize', settings['bottom-toolbar'] === 'resize')
        container.classList.toggle('__gmgv-btb-force', settings['bottom-toolbar'] === 'force')
        container.classList.toggle('__gmgv-rtb-resize', settings['right-toolbar'] === 'resize')
        container.classList.toggle('__gmgv-flip-self', settings['own-video'] === 'flip')
        if (!settings['enabled']) {
          container.style.marginLeft = ''
          container.style.marginTop = ''
        }

        const bottomBar = Array.from(container.parentElement.parentElement.children).find(el => el.clientHeight === 88)
        bottomBar.style.transform = settings['enabled'] && settings['bottom-toolbar'] === 'force' ? 'translateY(0)' : ''
      }

      // Update settings CSS
      if (settingsOverlay) {
        settingsOverlay.style.display = settings['show-settings-overlay'] ? 'flex' : ''
      }

      // Update participant menu CSS
      document.querySelectorAll('.__gmgv-show-hide').forEach(el => {
        el.style.display = settings['enabled'] ? '' : 'none'
        el._refresh()
      })

      // Reset the screen capture mappings to reduce clutter on toggle
      if (!settings['screen-capture-mode']) {
        screenCaptureModeAllocations = new Map()
        screenCaptureModeLookup = new Map()
      }
      if (!settings['enabled']) {
        hiddenIDs = new Set()
      }

      // Force a reflow to pick up the new settings
      forceReflow()
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
              settings,
            })
            break
          case 'updateSetting':
            updateSetting(event.data.name, event.data.value)
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
