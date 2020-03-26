// ==UserScript==
// @name         Google Meet Grid View
// @namespace    https://fugi.tech/
// @version      1.4
// @description  Adds a toggle to use a grid layout in Google Meets
// @author       Chris Gamble
// @include      https://meet.google.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

;(function() {
  const gridOn =
    '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M10,4V8H14V4H10M16,4V8H20V4H16M16,10V14H20V10H16M16,16V20H20V16H16M14,20V16H10V20H14M8,20V16H4V20H8M8,14V10H4V14H8M8,8V4H4V8H8M10,14H14V10H10V14M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4C2.92,22 2,21.1 2,20V4A2,2 0 0,1 4,2Z" /></svg>'
  const gridOff =
    '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M0,2.77L1.28,1.5L22.5,22.72L21.23,24L19.23,22H4C2.92,22 2,21.1 2,20V4.77L0,2.77M10,4V7.68L8,5.68V4H6.32L4.32,2H20A2,2 0 0,1 22,4V19.7L20,17.7V16H18.32L16.32,14H20V10H16V13.68L14,11.68V10H12.32L10.32,8H14V4H10M16,4V8H20V4H16M16,20H17.23L16,18.77V20M4,8H5.23L4,6.77V8M10,14H11.23L10,12.77V14M14,20V16.77L13.23,16H10V20H14M8,20V16H4V20H8M8,14V10.77L7.23,10H4V14H8Z" /></svg>'
  let RefreshVideoProxyHandler

  // Create the styles we need
  const s = document.createElement('style')
  s.innerText =
    '.__gmeet-vid-container{display:grid;grid-auto-rows:1fr;top:48px!important;right:0!important;left:0!important;bottom:0!important}.__gmeet-vid-container>div{position:relative!important;margin-top:0!important;top:0!important;left:0!important;height:100%!important;width:100%!important;background:0 0!important}'
  document.body.append(s)

  // Find the video container
  let runInterval = null
  let container = null
  let toggleButton = null

  // Define toggle functions
  const enableGridMode = () => {
    // This continually probes the number of participants & screen size to ensure videos are max possible size regardless of window layout
    runInterval = setInterval(() => {
      const w = innerWidth / 16
      const h = (innerHeight - 48) / 9
      const n = container.children.length
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
    }, 250)
    container.classList.add('__gmeet-vid-container')
    toggleButton.innerHTML = gridOn
  }
  const disableGridMode = () => {
    clearInterval(runInterval)
    container.classList.remove('__gmeet-vid-container')
    toggleButton.innerHTML = gridOff
    runInterval = null
  }
  const toggleGridMode = () => {
    runInterval ? disableGridMode() : enableGridMode()
  }

  // Make the button to perform the toggle
  // This runs on a loop since you can join/leave the meeting repeatedly without changing the page
  setInterval(() => {
    const ownVideoPreview = document.querySelector('[data-fps-request-screencast-cap]')
    const participantVideo = document.querySelector('[data-participant-id]')
    if (!ownVideoPreview || ownVideoPreview.__grid_ran || !participantVideo) return
    container = participantVideo.parentElement
    ownVideoPreview.__grid_ran = true

    const buttons = ownVideoPreview.parentElement.parentElement.parentElement
    buttons.prepend(buttons.children[1].cloneNode())

    toggleButton = document.createElement('div')
    toggleButton.classList = buttons.children[1].classList
    toggleButton.style.display = 'flex'
    toggleButton.innerHTML = gridOff
    toggleButton.onclick = toggleGridMode
    buttons.prepend(toggleButton)

    if (window.default_MeetingsUi) {
      for (let v of Object.values(window.default_MeetingsUi)) {
        if (v && v.prototype) {
          const p = Object.getOwnPropertyDescriptor(v.prototype, 'Aa')
          if (p && p.value && p.value.toString().includes('this.La.get')) {
            if (!v.prototype.Aa.__grid_ran) {
              console.log('[google-meet-grid-view] Successfully hooked into rendering pipeline')
              const p = new Proxy(v.prototype.Aa, RefreshVideoProxyHandler)
              p.__grid_ran = true
              v.prototype.Aa = p
            }
          }
        }
      }
    }
  }, 250)

  const LayoutVideoProxyHandler = Lv => ({
    get: function(target, name) {
      let ret = Reflect.get(target, name)
      if (typeof ret === 'function') {
        ret = ret.bind(target)
      }

      if (runInterval && name == 'get') {
        return idx => ({
          Aa: Ba => {
            try {
              return GridLayout.call(Lv, Ba)
            } catch (e) {
              console.error(e)
              return ret(idx).Aa(Ba)
            }
          },
        })
      }

      return ret
    },
  })

  RefreshVideoProxyHandler = {
    apply: function(target, thisArg, argumentsList) {
      if (!thisArg.La.__grid_ran) {
        const p = new Proxy(thisArg.La, LayoutVideoProxyHandler(thisArg))
        p.__grid_ran = true
        thisArg.La = p
      }
      return target.apply(thisArg, argumentsList)
    },
  }

  // Used to forcibly load every video frame
  function GridLayout(orderingInput) {
    const VideoList = orderingInput.constructor
    const VideoElem = Object.values(window.default_MeetingsUi)
      .filter(i => typeof i === 'function')
      .filter(i => i.toString().includes('.attribution'))[0]

    const magicKey = Object.entries(new VideoElem(999)).find(e => e[1] === 999)[0]

    const addUniqueVideoElem = (a, b, c) => {
      if (b && !a.some(e => e[magicKey] === b)) {
        const d = new VideoElem(b, { attribution: true })
        if (c) c(d)
        a.push(d)
      }
    }
    const isSpacesStr = i => typeof i === 'string' && i.startsWith('spaces/')

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

    let newBa, importantObject
    for (let v of Object.values(this)) {
      if (v && typeof v === 'object') {
        for (let vv of Object.values(v)) {
          if (Array.isArray(vv) && vv.length && vv.every(isSpacesStr)) {
            if (newBa && vv != newBa) {
              console.log('Invalid newBa search!', newBa, vv)
              throw new Error('Failed')
            } else {
              newBa = vv
              importantObject = v
            }
          }
        }
      }
    }

    let videoMap
    for (let v of Object.values(importantObject)) {
      if (v instanceof Map && v.size && Array.from(v.keys()).every(isSpacesStr)) {
        videoMap = v
      }
    }

    let ownVideo = null
    for (let v of Object.values(importantObject)) {
      if (v && typeof v === 'object' && v['$goog_Thenable']) {
        for (let vv of Object.values(v)) {
          if (isSpacesStr(vv)) {
            ownVideo = videoMap.get(vv) || null
          }
        }
      }
    }

    let ret = []
    // TODO: Google meets also injects two other video elements here
    // I suspect one of them is the presenter?
    for (const v of newBa) {
      addUniqueVideoElem(ret, videoMap.get(v), magicSet(2))
    }
    if (!ret.length) {
      addUniqueVideoElem(ret, ownVideo, magicSet(true))
    }

    ret.sort((a,b) => a[magicKey].name.localeCompare(b[magicKey].name))
    magicSet(0)(ret[0])

    // Build a video list from the ordered output
    return new VideoList(ret)
  }
})()
