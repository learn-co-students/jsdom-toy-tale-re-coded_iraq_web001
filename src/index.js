let addToy = false;
// let addToy = true;

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = 'block';
    } else {
      toyForm.style.display = 'none';
    }
  });

  const form = document.querySelector('.add-toy-form');
  const toyName = form.children[1];
  const toyImgUrl = form.children[3];

  // https://source.unsplash.com/random/800x600
  //get toys requst
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => {
      render(data);
    });

  function render(data) {
    for (toy of data) {
      document.querySelector('#toy-collection').insertAdjacentHTML(
        'beforeend',
        `  <div class="card">
          <h2 class="toy-name">${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" alt="" />
          <p class="likes">${toy.likes}</p>
          <button class="like-btn">Like</button>
        </div>`
      );
    }
  }

  //post requst
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = {
      name: toyName.value,
      image: toyImgUrl.value,
    };

    const configObj = {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    };

    sendData(configObj);
  });

  function sendData(configObj) {
    return fetch('http://localhost:3000/toys', configObj).then(() => {
      render();
    });
  }
});