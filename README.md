# gatsby-source-kdc-cms

Source plugin for pulling documents into Gatsby from a [KDC CMS](https://github.com/ianpogi5/kdc-cms) API.

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
      contentTypes: [`pages`, `blogs`],
      jwtToken: process.env.KDC_CMS_TOKEN,
    },
  },
]
```

## How to query

You can query Document nodes created from your KDC CMS API like the following:

```graphql
{
  allKDCCMSBlogs {
    edges {
      node {
        id
        title
        content
      }
    }
  }
}
```
