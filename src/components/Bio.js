import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import { rhythm } from '../utils/typography'

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div
            style={{
              // display: `flex`,
              marginBottom: rhythm(2.5),
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 80,
                borderRadius: `100%`,
                float: 'left'
              }}
            />
            <p>
              Written by <a href="https://leewarrick.com"><strong>{author}</strong></a>, Co-host of the <a href="https://techjr.dev">Tech Jr Podcast</a>, Software Engineer, Guitarist, and Gamer.
              &nbsp;
              <a href="https://tinyletter.com/leewarrick"><strong>Subscribe</strong></a> to my newsletter!
              Show your support by buying some <a href="https://teespring.com/stores/tech-jr-store"><strong>SWAG.</strong></a>
            </p>

          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 80, height: 80) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

export default Bio
