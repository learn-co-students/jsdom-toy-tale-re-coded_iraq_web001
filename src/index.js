let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const myform=document.querySelector('.add-toy-form');
  let inputName=document.getElementsByClassName('input-text')[0];
  let inputUrl=document.getElementsByClassName('input-text')[1];
  let submit=document.getElementsByClassName('submit')[0];
  let toyCollection= document.querySelector('#toy-collection');

function drawToyCard(property){
  toyCollection.insertAdjacentHTML('beforeend',`<div class="card">
<h2>${property.name}</h2>
<img src=${property.image} class="toy-avatar" />
<p id='likep'> ${property.likes} </p>
<button class="like-btn" >Like <3</button>
</div>`);

toyCollection.lastChild.lastChild.previousElementSibling.addEventListener('click',()=>{

let updatedLike = {
  'likes': ++property.likes

}
let configObj= {
  method : 'PATCH',
  headers:
  {
  "Content-Type": "application/json",
    Accept: "application/json"
},
  body: JSON.stringify(updatedLike)

}
fetch(`http://localhost:3000/toys/${property.id}`,configObj)
.then(res => res.json())
.then(returnedData =>{
drawToyCard(returnedData);
}).then(returnedData=>{
  window.location.reload(true);
})

})


}
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys=> {
    console.log(toys);

    for (const toy of toys){

      drawToyCard(toy);

    }
  })
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  myform.addEventListener('submit',event=>{
    event.preventDefault();
     let dataToBeSent={
      name: inputName.value,
      image: inputUrl.value
    };
    let configObj = {
      method : 'POST',
      headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
      body : JSON.stringify(dataToBeSent)
    }
    fetch('http://localhost:3000/toys',configObj)
    .then (response => response.json())
    .then (anotherToy => {
      console.log(anotherToy);

      drawToyCard(anotherToy);
    })
  });
});
