import fetchData from "./fetch";
import { Node } from "./nodes";
import capitalize from "lodash.capitalize";

exports.sourceNodes = async (
  { boundActionCreators, reporter },
  { apiURL = "http://localhost:8101", contentTypes = [], jwtToken = {} }
) => {
  const { createNode } = boundActionCreators;

  const fetchActivity = reporter.activityTimer(`Fetched KDC CMS Data`);
  fetchActivity.start();

  // Generate a list of promises based on the `contentTypes` option.
  const promises = contentTypes.map(contentType =>
    fetchData({
      apiURL,
      contentType,
      jwtToken,
      queryLimit,
      reporter
    })
  );

  // Execute the promises.
  let entities = await Promise.all(promises);
  contentTypes.forEach((contentType, i) => {
    const items = entities[i];
    items.forEach((item, i) => {
      const node = Node(capitalize(contentType), item);
      createNode(node);
    });
  });

  fetchActivity.end();
};
