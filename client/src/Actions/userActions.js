import axios from 'axios'
import { message } from 'antd';

export const getUser = (userName, history) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/v1/get-users?name=${userName}`);
    localStorage.setItem('userName', data.userName);
    dispatch({
      type: 'SET_USER',
      payload: {
        userName: data.userName,
        savedGames: data.savedGames,
        wonGames: data.wonGames,
        lostGames: data.lostGames,
        gamesPlayed: data.gamesPlayed
      }
    });

    if (history) {
      history.push('/play');
    }
  } catch (err) {
    message.error('Something went wrong while getting user info');
    return false;
  }
};

export const setUserData = (payload) => async (dispatch) => {
  try {
    await axios.post(`/api/v1/set-user-data`, payload);

    dispatch({
      type: 'SET_USER',
      payload: {
        userName: payload.userName,
        savedGames: payload.savedGames,
        wonGames: payload.wonGames,
        lostGames: payload.lostGames,
        gamesPlayed: payload.gamesPlayed
      }
    });
  } catch (err) {
    message.error('Something went wrong while updating user info');
  }
}

export const getAllUserData = () => async (dispatch) => {
  try {
    const { data }  =  await axios.get('/api/v1/get-all-data');
    dispatch({
      type: 'SET_DATA',
      payload: data
    })
  } catch (err) {
    message.error('Something went wrong while fetching data for leader board');
  }
}
