// ─── Types ────────────────────────────────────────────────────────────────────

import { random } from "../utils/random";
import { URL_PHOTO } from "./urls";

export interface PicsumPhoto {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns a sized image URL for a given picsum photo id.
 * Avoids loading the full-resolution download_url.
 */
export function sizedUrl(id: string, w = 600, h = 400): string {
  return URL_PHOTO + `id/${id}/${w}/${h}`;
}

// ─── Fetch functions ──────────────────────────────────────────────────────────

/**
 * Fetches a page of photos from picsum.photos.
 * @param page  - Page number (default: 1)
 * @param limit - Items per page (default: 4)
 */
export async function fetchPhotos(
  page: number = 1,
  limit: number = 4
): Promise<PicsumPhoto[]> {
  const res = await fetch(
    URL_PHOTO + `v2/list?page=${page}&limit=${limit}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch photos — HTTP ${res.status}`);
  }

  const data: PicsumPhoto[] = await res.json();
  return data;
}

export async function fetchRandomPhotos(limit: number = 4): Promise<PicsumPhoto[]> {
  return fetchPhotos(random(1,30), limit);
}