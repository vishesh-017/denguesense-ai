import { useState, useCallback } from "react";
import { Upload, Camera, Image as ImageIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageUpload: (file: File, preview: string) => void;
  isAnalyzing: boolean;
}

export const ImageUploader = ({ onImageUpload, isAnalyzing }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        const preview = URL.createObjectURL(file);
        onImageUpload(file, preview);
      }
    },
    [onImageUpload]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      onImageUpload(file, preview);
    }
  };

  return (
    <Card
      className={cn(
        "relative border-2 border-dashed transition-all duration-500 p-8 overflow-hidden group",
        isDragging
          ? "border-primary bg-primary/10 scale-[1.02] shadow-2xl shadow-primary/20"
          : "border-muted-foreground/25 hover:border-primary/50 hover:bg-card hover:shadow-xl"
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer" />
      
      <div className="relative flex flex-col items-center justify-center gap-6 py-8">
        <div className="relative">
          <div className={cn(
            "absolute inset-0 rounded-full blur-2xl transition-all duration-500",
            isDragging ? "bg-primary/40 scale-150" : "bg-primary/20 group-hover:bg-primary/30 group-hover:scale-125"
          )} />
          <div className={cn(
            "relative bg-gradient-to-br from-primary to-accent p-5 rounded-2xl shadow-xl transition-all duration-500",
            isDragging ? "scale-110 rotate-3" : "group-hover:scale-105"
          )}>
            <Upload className="h-10 w-10 text-primary-foreground" />
          </div>
          <Sparkles className={cn(
            "absolute -top-2 -right-2 h-6 w-6 text-accent transition-all duration-300",
            isDragging ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )} />
        </div>

        <div className="text-center space-y-3">
          <h3 className="font-bold text-xl">Upload Suspected Breeding Site</h3>
          <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
            Drop an image of stagnant water, containers, or potential mosquito breeding areas
          </p>
        </div>

        <div className="flex gap-4">
          <Button 
            disabled={isAnalyzing} 
            className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5" 
            size="lg"
            asChild
          >
            <label className="cursor-pointer">
              <ImageIcon className="h-4 w-4" />
              Choose File
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          </Button>
          <Button 
            variant="outline" 
            disabled={isAnalyzing} 
            className="gap-2 border-2 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300 hover:-translate-y-0.5" 
            size="lg"
            asChild
          >
            <label className="cursor-pointer">
              <Camera className="h-4 w-4" />
              Take Photo
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
          </Button>
        </div>
      </div>
    </Card>
  );
};