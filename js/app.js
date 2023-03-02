const loadData =()=>{
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data))
}

const displayData = items =>{
    console.log(items);
}

loadData();