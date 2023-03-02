const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none');
    }
}


const loadData = dataLimit => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data.tools, dataLimit))
    toggleSpinner(true);
}

const displayData = (items, dataLimit) => {
    // console.log(items);
    const cardContainer = document.getElementById('card-container');
    const seeMoreBtn = document.getElementById('btn-seeMore');

    if (dataLimit && items.length > 6) {
        items = items.slice(0, 6);
        seeMoreBtn.classList.remove('d-none');
    } else {
        seeMoreBtn.classList.add('d-none');
    }

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
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Features</h5>
          <ol>
          <li>${features[0]}</li>
          <li>${features[1]}</li>
          <li>${features[2]}</li>        
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

loadData(6)

const itemDetails = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayItemDetails(data.data))
}

const displayItemDetails = details => {
    const {image_link,input_output_examples,description,pricing,accuracy} = details;
    console.log(details);
    const modalRight = document.getElementById('modal-right');
    const modalLeft = document.getElementById('modal-left');
    modalRight.textContent ='';
    modalLeft.textContent ='';
    const divRight = document.createElement('div');
    divRight.classList.add('col');
    divRight.innerHTML = `
    <div class="card p-4 bg-danger-subtle">
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
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a
            natural lead-in to additional content. This content is a little bit longer.
        </p>
    </div>
    </div>    
    `;
    modalRight.appendChild(divRight);
    const divLeft = document.createElement('div');
    divLeft.classList.add('col');
    divLeft.innerHTML =`
    <div class="card p-4 h-100">
    <img src="${image_link[0]}" class="card-img-top img-fluid" alt="...">
    <div class="card-body text-center">
        <h5 class="card-title">${input_output_examples? input_output_examples[0].input : 'No! Not Yet! Take a break!!!'}</h5>
        <p class="card-text">${input_output_examples? input_output_examples[0].output.slice(0,140) : 'No! Not Yet! Take a break!!!'}</p>
    </div>
    <h4 class="bg-danger text-white rounded position-absolute p-2 top-10 end-0"> ${accuracy.score? accuracy.score +' '+ 'accuracy ': ''}</h4>
    </div>
    `;
    modalLeft.appendChild(divLeft);
}

document.getElementById('btn-seeMore').addEventListener('click', function () {
    loadData();
})