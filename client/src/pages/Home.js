import React, { useState } from 'react';
import { useLazyQuery, useQuery, useSubscription } from '@apollo/react-hooks';
import { GET_ALL_POSTS, TOTAL_POSTS } from '../graphql/queries';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  POST_ADDED,
  POST_UPDATED,
  POST_DELETED
} from '../graphql/subscriptions';

import Image from '../components/Image';

const Home = () => {
  const [page, setPage] = useState(1);
  let history = useHistory();
  const { data, loading } = useQuery(GET_ALL_POSTS, {
    variables: { page }
  });
  const { data: postCount } = useQuery(TOTAL_POSTS);

  const { data: newPost } = useSubscription(POST_ADDED, {
    onSubscriptionData: async ({
      client: { cache },
      subscriptionData: { data }
    }) => {
      const { allPosts } = cache.readQuery({
        query: GET_ALL_POSTS,
        variables: { page }
      });

      cache.writeQuery({
        query: GET_ALL_POSTS,
        variables: { page },
        data: {
          allPosts: [data.postAdded, ...allPosts]
        }
      });

      fetchPosts({
        variables: { page },
        refetchQueries: [{ query: GET_ALL_POSTS, variables: { page } }]
      });

      toast.success('New Post!');
    }
  });

  const { data: updatedPost } = useSubscription(POST_UPDATED, {
    onSubscriptionData: async () => {
      toast.success('Updated Post!');
    }
  });

  const { data: deletedPost } = useSubscription(POST_DELETED, {
    onSubscriptionData: async ({
      client: { cache },
      subscriptionData: { data }
    }) => {
      const { allPosts } = cache.readQuery({
        query: GET_ALL_POSTS,
        variables: { page }
      });

      let filteredPosts = allPosts.filter(
        (post) => post._id !== deletedPost.postDeleted._id
      );

      cache.writeQuery({
        query: GET_ALL_POSTS,
        variables: { page },
        data: {
          allPosts: filteredPosts
        }
      });

      fetchPosts({
        variables: { page },
        refetchQueries: [{ query: GET_ALL_POSTS, variables: { page } }]
      });

      toast.success('Deleted Post!');
    }
  });

  const [fetchPosts, { data: posts }] = useLazyQuery(GET_ALL_POSTS);

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
