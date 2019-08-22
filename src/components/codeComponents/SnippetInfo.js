import React from 'react'
import { rhythm } from '../../utils/typography'
import { useCodeContext } from './CodeProvider'

function SnippetInfo({language, editable = false, scripts = [], live = false, styles: proppedInStyles}) {
  const { globalScripts } = useCodeContext()
  const styles ={
    margin: '0',
    fontSize: rhythm(0.5),
    lineHeight: rhythm(0.75),
    color: 'var(--grayLight)',
  }
  function Msg(props) {
    return (
      <pre style={{...styles, ...proppedInStyles}}>
        {props.children}
      </pre>
    )
  }
  let status;
  const failedList = scripts.filter(name => globalScripts[name] && globalScripts[name].failed)
  const loadingList = scripts.filter(name => !globalScripts[name] || globalScripts[name].loading)
  const loadedList = scripts.filter(name => globalScripts[name] && !globalScripts[name].loading && !globalScripts[name].failed)
  const failedListString = failedList.join(", ")
  const loadingListString = loadingList.join(", ")
  const loadedListString = loadedList.join(", ")
  if (failedList.length > 0) {
    status = 'failed'
  } else if (loadedList.length > 0) {
    status = 'loaded'
  } else {
    status = 'loading'
  }

  if (scripts.length === 0) status = null


  switch(language) {
    case 'js':
      language = 'JavaScript'
    break
  }
  if (language.length > 4) {
    language = language[0].toUpperCase() + language.slice(1)
  } else {
    language = language.toUpperCase()
  }

  switch(status) {
    case 'loading':
      return <Msg>Live{editable ? ", editable" : ""} {language} Snippet (Loading {loadingListString}):</Msg>
    case 'failed':
      return <Msg>Live{editable ? ", editable" : ""} {language} Snippet (Failed to load {failedListString}):</Msg>
    case 'loaded':
      return <Msg>Live{editable ? ", editable" : ""} {language} Snippet (Loaded {loadedListString}):</Msg>
    default:
      return <Msg>{live ? "Live" : ""}{editable ? ", editable" : ""} {language} Snippet:</Msg>
  }
}

export default SnippetInfo