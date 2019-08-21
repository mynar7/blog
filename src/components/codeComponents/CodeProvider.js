import React, { createContext, useRef, useEffect, useState, useContext, useReducer } from 'react'

const LogContext = createContext()

function useCodeContext() {
  const context = useContext(LogContext)
  if (!context) {
    throw new Error(`useCodeContext must be used within a SpeechProvider`)
  }
  return context
}

function CodeProvider(props) {
  // state and refs had to be doubled up for logs and scripts to provide reactive updates for components but also
  // ensure that scripts/logs weren't processed on each render
  const [globalScripts, setScriptLoaded] = useReducer(scriptReducer, {})
  const requestedScriptsToLoad = useRef([])
  const [loggerReady, setLoggerReady] = useState(false)
  const [logs, setLogs] = useState([])
  const refLogs = React.useRef([])
  const loggerId = useRef() //which code snippet is currently firing logs

  const setCurrentLogger = (id) => loggerId.current = id //used by code components to set themselves as the current logger
  const clearLogs = (id) => {
    refLogs.current = refLogs.current.filter(logObj => logObj.uniqueIdentifier !== id)
    setLogs(refLogs.current)
  }

  // this effect overrides the default function for console.log so each component can hook in
  // individually and receive updates only on the code it runs
  useEffect(() => {
    console.blog = function () {
      if (loggerId.current) {
        const logObjIndex = refLogs.current.findIndex(logObj => logObj.uniqueIdentifier === loggerId.current)
        if (logObjIndex > -1) {
          // if logObj exists in refLogs, find that object and add log to "logs" property array
          refLogs.current = refLogs.current.map((logObj) => logObj.uniqueIdentifier === loggerId.current
            ? { ...logObj, logs: [...logObj.logs, Array.from(arguments)] }
            : logObj)
          } else {
          // else create a new lobObj
          refLogs.current = [...refLogs.current, { uniqueIdentifier: loggerId.current, logs: [Array.from(arguments)] }]
        }
        setLogs(refLogs.current) //update log state to match ref
      }
      console.log(...arguments);
    }
    setLoggerReady(true) //ensure console.blog is available
    return function () { console.blog = null; } //cleanup this effect on unmount
  }, [])

  function loadScript(name, url) {
    if (requestedScriptsToLoad.current.indexOf(name) === -1) { //ensure script isn't already loading
      requestedScriptsToLoad.current = [...requestedScriptsToLoad.current, name] //add script to list of scripts
      setScriptLoaded({ name, script: null, loading: true }) //flag script as loading so dependent components do not render
      function getScript(attempts = 0) {
        if (attempts > 3) return
        fetch(url, { mode: 'no-cors' }) //fetch script as text
        .then(res => res.text())
        .then(res => {
          const newScriptTag = document.createElement('script') //load script globally for react-live components
          newScriptTag.src = url
          newScriptTag.async = true
          newScriptTag.type= 'text/javascript';
          newScriptTag.onload = () => {
            setScriptLoaded({ name, script: res, loading: false }) //store script text for JS evals, flag as ready
          }
          document.body.appendChild(newScriptTag)
        })
        .catch(() => setTimeout(() => getScript(attempts + 1), 300))
      }
      getScript()
    }
  }

  function scriptReducer(state, { name, script, loading }) {
    return { ...state, [name]: { script, loading } }
  }
  const contextObj = {
    logs,
    clearLogs,
    setCurrentLogger,
    loggerReady,
    loadScript,
    globalScripts,
  }
  return (
    <LogContext.Provider value={contextObj} {...props} />
  )
}

export { CodeProvider, useCodeContext }