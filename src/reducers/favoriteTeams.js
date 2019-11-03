export const favoriteTeams = (state = [], action) => {
  switch(action.type) {
    case 'GET_FAVORITE_TEAMS':
      return [...state, action.newTeam];
    default:
      return state;
  }
}