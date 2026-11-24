// MOCKED — in-memory blob storage stub replacing @vercel/blob
const blobStore = new Map<string, { url: string; contentType: string; size: number }>();

export async function put(
  pathname: string,
  body: File | Blob | ArrayBuffer | Uint8Array | string,
  options?: { access?: string; contentType?: string }
): Promise<{ url: string; pathname: string }> {
  let contentType = options?.contentType || "application/octet-stream";
  let dataUrl = "";

  if (typeof body === "string") {
    dataUrl = `data:${contentType};base64,${Buffer.from(body).toString("base64")}`;
  } else if (body instanceof Blob) {
    contentType = body.type || contentType;
    const buffer = Buffer.from(await body.arrayBuffer());
    dataUrl = `data:${contentType};base64,${buffer.toString("base64")}`;
  } else {
    const buffer = Buffer.from(body as ArrayBuffer);
    dataUrl = `data:${contentType};base64,${buffer.toString("base64")}`;
  }

  blobStore.set(pathname, { url: dataUrl, contentType, size: dataUrl.length });
  return { url: dataUrl, pathname };
}
