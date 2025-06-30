import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface MusicUploaderProps {
  onFilesUpload: (files: File[]) => void;
}

export default function MusicUploader({ onFilesUpload }: MusicUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("audio/"),
    );

    if (files.length > 0) {
      onFilesUpload(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesUpload(files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-primary/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="Music" size={32} className="text-primary" />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Загрузите музыку</h3>
              <p className="text-muted-foreground mb-4">
                Перетащите аудиофайлы сюда или нажмите кнопку
              </p>
              <Button onClick={openFileDialog} className="gap-2">
                <Icon name="Upload" size={16} />
                Выбрать файлы
              </Button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="audio/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>Поддерживаемые форматы: MP3, WAV, OGG, M4A</p>
        </div>
      </CardContent>
    </Card>
  );
}
