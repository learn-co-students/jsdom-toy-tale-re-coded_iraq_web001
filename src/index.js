let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyForm1 = document.forms.item('add-toy-form');
  console.log(toyForm1);

  toyForm1.addEventListener('submit',e=>{
    e.preventDefault();
    const formData = new FormData(toyForm1);

    const toy = {
      name:formData.get('name'),
      image:formData.get('image'),
      likes:0,
    }

    console.log(toy);


    fetch('http://localhost:3000/toys',{
      method:'POST',
  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },

  body: JSON.stringify(toy),

      });
  });
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
          addToy = !addToy;

    if (addToy) {
      toyForm.style.display = "block";


    } else {
      toyForm.style.display = "none";

    }


  });

  const toysCollection = document.getElementById('toy-collection');



  fetch('http://localhost:3000/toys').then(response=>response.json()).then(res=>{
    res.forEach(element => {
      renderToy(element);
    });
  }

  );





  function renderToy(element){
    toysCollection.innerHTML+= `<div class="card">
    <h2>${element.id}</h2>
    <img src=${element.image} class="toy-avatar" />
    <p>${element.likes} Likes </p>
    <button class="like-btn" onclick="increaseLikes(${element.id},${element.likes})">Like <3</button>
    </div>`;
  }
});
function increaseLikes(id,likes){
  console.log(id);
  console.log(likes);


fetch(`http://localhost:3000/toys/${id.toString()}`,{
  method:'PATCH',
headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
}
 ,

 body: JSON.stringify({
  "likes": likes+1
}),

  });
}
