import React, { useContext } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { AuthContext } from '../context/authContext';

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
  const { state, dispatch } = useContext(AuthContext);
  console.log(state);

  const updateUserName = () => {
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: 'Nick B'
    });
  };

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
      <button onClick={ updateUserName } className='btn btn-primary'>Change User Name</button>
    </div>
  ;
};

export default Home;