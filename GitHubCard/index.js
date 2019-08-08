/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

//select the cards container that will hold all the cards retrieved from github and returned by the cardCreator function
let cardsContainer = document.querySelector(".cards");

axios.get("https://api.github.com/users/TishaHolder")
    .then( response => {      

        // deal with the response data in here
        console.log(response);  

        const newGitHubRecord = cardCreator(response.data);
        cardsContainer.appendChild(newGitHubRecord);         
       
    })
    .catch( err => {
        // deal with the error in here
        console.log("Error:", err);
    })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/


/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const instructorArray = ["tetondan", "dustinmyers", "justsml", "luishrd", "bigknell"];

instructorArray.forEach ( instructor => {
  axios.get(`https://api.github.com/users/${instructor}`)
  .then( response => {

    const newGitHubRecord = cardCreator(response.data);
    cardsContainer.appendChild(newGitHubRecord);
  })
  .catch( err => {
    // deal with the error in here
    console.log("Error:", err);
})

});

/**************************STRETCH TASK***************************/
/*Instead of manually creating a list of followers, do it programmatically. Create a function that requests the 
followers data from the API after it has received your data and create a card for each of your followers. Hint: 
you can chain promises.*/

axios.get("https://api.github.com/users/TishaHolder/followers")
    .then( response => {      

        // deal with the response data in here
        console.log(response.data);  
                
        response.data.forEach( follower => {
          const newFollower = cardCreator(follower);
          cardsContainer.appendChild(newFollower);
        })
       
    })
    .catch( err => {
        // deal with the error in here
        console.log("Error:", err);
    })


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function cardCreator(userDataObject) {

  //define new elements
  const divCard = document.createElement("div");
  divCard.classList.add("card");
  
      const imageCard = document.createElement("img");
      imageCard.classList.add("card");
      imageCard.src = userDataObject.avatar_url;

      const divCardInfo = document.createElement("div");
      divCardInfo.classList.add("card-info");

          const headerH3 = document.createElement("h3");
          headerH3.classList.add("name");
          headerH3.textContent = userDataObject.name;

          const paragraphUserName = document.createElement("p");
          paragraphUserName.classList.add("username");
          paragraphUserName.textContent = userDataObject.login;

          const paragraphLocation = document.createElement("p");
          paragraphLocation.textContent = `Location: ${userDataObject.location}`;
          
          const paragraphProfile = document.createElement("p");
          paragraphProfile.textContent = "Profile: ";
              const linkProfile = document.createElement("a");
              linkProfile.setAttribute("href", userDataObject.html_url);
              linkProfile.textContent = userDataObject.html_url;

          const paragraphFollowers = document.createElement("p");
          paragraphFollowers.textContent = `Followers: ${userDataObject.followers}`;

          const paragraphFollowing = document.createElement("p");
          paragraphFollowing.textContent = `Following: ${userDataObject.following}`;

          const paragraphBio = document.createElement("p");
          paragraphBio.textContent = `Bio: ${userDataObject.bio}`;  
          
  //add elements to parent containers
  divCard.appendChild(imageCard);
  divCard.appendChild(divCardInfo);
  
      divCardInfo.appendChild(headerH3);
      divCardInfo.appendChild(paragraphUserName);
      divCardInfo.appendChild(paragraphLocation);
      divCardInfo.appendChild(paragraphProfile);
          paragraphProfile.appendChild(linkProfile);
      divCardInfo.appendChild(paragraphFollowers);
      divCardInfo.appendChild(paragraphFollowing);
      divCardInfo.appendChild(paragraphBio);

      return divCard;    
    
}//end cardCreator

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/


