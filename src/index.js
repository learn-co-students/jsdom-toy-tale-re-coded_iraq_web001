let toys;
let likesNum = 0;
let likeBtn;

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");

  toys = document.querySelector("#toy-collection");
  function getToys() {
    const toysUrl = "http://localhost:3000/toys";
    fetch(toysUrl)
      .then((res) => {
        return res.json();
      })
      .then((toysData) => {
        toysData.forEach((item) => {
          toys.insertAdjacentHTML(
            "afterbegin",
            `
      <div class="card">
      <h2>${item.name}</h2>
      <img src="${item.image}" class="toy-avatar">
      <p>${item.likes}</p>
      <button id=${item.id} class="like-btn">Like <3</button>
      </div>`
          );
        });
        const likerBtn = document.querySelectorAll(".like-btn");
        likerBtn.forEach((liker) => {
          liker.addEventListener("click", (event) => {
            event.preventDefault();
            console.log(liker.id);
            likesNum++;
            console.log(likesNum)
            let likeObj = {
              likes: likesNum,
            };
            let likeConfig = {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body:JSON.stringify({
                "likes": likesNum
              })
            };
            fetch(`http://localhost:3000/toys/${liker.id}`, likeConfig)
            .then(res => {
             return res.json()
            }).then(likerData => {
            })
          });
        });
      });
  }
  function addToys() {
    let nameInput = document.querySelector("#text-input");
    let imageInput = document.querySelector("#image-input");
    let toyObj = {
      name: nameInput.value,
      image: imageInput.value,
      likes: likesNum,
    };
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(toyObj),
    };
    const submitToy = document.querySelector(".submit");
    const submitUrl = "http://localhost:3000/toys";
    submitToy.addEventListener("click", function (event) {
      event.preventDefault();
      fetch(submitUrl, configObj)
        .then((res) => {
          return res.json();
        })
        .then((toyAdd) => {
          getToys();
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
  }
  getToys();
  addToys();
});
