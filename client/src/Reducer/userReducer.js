const userInitialValue = {
  userName: '',
  savedGames: { remainingCards: 0, defusingCards: 0 },
  wonGames: 0,
  lostGames: 0,
  gamesPlayed: 0
};

const usersReducer = (state = userInitialValue, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        userName: action.payload.userName,
        savedGames: action.payload.savedGames,
        wonGames: action.payload.wonGames,
        lostGames: action.payload.lostGames,
        gamesPlayed: action.payload.gamesPlayed
      };
    default:
      return state;
  }
};

export default usersReducer;