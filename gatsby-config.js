const jsdom = require('jsdom')
const { JSDOM } = jsdom
const sitePrefix = '/blog'
const siteTitle = `Strings and Things`
const author = `Lee Warrick`
module.exports = {
  pathPrefix: sitePrefix,
  siteMetadata: {
    title: siteTitle,
    author,
    description: `A blog that's mostly about code. I talk about front-end web development, give career advice, and sometimes ruminate on life lessons learned with connections to code`,
    siteUrl: `https://leewarrick.com/blog`,
    logo: `https://leewarrick.com/blog/logo2.png`,
    social: {
      twitter: `@leewarrickjr`,
      github: `mynar7`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: 'gatsby-remark-smartypants',
          },
          {
            resolve: `gatsby-remark-twitter-cards`,
            options: {
              title: siteTitle, // website title
              separator: '|', // default
              author: author,
              background: require.resolve('./content/assets/cardbase.jpg'), // path to 1200x630px file or hex code, defaults to black (#000000)
              fontColor: '#fafafa', // defaults to white (#ffffff)
              titleFontSize: 108,
              subtitleFontSize: 72,
              // fontStyle: 'monospace', // default
              fontFile: require.resolve(
                './content/assets/TitilliumWeb-Black.ttf'
              ), // will override fontStyle - path to custom TTF font
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
        plugins: [`gatsby-remark-images`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-144549907-2`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(edge => {
                const dom = new JSDOM(edge.node.html)
                dom.window.document.querySelectorAll('img').forEach(img => {
                  const siteUrl = site.siteMetadata.siteUrl.replace(
                    sitePrefix,
                    ''
                  )
                  img.src = siteUrl + img.src
                  img.parentNode.href = siteUrl + img.parentNode.href
                })
                dom.window.document.querySelectorAll('*').forEach(element => {
                  element.removeAttribute('style')
                  element.removeAttribute('class')
                  element.removeAttribute('data-meta')
                  element.removeAttribute('srcset')
                  element.removeAttribute('sizes')
                })
                const siteHTMLString = dom.window.document.body.innerHTML
                // .replace(/\n/g, "") // remove newline
                // .replace(/[\t ]+\</g, "<") // remove whitespace before tags
                // .replace(/\>[\t ]+\</g, "><") // remove ws between tags
                // .replace(/\>[\t ]+$/g, ">") // remove ws after tags
                return {
                  ...edge.node.frontmatter,
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    { 'content:encoded': siteHTMLString },
                    {
                      'atom:link': {
                        _attr: {
                          rel: 'self',
                          href: site.siteMetadata.siteUrl + '/rss.xml',
                          type: 'application/rss+xml',
                        },
                      },
                    },
                  ],
                }
              }),
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: {
                  order: DESC,
                  fields: [frontmatter___date]
                }
              ) {
                edges {
                  node {
                    frontmatter {
                      title
                      date
                    }
                    fields {
                      slug
                    }
                    excerpt
                    html
                  }
                }
              }
            }
          `,
            output: `rss.xml`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Strings and Things`,
        short_name: `Strings and Things`,
        start_url: `/blog/`,
        background_color: `#ffffff`,
        theme_color: `#496db1`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
