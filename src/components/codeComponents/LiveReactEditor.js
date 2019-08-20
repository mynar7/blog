import React, { useState, useContext } from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview, LiveContext } from 'react-live'
import { rhythm } from '../../utils/typography'
import { useCodeContext } from './CodeProvider'

function ResetButton({initialCode, update}) {
  const { onChange } = useContext(LiveContext)
  function performUpdate() {
    onChange(initialCode)
    update(0)
    setTimeout(() => update(1), 0)
  }
  return (
    <button style={{marginTop: rhythm(0.5)}} onClick={performUpdate}>Reset Code</button>
  )
}

function LiveReactEditor({code, theme, scripts, useRender}) {
  const [updater, forceUpdate] = useState(1);
  const { globalScripts } = useCodeContext()

  function areScriptsLoaded() {
    let ready = true
    scripts.forEach(scriptName => {
      if (!globalScripts[scriptName] || globalScripts[scriptName].loading) {
        ready = false
      }
    })
    return ready
  }

  return (
    <>
    {areScriptsLoaded() &&
      <LiveProvider code={updater ? code : code.split(/\r\n|\r|\n/).map(() => `🔥\n`).join("")}
      noInline={useRender ? true : false} theme={theme}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
      <ResetButton initialCode={code} update={forceUpdate} />
      </LiveProvider>
    }
    </>
  )
}

export default LiveReactEditor