import React, { useState, useContext, useEffect } from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview, LiveContext } from 'react-live'
import { rhythm } from '../../utils/typography'
import { useCodeContext } from './CodeProvider'
import ScriptsList from './ScriptsList'

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

function LiveReactEditor({code, theme, scripts, useRender, editingDisabled}) {
  const [updater, forceUpdate] = useState(1);
  const { globalScripts } = useCodeContext()
  const [scriptsReady, setScriptsReady] = useState(false)

  useEffect(() => {
    let ready = true
    scripts.forEach(scriptName => {
      if (!globalScripts[scriptName] || globalScripts[scriptName].loading) ready = false
    })
    if (ready) {
      setScriptsReady(true)
    }
  }, scripts.map(script => globalScripts[script]))

  return (
    <>
    {scriptsReady &&
      <LiveProvider code={updater ? code : code.split(/\r\n|\r|\n/).map(() => `🔥\n`).join("")}
      noInline={useRender ? true : false} disabled={editingDisabled} theme={theme}>
      <ScriptsList />
      <LiveEditor style={{outline: 'none'}} />
      <LiveError />
      <LivePreview />
      {
        !editingDisabled &&
        <ResetButton initialCode={code} update={forceUpdate} />
      }
      </LiveProvider>
    }
    </>
  )
}

export default LiveReactEditor