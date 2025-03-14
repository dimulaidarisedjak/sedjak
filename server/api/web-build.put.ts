export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  if (data.uuid && data.jsonData) {
    const jsonData = JSON.stringify(data.jsonData);
    const filename = `${data.uuid}.json`;
    const blob = await hubBlob().put(filename, jsonData, {
      contentType: 'application/json',
      addRandomSuffix: false,
      prefix: 'webbuild',
    });
    return blob.pathname;
  }
  return null;
});
