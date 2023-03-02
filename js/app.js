const toggleSpinner = isLoading =>{
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }    
}


const loadData = dataLimit =>{
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools, dataLimit))
    toggleSpinner(true);
}

const displayData = (items, dataLimit) =>{    
    console.log(items);
    const cardContainer = document.getElementById('card-container');
    const seeMoreBtn = document.getElementById('btn-seeMore');

    if(dataLimit && items.length > 6){
        items = items.slice(0,6);
        seeMoreBtn.classList.remove('d-none');
    }
    else{
        seeMoreBtn.classList.add('d-none');
    }
    
    items.forEach(item => {
        const {image} = item;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
        `;
        cardContainer.appendChild(div);
    })
    toggleSpinner(false);
}

loadData(6)

document.getElementById('btn-seeMore').addEventListener('click', function(){
    loadData();
})





