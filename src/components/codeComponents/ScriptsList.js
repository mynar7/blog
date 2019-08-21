import React from 'react'
import { scale, rhythm } from '../../utils/typography'

function ScriptsList({language, }) {
  const styles ={
    margin: '0',
    fontSize: rhythm(0.5),
    lineHeight: rhythm(0.75),
    color: 'var(--grayLight)',
  }
  return (
    <pre style={styles}>React</pre>
  )
}

export default ScriptsList