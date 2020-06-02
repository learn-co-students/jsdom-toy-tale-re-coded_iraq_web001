let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyCollection = document.getElementById('toy-collection');
  const submitBtn = document.querySelector(".submit");
  const newToyName = document.getElementsByClassName('input-text')[0];
  const newToyImg = document.getElementsByClassName('input-text')[1];
  submitBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let newToyObj = {
      "name" : newToyName.value,
      "img" : newToyImg.value,
      "likes" : 0
    }

    let configurationObject = {
      method : "POST",
      headers : {
        "Content-Type" : "application.json",
        "Accept" : "application.json"
      },
      body : JSON.stringify(newToyObj)
    }
    console.log(configurationObject);
    fetch('http://localhost:3000/toys',configurationObject)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch()
  })



  fetch('http://localhost:3000/toys')
  .then(response => {
    return response.json();
  })
  .then(toysArray => {
    for(obj of toysArray)
      displayToy(obj);
  })
  function displayToy(toy){
    const div = document.createElement('div');
    div.setAttribute('class','card');
    div.innerHTML = `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes}</p>
    <button class="like-btn">Like </button>`;
    toyCollection.appendChild(div);
  }
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});
