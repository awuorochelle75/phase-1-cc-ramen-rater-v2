// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  const detailImage = document.querySelector("#ramen-detail img");
  const detailName = document.querySelector("#ramen-detail h2");
  const detailRestaurant = document.querySelector("#ramen-detail h3");
  const detailRating = document.querySelector("#rating-display");
  const detailComment = document.querySelector("#comment-display");

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailRating.textContent = ramen.rating;
  detailComment.textContent = ramen.comment;
};



const addSubmitListener = () => {
  // Add code
  const form = document.querySelector("#new-ramen");
  form.addEventListener("submit", event => {
    event.preventDefault();
    
    const newRamen = {
      name: event.target["name"].value,
      restaurant: event.target["restaurant"].value,
      image: event.target["image"].value,
      rating: event.target["rating"].value,
      comment: event.target["comment"].value,
    };

    const img = document.createElement("img");
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener("click", () => handleClick(newRamen));
    document.getElementById("ramen-menu").appendChild(img);

   
    form.reset();
  });

}

const displayRamens = () => {


  fetch("http://localhost:3000/ramens")
  .then(res => res.json())
  .then(ramens => {
    const ramenMenu = document.getElementById("ramen-menu");
    ramenMenu.innerHTML = "";
    
    ramens.forEach(ramen => {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener("click", () => handleClick(ramen));
      ramenMenu.appendChild(img);
    });

  
    if (ramens.length > 0) handleClick(ramens[0]);
  })
  .catch(error => console.error("Error fetching ramen data:", error))
};



const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here

  displayRamens();
  addSubmitListener();
};

document.addEventListener("DOMContentLoaded", main);



// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
