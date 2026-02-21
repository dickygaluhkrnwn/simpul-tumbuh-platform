"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Image as ImageIcon, UploadCloud, X, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/storage";

interface ImageUploadProps {
  currentImage?: string; // URL gambar saat ini (untuk edit)
  onImageUploaded: (url: string) => void; // Callback saat sukses
  folder?: string; // Folder tujuan (misal: "news", "events")
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
      
      // Buat preview lokal langsung (biar UX cepat)
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Otomatis upload saat file dipilih
      await handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onImageUploaded(url); // Kirim URL hasil upload ke parent form
    } catch (error) {
      alert("Gagal mengupload gambar.");
      setPreview(currentImage || null); // Revert jika gagal
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onImageUploaded(""); // Reset URL di parent
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700 block">{label}</label>
      
      <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-center relative group">
        
        {/* Input File Tersembunyi */}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />

        {preview ? (
          <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden bg-slate-200">
            {/* Image Preview */}
            <img 
              src={preview} 
              alt="Preview" 
              className={`w-full h-full object-cover transition-opacity ${isUploading ? 'opacity-50' : 'opacity-100'}`} 
            />
            
            {/* Loading Indicator */}
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <Loader2 className="animate-spin w-8 h-8" />
              </div>
            )}

            {/* Remove Button */}
            {!isUploading && (
              <button 
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full shadow-md hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ) : (
          /* Placeholder State */
          <div 
            className="flex flex-col items-center justify-center py-8 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud size={24} />
            </div>
            <p className="text-sm font-medium text-slate-600">Klik untuk upload gambar</p>
            <p className="text-xs text-slate-400 mt-1">JPG, PNG maksimal 2MB</p>
          </div>
        )}
      </div>
    </div>
  );
}