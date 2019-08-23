import React, { useState, useEffect, useRef } from 'react'
import Editor from 'react-simple-code-editor';
import CodeHighlight from './CodeHighlight'
import SnippetInfo from './SnippetInfo'
import OutputLabel from './OutputLabel'
import { useCodeContext } from './CodeProvider'

function HtmlComponent({code}) {
  return <div dangerouslySetInnerHTML={{__html: code}} />
}

function HtmlControls({reset}) {
  return <button onClick={reset}>Reset</button>
}

function LiveHtmlEditor({code: initialCode, language, theme, editingDisabled, linkId}) {
  const [code, setCode] = useState(initialCode)
  const [updater, forceUpdate] = useState(1)
  const { linkedSnippets, updateLinkedSnippets } = useCodeContext()
  const timeOutId = useRef()
  const themePlain = theme.plain
  async function reset() {
    setCode(initialCode)
    await reRender()
    if (linkId) updateLinkedSnippets(linkId, 'renderedHTML')
  }

  function reRender() {
    return new Promise((resolve, reject) => {
      forceUpdate(0)
      setTimeout(() => resolve(forceUpdate(1)), 0)
    })
  }

  function debouncedSetCode() {
    clearTimeout(timeOutId.current)
    timeOutId.current = setTimeout(() => {
      if (linkId) updateLinkedSnippets(linkId, 'renderedHTML')
    }, 500)
  }

  function setCodeWrapper(code) {
    setCode(code)
    debouncedSetCode()
  }

  useEffect(() => {
    if (linkedSnippets[linkId] === 'runningJS') {
      reRender().then(() => {
        updateLinkedSnippets(linkId, 'renderedHTML')
      })
    }
  }, [linkedSnippets[linkId]])

  return(
    <>
    <SnippetInfo language={language} editable={!editingDisabled} live={true} />
      <Editor
        value={code}
        padding={10}
        highlight={code => CodeHighlight({code, language, theme})}
        onValueChange={editingDisabled ? () => {} : setCodeWrapper}
        style={{
          whiteSpace: 'pre',
          fontFamily: 'monospace',
          ...themePlain
        }}
      />
      <OutputLabel>Rendered HTML:</OutputLabel>
      {
        updater
        ? <HtmlComponent code={code}/>
        : <pre style={{textAlign: 'center'}}>🔥🔥🔥Loading!🔥🔥🔥</pre>
      }
      {
        !editingDisabled &&
        <HtmlControls reset={reset} />
      }
    </>
  )
}

export default LiveHtmlEditor