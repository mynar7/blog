import React, { useState, useEffect, useRef } from 'react'
import Editor from 'react-simple-code-editor';
import CodeHighlight from './CodeHighlight'
import PlainCodeHighlight from './PlainCodeHighlight'
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

function LiveHtmlEditor({code: initialCode, language, theme, editingDisabled, linkId, hideCode}) {
  const [code, setCode] = useState(initialCode)
  const [updater, forceUpdate] = useState(1)
  const { linkedSnippets, updateLinkedSnippets, shouldShowEditor } = useCodeContext()
  const timeOutId = useRef()
  const themePlain = theme.plain
  async function reset() {
    setCode(initialCode)
    if (language === 'css') return
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
      {
        !hideCode &&
        <>
          <SnippetInfo language={language} editable={!editingDisabled && shouldShowEditor} live={true} />
          {
            editingDisabled || !shouldShowEditor
            ? <PlainCodeHighlight language={language} code={code} theme={theme}/>
            : <Editor
            value={code}
            padding={10}
            highlight={code => CodeHighlight({code, language, theme})}
            onValueChange={setCodeWrapper}
            style={{
              whiteSpace: 'pre',
              fontFamily: 'monospace',
              ...themePlain
            }}
            />
          }
          <OutputLabel>
            {
              language === 'html'
              ? 'Rendered HTML:'
              : 'CSS Applied to page!'
            }
          </OutputLabel>
        </>
      }
      {
        updater
        ? <HtmlComponent code={code} language={language}/>
        : <pre style={{textAlign: 'center'}}>🔥🔥🔥Loading!🔥🔥🔥</pre>
      }
      {
        !editingDisabled && !hideCode &&
        <HtmlControls reset={reset} language={language} />
      }
    </>
  )
}

export default LiveHtmlEditor