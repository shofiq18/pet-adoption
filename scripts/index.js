
// Function to show and hide the  loading spinner inside petsContainer

const showSpinner = () => {
    const petsContainer = document.getElementById('all-pets');
    petsContainer.innerHTML = `<div class="flex justify-center items-center text-center py-5">
        <span class="loading loading-bars loading-lg"></span>
    </div>`;
};

const hideSpinner = () => {
    const petsContainer = document.getElementById('all-pets');
    petsContainer.innerHTML = '';      
};



// Function to load pets based on the category ID
const loadCategoryPets = (id) => {
    showSpinner(); 

    // Fetch data based on category ID
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setTimeout(() => { 
                hideSpinner(); 
                if (data.data && Array.isArray(data.data)) {
                    displayPets(data.data);
                } else {
                    console.error('No pets found for this category or data format is incorrect:', data);
                    const petsContainer = document.getElementById("all-pets");
                    petsContainer.innerHTML = '<p>No pets available in this category.</p>';
                }
            }, 2000);
        })
        .catch((error) => {
            hideSpinner();
            console.log('Error fetching pets:', error);
        });
};

// view more button scroll down start here

const viewMoreButton = document.getElementById("viewMoreButton");
const adoptSection = document.getElementById("adopt-section");


// Add event listener for button click
viewMoreButton.addEventListener('click', () => {
    adoptSection.scrollIntoView({
        block: 'start' 
    });
});






const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");

    categoryContainer.innerHTML = '';

    categories.forEach((item) => {
        const buttonContainer = document.createElement("div");

        buttonContainer.innerHTML = `
           <button id="category-btn-${item.category}" onclick="setActiveCategory('${item.category}')" class="category-btn bg-white border border-gray-200 px-4 text-lg font-bold lg:px-16 py-3 lg:py-5 md:flex  lg:flex justify-center items-center gap-4 rounded-lg hover:bg-[#0E7A81] transition-all">
           <img class="w-8 h-8" src="${item.category_icon}" alt="category_icon">
           ${item.category}
           </button>
       `;

        categoryContainer.append(buttonContainer);
    });
};

// Function to set active category button
const setActiveCategory = (category) => {
    
    const allButtons = document.querySelectorAll('.category-btn');
    allButtons.forEach(button => button.classList.remove('active'));
    const activeButton = document.getElementById(`category-btn-${category}`);
    activeButton.classList.add('active');
    loadCategoryPets(category);
};




const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log('Error fetching categories:', error));
};




 

// Function to display pets
let pets = []; 

const loadAllPets = () => {
    // Fetch the data
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => {
            pets = data.pets; 
            displayPets(pets);
        })
        .catch((error) => console.log(error));
};


// Function to display pets

const displayPets = (pets) => {
    hideSpinner();
    const petsContainer = document.getElementById("all-pets");

    petsContainer.innerHTML = ''; 

    if (pets.length === 0) {
        petsContainer.classList.remove('grid');
        petsContainer.innerHTML = `
            <div class="py-5 px-3 mx-auto min-h-[300px] flex flex-col gap-5 justify-center items-center bg-gray-100 rounded-lg">
                <img src="images/error.webp" alt="">
                <h2 class="text-center text-3xl font-bold">No Information Available</h2>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br> 
                its layout. The point of using Lorem Ipsum is that it has a.</p>
            </div>
        `;
        return;
    }


    petsContainer.classList.add('grid');

    pets.forEach((pet) => {
        const petName = pet.pet_name || 'Not Available';
        const petBreed = pet.breed || 'Not Available';
        const petDateOfBirth = pet.date_of_birth || 'Not Available';
        const petGender = pet.gender || 'Not Available';
        const petPrice = pet.price || 'Not Available';
       

        const card = document.createElement("div");
        card.classList = "card bg-base-100 border-2 border-gray-100 rounded-lg shadow";
        card.innerHTML = `
        <figure class="px-5 pt-5 h-[200px]">
            <img
            src="${pet.image}"
            alt=""
            class="rounded-xl h-full w-full object-cover" />
        </figure>
        <h4 class="px-5 pt-5 font-bold text-xl">${petName}</h4>
        <div class="px-5 pt-3 text-gray-500 text-base">
            <p><i class="fa-solid fa-grip-vertical mr-3"></i><span>Breed: ${petBreed}</span></p>
            <p><i class="fa-solid fa-cake-candles mr-3"></i><span>Vaccinated status: ${petDateOfBirth}</span></p>
            <p><i class="fa-solid fa-mercury mr-3"></i><span>Birth: ${petGender}</span></p>
            <p><i class="fa-solid fa-dollar-sign mr-3"></i><span>Price: ${petPrice}$</span></p>
        </div>
        <div class="divider px-5"></div>
        <div class="px-1 md:px-3 lg:px-5 pb-5 gap-1 flex justify-evenly md:justify-between lg:justify-between items-center">
            <button onclick="loadLikeData('${pet.petId}')" class="bg-white px-1 md:px-2 lg:px-4 py-2 border-2 border-gray-200 rounded-lg"><i class="fa-regular fa-thumbs-up"></i></button>
            <button onclick="adoptModal()" class="px-1 md:px-2 lg:px-4 py-2 bg-white border-2 font-bold border-gray-200 text-[#0E7A81] rounded-lg"> Adopt </button>            
            <button onclick="loadDetails(${pet.petId})" class="px-1 md:px-2 lg:px-4 py-2 bg-white border-2 font-bold border-gray-200 text-[#0E7A81] rounded-lg">Details</button>
        </div>
        `;
        petsContainer.append(card);
    });
};




