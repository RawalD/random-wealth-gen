const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');

//array of objects, first , last names and money
let data = [];

//fetch random user and add money

async function getRandomUser(){
    const res = await fetch(`https://randomuser.me/api`)
    const data = await res.json();

    //console.log(data);

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    //console.log(newUser);

    addData(newUser)
}

//update data array
function addData(obj){
    data.push(obj);

    updateDOM();
}

//updateDOM
function updateDOM(providedData = data){
    // clear the main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    
    //forEach method
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> R ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

//format money
function formatMoney(number){
   return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//double money
function doubleWealth(){
    data = data.map(user => {
        //spread opp, money object 
        return { ...user, money: user.money * 2};
    });

    updateDOM();
}

//sort wealth
function sortWealth(){
    data.sort((a,b) => b.money - a.money);

    updateDOM();
};

//show only millionaires
function showMillionairesOnly(){
    data = data.filter(user => user.money >= 1000000);
    //console.log(data);
    updateDOM();
}

//total wealth calc
function calculateTotalWealth(){
    const wealth = data.reduce((acc,user) => (acc += user.money), 0);
    //updateDOM();
    //console.log(formatMoney(wealth));

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>R ${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}

// event listeners
addUser.addEventListener('click', getRandomUser);
double.addEventListener('click', doubleWealth);
sort.addEventListener('click', sortWealth);
showMillionaires.addEventListener('click', showMillionairesOnly);
calculateWealth.addEventListener('click', calculateTotalWealth)

getRandomUser();
