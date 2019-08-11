import React, {useState, useContext, useRef} from 'react'
import Highlight, { defaultProps, Prism } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/oceanicNext'
import { LiveProvider, LiveEditor, LiveError, LivePreview, LiveContext } from 'react-live'
import Editor from 'react-simple-code-editor';
import { rhythm } from '../utils/typography'
import { LogContext } from '../templates/blog-post'

function ResetButton({initialCode, update}) {
  const { onChange } = useContext(LiveContext)
  function performUpdate() {
    onChange(initialCode)
    update(0)
    setTimeout(() => update(1), 0)
  }
  return (
    <button onClick={performUpdate}>Reset</button>
  )
}
export const Code = ({ codeString, language, ...props }) => {
  const [updater, forceUpdate] = useState(1);
  if (props['react-live']) {
    return (
      <div style={{marginBottom: rhythm(1)}}>
          <LiveProvider code={updater ? codeString : codeString.split(/\r\n|\r|\n/).map(() => `🔥\n`).join("")}
            noInline={props['use-render'] ? true : false} theme={theme}>
            <LiveEditor />
            <LiveError />
            <LivePreview />
            <ResetButton initialCode={codeString} update={forceUpdate}/>
          </LiveProvider>
      </div>
    )
  }
  else if (props['js-live']){
    return (
      <div style={{marginBottom: rhythm(1)}}>
        <LiveJsEditor code={codeString} language={language} theme={theme} />
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

function HtmlComponent({code, reset}) {
  return (
    <>
      <div dangerouslySetInnerHTML={{__html: code}} />
      <button onClick={reset}>Reset</button>
    </>
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
      <HtmlComponent code={code} reset={() => setCode(initialCode)}/>
    </>
  )
}

function LiveJsEditor({code: initialCode, language, theme}) {
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
      <JsComponent code={code} reset={() => setCode(initialCode)} />
    </>
  )
}

function JsComponent({code, reset}) {
  const { getId } = useContext(LogContext)
  const id = useRef(getId())
  const timeOutId = useRef()
  const { logs, clearLogs, setCurrentLogger } = useContext(LogContext)
  function evaluateCode() {
    clearInterval(timeOutId.current)
    clearLogs(id.current)
    setCurrentLogger(id.current)
    try {
      eval(code)
    } catch(error) {
      console.log("Error Message: " + error.message)
    }
    timeOutId.current = setTimeout(() => setCurrentLogger(null), 5000)
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
      <button onClick={reset}>Reset</button>
    </>
  )
}