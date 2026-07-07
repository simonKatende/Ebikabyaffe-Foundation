"use client";

import { useState } from "react";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

// "Lite" YouTube embed: shows the video's own thumbnail with a play button
// overlay, and only loads the actual YouTube iframe (via the
// privacy-enhanced youtube-nocookie.com domain) once the user taps play —
// so nothing plays, and no YouTube script loads, until asked for.
export function YouTubeEmbed({ videoId, title, className = "" }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={`relative w-full aspect-video rounded-[8px] overflow-hidden bg-black ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className={`relative block w-full aspect-video rounded-[8px] overflow-hidden cursor-pointer group border-0 p-0 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- external
          YouTube-hosted thumbnail; next/image would need domain allowlisting
          for no real benefit here */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-16 h-16 rounded-full bg-white/95 group-hover:bg-white flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110">
          <span className="text-gd text-[22px] ml-1" aria-hidden="true">▶</span>
        </span>
      </span>
      <span className="absolute bottom-3 left-3 right-3 text-white text-[12px] font-medium text-left drop-shadow-[0_1px_4px_rgba(0,0,0,.6)]">
        {title}
      </span>
    </button>
  );
}
