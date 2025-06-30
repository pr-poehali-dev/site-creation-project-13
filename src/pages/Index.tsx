import { useState } from "react";
import MusicUploader from "@/components/MusicUploader";
import MusicPlayer from "@/components/MusicPlayer";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
  file?: File;
}

const demoTracks: Track[] = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Echo Waves",
    duration: "3:42",
    coverUrl: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Starlight",
    artist: "Neon Pulse",
    duration: "4:15",
    coverUrl: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Ocean Breeze",
    artist: "Ambient Flow",
    duration: "5:23",
    coverUrl: "/placeholder.svg",
  },
];

const Index = () => {
  const [tracks, setTracks] = useState<Track[]>(demoTracks);

  const handleFilesUpload = (files: File[]) => {
    const newTracks = files.map((file, index) => ({
      id: tracks.length + index + 1,
      title: file.name.replace(/\.[^/.]+$/, ""),
      artist: "Загруженный трек",
      duration: "0:00",
      coverUrl: "/placeholder.svg",
      file: file,
    }));

    setTracks((prev) => [...prev, ...newTracks]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Музыкальный плеер
        </h1>

        <MusicUploader onFilesUpload={handleFilesUpload} />

        <MusicPlayer tracks={tracks} />
      </div>
    </div>
  );
};

export default Index;
