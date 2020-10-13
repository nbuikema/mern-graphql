import React, { useContext } from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/authContext';

import Image from './Image';

const FileUpload = ({ setUser, setLoading, user, loading, images }) => {
  const { state } = useContext(AuthContext);

  const fileResizeAndUpload = (e) => {
    let fileInput = false;
    if (e.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      Resizer.imageFileResizer(
        e.target.files[0],
        300,
        300,
        'JPEG',
        100,
        0,
        (uri) => {
          axios
            .post(
              `${process.env.REACT_APP_REST_ENDPOINT}/uploadimages`,
              {
                image: uri
              },
              {
                headers: {
                  authtoken: state.user.token
                }
              }
            )
            .then((response) => {
              setLoading(false);
              setUser({ ...user, images: [...images, response.data] });
              toast.success('Image successfully uploaded.');
            })
            .catch((error) => {
              setLoading(false);
              toast.error('Image could not be uploaded.');
            });
        },
        'base64'
      );
    }
  };

  const handleImageRemove = (id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_REST_ENDPOINT}/removeimage`,
        {
          public_id: id
        },
        {
          headers: {
            authtoken: state.user.token
          }
        }
      )
      .then((response) => {
        setLoading(false);
        let filteredImages = images.filter((item) => {
          return item.public_id !== id;
        });
        setUser({ ...user, images: filteredImages });
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Could not remove image.');
      });
  };

  return (
    <div className="col-md-12 row">
      <div className="col-md-3">
        <div className="form-group">
          <label className="btn btn-primary">
            Upload Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={fileResizeAndUpload}
              className="form-control"
              placeholder="Images"
            />
          </label>
        </div>
      </div>
      <div className="col-md-9">
        {images.map((image) => (
          <Image
            image={image}
            handleImageRemove={handleImageRemove}
            key={image.public_id}
          />
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
