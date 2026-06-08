function createCard(text,type){

    const card = document.createElement("div");
    card.classList.add("card", type);
    card.innerHTML = text;
    
    card.style.background = "linear-gradient(to right, #0e191dff, #1272e8ff)";
    card.style.borderRadius = "10px";
    // card.style.border ="1px solid red"
    card.style.padding = "10px";
    card.style.boxShadow = "0px 0px 15px black";
    card.style.alignItems= "center";
    card.style.color="white";
    
    
    return card;
  }





function GetDetails(){


// clearing previous data
const personal_details = document.querySelector('#personal-details');
const personal_img = document.querySelector('#personal-img');

personal_details.innerHTML = "";
personal_img.innerHTML = "";


const follow_info = document.querySelector('#follow-info');
follow_info.innerHTML ="";



// getting user input
const userinput = document.querySelector('#username')
const user = userinput.value

const profile_heading = document.querySelector('#profile-heading');
profile_heading.innerText = "Profile Summary"




// if input is empty
if(user ===""){
      alert("Please enter a username");
       profile_heading.innerText = "See Github Summary By Using Username"
      return;
}



// fetching summary details

const url = fetch(`https://api.github.com/users/${user}`)

url.then((response)=>{
      return response.json();
}).then((data)=>{
  console.log(data);
  personal_details.appendChild(createCard(`Name : ${data.name}`, "name"))
  personal_details.appendChild(createCard(`username : @${data.login}`, "userid"))
  personal_details.appendChild(createCard(`Bio : ${data.bio}`, "bio"))
  personal_details.appendChild(createCard(`Followers : ${data.followers}`, "followers"))
  personal_details.appendChild(createCard(`Following : ${data.following}`, "following"))
  personal_details.appendChild(createCard(`Public Repo : ${data.public_repos}`, "repos"))
  personal_details.appendChild(createCard(`Public Gists : ${data.public_gists}`, "gists"))
  personal_details.appendChild(createCard(`Joined : ${new Date(data.created_at).toLocaleDateString()}`, "created"))
  personal_details.appendChild(createCard(`updated_at : ${new Date(data.updated_at).toLocaleDateString()}`, "updated_at"))
  personal_details.appendChild(createCard(`ID : ${data.id}`, "ID"))
  personal_details.appendChild(createCard(`E-mail : ${data.email}`, "email"))
  personal_details.appendChild(createCard(`Company : ${data.company}`, "company"))
  personal_details.appendChild(createCard(`Location : ${data.location}`, "location"))
  personal_details.appendChild(createCard(`Node_id : ${data.node_id}`, "node_id"))
  personal_img.appendChild(createCard(`<img src="${data.avatar_url}" alt="img">`, "avatar"))


}).catch((error)=>{
    alert("Something went wrong!");
});




// followers manupulation



fetch(`https://api.github.com/users/${user}/followers`)
.then((response)=>{
      return response.json();
}).then((data)=>{
  console.log(data);

  const follow_info = document.querySelector('#follow-info');

  follow_info.appendChild(createCard(`Showing Name of ${data.length} followers : `, "total_followers"));

  data.forEach(follower => {
      follow_info.appendChild(createCard(` <img src="${follower.avatar_url}" alt="img" style="width: 30px; height: 30px; border-radius: 50%;">    Name : ${follower.login} `, "follower"))
     
  })

  
  
}).catch((error)=>{
    console.log(error);
    alert("Something went wrong!");
});



  




userinput.value = "";





}