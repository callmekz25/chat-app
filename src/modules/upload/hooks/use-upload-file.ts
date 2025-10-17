import { useMutation } from '@tanstack/react-query';
import { uploadFile } from '../upload.services';
import { UploadFilePayload } from '../types/upload-payload';

export const useUploadFile = () => {
  return useMutation({
    mutationFn: (payload: UploadFilePayload) => uploadFile(payload),
  });
};
