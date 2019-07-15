import React from 'react'
import { Link } from 'gatsby'
import './layout.css'
import { rhythm, scale } from '../utils/typography'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            // fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link to={`/`}>
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          // marginLeft: `auto`,
          // marginRight: `auto`,
          margin: `auto`,
          maxWidth: rhythm(32),
          padding: `${rhythm(1.5)} ${rhythm(1.5)}`,
          background: `var(--white)`,
          boxShadow: `2px 4px 3px var(--gray)`
        }}
      >
        {header}
        {children}
        <footer style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          <span style={{marginBottom: '10px'}}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>, <a href="https://www.youtube.com/watch?v=HEXWRTEbj1I">Love</a>, and <a href="https://cameronsworld.net">Inter-webs</a>.
          </span>
          {location.pathname !== rootPath &&
            <span>
              <Link to="/">Home</Link>
            </span>
          }
        </footer>
      </div>
    )
  }
}

export default Layout
