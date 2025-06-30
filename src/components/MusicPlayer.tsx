import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
  file?: File;
}

interface MusicPlayerProps {
  tracks: Track[];
}

export default function MusicPlayer({ tracks }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(33);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setProgress(0);
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setProgress(0);
    setIsPlaying(true);
  };

  const track = tracks[currentTrack];

  return (
    <>
      {/* Main Player Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="w-48 h-48 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
              <img
                src={track.coverUrl}
                alt={track.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h2 className="text-xl font-semibold mb-1">{track.title}</h2>
            <p className="text-muted-foreground">{track.artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <Progress value={progress} className="mb-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                1:
                {Math.floor((progress * 2.3) / 10)
                  .toString()
                  .padStart(2, "0")}
              </span>
              <span>{track.duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button variant="ghost" size="icon" onClick={prevTrack}>
              <Icon name="SkipBack" size={24} />
            </Button>
            <Button size="icon" className="w-12 h-12" onClick={togglePlay}>
              <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
            </Button>
            <Button variant="ghost" size="icon" onClick={nextTrack}>
              <Icon name="SkipForward" size={24} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Track List */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">Playlist</h3>
          <div className="space-y-2">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                  index === currentTrack
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
                onClick={() => selectTrack(index)}
              >
                <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0">
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{track.title}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {track.artist}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {track.duration}
                </div>
                {index === currentTrack && isPlaying && (
                  <Icon name="Volume2" size={16} className="text-primary" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
