import React, { useState, useMemo, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { SINGLE_POST } from '../../graphql/queries';

import Image from '../../components/Image';

const SinglePost = () => {
  const [values, setValues] = useState({
    content: '',
    image: {
      url: '',
      public_id: ''
    },
    username: ''
  });

  const { content, image, username } = values;

  const { postid } = useParams();

  const [getSinglePost, { data: singlePost }] = useLazyQuery(SINGLE_POST);

  useMemo(() => {
    if (singlePost) {
      console.log(singlePost);
      setValues({
        ...values,
        _id: singlePost.singlePost._id,
        content: singlePost.singlePost.content,
        image: singlePost.singlePost.image,
        username: singlePost.singlePost.postedBy.username
      });
    }
  }, [singlePost]);

  useEffect(() => {
    getSinglePost({ variables: { postId: postid } });
  }, []);

  return (
    <div className="container p-5">
      <h4>Single Post</h4>
      <div className="card text-center">
        <div className="card-body">
          <Image image={image} />
          <div className="card-title">
            <h4>@{username}</h4>
          </div>
          <hr />
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
