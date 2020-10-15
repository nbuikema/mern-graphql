import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { SEARCH } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';

import Image from '../components/Image';

const SearchResults = () => {
  let history = useHistory();
  const { query } = useParams();
  const { data, loading } = useQuery(SEARCH, {
    variables: { query }
  });

  if (loading) {
    return (
      <div className="container text-center">
        <p className="p-5">Loading...</p>
      </div>
    );
  } else if (!data.search.length) {
    return (
      <div className="container text-center">
        <p className="p-5">No results found</p>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row pb-5">
          {data &&
            data.search.map((post) => (
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
  }
};

export default SearchResults;
