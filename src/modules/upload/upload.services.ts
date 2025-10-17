import httpRequest from '@/config/axios.config';
import { UploadFilePayload } from './types/upload-payload';

export const uploadFile = async (payload: UploadFilePayload) => {
  const formData = new FormData();
  for (const file of payload.files) {
    formData.append('files', file);
  }
  const { data } = await httpRequest.post(
    `/upload?type=${payload.type}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return data;
};
