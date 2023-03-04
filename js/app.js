/* spinner function */
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none');
    }
}

let serial=0;

/* fetch data from api */
const loadData = dataLimit => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch(url)
        .then(res => res.json())
        .then(data => conditionData(data.data.tools, dataLimit))
    toggleSpinner(true);
}

/* // condition function for array slice  */
const conditionData = (items, dataLimit)=>{
    const seeMoreBtn = document.getElementById('btn-seeMore');

    if (dataLimit && items.length > dataLimit) {
        items = items.slice(0, 6);
        displayData(items, dataLimit)
        seeMoreBtn.classList.remove('d-none');
    } else {    
        displayData(items, dataLimit)

        seeMoreBtn.classList.add('d-none');
    }
    
}

/* // display data in ui */
const displayData = (items, dataLimit) => {
    console.log(items[3]);
    const cardContainer = document.getElementById('card-container');  
    /* condition for short by date */
    if (dataLimit === true) {
        if(serial%2 === 0){
            items.sort((a, b) => {
                return new Date(b.published_in) - new Date(a.published_in); // 
            })
        }
            else {
                items.sort((a, b) => {
                    return new Date(a.published_in) - new Date(b.published_in); 
                })
            }       
        }
        cardContainer.textContent = '';
        document.getElementById('btn-seeMore').classList.add('d-none');
    /* loop through in array of items */
    items.forEach(item => {
        const {
            image,
            features,
            name,
            published_in,
            id
        } = item;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img src="${image}" class="card-img-top image" alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
          <ol>
          <li>${features[0]? features[0] : 'oops not found data'}</li>
          <li>${features[1]? features[1] : 'oops not found data'}</li>
          <li>${features[2]? features[2] : 'oops not found data'}</li>        
          </ol>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
        <div>
        <h5 class="card-title">${name}</h5>  
        <div class="d-flex gx-5 aligns-content-center">
        <i class="mt-1 fa-regular fa-calendar"></i>
        <p class="mx-2">${published_in}</p>    
        </div>
      </div>
      <div>
      <button onclick="itemDetails('${id}')" class="border-0 bg-white" data-bs-toggle="modal" data-bs-target="#myModal">
      <i class="bg-danger-subtle text-danger rounded-circle p-2 fa-solid fa-arrow-right"></i> 
    </button>     
      </div>
      </div>
        `;
        cardContainer.appendChild(div);
    })
    toggleSpinner(false);
}


/* fetch item details on api */
const itemDetails = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayItemDetails(data.data))
}


/* display item details in ui */
const displayItemDetails = details => {
    console.log(details);
    const {
        image_link,
        input_output_examples,
        description,
        pricing,
        accuracy,
        features,
        integrations
    } = details;  
    const modalRight = document.getElementById('modal-right');
    const modalLeft = document.getElementById('modal-left');
    modalRight.textContent = '';
    modalLeft.textContent = '';
    const divRight = document.createElement('div');
    divRight.classList.add('col');
    divRight.innerHTML = `
    <div class="card p-4 bg-danger-subtle  border-0">
    <h2 class="card-title">${description}</h2>
    <div class="card-body">
    <div class="d-flex justify-content-around p-3 text-danger">
    <h5 class="p-3 m-2 bg-white rounded">
    <span>${pricing? pricing[0].price : 'Free of Cost/'}<span>
    </br>
    <span>${pricing? pricing[0].plan : 'Basic'}<span>
    </h5>
    <h5 class="p-3 m-2 bg-white rounded">
    <span>${pricing? pricing[1].price : 'Free Of Cost'}<span>
    </br>
    <span>${pricing? pricing[1].plan : '/Pro'}<span>
    </h5>
    <h5 class="p-3 m-2 bg-white rounded">
    <span>${pricing? pricing[2].price : 'Free of Cost'}<span>
    </br>
    <span>${pricing? pricing[2].plan : '/ Enterprise'}<span>
    </h5>
    </div>
        <div class="d-flex justify-content-between">
        <div class="ml-5">
        <h3>Features</h3>
        <ul>
          <li>${features[1]? features[1].feature_name : 'oops not found data'}</li>
          <li>${features[2]? features[2].feature_name : 'oops not found data'}</li>
          <li>${features[3]? features[3].feature_name : 'oops not found data'}</li>        
          </ul>
        </div>
        <div class=mr-5"">
        <h3>Integrations</h3>
        <ul>
          <li class="li-item">${(integrations == null)? 'no data found' : integrations[0]? integrations[0] : 'oops not found data'}</li>
          <li class="li-item">${(integrations == null)? 'no data found' : integrations[1]? integrations[1] : 'oops not found data'}</li>
          <li class="li-item">${(integrations == null)? 'no data found' : integrations[2]? integrations[2] : 'oops not found data'}</li>      
          </ul>
        </div>
        </div>
    </div>
    </div>    
    `;
    modalRight.appendChild(divRight);
    const divLeft = document.createElement('div');
    divLeft.classList.add('col');
    divLeft.innerHTML = `
    <div class="card p-4 h-100 border-0">
    <img src="${image_link[0]}" class="card-img-top img-fluid" alt="...">
    <div class="card-body text-center">
        <h5 class="card-title">${input_output_examples? input_output_examples[0].input : 'No! Not Yet! Take a break!!!'}</h5>
        <p class="card-text">${input_output_examples? input_output_examples[0].output.slice(0,140) : 'No! Not Yet! Take a break!!!'}</p>
    </div>
    <h4 class="bg-danger text-white rounded position-absolute top-10 end-0">${accuracy.score? accuracy.score +' '+ 'accuracy ': ''}</h4>
    </div>
    `;
    modalLeft.appendChild(divLeft);
}

/* add event listener for see more data  */
document.getElementById('btn-seeMore').addEventListener('click', function () {
    loadData();
})

/* load data for short by date */
 const loadDataShort = dataLimit => {
    serial++;
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data.tools, dataLimit))
    toggleSpinner(true);
 }

loadData(6)


