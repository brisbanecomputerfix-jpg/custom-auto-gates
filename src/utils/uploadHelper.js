/**
 * Helper to upload attached photos/videos to the backend /api/upload endpoint
 */
export async function uploadFormFiles(files) {
  if (!files || files.length === 0) return [];
  
  try {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      console.warn('File upload endpoint returned non-OK status:', response.status);
      return [];
    }

    const data = await response.json();
    return data.files || [];
  } catch (err) {
    console.warn('File upload network exception (continuing lead submission):', err);
    return [];
  }
}
