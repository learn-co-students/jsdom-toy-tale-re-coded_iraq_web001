let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const form =document.getElementsByClassName('add-toy-form');
  let inputTextName =document.getElementsByClassName('input-text')[0];
  let inputTextUrl =document.getElementsByClassName('input-text')[1];
  let submit =document.getElementsByClassName('submit')[0];
  let toyCollection =document.getElementById('toy-collection');
  function toyCard (element){
   toyCollection.innerh=`<div class="card"</div>
   <h2>${element.name}</h2>
   <img src=${element.image} class="toy-avatar" />
   <p>${element.likes}</p>
   <button class="like-btn">like <3</button>`
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

  function fetchTheData(){
    fetch('http://localhost:3000/toys')
    .then(response=> response.json())
    //console.log(response)
    .then(arr=>arr.forEach(element =>toyCard(element)))
  }
  const likeButtons =document.querySelectorAll('.like-btn')
  likeButtons.forEach(btn =>btn.addEventListener('click' ,increaseLikes()))
  function increaseLikes(){
    let configObj ={
      method :'PATCH',
      headers: {
       "Content-Type": "application/json",
      Accept: "application/json"
      },
 
     body: JSON.stringify({
    "likes": element.likes+1
    })
    }
    fetch(`http://localhost:3000/toys/${element.id}`,configObj)
  }
  submit.addEventListener('click',(event)=>{
    event.preventDefault();
    let dataPost={
      "name":inputTextName.value,
      "image":inputTextUrl.value,
      "likes":0
    }
    let configObj ={
      method :'PATCH',
      headers: {
       "Content-Type": "application/json",
      Accept: "application/json"
      },
     body: JSON.stringify(dataPost)
  }
  fetch('http://localhost:3000/toys',configObj)
  .then(response=>response.json())
  .then(object=>toyCard(object))
})
fetchTheData();
})
