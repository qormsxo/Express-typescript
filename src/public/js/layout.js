window.onload = () => {
  if (new URL(location.href).searchParams.get('loginError')) {
    alert(new URL(location.href).searchParams.get('loginError'));
  }
};
document.getElementById('my-profile-modify').addEventListener('click', () => {
  const newNick = prompt('프로필을 수정하시겠습니까?');
  if (newNick) {
    axios({
      method: 'patch',
      url: '/user',
      data: {
        newNick,
      },
    })
      .then(() => {
        location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  }
});
