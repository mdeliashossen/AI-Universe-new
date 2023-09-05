const fetchData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url).then(res => res.json()).then(data => {
        displayAllData((data.data.tools).slice(0 , 6))
    });
} 
fetchData();


const displayAllData = (data) => {
    const mainContainer = document.getElementById('content-container');
    mainContainer.innerHTML='';
    for (const singleData of data) {
        
        mainContainer.innerHTML += `
    <div class="card-container">
  <figure>
  <img src="${
            singleData.image ? singleData.image : ''
        }" alt="" /> 
  </figure>
  <div class="c-body">
    <h2 class="c-title">Features</h2>
    <div class = "features">
    ${
            singleData.features.map(feature => `<li>${feature}</li>`).join('')
        }
    </div>
  </div>
  <hr>
  <div class = "card-footer"> 
  <div> 
  <p>${
            singleData.name
        }</p>
  <span><i class="fa-regular fa-calendar-days"></i><span>${
            singleData.published_in
        } </span></span>
  </div>
  <div  onclick="modalBox.showModal()" class ="">
      <button onclick ="fetchModal('${singleData.id}')" class=""><i class="fa-solid fa-arrow-right"></i></button> 
      </div>
  </div>
  
</div>
    `
    }
    spinner(false);
}
// ------------------modal Part ---------------------

const fetchModal = (id) => {
    spinner(true);
    const modalUrl = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(modalUrl).then(res => res.json()).then(data => showModalData(data.data))
}

const showModalData=(modal)=>{
    console.log(modal.features);
    const modalContainer = document.getElementById('modalBox');
    modalContainer.innerHTML=`
    <form method="dialog" class="modals-box">
    <button class="modal-btn-close">✕</button>

    <div class="modal-details-container">

    <div class="description">
    <h1 class="title"> ${modal.description}</h1>
    <div class= "pricing">
    <p>${modal.pricing[0].price? modal.pricing[0].price:'Free of cost'} ${modal.pricing[0].plan? modal.pricing[0].plan:'/basic'} </p>
    <p>${modal.pricing[1].price? modal.pricing[1].price:'Free of cost'} ${modal.pricing[1].plan? modal.pricing[1].plan:'/basic'} </p>
    <p>${modal.pricing[2].price? modal.pricing[2].price:'Free of cost'} ${modal.pricing[2].plan? modal.pricing[2].plan:'/basic'} </p>
    </div>

    <div class="feature "> 
    <span>
    <p>Features</p>
    ${Object.entries(modal.features).map(feature =>`<li>${feature[1].feature_name}</li>`).join(' ')}
   </span>

   <span>
   <p>Integrations</p>
   ${modal.integrations.map(integration=>`<li>${integration}</li>`).join('')}
  </span>

    </div>

    </div>
    

    <div class="image-section">
    <div>
    <img src="${modal.image_link[0]}" />
    <div/>
    <div>
    <h1>${modal.input_output_examples[0].input? modal.input_output_examples[0].input : 'No Data'}</h1>
    <p>
    ${modal.input_output_examples[0].output? modal.input_output_examples[0].output : 'No Data'}
    </p>
    </div>
    </div>


    </div>
  </form>
    `
    spinner(false);
}

// ------------show all data ------------
const showAllCard=()=>{
    spinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url).then(res => res.json()).then(data => displayAllData(data.data.tools));
    document.getElementById('show-more').classList.add('invisible');

    document.getElementById('shortDate').addEventListener('click', function(){
        spinner(true);
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        fetch(url)
        .then(res => res.json())
        .then(data=>displayAllData((data.data.tools).sort(sortDate)))
        document.getElementById('show-more').classList.add('invisible');
    })
}





document.getElementById('shortDate').addEventListener('click', function(){
    spinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data=>displayAllData((data.data.tools).slice(0,6).sort(sortDate)))
})
// short by date ----------------------

const sortDate = (a, b) => {
    console.log(a, b);
    const date1 = new Date(a.published_in);
    const date2 = new Date(b.published_in);
    if (date1 < date2) return 1;
    else if (date1 > date2) return -1;
    return 0;
}

//loading spinner
const spinner = (isloading) => {
    const loadingBtn = document.getElementById('loader');
    if (isloading) {
        loadingBtn.classList.remove('invisible');
    }
    else {
        loadingBtn.classList.add('invisible');
    }
}