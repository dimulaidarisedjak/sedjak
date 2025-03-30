import { webBuilds } from "../database/schema";

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  const webBuildResult = await useDrizzle()
    .select().from(webBuilds)
    .where(eq(webBuilds.id, data.id))

  const blobPath = webBuildResult[0]?.blobPath;

  const deleteBlobPath = await hubBlob().del(blobPath);

  console.log('deleteBlobPath', deleteBlobPath);

  const deleteWebBuildResult = await useDrizzle()
    .delete(webBuilds)
    .where(eq(webBuilds.id, data.id))
    .returning({ deletedId: webBuilds.id });

  if (deleteWebBuildResult[0]?.deletedId) {
    return webBuildResult;
  }

  return ['error'];
});