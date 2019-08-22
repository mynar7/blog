import React, { useEffect, useRef } from 'react'
import theme from 'prism-react-renderer/themes/oceanicNext'
import { rhythm } from '../utils/typography'
import { useCodeContext } from './codeComponents/CodeProvider'
import LiveHtmlEditor from './codeComponents/LiveHtmlEditor'
import LiveJsEditor from './codeComponents/LiveJsEditor'
import LiveReactEditor from './codeComponents/LiveReactEditor'
import PlainCodeHighlight from './codeComponents/PlainCodeHighlight'
import SnippetInfo from './codeComponents/SnippetInfo'
import { Script } from 'vm';

export const Code = ({ codeString, language, ...props }) => {
  const { queueScripts } = useCodeContext()
  const scripts = useRef([])
  const scriptPairs = useRef([])
  if (props.scripts) {
    scriptPairs.current = props.scripts.split(',').map(pair => {
      const [name, url] = pair.split('!')
      return {name, url}
    })
    scripts.current = scriptPairs.current.map(scriptObj => scriptObj.name)
  }
  useEffect(() => {
    queueScripts(scriptPairs.current)
  }, [])
  if (props['react-live']) {
    return (
      <div style={{marginBottom: rhythm(2)}}>
        <LiveReactEditor useRender={props['use-render']}
          code={codeString}
          theme={theme}
          editingDisabled={props['no-edit']}
          scripts={scripts.current}/>
      </div>
    )
  }
  else if (props['js-live']){
    return (
      <div style={{marginBottom: rhythm(2)}}>
        <LiveJsEditor code={codeString}
          language={language}
          theme={theme}
          autorun={props.autorun}
          editingDisabled={props['no-edit']}
          scripts={scripts.current}/>
      </div>
    )
  }
  else if (props['html-live']){
    return (
      <div style={{marginBottom: rhythm(2)}}>
        <LiveHtmlEditor code={codeString}
          language={language}
          editingDisabled={props['no-edit']}
          theme={theme} />
      </div>
    )
  }
  else {
    return (
      <div style={{marginBottom: rhythm(2)}}>
        <SnippetInfo language={language}/>
        <PlainCodeHighlight code={codeString} language={language} theme={theme} />
      </div>
    )
  }
}