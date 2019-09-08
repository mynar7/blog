import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'

function PlainCodeHighlight({code, language, theme}) {
  const styles = {
    // whiteSpace: 'pre-wrap',
    // wordBreak: 'keep-all',
    // overflowWrap: 'break-word',
    overflowX: 'scroll',
    padding: '10px'
  }
  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{...style, ...styles}}>
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
  )
}

export default PlainCodeHighlight