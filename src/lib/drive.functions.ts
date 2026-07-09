import { createServerFn } from "@tanstack/react-start";

export type DrivePdf = {
  id: string;
  name: string;
  modifiedTime?: string;
  size?: string;
  thumbnailLink?: string;
  webViewLink?: string;
};

export const listDrivePdfs = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ files: DrivePdf[]; error?: string }> => {
    const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!apiKey || !folderId) {
      return {
        files: [],
        error:
          "Biblioteca ainda não configurada. Adicione GOOGLE_DRIVE_API_KEY e GOOGLE_DRIVE_FOLDER_ID.",
      };
    }

    const q = `'${folderId}' in parents and mimeType='application/pdf' and trashed=false`;
    const fields =
      "files(id,name,modifiedTime,size,thumbnailLink,webViewLink)";
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
      q,
    )}&fields=${encodeURIComponent(fields)}&orderBy=name&pageSize=200&key=${apiKey}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        const body = await res.text();
        console.error("[drive] list failed", res.status, body);
        return {
          files: [],
          error: `Falha ao carregar biblioteca (${res.status}).`,
        };
      }
      const data = (await res.json()) as { files?: DrivePdf[] };
      return { files: data.files ?? [] };
    } catch (err) {
      console.error("[drive] fetch error", err);
      return { files: [], error: "Erro de rede ao carregar a biblioteca." };
    }
  },
);
