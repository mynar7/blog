import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { Code } from './src/components/code'
import { preToCodeBlock } from 'mdx-utils'
import { CodeProvider } from './src/components/codeComponents/CodeProvider'

// components is its own object outside of render so that the references to
// components are stable
const components = {
  pre: (preProps) => {
    console.log(preProps)
    if (preProps && preProps.children && preProps.children.type === 'code') {
      const {
        children: codeString,
        className = '',
        ...rest
      } = preProps.children.props
      const language = className.replace(/language-([.]*)/, '$1')
      const props = {
        codeString: codeString.trim(),
        className,
        language,
        ...rest,
      }
      return <Code {...props} />
    } else {
      // it's possible to have a pre without a code in it
      return <pre {...preProps} />
    }
  },
}
export const wrapRootElement = ({ element }) => (
  <CodeProvider>
    <MDXProvider components={components}>{element}</MDXProvider>
  </CodeProvider>
)
