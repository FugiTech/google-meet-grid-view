// ==UserScript==
// @name         Google Meet Grid View
// @namespace    https://fugi.tech/
// @version      1.11
// @description  Adds a toggle to use a grid layout in Google Meets
// @author       Chris Gamble
// @include      https://meet.google.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

;(function() {
  // Translations
  const translations = {
    ca: {
      showOnlyVideo: 'Mostra només els participants amb video',
      highlightSpeaker: 'Ressalta el que parla',
      includeOwnVideo: 'Inclou el meu video a la graella',
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
    },
    es: {
      showOnlyVideo: 'Unicamente mostrar participantes con video',
      highlightSpeaker: 'Resaltar participantes',
      includeOwnVideo: 'Incluir mi video en el grid',
    },
    fr: {
      showOnlyVideo: 'Ne montrer que les participants avec caméra',
      highlightSpeaker: 'Surligner ceux qui parlent',
      includeOwnVideo: 'Vous inclure dans la grille',
    },
    it: {
      showOnlyVideo: 'Mostra solo partecipanti con video',
      highlightSpeaker: 'Illumina chi ha la paola',
      includeOwnVideo: 'Includi te stesso nella griglia',
    },
    nl: {
      showOnlyVideo: 'Toon alleen deelnemers met video',
      highlightSpeaker: 'Highlight sprekers',
      includeOwnVideo: 'Toon jezelf in het raster',
    },
    sv: {
      showOnlyVideo: 'Visa endast deltagare med video',
      highlightSpeaker: 'Markera/följ talare',
      includeOwnVideo: 'Inkludera mig i rutnätet',
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

  // SVGs
  const gridOff =
    '<path fill="currentColor" d="M0,2.77L1.28,1.5L22.5,22.72L21.23,24L19.23,22H4C2.92,22 2,21.1 2,20V4.77L0,2.77M10,4V7.68L8,5.68V4H6.32L4.32,2H20A2,2 0 0,1 22,4V19.7L20,17.7V16H18.32L16.32,14H20V10H16V13.68L14,11.68V10H12.32L10.32,8H14V4H10M16,4V8H20V4H16M16,20H17.23L16,18.77V20M4,8H5.23L4,6.77V8M10,14H11.23L10,12.77V14M14,20V16.77L13.23,16H10V20H14M8,20V16H4V20H8M8,14V10.77L7.23,10H4V14H8Z" />'
  const gridOn =
    '<path fill="currentColor" d="M10,4V8H14V4H10M16,4V8H20V4H16M16,10V14H20V10H16M16,16V20H20V16H16M14,20V16H10V20H14M8,20V16H4V20H8M8,14V10H4V14H8M8,8V4H4V8H8M10,14H14V10H10V14M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4C2.92,22 2,21.1 2,20V4A2,2 0 0,1 4,2Z" />'

  // Create the styles we need
  const s = document.createElement('style')
  s.innerText = `
    .__gmgv-vid-container {
      display: grid;
      grid-auto-rows: 1fr;
      top: 48px !important;
      right: 5px !important;
      left: 5px !important;
      bottom: 0 !important;
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
    .__gmgv-speaking:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 0.4em solid #64ffda;
      box-sizing: border-box;
    }
    .__gmgv-button {
      overflow: visible !important;
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
    }
    .__gmgv-button:hover > div {
      display: block;
    }
    .__gmgv-button > div label {
      display: block;
      line-height: 24px;
      cursor: pointer;
    }
  `
  document.body.append(s)

  // Variables
  let runInterval = null
  let container = null
  let toggleButtonSVG = null
  let pinnedIndex = -1
  let showOnlyVideo = localStorage.getItem('gmgv-show-only-video') === 'true'
  let highlightSpeaker = localStorage.getItem('gmgv-highlight-speaker') === 'true'
  let includeOwnVideo = localStorage.getItem('gmgv-include-own-video') === 'true'

  // This continually probes the number of participants & screen size to ensure videos are max possible size regardless of window layout
  const gridUpdateLoop = () => {
    const w = innerWidth / 16
    const h = (innerHeight - 48) / 9
    let n = container.children.length
    if (pinnedIndex >= 0 && pinnedIndex < n) {
      // Simulate having an extra quarter of videos so we can dedicate a quarter to the pinned video
      n = Math.ceil((4 / 3) * (n - 1))
    }
    let size = 0
    let col
    for (col = 1; col < 9; col++) {
      let s = Math.min(w / col, h / Math.ceil(n / col))
      if (s < size) {
        col--
        break
      }
      size = s
    }
    container.style.gridTemplateColumns = `repeat(${col}, 1fr)`
    for (let v of container.children) {
      if (+v.dataset.allocationIndex === pinnedIndex) {
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
    toggleButtonSVG.innerHTML = gridOff
  }
  const enableGrid = () => {
    if (runInterval) clearInterval(runInterval)
    runInterval = setInterval(gridUpdateLoop, 250)
    container.classList.add('__gmgv-vid-container')
    toggleButtonSVG.innerHTML = gridOn
  }
  const toggleGrid = () => {
    runInterval ? disableGrid() : enableGrid()
  }

  // Make the button to perform the toggle
  // This runs on a loop since you can join/leave the meeting repeatedly without changing the page
  setInterval(() => {
    // Find the UI elements we need to modify. If they don't exist we haven't entered the meeting yet and will try again later
    const ownVideoPreview = document.querySelector('[data-fps-request-screencast-cap]')
    const participantVideo = document.querySelector('[data-participant-id]') || document.querySelector('[data-requested-participant-id]')
    if (!ownVideoPreview || ownVideoPreview.__grid_ran || !participantVideo) return
    container = participantVideo.parentElement
    ownVideoPreview.__grid_ran = true

    // Find the button container element and copy the divider
    const buttons = ownVideoPreview.parentElement.parentElement.parentElement
    buttons.prepend(buttons.children[1].cloneNode())

    // Add our button to to enable/disable the grid
    const toggleButton = document.createElement('div')
    toggleButton.classList = buttons.children[1].classList
    toggleButton.classList.add('__gmgv-button')
    toggleButton.style.display = 'flex'
    toggleButton.onclick = toggleGrid
    buttons.prepend(toggleButton)

    toggleButtonSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    toggleButtonSVG.style.width = '24px'
    toggleButtonSVG.style.height = '24px'
    toggleButtonSVG.setAttribute('viewBox', '0 0 24 24')
    toggleButtonSVG.innerHTML = gridOff
    toggleButton.appendChild(toggleButtonSVG)

    // Add checkboxes for all our additional options
    const additionalOptions = document.createElement('div')
    additionalOptions.onclick = e => e.stopPropagation()
    toggleButton.appendChild(additionalOptions)

    const showOnlyVideoL = document.createElement('label')
    const showOnlyVideoI = document.createElement('input')
    showOnlyVideoI.type = 'checkbox'
    showOnlyVideoI.checked = showOnlyVideo
    showOnlyVideoI.onchange = e => {
      showOnlyVideo = e.target.checked
      localStorage.setItem('gmgv-show-only-video', showOnlyVideo)
    }
    showOnlyVideoL.innerText = T('showOnlyVideo')
    showOnlyVideoL.prepend(showOnlyVideoI)
    additionalOptions.appendChild(showOnlyVideoL)

    const highlightSpeakerL = document.createElement('label')
    const highlightSpeakerI = document.createElement('input')
    highlightSpeakerI.type = 'checkbox'
    highlightSpeakerI.checked = highlightSpeaker
    highlightSpeakerI.onchange = e => {
      highlightSpeaker = e.target.checked
      localStorage.setItem('gmgv-highlight-speaker', highlightSpeaker)
    }
    highlightSpeakerL.innerText = T('highlightSpeaker')
    highlightSpeakerL.prepend(highlightSpeakerI)
    additionalOptions.appendChild(highlightSpeakerL)

    const includeOwnVideoL = document.createElement('label')
    const includeOwnVideoI = document.createElement('input')
    includeOwnVideoI.type = 'checkbox'
    includeOwnVideoI.checked = includeOwnVideo
    includeOwnVideoI.onchange = e => {
      includeOwnVideo = e.target.checked
      localStorage.setItem('gmgv-include-own-video', includeOwnVideo)
    }
    includeOwnVideoL.innerText = T('includeOwnVideo')
    includeOwnVideoL.prepend(includeOwnVideoI)
    additionalOptions.appendChild(includeOwnVideoL)

    // Find the functions inside google meets code that we need to override for our functionality
    // Notably we're looking for the function that handles video layout, and the function that detects volume
    // This code is fairly hairy but basically just iterates through all the exposed functions until we find the
    // ones that roughly match the code we're looking for by running regexs on the function source code.
    // We can then parse that code to get variable names out and use javascript Proxys to override them.
    if (window.default_MeetingsUi) {
      for (let v of Object.values(window.default_MeetingsUi)) {
        if (v && v.prototype) {
          for (let k of Object.keys(v.prototype)) {
            const p = Object.getOwnPropertyDescriptor(v.prototype, k)
            if (p && p.value && !v.prototype[k].__grid_ran) {
              let m

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
      }
    }
  }, 250)

  // This overrides the function that handles laying out video.
  // All we do here is install another proxy on the Map that returns which layout to use
  function RefreshVideoProxyHandler(objKey, funcKey) {
    return {
      apply: function(target, thisArg, argumentsList) {
        if (!thisArg[objKey].__grid_ran) {
          const p = new Proxy(thisArg[objKey], LayoutVideoProxyHandler(thisArg, funcKey))
          p.__grid_ran = true
          thisArg[objKey] = p
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
      get: function(target, name) {
        let ret = Reflect.get(target, name)
        if (typeof ret === 'function') {
          ret = ret.bind(target)
        }

        if (runInterval && name == 'get') {
          return idx => ({
            [funcKey]: input => {
              try {
                return GridLayout.call(parent, input)
              } catch (e) {
                console.error(e)
                return ret(idx)[funcKey](input)
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
      apply: function(target, thisArg, argumentsList) {
        if (!thisArg.isDisposed()) {
          if (!thisArg.__grid_videoElem) {
            for (let v of Object.values(thisArg)) {
              if (v instanceof HTMLElement) {
                thisArg.__grid_videoElem = v.parentElement.parentElement.parentElement
              }
            }
          }
          if (thisArg.__grid_videoElem.dataset.participantId || thisArg.__grid_videoElem.dataset.requestedParticipantId) {
            if (thisArg[objKey].getVolume() > 0 && runInterval && highlightSpeaker) {
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
    const addUniqueVideoElem = (a, b, c) => {
      if (b && !a.some(e => e[magicKey] === b)) {
        const d = new VideoElem(b, { attribution: true })
        if (c) c(d)
        a.push(d)
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
      addUniqueVideoElem(ret, videoMap.get(v), magicSet(2))
    }
    if (includeOwnVideo) {
      addUniqueVideoElem(ret, ownVideo, magicSet(2))
    }

    // If in only-video mode, remove any without video
    if (showOnlyVideo) {
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

    // Set Pinned Index for use in CSS loop
    pinnedIndex = ret.findIndex(v => v[magicKey].isPinned())

    // Build a video list from the ordered output
    return new VideoList(ret)
  }
})()
