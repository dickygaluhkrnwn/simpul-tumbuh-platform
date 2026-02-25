"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Image as ImageIcon, UploadCloud, X, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  currentImage?: string; 
  onImageUploaded: (url: string) => void; 
  folder?: string; 
  label?: string;
}

export function ImageUpload({ 
  currentImage, 
  onImageUploaded, 
  folder = "uploads",
  label = "Upload Gambar"
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      await handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onImageUploaded(url); 
    } catch (error) {
      alert("Gagal mengupload gambar.");
      setPreview(currentImage || null); 
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageUploaded(""); 
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-3 font-sans">
      <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
        {label}
      </label>
      
      <div 
        className={cn(
          "border-2 border-dashed rounded-2xl p-4 text-center relative group transition-all duration-300",
          preview 
            ? "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900" 
            : "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-primary-400 cursor-pointer"
        )}
        onClick={() => !preview && fileInputRef.current?.click()}
      >
        
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />

        {preview ? (
          <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <img 
              src={preview} 
              alt="Preview" 
              className={`w-full h-full object-cover transition-opacity duration-300 ${isUploading ? 'opacity-40 blur-sm' : 'opacity-100'}`} 
            />
            
            {isUploading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-900 dark:text-white bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
                <Loader2 className="animate-spin w-8 h-8 text-primary-500 mb-2" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Mengunggah...</span>
              </div>
            )}

            {!isUploading && (
              <button 
                type="button"
                onClick={handleRemove}
                className="absolute top-3 right-3 bg-slate-900/60 hover:bg-rose-600 text-white p-2 rounded-xl backdrop-blur-md shadow-lg transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                title="Hapus Gambar"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 mb-4 group-hover:scale-110 group-hover:text-primary-500 group-hover:border-primary-500/50 transition-all duration-300">
              <UploadCloud size={28} />
            </div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Klik untuk memilih gambar</p>
            <p className="text-xs font-medium text-slate-400">Format JPG atau PNG (Maks. 2MB)</p>
          </div>
        )}
      </div>
    </div>
  );
}