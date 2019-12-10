import axios from "axios";

module.exports = async ({
  apiURL,
  contentType,
  jwtToken,
  queryLimit,
  reporter
}) => {
  // Define API endpoint.
  const apiBase = `${apiURL}/${contentType}`;
  const apiEndpoint = `${apiBase}?limit=${queryLimit}`;

  reporter.info(`Starting to fetch data from KDC CMS - ${apiBase}`);

  const fetchRequestConfig = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      Accept: "application/json"
    }
  };

  const documents = await axios(apiEndpoint, fetchRequestConfig);

  // Map and clean data.
  return documents.data.list;
};
