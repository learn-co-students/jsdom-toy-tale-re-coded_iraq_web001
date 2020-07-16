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
  
  fetch('http://localhost:3000/toys')
  .then (res=>res.json())
  .then (data => addToys(data))
  
  function addToys(toys){
    const toyCollection = document.getElementById('toy-collection');
    toyCollection.innerHTML=`
    <div class="card">
    <h2>${toys.name}</h2>
    <img src=${toys.image} class="toy-avatar" />
    <p>${toys.likes}</p>
    <button class="like-btn">Like <3</button>
  </div>
    `
  }
  const configObj = {
    method :"POST",
    headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
}
 body: JSON.stringify({
  "name": toys.name.value,
  "image": toys.image.value,
  "likes": 0
})
 }
 
  fetch('http://localhost:3000/toys',configObj)
  .then (res=>res.json())
  .then (data => addToys(data))
  
  
  
});
