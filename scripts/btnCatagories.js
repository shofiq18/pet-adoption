// Fetch load and  show categories on html

//  create  loadCategories 
const loadCategories = () => {
//    fetch the data 
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error))
  
};

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
displayCategories();