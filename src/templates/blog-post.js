import React, { createContext, useState, useEffect, useRef } from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-mdx'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'

const LogContext = createContext()

const BlogPostTemplate = (props) => {
  const post = props.data.mdx
  const siteTitle = props.data.site.siteMetadata.title
  const { previous, next } = props.pageContext

  const [logs, setLogs] = useState([])
  const count = useRef(0)
  function getId() {
    count.current = count.current + 1
    return count.current
  }
  const loggerId = useRef()
  const refLogs = React.useRef()
  const setCurrentLogger = (id) => loggerId.current = id
  const clearLogs = (id) => {
    refLogs.current = refLogs.current.filter(logObj => logObj.uniqueIdentifier !== id)
    setLogs(refLogs.current)
  }
  const originalLog = useRef()
  useEffect(() => {
    refLogs.current = []
    originalLog.current = console.log
    console.log = function() {
      if (loggerId.current) {
        const logObjIndex = refLogs.current.findIndex(logObj => logObj.uniqueIdentifier === loggerId.current)
        if (logObjIndex > -1) {
          refLogs.current = refLogs.current.map((logObj) => logObj.uniqueIdentifier === loggerId.current
          ? {...logObj, logs: [...logObj.logs, Array.from(arguments)]}
          : logObj)
        } else {
          refLogs.current = [...refLogs.current, {uniqueIdentifier: loggerId.current, logs: [Array.from(arguments)]}]
        }
        setLogs(refLogs.current)
      }
      originalLog.current.apply(this, arguments);
      return function() { console.log = originalLog.current; }
    }
  }, [])

  return (
    <LogContext.Provider value={{ logs, clearLogs, setCurrentLogger, getId }}>
      <Layout location={props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <h1 style={{
          marginTop: rhythm(2.5)
        }}>
          {post.frontmatter.title}
        </h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <MDXRenderer>{post.code.body}</MDXRenderer>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    </LogContext.Provider>
  )
}


export default BlogPostTemplate
export { LogContext }

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      code {
        body
      }
    }
  }
`
