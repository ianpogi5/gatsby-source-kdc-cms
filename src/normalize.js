const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

const extractFields = async (
  apiURL,
  store,
  cache,
  createNode,
  createNodeId,
  touchNode,
  auth,
  item
) => {
  for (const key of Object.keys(item)) {
    const field = item[key];

    if (
      field !== null &&
      field.hasOwnProperty("type") &&
      field.type === "image"
    ) {
      console.log(field);

      let fileNodeID;
      // using field on the cache key for multiple image field
      const mediaDataCacheKey = `kdc-cms-media-${item.id}-${key}`;
      const cacheMediaData = await cache.get(mediaDataCacheKey);

      // If we have cached media data and it wasn't modified, reuse
      // previously created file node to not try to redownload
      if (cacheMediaData && field.updatedAt === cacheMediaData.updatedAt) {
        fileNodeID = cacheMediaData.fileNodeID;
        touchNode({ nodeId: cacheMediaData.fileNodeID });
      }
      console.log(fileNodeID);

      // If we don't have cached data, download the file
      if (!fileNodeID) {
        try {
          // full media url
          const source_url = `${field.src.startsWith("http") ? "" : apiURL}${
            field.src
          }`;
          const fileNode = await createRemoteFileNode({
            url: source_url,
            store,
            cache,
            createNode,
            createNodeId,
            auth
          });

          console.log(fileNode);

          // If we don't have cached data, download the file
          if (fileNode) {
            fileNodeID = fileNode.id;

            await cache.set(mediaDataCacheKey, {
              fileNodeID,
              modified: field.updatedAt
            });
          }
        } catch (e) {
          // Ignore
          console.log(e);
        }
      }
      if (fileNodeID) {
        item[`${key}___NODE`] = fileNodeID;
      }
    }
  }
};

// Downloads media from image type fields
exports.downloadMediaFiles = async ({
  entities,
  apiURL,
  store,
  cache,
  createNode,
  createNodeId,
  touchNode,
  jwtToken: auth
}) =>
  Promise.all(
    entities.map(async entity => {
      for (let item of entity) {
        // loop item over fields
        await extractFields(
          apiURL,
          store,
          cache,
          createNode,
          createNodeId,
          touchNode,
          auth,
          item
        );
      }
      return entity;
    })
  );
