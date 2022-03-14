// Usei o mesmo modelo do trybetunes, que adiciona somente um objeto dentro do array salvo no local storage
const RANKING = 'ranking';

if (!JSON.parse(localStorage.getItem(RANKING))) {
  localStorage.setItem(RANKING, JSON.stringify([]));
}
export const readRanking = () => JSON.parse(localStorage.getItem(RANKING));

// export const getRanking = () => {
//   readRanking();
// };

const saveFavoriteUser = (ranking) => localStorage
  .setItem(RANKING, JSON.stringify(ranking));

export const addUserInRanking = (user) => {
  if (user) {
    const ranking = readRanking() || [];
    saveFavoriteUser([...ranking, user]);
  }
};

// export const removeUserInRaking = (user) => {
//   const ranking = readRanking();
//   saveFavoriteUser(ranking.filter((u) => u.name !== user.name));
// };
