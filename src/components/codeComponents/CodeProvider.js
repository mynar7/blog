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
  const [ linkedSnippets, setLinkedSnippets ] = useState({})
  const [shouldShowEditor, setShouldShowEditor] = useState(true)

  const setCurrentLogger = (id) => loggerId.current = id //used by code components to set themselves as the current logger
  const clearLogs = (id) => {
    refLogs.current = refLogs.current.filter(logObj => logObj.uniqueIdentifier !== id)
    setLogs(refLogs.current)
  }
  useEffect(() => {
    const checkWindow = () => window.innerWidth <= 600 ? setShouldShowEditor(false) : setShouldShowEditor(true)
    checkWindow()
    const determineWindowSize = (() => {
      let timeoutId
      return () => {
        clearInterval(timeoutId)
        timeoutId = setTimeout(() => {
          checkWindow()
        }, 800)
      }
    })()
    window.addEventListener("resize", determineWindowSize)
    return () => window.removeEventListener("resize", determineWindowSize)
  }, [])

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

  async function loadScript(name, url) {
    setScriptLoaded({ name, script: null, loading: true, failed: false }) //flag script as loading so dependent components do not render
    async function getScript(attempts = 0) {
      if (attempts > 3) throw new Error(`Failed to load script for ${name}`)
      const res = await fetch(url, {
        mode: 'no-cors' ,
        headers: {
          'Accept': 'application/javascript'
        }
      }) //fetch script as text
      const scriptText = await res.text()
        .catch((err) => {
          console.log(err)
          setTimeout(() => getScript(attempts + 1), 300)
        })
      if (scriptText.startsWith('<')) {
        setScriptLoaded({ name, script: null, loading: false, failed: true })
        throw new Error("Failed to load: " + name)
      }
      const newScriptTag = document.createElement('script') //load script globally for react-live components
      newScriptTag.src = url
      // newScriptTag.async = true
      newScriptTag.type = 'text/javascript';
      newScriptTag.onload = () => {
        setScriptLoaded({ name, script: scriptText, loading: false, failed: false }) //store script text for JS evals, flag as ready
      }
      document.body.appendChild(newScriptTag)
    }
    await getScript().catch(err => { throw err })
  }

  function scriptReducer(state, { name, script, loading, failed }) {
    return { ...state, [name]: { script, loading, failed } }
  }

  async function queueScripts(scriptsArr) {
    let scriptsAdded = []
    scriptsArr.forEach(({name, url}) => {
      if (requestedScriptsToLoad.current.indexOf(name) === -1) { //ensure script isn't already loading
        requestedScriptsToLoad.current = [...requestedScriptsToLoad.current, name] //add script to list of scripts
        scriptsAdded.push({name, url})
      }
    })
    // if a single script was added, just load it
    if (scriptsAdded.length === 1) {
      const {name, url} = scriptsAdded[0]
      await loadScript(name, url).catch(err => console.log(err))
    } else if (scriptsAdded.length > 1) {
      //if more than one script, load them in order in case they depend on each other
      loadScriptsInOrder(scriptsAdded).catch(err => console.log(err))
    }
  }

  async function loadScriptsInOrder(scriptsToLoad) {
    const {name, url} = scriptsToLoad[0]
    await loadScript(name, url)
    if (scriptsToLoad.length > 1) {
      //pass along array without first element
      loadScriptsInOrder(scriptsToLoad.slice(1))
    }
  }

  function addLinkedSnippet(snippetKey) {
    if (linkedSnippets[snippetKey]) return
    setLinkedSnippets({...linkedSnippets, [snippetKey]: 'waiting'})
  }

  function updateLinkedSnippets(snippetKey, status) {
    if (!linkedSnippets[snippetKey]) return
    setLinkedSnippets({...linkedSnippets, [snippetKey]: status})
  }

  const contextObj = {
    logs,
    clearLogs,
    setCurrentLogger,
    loggerReady,
    queueScripts,
    globalScripts,
    linkedSnippets,
    addLinkedSnippet,
    updateLinkedSnippets,
    shouldShowEditor
  }

  return (
    <LogContext.Provider value={contextObj} {...props} />
  )
}

export { CodeProvider, useCodeContext }
