import React from 'react'
import { rhythm } from '../../utils/typography'

function OutputLabel(props) {
  const styles ={
    margin: '0',
    marginTop: rhythm(0.5),
    fontSize: rhythm(0.5),
    lineHeight: rhythm(0.75),
    color: 'var(--grayLight)',
  }
  return(
    <pre style={styles}>{props.children}</pre>
  )
}

export default OutputLabel