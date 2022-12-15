document.querySelectorAll('.followNick').forEach(function (tag) {
  tag.addEventListener('click', function () {
    const myId = document.querySelector('#my-id');
    if (myId) {
      //로그인된 사용자 존재하면
      const id = tag.dataset.value;
      console.log(id);
      if (myId !== id) {
        //현재 사용자와 팔로잉끊기한 사용자가 다르면
        if (confirm('팔로잉을 끊으시겠습니까?')) {
          //팔로잉끊기 여부 묻기
          axios
            .delete(`/user/${id}/follow`) //routes/user.js의 notfollow 코드로 이동
            .then(() => {
              location.reload();
            })
            .catch(error => {
              console.error(error);
            });
        }
      }
    }
  });
});
