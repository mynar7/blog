import React, { useState } from 'react'
import Editor from 'react-simple-code-editor';
import CodeHighlight from './CodeHighlight'

function HtmlComponent({code, reset}) {
  return (
    <>
      <div dangerouslySetInnerHTML={{__html: code}} />
      <button onClick={reset}>Reset</button>
    </>
  )
}

function LiveHtmlEditor({code: initialCode, language, theme}) {
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
      <Editor
        value={code}
        padding={10}
        highlight={code => CodeHighlight({code, language, theme})}
        onValueChange={setCode}
        style={{
          whiteSpace: 'pre',
          fontFamily: 'monospace',
          ...themePlain
        }}
      />
      {
        updater
        ? <HtmlComponent code={code} reset={reset}/>
        : <pre>{code.split(/\r\n|\r|\n/).map(() => `🔥\n`).join("")}</pre>
      }
    </>
  )
}

export default LiveHtmlEditor