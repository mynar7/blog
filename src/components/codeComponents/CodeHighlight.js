import React from 'react'
import Highlight, { Prism } from 'prism-react-renderer'

function CodeHighlight({code, language, theme}) {
  return (
    <Highlight Prism={Prism} code={code} language={language} theme={theme}>
      {({ tokens, getLineProps, getTokenProps}) => (
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

export default CodeHighlight