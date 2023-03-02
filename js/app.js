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
          <li>${features[0]}<li>
          <li>${features[1]}<li>
          <li>${features[2]}<li>        
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
      <button onclick="itemDetails('${id}')" class="border-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
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

const itemDetails = id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayItemDetails(data.data))
}

const displayItemDetails = details =>{
    console.log(details);
}

document.getElementById('btn-seeMore').addEventListener('click', function () {
    loadData();
})