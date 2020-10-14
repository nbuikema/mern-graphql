import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import omitDeep from 'omit-deep';
import { POST_UPDATE } from '../../graphql/mutations';
import { SINGLE_POST } from '../../graphql/queries';

import FileUpload from '../../components/FileUpload';

const PostUpdate = () => {
  const [values, setValues] = useState({
    content: '',
    image: {
      url: '',
      public_id: ''
    }
  });
  const [loading, setLoading] = useState(false);

  const { content } = values;

  const { postid } = useParams();

  const [getSinglePost, { data: singlePost }] = useLazyQuery(SINGLE_POST);

  const [postUpdate] = useMutation(POST_UPDATE);

  useMemo(() => {
    if (singlePost) {
      setValues({
        ...values,
        _id: singlePost.singlePost._id,
        content: singlePost.singlePost.content,
        image: omitDeep(singlePost.singlePost.image, ['__typename'])
      });
    }
  }, [singlePost]);

  useEffect(() => {
    getSinglePost({ variables: { postId: postid } });
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    postUpdate({ variables: { input: values } });

    setLoading(false);
    toast.success('Post updated');
  };

  const updateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <textarea
          value={content}
          onChange={handleChange}
          name="content"
          rows="10"
          className="md-textarea form-control"
          placeholder="Write your post"
          maxLength="300"
          disabled={loading}
        ></textarea>
      </div>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={loading || !content}
      >
        Post
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <h4>{loading ? 'Loading...' : 'Update Post'}</h4>
      <FileUpload
        values={values}
        setValues={setValues}
        setLoading={setLoading}
        singleUpload={true}
      />
      <div className="row">
        <div className="col">{updateForm()}</div>
      </div>
    </div>
  );
};

export default PostUpdate;
