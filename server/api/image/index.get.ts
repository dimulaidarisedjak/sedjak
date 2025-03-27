export default defineEventHandler(async () => {
  const blobData = await hubBlob().list({
    prefix: 'image/',
  });
  return blobData;
});
