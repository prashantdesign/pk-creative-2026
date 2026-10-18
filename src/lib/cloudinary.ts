'use client';

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset || cloudName === '<Your Cloud Name>') {
    const errorMessage = 'Cloudinary configuration is missing. Please set your Cloud Name in the .env file and ensure you have an upload preset configured in your Cloudinary account.';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  
  // Prepare form data for Cloudinary
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  // Upload to Cloudinary
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  
  const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
  });

  if (!uploadResponse.ok) {
      const errorData = await uploadResponse.json();
      console.error('Cloudinary upload error response:', errorData);
      throw new Error(`Cloudinary upload failed: ${errorData.error.message}`);
  }
  
  const uploadData = await uploadResponse.json();
  return uploadData.secure_url;
};
