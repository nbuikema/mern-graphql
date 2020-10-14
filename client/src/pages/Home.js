import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_POSTS } from '../graphql/queries';
import { useHistory } from 'react-router-dom';

import Image from '../components/Image';

const Home = () => {
  let history = useHistory();
  const { data, loading } = useQuery(GET_ALL_POSTS);

  return loading ? (
    <p className="p-5">Loading...</p>
  ) : (
    <div className="container">
      <div className="row p-5">
        {data &&
          data.allPosts.map((post) => (
            <div key={post._id} className="col-md-4 pt-5">
              <div className="card text-center">
                <div className="card-body">
                  <Image image={post.image} />
                  <div className="card-title">
                    <h4>@{post.postedBy.username}</h4>
                  </div>
                  <hr />
                  <p className="card-text">{post.content}</p>
                </div>
                <button
                  onClick={() => history.push(`/post/${post._id}`)}
                  className="btn btn-outline-primary"
                >
                  View Post
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
