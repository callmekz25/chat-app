export type UploadFilePayload = {
  files: File[];
  type: 'image' | 'video' | 'voice' | 'file';
};
