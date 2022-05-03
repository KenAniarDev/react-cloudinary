import { useState } from 'react';
import axios from 'axios';
function App() {
  const [imgUrl, setImgUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImgUrl(URL.createObjectURL(event.target.files[0]));
    }
  };
  const uploadImage = async (files) => {
    console.log(files[0]);
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'sanvicente-Uploads');
    setIsUploading(true);
    try {
      const result = await axios.post(
        'https://api.cloudinary.com/v1_1/dw3gcnqms/image/upload',
        formData
      );
      setImgUrl(result.data.url);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <img
        height={100}
        width={100}
        src={imgUrl}
        style={{ objectFit: 'contain' }}
      />

      <input
        style={{ height: 0 }}
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={(e) => {
          uploadImage(e.target.files);
          onImageChange(e);
        }}
      />
      <label htmlFor="image-upload">
        {isUploading ? 'Uploading Image....' : 'Upload Image'}
      </label>
    </div>
  );
}

export default App;
