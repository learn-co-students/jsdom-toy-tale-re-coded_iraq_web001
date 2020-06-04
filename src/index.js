let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  const toyNameInput = document.getElementsByClassName('input-text')[0]
  const toyImgInput = document.getElementsByClassName('input-text')[1]
  const createToyBtn = document.getElementsByClassName('submit')[0]
  const toyCollection = document.querySelector("#toy-collection");

  function fetchDatafromDb() {
    fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(array => array.forEach(element => renderToys(element)))
  }

  function renderToys(element) {
    toyCollection.insertAdjacentHTML('beforeend',
      `<div class="card">
          <h2>${element.name}</h2>
          <img src=${element.image} class="toy-avatar" />
          <p class="likes">${element.likes} Likes </p>
          <button class="like-btn">Like <3</button>
        </div>`
    )
    const likeBtns = document.querySelectorAll('.like-btn')
    likeBtns.forEach(btn => btn.addEventListener('click', increaseLikes))

    function increaseLikes() {
      let configObj = {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          'Accept': "application/json"
        },
        body: JSON.stringify({
          "likes": element.likes + 1
        })
      }
      fetch(`http://localhost:3000/toys/${element.id}`, configObj)
    }
  }

  createToyBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let dataToPost = {
      "name": toyNameInput.value,
      "image": toyImgInput.value,
      "likes": 0
    }
    let configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify(dataToPost)
    }
    fetch('http://localhost:3000/toys', configObj)
      .then(response => response.json())
      .then(object => renderToys(object))
  })

  fetchDatafromDb();

})
