import React, { useState, useRef, useEffect } from 'react'
import Editor from 'react-simple-code-editor';
import CodeHighlight from './CodeHighlight'
import { useCodeContext } from './CodeProvider'

function LiveJsEditor({code: initialCode, language, theme, scripts, autorun, editingDisabled}) {
  const [code, setCode] = useState(initialCode)
  const themePlain = theme.plain
  return(
    <>
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
      <JsComponent code={code}
        reset={() => setCode(initialCode)}
        scripts={scripts}
        hideControls={editingDisabled}
        autorun={autorun}/>
    </>
  )
}

function JsComponent({code, reset, scripts = [], autorun, hideControls}) {
  const id = useRef(Date.now() + Math.random()) //create uuid-ish number for identifiying which component is logging
  const timeOutId = useRef() //track timeoutId between renders
  const { logs, clearLogs, setCurrentLogger, globalScripts, loggerReady } = useCodeContext()
  const evaluateCode = () => {
    clearInterval(timeOutId.current) //allow this snippet to continue logging
    clearLogs(id.current) //prevent logging the same result
    setCurrentLogger(id.current)
    try {
      // this hack concatentates all the global scripts to be evaluated before snippet's script
      // allowing them to be included in the namespace/scope
      const scriptsToRun = scripts
      .map(nameOfScript => globalScripts[nameOfScript].script)
      .reduce((accum, current) => accum + '\n' + current, "")
      code = code.replace(/console\.log/g, 'console.blog')
      eval(scriptsToRun + '\n' + code)
    } catch(error) {
      if (console.blog) console.blog("Error Message: " + error.message)
      else console.log(error.message)
    }
    // this enables snippets to log to JS log component for 5 seconds, in case of async snippets
    timeOutId.current = setTimeout(() => setCurrentLogger(null), 5000)
  }

  //if autorun is enabled, after mount evaluate code if scripts loaded
  useEffect(() => {
    let ready = true
    scripts.forEach(script => {
      if (!globalScripts[script] || globalScripts[script].loading) ready = false
    })
    if (!ready || !autorun || !loggerReady) return
    evaluateCode(code)
  }, [loggerReady, ...scripts.map(script => globalScripts[script])])

  return (
    <>
      <pre>
        {
          logs.filter(logObj => logObj.uniqueIdentifier === id.current)
          .map(({logs}) => logs.map(logArr => logArr.map(logItem => JSON.stringify(logItem, null, 2)).join("\n") + '\n'))
        }
      </pre>
      {
        !hideControls &&
        <>
          <button onClick={evaluateCode}>Run</button>
          <button onClick={() => clearLogs(id.current)}>Clear Logs</button>
          <button onClick={reset}>Reset Code</button>
        </>
      }
    </>
  )
}

export default LiveJsEditor