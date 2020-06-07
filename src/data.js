
       let likeBtn =document.querySelectorAll(".like-btn")
       likeBtn.forEach (item => {
        item.addEventListener("click",(event)=> {
          event.preventDefault()
          console.log("clciked");
          likesNum++;
          console.log(likesNum);
          let likesadd = {
            "likes": likesNum,
          };
          let likeConfigObj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(likesadd),
          };
          fetch(`http://localhost:3000/toys/${event.target.id}`, likeConfigObj)
            .then((res) => {
              console.log(res)
              return res.json()
            })
            .then((likeData) => {
              console.log(likeData);
            });
        });
       
      });