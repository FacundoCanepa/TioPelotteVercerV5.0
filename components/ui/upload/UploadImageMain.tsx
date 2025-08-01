"use client";
import Image from "next/image";
import { UploadCloud } from "lucide-react";
import { useCallback, useRef } from "react";

interface Props {
  value: { id: number } | null;
  preview: string;
  onChange: (value: { id: number } | null, preview: string) => void;
  uploadImages: (files: FileList | File[]) => Promise<{ ids: { id: number }[]; urls: string[] }>;
  loading: boolean;
}

export default function UploadImageMain({ value, preview, onChange, uploadImages, loading }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const { ids, urls } = await uploadImages(files);
      if (ids[0]) {
        onChange(ids[0], urls[0]);
      }
    },
    [onChange, uploadImages]
  );

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="bg-[#fbe6d4] hover:bg-[#efd6bf] text-[#8B4513] px-4 py-2 rounded-md flex items-center gap-2 justify-center"
      >
        <UploadCloud className="w-4 h-4" /> {loading ? "Subiendo..." : "Subir imagen"}
      </button>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />
      {preview && (
        <Image 
          src={preview || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idHJhbnNwYXJlbnQiLz48L3N2Zz4="} 
          alt="preview" 
          width={300} 
          height={300} 
          className="rounded-md object-cover h-40 w-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idHJhbnNwYXJlbnQiLz48L3N2Zz4=";
          }}
        />
      )}
    </div>
  );
}