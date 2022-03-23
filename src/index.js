let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// On the index.html page, there is a div with the id "toy-collection."
// When the page loads, make a 'GET' request to fetch all the toy objects. With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.

function getToys() {
  const toyUrl = "http://localhost:3000/toys"
  fetch(toyUrl)
  .then(resp => resp.json())
  // .then(resp => console.log("resp", resp))
  .then(resp => {
    resp.forEach(toy => {
      postForm(toy)
    })
  })
}

getToys()

// making the cards with the toy name, like button, url
function postForm(toy) {
  const toyCollection = document.getElementById("toy-collection")
      const div = document.createElement("div")
      div.classList.add("card")
      toyCollection.append(div)

      const toyName = document.createElement("h2")
      toyName.innerText = toy.name
      div.append(toyName)

      const toyImg = document.createElement("img")
      toyImg.src = toy.image
      toyImg.classList.add("toy-avatar")
      div.append(toyImg)

      const toyLikes = document.createElement("p")
      toyLikes.innerText = toy.likes
      div.append(toyLikes)

      const btn = document.createElement("button") 
      btn.classList.add("like-btn")
      btn.id = toy.id
      btn.innerText = "like"
      div.append(btn)

      btn.addEventListener("click", (increaseLikes)) // click event listener for the like button. the callback function is down below that runs this event listener. 
}
// this is the function for submitting a toy name and url. 
function submitToy() { 

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(e)
    const name = e.target[0].value
    const image = e.target[1].value

    fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    })
  })

  .then(resp => resp.json())
  .then(toy => {
    postForm(toy)

    document.querySelector(".add-toy-form").reset();
  })
})
}
submitToy()

// function that is called above for the button that increases the likes. 
function increaseLikes(e) {
  const id = e.target.id
  let likes = e.target.previousSibling.textContent
  console.log(likes)
  likes ++
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: likes
    })
  })
  .then(resp => resp.json())
  .then(toy => {
    e.target.previousSibling.textContent = toy.likes
  })
}