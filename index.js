import * as Carousel from "./carousel.js";
// import axios from "axios"; // bc we can just write axios

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
// const API_KEY = "live_Fj3XbEHMoJNXbVmgCXSU1jLBVpsUyYssP37sNX5W5iXHR3xttQJUOsrmkW5yohoK";
// Colton
const API_KEY = "live_XNrwe2xINpyUkI0cpp6ugcj7JEc916gcAyaytZBEYMI2vZfp0YCCDahtWPnT2AJd";
// interceptor acts like a middle person in a request
axios.interceptors.request.use(config => {
    console.log(new Date());
    return config
})

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api'] = API_KEY;
/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

async function initialLoad() {
    try {
        //send request to cat api
        const res = await axios.get("/breeds");
        // const breeds = await res.json();
        const breeds = res.data;

        // PART 2
        // breedSelect.innerHTML = breeds.map(
        //     (breed) => `<option value = ${breed.id}>${breed.name}</option>`
        // )
        // for each instead of map
        breeds.forEach(breed => { const option = document.createElement("option"); option.value = breed.id; option.textContent = breed.name; breedSelect.appendChild(option); });

        //get the data from the response
        console.log(breeds);
        breedSelection(breeds[0].id)

    } catch (e) {
        console.error(e)
    }
}
initialLoad();

// this function doesn't work here but I don't know where to put it
// updateProgressBar();

// progressBar.style.width = '0%';

//   return request;
// });

// // Progress update function
// function updateProgress(progressEvent) {
//   // Log the ProgressEvent to understand its structure
//   console.log(progressEvent);

//   // Calculate the percentage of the download progress
//   const percentComplete = (progressEvent.loaded / progressEvent.total) * 100;

//   // Update the progress bar width
//   progressBar.style.width = ${percentComplete}%;
// }


// https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME
/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */
// breedSelect & appendCarousel need to be used in this section

breedSelect.addEventListener("change", breedSelection)
async function breedSelection(breedId) {
    console.log(breedId);
    try {
       
        const breedId = breedSelect.value
       
        const res = await axios.get(`/images/search`, { params: { breed_ids: breedId, limit: 10 } });
         infoDump.innerHTML = ""
         Carousel.clear();
        const imgs = res.data;
        console.log(imgs);
        // Carousel.clear();


        //         `
        // <h3>${catInfo.name}</h3>
        // `
        imgs.forEach((img) => {
            Carousel.appendCarousel(Carousel.createCarouselItem(img.url, "cat image", img.id));
        });
        const breedInfo = res.data[0]
        console.log(breedInfo)
        // display breed info -- not working 
        // const breedInfo = catImgs[0]?.breeds[0];
        if (breedInfo) {
            infoDump.innerHTML = `
          <h3>${breedInfo.name}</h3>
          <p><strong>Temperament:</strong> ${breedInfo.temperament}</p>
          <p><strong>Life Span:</strong> ${breedInfo.life_span} years</p>
          <p>${breedInfo.description}</p>
        `} else {
            infoDump.innerHTML = `<h3>No info</h3>`
        }

        Carousel.start();
    } catch (error) {
        console.error(error)
    }
}





/**
 * 3. 
Create an additional file to handle an alternative approach. || Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */


// X done

/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */

// X done



/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

// X done



/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 * 
 * const progressBar = document.getElementById("progressBar"); (line 9)
 * In CSS: 
 *  .progress-bar-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 15px;
  background-color: green;
  border-bottom: 1px solid black;
}
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

// not working yet
function updateProgressBar(progressPercentage) {
if (progressPercentage.lengthComputable) {
    const percentComplete = (progressPercentage.loaded / progressPercentage.total) * 100;
    progressBar.style.width = `${percentComplete}%`;
}
    // const progressBar = document.querySelector('.progress-bar');

    // progressBar.style.width = progressPercentage + "%";

}



/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element. ----->set the body element's cursor style to "default."
 */





/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
    // your code here
try {
    const res = await axios.post('/favourites', {
        image_id: imgId,
    })
    console.log(res.data)
} catch (error) {
    console.error(error)
}
}





// 9. Test your favourite() function by creating a getFavourites() function.
// * Use Axios to get all of your favourites from the cat API.
// * Clear the carousel and display your favourites when the button is clicked.
// * You will have to bind this event listener to getFavouritesBtn yourself.
// * Hint: you already have all of the logic built for building a carousel. If that is not in its own function, maybe it should be so that you do not have to repeat yourself in this section.








// 10. Test your site, thoroughly! Debug your code as needed.
// *What happens when you try to load the Malayan breed?
// ** If this is working, good job! If not, look for the reason why and fix it!
// * Test other breeds as well. Not every breed has the same data available, so your code should account for this.
