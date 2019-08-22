import React, { useState, useContext, useEffect, useRef } from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview, LiveContext } from 'react-live'
import { rhythm } from '../../utils/typography'
import { useCodeContext } from './CodeProvider'
import SnippetInfo from './SnippetInfo'
import PlainCodeHighlight from './PlainCodeHighlight'

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
  const failedScripts = useRef([])

  useEffect(() => {
    let ready = true
    scripts.forEach(scriptName => {
      if (
        !globalScripts[scriptName] ||
        globalScripts[scriptName].loading ||
        globalScripts[scriptName].failed
      ) ready = false
    })
    // collect failed scripts
    failedScripts.current = scripts.filter(name => globalScripts[name] && globalScripts[name].failed)
    if (ready) {
      setScriptsReady(true)
    }
  }, scripts.map(script => globalScripts[script]))

  if (scriptsReady) {
    return (
      <LiveProvider code={updater ? code : code.split(/\r\n|\r|\n/).map(() => `🔥\n`).join("")}
        noInline={useRender ? true : false} disabled={editingDisabled} theme={theme}>
        <SnippetInfo language={'jsx'} scripts={scripts} live={true} editable={!editingDisabled} />
        <LiveEditor />
        <LiveError />
        <LivePreview />
        {
          !editingDisabled &&
          <ResetButton initialCode={code} update={forceUpdate} />
        }
      </LiveProvider>
    )
  } else if (failedScripts.current.length === 0) {
    return (
      <>
        <SnippetInfo language={'jsx'} scripts={scripts} live={true} editable={!editingDisabled} />
        <PlainCodeHighlight code={code} language={'jsx'} theme={theme} />
      </>
    )
  } else {
    return (
      <>
        <SnippetInfo language={'jsx'} scripts={scripts} live={true} editable={!editingDisabled} />
        <PlainCodeHighlight code={code} language={'jsx'} theme={theme} />
      </>
    )
  }
}

export default LiveReactEditor