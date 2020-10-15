import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_POSTS, TOTAL_POSTS } from '../graphql/queries';
import { useHistory } from 'react-router-dom';

import Image from '../components/Image';

const Home = () => {
  const [page, setPage] = useState(1);
  let history = useHistory();
  const { data, loading } = useQuery(GET_ALL_POSTS, {
    variables: { page: page }
  });
  const { data: postCount } = useQuery(TOTAL_POSTS);

  let totalPages;
  const pagination = () => {
    totalPages = Math.ceil(postCount && postCount.totalPosts / 9);

    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i}>
          <a
            onClick={() => setPage(i)}
            className={`page-link ${page === i && 'activePagination'}`}
          >
            {i}
          </a>
        </li>
      );
    }

    return pages;
  };

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
      <nav>
        <ul className="pagination justify-content-center">
          <li>
            <a
              onClick={() => setPage(1)}
              className={`page-link ${page === 1 && 'disabled'}`}
            >
              Previous
            </a>
          </li>
          {pagination()}
          <li>
            <a
              onClick={() => setPage(totalPages)}
              className={`page-link ${page === totalPages && 'disabled'}`}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
