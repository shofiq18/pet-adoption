 if(all-pets.length == 0) {
        petsContainer.classList.remove("grid");
        petsContainer.innerHTML = 
        `
       <div class=" px-3 lg:max-w-7xl mx-auto min-h-[300px] w-3/4  flex flex-col gap-5 justify-center items-center bg-gray-100 rounded-lg">
            <img src="images/error.webp" alt="">
            <h2 class="text-center text-3xl font-bold">No Information Available</h2>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br> 
                its layout. The point of using Lorem Ipsum is that it has a.</p>
           </div>

        `;
    }else{
        petsContainer.classList.add("grid");
    }