import React from 'react'
import { render } from 'react-dom'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/oceanicNext'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

export const Code = ({ codeString, language, ...props }) => {
  if (props['react-live']) {
    return (
      <LiveProvider code={codeString} noInline={true} theme={theme}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    )
  } else {
    return (
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
    )
  }
}
