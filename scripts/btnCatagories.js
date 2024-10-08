// Fetch load and  show categories on html

//  create  loadCategories 
const loadCategories = () => {
    //    fetch the data 
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error))

};

// const cardDemo = {

//         "petId": 11,
//         "breed": "French Bulldog",
//         "category": "Dog",
//         "date_of_birth": "2023-07-20",
//         "price": 2500,
//         "image": "https://i.ibb.co.com/47Sxf3X/pet-11.jpg",
//         "gender": "Male",
//         "pet_details": "This adorable male French Bulldog, born on July 20, 2023, is known for his playful and affectionate nature. Fully vaccinated and priced at $2500, he makes a perfect companion for apartment living.",
//         "vaccinated_status": "Fully",
//         "pet_name": "Ollie"

// }


// all pets categories load function start here
const loadAllPets = () => {
    //    fetch the data 
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => displayPets(data.pets))
        .catch((error) => console.log(error))

};

//  category wise load pets fuction 

const loadCategoryPets = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error))

}

const displayPets = (pets) => {
    const petsContainer = document.getElementById("all-pets")
    // petsContainer.innerHTML = "";
    
    // if(all-pets.length ==0) {
    //     petsContainer.innerHTML = "NO content here";
    //     return;
    // }
    pets.forEach(pet => {
        console.log(pet);
        const card = document.createElement("div")
        card.classList = "card bg-base-100 border-2  border-gray-100 rounded-lg shadow";
        card.innerHTML = `
        <figure class="px-5 pt-5 h-[200px]">
         <img
         src=${pet.image}
         alt=""
        class="rounded-xl h-full w-full object-cover" />
        </figure>
        <h4 class="px-5 pt-5 font-bold text-xl">${pet.pet_name}</h4>
        <div class="px-5 pt-3 text-gray-500 text-base ">
            <p"><i class="fa-solid fa-grip-vertical mr-3"></i><span>${pet.breed}</span></p>
         <p"><i class="fa-solid fa-cake-candles mr-3 "></i><span>${pet.date_of_birth}</span></p>
         <p"><i class="fa-solid fa-mercury  mr-3"></i><span>${pet.gender}</span></p>
         <p"><i class="fa-solid fa-dollar-sign mr-3 "></i><span>${pet.price}</span></p>

        </div>
        <div class="divider px-5"></div>
        <div class=" px-3 md:px-3 lg:px-5 pb-5 gap-4 flex justify-between items-center object-cover">

            <button class=" bg-white px-4 py-2 border-2  border-gray-200 rounded-lg"><i class="fa-regular fa-thumbs-up"></i></button>    
           <button class=" px-2 lg:px-4 py-2 bg-white border-2 font-bold  border-gray-200 text-[#0E7A81] rounded-lg">Adopt</button>
           <button class=" px-2 lg:px-4 py-2 bg-white border-2 font-bold  border-gray-200 text-[#0E7A81] rounded-lg">Details</button>
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
        const buttonContainer = document.createElement("div");
       buttonContainer.innerHTML = 
       `
       <button onclick="loadCategoryPets(${item.id})" class="btn">
       ${item.category}
       </button>
       `;
        // add button to category
        categoryContainer.append(buttonContainer);

    })

}

loadCategories();
loadAllPets();