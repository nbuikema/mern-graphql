import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_ALL_POSTS = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);

  return loading 
  ? <p className='p-5'>Loading...</p>
  : <div className='container'>
      <div className='row p-5'>
        { data.allPosts.map(post => (
          <div key={ post.id } className='col-md-4'>
            <div className='card' key={ post.id }>
              <div className='card-body'>
                <div className='card-title'>
                  <h4>{ post.title }</h4>
                </div>
                <p className='card-text'>{ post.description }</p>
              </div>
            </div>
          </div>
        )) }
      </div>
    </div>
  ;
};

export default Home;