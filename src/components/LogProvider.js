import React, {createContext, useRef, useEffect, useState, useContext, useReducer} from 'react'

const LogContext = createContext()

function useLogContext() {
    const context = useContext(LogContext)
    if(!context) {
      throw new Error(`useLogContext must be used within a SpeechProvider`)
    }
    return context
}

function LogProvider(props) {
    const [logs, setLogs] = useState([])
    const [globalScripts, setScriptLoaded] = useReducer(scriptReducer, {})
    const loggerId = useRef()
    const requestedScriptsToLoad = useRef([])
    const refLogs = React.useRef()
    const setCurrentLogger = (id) => loggerId.current = id
    const clearLogs = (id) => {
        refLogs.current = refLogs.current.filter(logObj => logObj.uniqueIdentifier !== id)
        setLogs(refLogs.current)
    }
    const originalLog = useRef()
    useEffect(() => {
        refLogs.current = []
        originalLog.current = console.log
        console.log = function() {
            if (loggerId.current) {
                const logObjIndex = refLogs.current.findIndex(logObj => logObj.uniqueIdentifier === loggerId.current)
                if (logObjIndex > -1) {
                    refLogs.current = refLogs.current.map((logObj) => logObj.uniqueIdentifier === loggerId.current
                    ? {...logObj, logs: [...logObj.logs, Array.from(arguments)]}
                    : logObj)
                } else {
                    refLogs.current = [...refLogs.current, {uniqueIdentifier: loggerId.current, logs: [Array.from(arguments)]}]
                }
                setLogs(refLogs.current)
            }
            originalLog.current.apply(this, arguments);
            return function() { console.log = originalLog.current; }
        }
    }, [])

    function loadScript(name, url) {
        if (requestedScriptsToLoad.current.indexOf(name) === -1) {
            requestedScriptsToLoad.current = [...requestedScriptsToLoad.current, name]
            fetch(url)
            .then(res => res.text())
            .then(res => {
                setScriptLoaded({name, script: res, loading: false})
            })
    }
    }

    function scriptReducer(state, {name, script, loading}) {
        return {...state, [name]: {script, loading} }
    }

    return (
        <LogContext.Provider value={{ logs, clearLogs, setCurrentLogger, loadScript, globalScripts }} {...props}/>
    )
}

export {LogProvider, useLogContext}