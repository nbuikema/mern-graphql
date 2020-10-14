import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { POST_CREATE, POST_DELETE } from '../../graphql/mutations';
import { POSTS_BY_USER } from '../../graphql/queries';

import FileUpload from '../../components/FileUpload';
import Image from '../../components/Image';

const initialState = {
  content: '',
  image: {
    url: 'https://via.placeholder.com/200x200.png?text=Post',
    public_id: '123'
  }
};

const Post = () => {
  const history = useHistory();
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { content } = values;

  const { data: myPosts } = useQuery(POSTS_BY_USER);

  const [postCreate] = useMutation(POST_CREATE, {
    update: (cache, { data: { postCreate } }) => {
      const { postsByUser } = cache.readQuery({
        query: POSTS_BY_USER
      });

      cache.writeQuery({
        query: POSTS_BY_USER,
        data: {
          postsByUser: [postCreate, ...postsByUser]
        }
      });
    },
    onError: (err) => console.log(err)
  });

  const [postDelete] = useMutation(POST_DELETE, {
    update: ({ data }) => {
      toast.success('Post deleted');
    },
    onError: (err) => {
      console.log(err);
      toast.error('Post delete failed');
    }
  });

  const handleDelete = async (postId) => {
    setLoading(true);
    await postDelete({
      variables: { postId },
      refetchQueries: [{ query: POSTS_BY_USER }]
    });
    setLoading(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    postCreate({ variables: { input: values } });
    setValues(initialState);
    setLoading(false);
    toast.success('Post created');
  };

  const createForm = () => (
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
      <h4>{loading ? 'Loading...' : 'Create Post'}</h4>
      <FileUpload
        values={values}
        setValues={setValues}
        setLoading={setLoading}
        singleUpload={true}
      />
      <div className="row">
        <div className="col">{createForm()}</div>
      </div>
      <hr />
      <div className="row p-5">
        {myPosts &&
          myPosts.postsByUser.map((post) => (
            <div key={post._id} className="col-md-6 pt-5">
              <div className="card text-center">
                <div className="card-body">
                  <Image image={post.image} />
                  <div className="card-title">
                    <h4>@{post.postedBy.username}</h4>
                  </div>
                  <hr />
                  <p className="card-text">{post.content}</p>
                  <button
                    onClick={() => history.push(`/post/update/${post._id}`)}
                    className="btn btn-warning"
                  >
                    Update Post
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="btn btn-danger"
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Post;
