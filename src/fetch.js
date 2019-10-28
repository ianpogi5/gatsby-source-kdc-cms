module.exports = async ({
  apiURL,
  contentType,
  jwtToken,
  queryLimit,
  reporter
}) => {
  // Define API endpoint.
  let apiBase = `${apiURL}/`;
  if (contentType === "pages") {
    apiBase += "pages";
  } else {
    apiBase += `contents/${contentType}`;
  }

  const apiEndpoint = `${apiBase}?limit=${queryLimit}`;

  reporter.info(`Starting to fetch data from KDC CMS - ${apiBase}`);

  // Make API request.
  const documents = await fetch(apiEndpoint, {
    method: "GET",
    headers: {
      Authorization: "Bearer" + jwtToken,
      Accept: "application/json"
    }
  }).then(res => res.json());

  // Map and clean data.
  return documents.list;
};
