import React, {useState, useContext, useEffect, useRef} from 'react'
import Highlight, { defaultProps, Prism } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/oceanicNext'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import Editor from 'react-simple-code-editor';
import { rhythm, scale } from '../utils/typography'
import { LogContext } from '../templates/blog-post'


export const Code = ({ codeString, language, ...props }) => {
  const { getId } = useContext(LogContext)
  if (props['react-live']) {
    return (
      <div style={{marginBottom: rhythm(1)}}>
        <LiveProvider code={codeString} noInline={props['use-render'] ? true : false} theme={theme}>
          <LiveEditor />
          <LiveError />
          <LivePreview />
        </LiveProvider>
      </div>
    )
  }
  else if (props['js-live']){
    return (
      <div style={{marginBottom: rhythm(1)}}>
        <LiveJsEditor code={codeString} language={language} theme={theme} keyNum={getId()}/>
      </div>
    )
  }
  else if (props['html-live']){
    return (
      <div style={{marginBottom: rhythm(1)}}>
        <LiveHtmlEditor code={codeString} language={language} theme={theme} />
      </div>
    )
  }
  else {
    return (
      <div style={{marginBottom: rhythm(1)}}>
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

function HtmlComponent({code}) {
  return (
    <div dangerouslySetInnerHTML={{__html: code}} />
  )
}

function CodeHighlight(code, language) {
  return (
    <Highlight Prism={Prism} code={code} language={language} theme={theme}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </>
      )}
    </Highlight>
  )
}

function LiveHtmlEditor({code: initialCode, language, theme}) {
  const [code, setCode] = useState(initialCode)
  const themePlain = theme.plain
  return(
    <>
      <Editor
        value={code}
        padding={10}
        highlight={code => CodeHighlight(code, language)}
        onValueChange={setCode}
        style={{
          whiteSpace: 'pre',
          fontFamily: 'monospace',
          ...themePlain
        }}
      />
      <HtmlComponent code={code}/>
    </>
  )
}

function LiveJsEditor({code: initialCode, language, theme, keyNum}) {
  const [code, setCode] = useState(initialCode)
  const themePlain = theme.plain
  return(
    <>
      <Editor
        value={code}
        padding={10}
        highlight={code => CodeHighlight(code, language)}
        onValueChange={setCode}
        style={{
          whiteSpace: 'pre',
          fontFamily: 'monospace',
          ...themePlain
        }}
      />
      <JsComponent code={code} keyNum={keyNum}/>
    </>
  )
}

function JsComponent({code, keyNum}) {
  const id = useRef(keyNum)
  const { logs, clearLogs, setCurrentLogger } = useContext(LogContext)
  const evaluateCode = () => {
    clearLogs(id.current)
    setCurrentLogger(id.current)
    eval(code)
    setCurrentLogger(null)
  }
  return (
    <>
      <pre>
        {
          logs.filter(logObj => logObj.uniqueIdentifier === id.current)
          .map(({logs}) => logs.map(logArr => logArr.map(logItem => JSON.stringify(logItem, null, 2)).join("\n") + '\n'))
        }
      </pre>
      <button onClick={evaluateCode}>Run</button>
      <button onClick={() => clearLogs(id.current)}>Clear</button>
    </>
  )
}