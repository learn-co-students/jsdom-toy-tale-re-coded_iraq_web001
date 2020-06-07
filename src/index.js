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
});
let globalVar=''
function loadAll(){
  return fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => {
    console.log(json);
    globalVar=json;
    CardsFunc()
    })
}

function CardsFunc(){
  const divCollection=document.getElementById('toy-collection')
 globalVar.forEach(item =>{
   const div=document.createElement('div')
   div.innerHTML=`
   <h2>${item.Title}</h2>
   <img src=${item.source}>
   <p>${item.likes}</p>
      <button class="like-btn">Like <3</button>
   `
   div.classList.add('card')
   divCollection.appendChild(div)
 }) 
}

loadAll()