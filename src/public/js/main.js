if (document.getElementById('img')) {
  document.getElementById('img').addEventListener('change', function (e) {
    const formData = new FormData();
    console.log(this, this.files);
    formData.append('img', this.files[0]);
    axios
      .post('/post/img', formData)
      .then(res => {
        console.log(res);
        document.getElementById('img-url').value = res.data.url;
        document.getElementById('img-preview').src = res.data.url;
        document.getElementById('img-preview').style.display = 'inline';
      })
      .catch(err => {
        console.error(err);
      });
  });
}
document.querySelectorAll('.twit-follow').forEach(function (tag) {
  tag.addEventListener('click', function () {
    const myId = document.querySelector('#my-id');
    if (myId) {
      const userId = tag.parentNode.querySelector('.twit-user-id').value;
      if (userId !== myId.value) {
        if (confirm('팔로잉하시겠습니까?')) {
          axios
            .post(`/user/${userId}/follow`)
            .then(() => {
              location.reload();
            })
            .catch(err => {
              console.error(err);
            });
        }
      }
    }
  });
});
