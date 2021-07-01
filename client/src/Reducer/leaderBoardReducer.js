const initialValue = [];

const leadersBoardReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return state.concat(action.payload)

    default:
      return state;
  }
};

export default leadersBoardReducer;