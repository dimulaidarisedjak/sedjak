export default defineEventHandler(async (event) => {
  const uuid = getRouterParam(event, 'uuid');
  const blobData = await hubBlob().get(`image/${uuid}`);
  return blobData;
});
