import React, { useContext } from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/authContext';

import Image from './Image';

const FileUpload = ({
  setValues,
  setLoading,
  values,
  singleUpload = false
}) => {
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
              if (singleUpload) {
                setValues({ ...values, image: response.data });
              } else {
                const { images } = values;
                setValues({ ...values, images: [...images, response.data] });
              }
              setLoading(false);
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
        if (singleUpload) {
          setValues({
            ...values,
            image: {
              url: '',
              public_id: ''
            }
          });
        } else {
          const { images } = values;
          let filteredImages = images.filter((item) => {
            return item.public_id !== id;
          });
          setValues({ ...values, images: filteredImages });
        }
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
        {singleUpload && (
          <Image
            image={values.image}
            handleImageRemove={handleImageRemove}
            key={values.image.public_id}
          />
        )}
        {!singleUpload &&
          values.images.map((image) => (
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