// // sort by price (descending) on button click with show loading spiner 

document.getElementById('sortButton').addEventListener('click', () => {
    showSpinner();  
    setTimeout(() => {
        const sortedPets = pets.sort((a, b) => b.price - a.price);
        displayPets(sortedPets);
    }, 2000);  

});





// adopt modal function start here

function adoptModal() {
    const modal = document.getElementById('myModal');
    const countdownEl = document.getElementById('countdown');
    let count = 3;

    countdownEl.textContent = count;
    modal.showModal(); 

    const interval = setInterval(function() {
        count--;
        countdownEl.textContent = count;

        if (count === 0) {
            clearInterval(interval);
            setTimeout(function() {
                modal.close();  
            }, 1000);
        }
    }, 1000);
}


// like button function start here
const loadLikeData = async (petId) => {
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri)
    const data = await res.json()
    addLikePhoto(data.petData)
}

const addLikePhoto = (petData) => {
    console.log(petData);
    const likeContainer = document.getElementById("liked-pets");
    likeContainer.innerHTML += 
    `
        <img class="" src=${petData.image} alt="Pet photo">
    `; 
};




// pet details data load here
const loadDetails = async (petId) => {
    console.log(petId);
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri)
    const data = await res.json()
    displayDetails(data.petData)
};




// pet details display modal start here

const displayDetails = (petData) => {
    const petName = petData.pet_name || 'Not Available';
    const petBreed = petData.breed || 'Not Available';
    const petGender = petData.gender || 'Not Available';
    const vaccinatedStatus = petData.vaccinated_status || 'Not Available';
    const dateOfBirth = petData.date_of_birth || 'Not Available';
    const price = petData.price || 'Not Available';
    const petDetails = petData.pet_details || 'Details not available';
    

    const detailsContainer = document.getElementById("modalContent");
    detailsContainer.innerHTML = `
    <img class="w-[100%]" src="${pet.image}">
    <h4 class="pt-5 font-bold text-xl">${petName}</h4>
        <div class="pt-3 text-gray-500 text-sm ">
          <div class="flex gap-8">
         <div>
            <p><i class="fa-solid fa-grip-vertical mr-3"></i><span>Breed: ${petBreed}</span></p>
            <p><i class="fa-solid fa-mercury mr-3"></i><span>Gender: ${petGender}</span></p>
            <p><i class="fa-solid fa-shield-virus mr-3"></i><span>Vaccinated: ${vaccinatedStatus}</span></p>
         </div>
        <div>
            <p><i class="fa-solid fa-cake-candles mr-3 "></i><span>Birth: ${dateOfBirth}</span></p>
            <p><i class="fa-solid fa-dollar-sign mr-3 "></i><span>Price: ${price}$</span></p>
         </div>
        </div>   
         <div class="divider "></div>
         <h4 class="pb-3 font-bold text-black text-sm">Details Information</h4>
         <p>${petDetails}</p>
        </div>
    `;
    document.getElementById("showModalData").click();
};



loadCategories();
loadAllPets();

