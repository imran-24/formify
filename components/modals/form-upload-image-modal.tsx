"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useFormImage } from "@/hooks/use-form-image";

export const FormUploadImageModal = () => {
  const update = useMutation(api.formField.update);
  const fromImage = useFormImage();
  const { edgestore } = useEdgeStore();

  
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    fromImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: fromImage.url,
        },
      });
      console.log(res)
      await update({
        id: fromImage.id as Id<"formFields">,
        imageUrl: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog open={fromImage.isOpen} onOpenChange={fromImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center text-lg font-semibold'>Upload Image</DialogTitle>
        </DialogHeader>
        <SingleImageDropzone
          className='w-full outline-none'
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
