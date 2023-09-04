import React, { useEffect, useState } from 'react';
import { Avatar, Badge, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

interface IProps {
  src: string
  alt?: string
  readOnly?: boolean
  style?: React.CSSProperties
}

const UploadAvatar = (props: IProps) => {
  const [selectedImage, setSelectedImage] = useState<any>('img');
  const {
    readOnly, src, style, alt,
  } = props;

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    setSelectedImage(image ? URL.createObjectURL(image) : src);
  };

  useEffect(() => {
    if (src) setSelectedImage(src);
  }, [src]);

  return (
    <Badge
      sx={style}
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={(
        !readOnly && (
          <label htmlFor="avatar-input">
            <input
              accept="image/*"
              id="avatar-input"
              type="file"
              style={{ display: 'none' }}
              onChange={onImageChange}
            />
            <IconButton
              color="primary"
              component="span"
            >
              <PhotoCamera sx={{ color: '#2d3e4ebb', width: '40px', height: '40px' }} />
            </IconButton>
          </label>
        )
      )}
    >
      <Avatar src={selectedImage} sx={{ width: '100%', height: '100%' }}>{alt}</Avatar>
    </Badge>
  );
};
UploadAvatar.defaultProps = {
  readOnly: false,
  style: {},
  alt: '',
};

export default UploadAvatar;
