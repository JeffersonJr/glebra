import { createServerFn } from "@tanstack/react-start";

export type DrivePdf = {
  id: string;
  name: string;
  modifiedTime?: string;
  size?: string;
  thumbnailLink?: string;
  webViewLink?: string;
};

export type DriveFolder = {
  id: string;
  name: string;
  modifiedTime?: string;
};

export type DriveItem =
  | ({ kind: "file" } & DrivePdf)
  | ({ kind: "folder" } & DriveFolder);

export const listDrivePdfs = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    const params = data as { folderId?: string } | undefined;
    return { folderId: params?.folderId ?? undefined };
  })
  .handler(
    async (
      ctx,
    ): Promise<{ items: DriveItem[]; error?: string }> => {
      const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
      const rootFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
      const targetFolderId = ctx.data.folderId ?? rootFolderId;

      if (!apiKey || !rootFolderId) {
        return {
          items: [],
          error:
            "Biblioteca ainda não configurada. Adicione GOOGLE_DRIVE_API_KEY e GOOGLE_DRIVE_FOLDER_ID.",
        };
      }

      // Query: subfolders + all supported file types
      const q = `'${targetFolderId}' in parents and trashed=false and (mimeType='application/vnd.google-apps.folder' or mimeType='application/pdf' or mimeType='application/epub+zip' or mimeType='application/x-mobipocket-ebook' or mimeType='application/msword' or mimeType='application/vnd.openxmlformats-officedocument.wordprocessingml.document' or mimeType='text/plain')`;
      const fields =
        "files(id,name,mimeType,modifiedTime,size,thumbnailLink,webViewLink)";
      const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
        q,
      )}&fields=${encodeURIComponent(fields)}&orderBy=folder,name&pageSize=500&key=${apiKey}`;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          const body = await res.text();
          console.error("[drive] list failed", res.status, body);
          return {
            items: [],
            error: `Falha ao carregar biblioteca (${res.status}).`,
          };
        }
        const data = (await res.json()) as {
          files?: Array<{
            id: string;
            name: string;
            mimeType: string;
            modifiedTime?: string;
            size?: string;
            thumbnailLink?: string;
            webViewLink?: string;
          }>;
        };

        const items: DriveItem[] = (data.files ?? []).map((f) => {
          if (f.mimeType === "application/vnd.google-apps.folder") {
            return {
              kind: "folder",
              id: f.id,
              name: f.name,
              modifiedTime: f.modifiedTime,
            } as DriveItem;
          }
          return {
            kind: "file",
            id: f.id,
            name: f.name,
            modifiedTime: f.modifiedTime,
            size: f.size,
            thumbnailLink: f.thumbnailLink,
            webViewLink: f.webViewLink,
          } as DriveItem;
        });

        return { items };
      } catch (err) {
        console.error("[drive] fetch error", err);
        return { items: [], error: "Erro de rede ao carregar a biblioteca." };
      }
    },
  );

// Fetch a single folder name by its ID (for breadcrumb)
export const getDriveFolderName = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    const params = data as { folderId: string };
    return { folderId: params.folderId };
  })
  .handler(async (ctx): Promise<{ name: string; error?: string }> => {
    const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
    if (!apiKey) return { name: "", error: "API key missing" };

    const url = `https://www.googleapis.com/drive/v3/files/${ctx.data.folderId}?fields=name&key=${apiKey}`;
    try {
      const res = await fetch(url);
      if (!res.ok) return { name: "", error: "Not found" };
      const data = (await res.json()) as { name: string };
      return { name: data.name };
    } catch {
      return { name: "", error: "Fetch error" };
    }
  });
