import React, { useState, useEffect, useRef } from 'react'
import Editor from 'react-simple-code-editor';
import CodeHighlight from './CodeHighlight'
import SnippetInfo from './SnippetInfo'
import OutputLabel from './OutputLabel'
import { useCodeContext } from './CodeProvider'

function HtmlComponent({code, language}) {
  if (language === 'css') {
    return <style dangerouslySetInnerHTML={{__html: code}} />
  } else {
    return <div dangerouslySetInnerHTML={{__html: code}} />
  }
}

function HtmlControls({reset, language}) {
  return <button onClick={reset}>Reset {language.toUpperCase()}</button>
}

function LiveHtmlEditor({code: initialCode, language, theme, editingDisabled, linkId}) {
  const [code, setCode] = useState(initialCode)
  const [updater, forceUpdate] = useState(1)
  const { linkedSnippets, updateLinkedSnippets } = useCodeContext()
  const timeOutId = useRef()
  const themePlain = theme.plain
  async function reset() {
    setCode(initialCode)
    if (language === 'css' || !linkId) return
    await reRender()
    updateLinkedSnippets(linkId, 'renderedHTML')
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
    if (language === 'html') debouncedSetCode()
  }

  useEffect(() => {
    if (language === 'css') return
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
      <OutputLabel>
        {
          language === 'html'
          ? 'Rendered HTML:'
          : 'CSS Applied to page!'
        }
      </OutputLabel>
      {
        updater
        ? <HtmlComponent code={code} language={language}/>
        : <pre style={{textAlign: 'center'}}>🔥🔥🔥Loading!🔥🔥🔥</pre>
      }
      {
        !editingDisabled &&
        <HtmlControls reset={reset} language={language} />
      }
    </>
  )
}

export default LiveHtmlEditor