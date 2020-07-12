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

  /*id: 1
  image: "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png"
  likes: 5
  name: "Woody"*/
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(resp => {
      for (const ele of resp)
        addCard(ele);
    })
});
/** `h2` tag with the toy's name
* `img` tag with the `src` of the toy's image attribute and the class name "toy-avatar"
* `p` tag with how many likes that toy has
* `button` tag with a class "like-btn"*/
//const toyCollection = document.getElementById('toy-collection');
function addCard(obj) {
  const card = document.createElement('div');
  document.getElementById('toy-collection').appendChild(card);
  card.classList.add("card");

  const h2 = document.createElement('h2');
  h2.innerText = obj.name;
  card.appendChild(h2);

  const imgCard = document.createElement('img');
  imgCard.className += 'toy-avatar';
  imgCard.src = obj.image;
  card.appendChild(imgCard);

  const p = document.createElement('p');
  p.innerText = obj.likes;
  card.appendChild(p);

  const button = document.createElement('button');
  button.className += 'like-btn';
  button.className += 'btn';
  card.appendChild(button);
}