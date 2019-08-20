import React, { useEffect, useRef } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/oceanicNext'
import { rhythm } from '../utils/typography'
import { useCodeContext } from './codeComponents/CodeProvider'
import LiveHtmlEditor from './codeComponents/LiveHtmlEditor'
import LiveJsEditor from './codeComponents/LiveJsEditor'
import LiveReactEditor from './codeComponents/LiveReactEditor'

export const Code = ({ codeString, language, ...props }) => {
  const { loadScript } = useCodeContext()
  const scripts = useRef([])
  const scriptPairs = useRef([])
  if (props.scripts) {
    scriptPairs.current = props.scripts.split(',')
    scripts.current = scriptPairs.current.map(pair => pair.split('!')[0])
  }
  useEffect(() => {
    scriptPairs.current.forEach(pair => {
      const [name, script] = pair.split('!')
      loadScript(name, script)
    })
  }, [])
  if (props['react-live']) {
    return (
      <div style={{marginBottom: rhythm(2)}}>
        <LiveReactEditor useRender={props['use-render']} code={codeString} theme={theme} scripts={scripts.current}/>
      </div>
    )
  }
  else if (props['js-live']){
    return (
      <div style={{marginBottom: rhythm(2)}}>
        <LiveJsEditor code={codeString} language={language} theme={theme} autorun={props.autorun} scripts={scripts.current}/>
      </div>
    )
  }
  else if (props['html-live']){
    return (
      <div style={{marginBottom: rhythm(2)}}>
        <LiveHtmlEditor code={codeString} language={language} theme={theme} />
      </div>
    )
  }
  else {
    return (
      <div style={{marginBottom: rhythm(2)}}>
        <Highlight {...defaultProps} code={codeString} language={language} theme={theme}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{padding: '10px', ...style}}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    )
  }
}