export function getYouTubeVideoId(url: string) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      return parsedUrl.pathname.split("/").filter(Boolean)[0] ?? null;
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v");
      }

      const [route, videoId] = parsedUrl.pathname.split("/").filter(Boolean);

      if (["embed", "shorts", "live"].includes(route)) {
        return videoId ?? null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function getYouTubeThumbnailUrl(
  videoId: string,
  quality: "maxresdefault" | "hqdefault" = "maxresdefault",
) {
  return `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;
}
