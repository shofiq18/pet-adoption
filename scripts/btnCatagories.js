// Fetch load and  show categories on html

//  create  loadCategories 
const loadCategories = () => {
    //    fetch the data 
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error))

};

// all pets categories load function start here
const loadAllPets = () => {
    //    fetch the data 
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => displayPets(data.pets))
        .catch((error) => console.log(error))

};

const displayPets = (pets) => {
    const petsContainer = document.getElementById("all-pets")
    pets.forEach(pet => {
        console.log(pet);
        const card = document.createElement("div")
        card.classList = "card bg-base-100 shadow-xl ";
        card.innerHTML = `
             <figure class="px-10 pt-10">
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
             
            `;
        petsContainer.append(card);
    })
}


// create displayCategories 
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");

    categories.forEach((item) => {
        console.log(item);
        // create a button
        const button = document.createElement("button");
        button.classList = "btn";
        button.innerText = item.category;
        // add button to category
        categoryContainer.append(button);

    })

}

loadCategories();
loadAllPets();