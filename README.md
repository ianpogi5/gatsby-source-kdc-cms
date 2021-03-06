# gatsby-source-kdc-cms

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/ianpogi5/gatsby-source-kdc-cms/issues)

[![https://nodei.co/npm/gatsby-source-kdc-cms.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/gatsby-source-kdc-cms.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/gatsby-source-kdc-cms)

Source plugin for pulling documents into Gatsby from a [KDC CMS](https://github.com/ianpogi5/kdc-cms) API.

**Note: THIS PROJECT IS NOW DISCONTINUTED IN FAVOR OF [Abu CMS](https://github.com/kdcio/abu)!**

## Install

`npm install --save gatsby-source-kdc-cms`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-kdc-cms`,
    options: {
      apiURL: `http://localhost:8101`,
      queryLimit: 100, // Default to 100
      contentTypes: [`pages`, `contents/blog`], // these are your content type id
      jwtToken: process.env.KDC_CMS_TOKEN
    }
  }
];
```

## How to query

You can query Document nodes created from your KDC CMS API like the following:

```graphql
{
  allKdccmsBlog {
    edges {
      node {
        id
        title
        subtitle
      }
    }
  }
}
```

## Example

For a full working example using this plugin, see [gatsby-blog-kdc-cms](https://github.com/ianpogi5/gatsby-blog-kdc-cms)
