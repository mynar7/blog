import React, { useState } from 'react'
import Editor from 'react-simple-code-editor';
import CodeHighlight from './CodeHighlight'
import SnippetInfo from './SnippetInfo'

function HtmlComponent({code}) {
  return <div dangerouslySetInnerHTML={{__html: code}} />
}

function HtmlControls({reset}) {
  return <button onClick={reset}>Reset</button>
}

function LiveHtmlEditor({code: initialCode, language, theme, editingDisabled}) {
  const [code, setCode] = useState(initialCode)
  const [updater, forceUpdate] = useState(1)
  const themePlain = theme.plain
  function reset() {
    setCode(initialCode)
    forceUpdate(0)
    setTimeout(() => forceUpdate(1), 0)
  }
  return(
    <>
    <SnippetInfo language={language} editable={!editingDisabled} live={true} />
      <Editor
        value={code}
        padding={10}
        highlight={code => CodeHighlight({code, language, theme})}
        onValueChange={editingDisabled ? () => {} : setCode}
        style={{
          whiteSpace: 'pre',
          fontFamily: 'monospace',
          ...themePlain
        }}
      />
      {
        updater
        ? <HtmlComponent code={code}/>
        : <pre>{code.split(/\r\n|\r|\n/).map(() => `🔥\n`).join("")}</pre>
      }
      {
        !editingDisabled &&
        <HtmlControls reset={reset} />
      }
    </>
  )
}

export default LiveHtmlEditor