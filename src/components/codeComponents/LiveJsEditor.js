import React, { useState, useRef, useEffect } from 'react'
import Editor from 'react-simple-code-editor';
import CodeHighlight from './CodeHighlight'
import { useCodeContext } from './CodeProvider'
import SnippetInfo from './SnippetInfo'
import OutputLabel from './OutputLabel'

function LiveJsEditor({code: initialCode, language, theme, scripts, autorun, editingDisabled}) {
  const [code, setCode] = useState(initialCode)
  const themePlain = theme.plain
  return(
    <>
      <SnippetInfo language={language} editable={!editingDisabled} scripts={scripts} live={true} />
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
  const [runOnce, setRunOnce] = useState(false)
  const { logs, clearLogs, setCurrentLogger, globalScripts, loggerReady } = useCodeContext()
  const evaluateCode = () => {
    clearInterval(timeOutId.current) //allow this snippet to continue logging
    clearLogs(id.current) //prevent logging the same result
    setCurrentLogger(id.current)
    try {
      //make sure scripts are loaded
      const scriptsNotLoaded = []
      scripts.forEach(scriptName => {
        if (globalScripts[scriptName].failed) {
          scriptsNotLoaded.push(scriptName)
        }
      })
      if (scriptsNotLoaded.length > 0) return console.blog(`Script Execution Stopped: Failed to load ${scriptsNotLoaded.join(", ")}`)
      // this hack concatentates all the global scripts to be evaluated before snippet's script
      // allowing them to be included in the namespace/scope
      // const scriptsToRun = scripts
      // .map(nameOfScript => globalScripts[nameOfScript].script)
      // .reduce((accum, current) => accum + '\n' + current, "")
      code = code.replace(/console\.log/g, 'console.blog')
      // eval(scriptsToRun + '\n' + code)
      eval(code)
      if (!runOnce) setRunOnce(true)
      // this enables snippets to log to JS log component for 5 seconds, in case of async snippets
      timeOutId.current = setTimeout(() => setCurrentLogger(null), 5000)
    } catch(error) {
      console.blog
      ? console.blog("Error Message: " + error.message)
      : console.log(error.message)
      setCurrentLogger(null)
    }
  }

  function clearLogsAndLabel() {
    clearLogs(id.current)
    setRunOnce(false)
  }
  //if autorun is enabled, after mount evaluate code if scripts loaded
  useEffect(() => {
    if (!autorun || !loggerReady) return
    if (scripts.filter(name => !globalScripts[name] || globalScripts[name].loading).length > 0) return
    evaluateCode(code)
  }, [loggerReady, ...scripts.map(script => globalScripts[script])])

  return (
    <>
      {
        runOnce &&
        <OutputLabel>{logs.filter(logObj => logObj.uniqueIdentifier === id.current).length > 0 ? "Output:" : "(Finished, No Output)"}</OutputLabel>
      }
      {
        logs.filter(logObj => logObj.uniqueIdentifier === id.current).length > 0 &&
        <pre style={{whiteSpace: 'pre-wrap', wordBreak: 'keep-all', overflowWrap: 'break-word'}}>
          {
            logs.filter(logObj => logObj.uniqueIdentifier === id.current)
            .map(({logs}) => logs.map(logArr => logArr.map(logItem => JSON.stringify(logItem, null, 2)).join("\n") + '\n'))
          }
        </pre>
      }
      {
        !hideControls &&
        <>
          <button onClick={evaluateCode}>Run</button>
          <button onClick={clearLogsAndLabel}>Clear Logs</button>
          <button onClick={reset}>Reset Code</button>
        </>
      }
    </>
  )
}

export default LiveJsEditor