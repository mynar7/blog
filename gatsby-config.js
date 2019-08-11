module.exports = {
  pathPrefix: '/blog',
  siteMetadata: {
    title: `Strings and Things`,
    author: `Lee Warrick`,
    description: `A blog that's mostly about code. I talk about front-end web development, give career advice, and sometimes ruminate on life lessons learned with connections to code`,
    siteUrl: `https://leewarrick.com/blog`,
    logo: `https://leewarrick.com/blog/logo2.png`,
    social: {
      twitter: `leewarrickjr`,
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
      resolve: `gatsby-mdx`,
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
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     //trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: require("gatsby-mdx/feed")
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