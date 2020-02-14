import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function SEO({
  description,
  lang = 'en',
  meta = [],
  keywords = [],
  title,
  twitterImageUrl,
  twitterImageAltText
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={title === data.site.siteMetadata.title ? title : `%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: `author`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                property: `og:image`,
                content: twitterImageUrl || data.site.siteMetadata.logo,
              },
              {
                name: `twitter:image`,
                content: twitterImageUrl || data.site.siteMetadata.logo,
              },
              {
                name: `twitter:alt:image`,
                content: twitterImageAltText || `Buddhist enso swirl logo`,
              },
              {
                name: `twitter:card`,
                content: twitterImageUrl ? `summary_large_image` : `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.social.twitter,
              },
              {
                name: `twitter:site`,
                content: data.site.siteMetadata.social.twitter,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ].concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : {
                      name: `keywords`,
                      content: 'blog, web development, developer, front-end developer'
                    }
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
        logo
        social {
          twitter
        }
      }
    }
  }
`
