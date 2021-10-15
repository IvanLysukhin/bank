export const formatNumberToStr = (num) => new Intl.NumberFormat('ru-RU').format(num);

export const saveData = (data) => {
  const prevUsers = JSON.parse(localStorage.getItem('users'));

  if (!prevUsers) {
    localStorage.setItem('users', JSON.stringify([data]));
    return;
  }
  localStorage.setItem('users', JSON.stringify([...prevUsers, data]));
};
