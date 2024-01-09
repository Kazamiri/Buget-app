import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js" //Funcția initializeApp este utilizată pentru a inițializa aplicația Firebase
import {getDatabase, ref, push, onValue, remove, update} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js" //Funcția getDatabase este utilizată pentru a obține o referință la instanța bazei de date. getDatabase, ref, push, și onValue din "firebase-database.js": Aceste funcții sunt utilizate pentru a interacționa cu baza de date în timp real Firebase.


const appSettings = {
  databaseURL: "https://buget-fb242-default-rtdb.europe-west1.firebasedatabase.app/"
} //appSettings este un obiect care conține configurația pentru inițializarea aplicației Firebase. Acesta specifică databaseURL, care este URL-ul bazei de date în timp real Firebase la care doriți să vă conectați.

const app = initializeApp(appSettings) //app este o variabilă care conține aplicația Firebase inițializată. Funcția initializeApp este apelată cu appSettings ca argument pentru a crea și inițializa aplicația.

const database = getDatabase(app) //database este o variabilă care conține o referință la instanța Firebase Realtime Database. Funcția getDatabase este apelată cu app ca argument pentru a prelua instanța bazei de date asociată cu aplicația inițializată...


const navButtonMonthLeft = document.getElementById('js-nav-left')
const navButtonMonthRight = document.getElementById('js-nav-right')
const navMonthTitle = document.getElementById('js-nav-month') // Acesta este componentul de navigare printre paginii. 

const allDateInDB = ref(database, `allMonths`) 
const allMonthsInDB = ref(database, `allMonthsSecond`) 


//const incomeInDB = ref(database, `allMonths/income`) 
//const expensesInDB = ref(database, "allMonths/expenses") 
const groupsInDB = ref(database, "allMonths/groups") 
const typesOfGroupsInDB = ref(database, "allTypesOfGroups") 

//const allMonthsSecond = ref(database, "allMonthsSecond")


const inputAddMonth = document.getElementById('js-add-month-value') 
const inputAddYear = document.getElementById('js-add-year-value') 
const addButtonMonth = document.getElementById('js-add-month-button') 


const inputIncomeTitle = document.getElementById('js-venit-titlu')
const inputIncomeSuma = document.getElementById('js-venit-suma')
const inputIncomeDate = document.getElementById('js-venit-data')
const inputIncomeState = document.getElementById('js-venit-state')
const inputIncomeUser = document.getElementById('js-venit-user')
const addButtonIncome = document.getElementById("add-venit")  // Sunt cimpurile dim forma destinate pentru adaugarea veniturilor

const incomesList = document.getElementById('js-income-list') // Adaugarea listei de cheltuieli pe pagina HTML


const inputGrupa = document.getElementById('js-grupe')
const inputTitlu = document.getElementById('js-titlu')
const inputSuma = document.getElementById('js-suma')
const inputDate = document.getElementById('js-data')
const inputState = document.getElementById('js-state')
const inputUser = document.getElementById('js-user')
const inputLevel = document.getElementById('js-level')
const addButtonExpenses = document.getElementById("add-cheltuieli") // Sunt cimpurile dim forma destinate pentru adaugarea cheltuielilor

const expensesList = document.getElementById('js-lista') // Adaugarea listei de cheltuieli pe pagina HTML


const inputGrupaTitlu = document.getElementById('js-grupe-titlu')
const inputSumaGrupa = document.getElementById('js-suma-grupa')
const inputDateStartGroup = document.getElementById('js-start-luna')
const addButtonGroup = document.getElementById("add-group") // Sunt cimpurile dim forma destinate pentru adaugarea cheltuielilor

const groupsList = document.getElementById('js-group-list') // Adaugarea listei de grupe pe pagina HTML



let inconHTMLValue = document.getElementById('js-arat-venituri')// Adaugarea suma veniturilor pe pagina HTML
let expenHtmlValue = document.getElementById('js-arat-cheltuieli')// Adaugarea suma cheltuielilor  pe pagina HTML js-allocated-money js-money-available
let allocatedMoneyHtmlValue = document.getElementById('js-allocated-money')
let availableIncomesHtmlValue = document.getElementById('js-available-incomes')

let incurredExpensesHtmlValue = document.getElementById('js-incurred-expenses')

let moneyAvailableHtmlValue = document.getElementById('js-money-available')

const openModulAddMonth = document.getElementById('js-open-month-modal')
const modulAddMonth = document.getElementById('js-month-modal')
const closeModulAddMonth = document.getElementById('js-close-month-modul')

const inputTitleTypesGroup = document.getElementById('js-new-title-types-group')
const addButtonTitleTypesGroup = document.getElementById('js-add-new-title-types-group')

// De aici se incepe --------------------------------------------------
// Navigarea prin aplicatie noua
let clicks = 0;
readingNewMonths (navigateByMonth (clicks))
changeTitleMonth (convertMonthsString (navigateByMonth (clicks)), drawYear (navigateByMonth (clicks)))

navButtonMonthLeft.addEventListener("click", function add () {
  clicks ++;
  readingNewMonths (navigateByMonth (clicks))
  changeTitleMonth (convertMonthsString (navigateByMonth (clicks)), drawYear (navigateByMonth (clicks)))
})

navButtonMonthRight.addEventListener("click", function del () {
  clicks --;
  readingNewMonths (navigateByMonth (clicks))
  changeTitleMonth (convertMonthsString (navigateByMonth (clicks)), drawYear (navigateByMonth (clicks)))
})

// Adaugarea mecanismului de filtrare a cheltuielilor----------------------------

const listOfFilterGroups = document.getElementById('js-list-of-filter')

onValue(typesOfGroupsInDB, function(snapshot) {

  let monthsDateSec = Object.values(snapshot.val())
  const listGroup = monthsDateSec.map(item => item.titlu);
  let optionsHTML = "";

  for (let i = 0; i < listGroup.length; i++) {

    let optionHTML = `<option value="${listGroup[i]}">${listGroup[i]}</option>`
    optionsHTML += optionHTML
  }

  listOfFilterGroups.innerHTML += `
    ${optionsHTML}
  `
  listOfFilterGroupsChart.innerHTML += `
  ${optionsHTML}`
})


// Adaugare a itemilor -----------------------------------

// Adaugarea veniturilor in lista -------------------------------------

addButtonIncome.addEventListener("click", function () {

  const allMonthsInDBIncomes = ref(database, `allMonthsSecond/${navigateByMonth (clicks)}/incomes`)

  let addIncomeValue = {
    titlu: `${inputIncomeTitle.value}`,
    suma: `${inputIncomeSuma.value}`,
    data: `${inputIncomeDate.value}`,
    state: `${inputIncomeState.value}`,
    user: `${inputIncomeUser.value}`
  } 
  push(allMonthsInDBIncomes, addIncomeValue)
})


//Reinoieste un venit din lista --------------------------------

window.addEventListener('click', function(event) {

  if (event.target.dataset.type === 'updatinco') {
    const inputTitleItems = document.querySelector(`#js-venit-titlu-${event.target.dataset.id}`)
    const inputSumaItems = document.querySelector(`#js-venit-suma-${event.target.dataset.id}`)
    const inputDataItems = document.querySelector(`#js-venit-data-${event.target.dataset.id}`)
    const inputStateItems = document.querySelector(`#js-venit-state-${event.target.dataset.id}`)
    const inputUserItems = document.querySelector(`#js-venit-user-${event.target.dataset.id}`)

    let itemOneLineSelect = document.querySelector(`#js-button-update-income[data-id="${event.target.dataset.id}"]`)
    itemOneLineSelect.style.color = 'var(--color-functional-green-quarternary)'

    event.stopPropagation()

    let exactLocationOfItemInDB = ref(database, `allMonthsSecond/${navigateByMonth (clicks)}/incomes/${event.target.dataset.id}`)

    update(exactLocationOfItemInDB, {titlu:`${inputTitleItems.value}`})
    update(exactLocationOfItemInDB, {suma:inputSumaItems.value})
    update(exactLocationOfItemInDB, {data:inputDataItems.value})
    update(exactLocationOfItemInDB, {state:`${inputStateItems.value}`})
    update(exactLocationOfItemInDB, {user:`${inputUserItems.value}`})
    
  }

})

// Stergerea unui venit din lista --------------------------------

window.addEventListener('click', function(event) {

  if (event.target.dataset.type === 'delete_inco') {

    let exactLocationOfItemInDB = ref(database, `allMonthsSecond/${navigateByMonth (clicks)}/incomes/${event.target.dataset.id}`)
    remove(exactLocationOfItemInDB)

  }

})

// Adaugare unei cheltuieli ------------------------

addButtonExpenses.addEventListener("click", function () {
  const allMonthsInDBExpenses = ref(database, `allMonthsSecond/${navigateByMonth (clicks)}/expenses`)

  let addExpensesValue = {
    grupa: `${inputGrupa.value}`,
    titlu: `${inputTitlu.value}`,
    suma: `${inputSuma.value}`,
    data: `${inputDate.value}`,
    state: `${inputState.value}`,
    level: `${inputLevel.value}`,
    user: `${inputUser.value}`
  } 
  push(allMonthsInDBExpenses, addExpensesValue) 
})

//Reinoieste o cheltuiala din lista --------------------------------

window.addEventListener('click', function(event) {

  if (event.target.dataset.type === 'updatexp') {

    const inputGroupsItems = document.querySelector(`#js-grupe-${event.target.dataset.id}`)
    const inputTitleItems = document.querySelector(`#js-titlu-${event.target.dataset.id}`)
    const inputSumaItems = document.querySelector(`#js-suma-${event.target.dataset.id}`)
    const inputDataItems = document.querySelector(`#js-data-${event.target.dataset.id}`)
    const inputStateItems = document.querySelector(`#js-state-${event.target.dataset.id}`)
    const inputLevelItems = document.querySelector(`#js-level-${event.target.dataset.id}`)
    const inputUserItems = document.querySelector(`#js-user-${event.target.dataset.id}`)

    let itemOneLineSelect = document.querySelector(`#js-button-updata-expenses[data-id="${event.target.dataset.id}"]`)
    itemOneLineSelect.style.color = 'var(--color-functional-green-quarternary)'

    event.stopPropagation()

    let exactLocationOfItemInDB = ref(database, `allMonthsSecond/${navigateByMonth (clicks)}/expenses/${event.target.dataset.id}`)

    update(exactLocationOfItemInDB, {grupa:`${inputGroupsItems.value}`})
    update(exactLocationOfItemInDB, {titlu:`${inputTitleItems.value}`})
    update(exactLocationOfItemInDB, {suma:inputSumaItems.value})
    update(exactLocationOfItemInDB, {data:inputDataItems.value})
    update(exactLocationOfItemInDB, {state:`${inputStateItems.value}`})
    update(exactLocationOfItemInDB, {level:`${inputLevelItems.value}`})
    update(exactLocationOfItemInDB, {user:`${inputUserItems.value}`})

  }

})

window.addEventListener('click', function(event) {

  if (event.target.dataset.type === 'delete_exp') {

    let exactLocationOfItemInDB = ref(database, `allMonthsSecond/${navigateByMonth (clicks)}/expenses/${event.target.dataset.id}`)
    remove(exactLocationOfItemInDB)

  }

})

//Adaugarea unei grupe ---------------------------------------

addButtonGroup.addEventListener("click", function () {
  const allMonthsInDBGroups = ref(database, `allMonthsSecond/${navigateByMonth (clicks)}/groups`)

  let addGroupsValue = {
    titlu: `${inputGrupaTitlu.value}`,
    suma: `${inputSumaGrupa.value}`,
  } 
  push(allMonthsInDBGroups, addGroupsValue)
})

//Reinoieste o grupa ----------------------------------------

window.addEventListener('click', function(event) {

  if (event.target.dataset.type === 'updategroup') {

    const inputTitleItems = document.querySelector(`#js-grupe-titlu-${event.target.dataset.id}`)

    const inputSumaItems = document.querySelector(`#js-grupe-suma-${event.target.dataset.id}`)

    let itemOneLineSelect = document.querySelector(`#js-button-update-group[data-id="${event.target.dataset.id}"]`)
    itemOneLineSelect.style.color = 'var(--color-functional-green-quarternary)'

    event.stopPropagation()

    let exactLocationOfItemInDB = ref(database, `allMonthsSecond/${navigateByMonth (clicks)}/groups/${event.target.dataset.id}`)

    update(exactLocationOfItemInDB, {titlu:`${inputTitleItems.value}`})
    update(exactLocationOfItemInDB, {suma:inputSumaItems.value})

    
  }

})

//Stergerea unei grupe

window.addEventListener('click', function(event) {

  if (event.target.dataset.type === 'delete_group') {
    let exactLocationOfItemInDB = ref(database, `allMonthsSecond/${navigateByMonth (clicks)}/groups/${event.target.dataset.id}`)
    remove(exactLocationOfItemInDB)
  }

})


// Genereaza luna in dependenta de numarul de clicuri
function navigateByMonth (clicks) {
  const date = new Date();
  date.setDate(1);
  date.setHours(12);
  date.setMonth(date.getMonth() + clicks)
  const isoString = date.toISOString();
  const formattedDate = isoString.split('T')[0]; // Extracts YYYY-MM-DD
  return formattedDate
}

// Genereaza luna in dependenta de numarul de clicuri cu adaugarea corectiei
function navigateByMonthExtract (inputNewMonth, monthsAgo) {
  const date = new Date(inputNewMonth);
  date.setDate(1);
  date.setHours(12);
  date.setMonth(date.getMonth() - monthsAgo)
  const isoString = date.toISOString();
  const formattedDate = isoString.split('T')[0]; // Extracts YYYY-MM-DD
  return formattedDate
}

//Genereaza titlu Html a lunii selectate
function convertMonthsString (curentSelectMonth) {
  let months = parseInt(curentSelectMonth.slice(5, 7))
  let year = parseInt(curentSelectMonth.slice(0, 4))
  const titleMonths = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie']
  const curentTitleMonth = titleMonths[months - 1]
  return curentTitleMonth
}

//Genereaza titlu Html a anului selectat
function drawYear (curentSelectMonth) {
  let year = parseInt(curentSelectMonth.slice(0, 4))
  return year
}

//Adauga in Html denumirea luni si a anului
function changeTitleMonth (curentTitleMonth, curentSelectYear) {
  navMonthTitle.innerHTML =`${curentTitleMonth} ${curentSelectYear}` // I se atribuie denumirea lunii si anul lunii selectate.
}

//Citirea din informatiei din luna selectat
function readingNewMonths(curentSelectMonth) {

  const currentMonthsInDB = ref(database, `allMonthsSecond/${curentSelectMonth}`);

  onValue(currentMonthsInDB, function (snapshot) {
    
    const data = snapshot.val();
    
    if (data !== null && typeof data === 'object') {
      
      let itemsArray = Object.entries(data);

      if (itemsArray.length >= 3) {
        let monthsIncomes = Object.entries(itemsArray[2][1]);
        let monthsExpenses = Object.entries(itemsArray[0][1]);
        let monthsGroups = Object.entries(itemsArray[1][1]);

        monthsIncomes.sort((a, b) => {
          const dateA = new Date(a[1].data);
          const dateB = new Date(b[1].data);
          return dateA - dateB;
        });

        monthsExpenses.sort((a, b) => {
          const dateA = new Date(a[1].data);
          const dateB = new Date(b[1].data);
          return dateA - dateB;
        });

        monthsGroups.sort((a, b) => {
          const dateA = new Date(a[1].data);
          const dateB = new Date(b[1].data);
          return dateA - dateB;
        });

        changeMonth (monthsIncomes, monthsExpenses, monthsGroups,`allMonthsSecond/${curentSelectMonth}`)

      } else {
        console.error("Not enough items in 'itemsArray'");
      }
    } else {
      console.error("Invalid data received from the database");
      alert(`Luna ${curentSelectMonth} lipsește, adăugați-o!`);
    }
  });
}

// Aici sunt conectate toate functiile care au nevoie sa primeasc info despre luna selectata
function changeMonth (monthsIncomes, monthsExpenses, monthsGroups, curentSelectMonth) {

  let availableIncomes = fiterItem (monthsIncomes, "state", "Venit")
  let pendingExpenses = fiterItem (monthsExpenses, "state", "Cheltuit")
  let moneyAvailable = (calculateSum(availableIncomes)) - (calculateSum(pendingExpenses))
  
  readIncomes(monthsIncomes, curentSelectMonth) // Vizualizeaza datele pe pagina HTML
  incomesHtmlDate(calculateSum(monthsIncomes))
  availableIncomesHtmlDate (calculateSum(availableIncomes))

  newDateOneArc ('c0', calculateSum(monthsIncomes), calculateSum(availableIncomes), 'rgba(14, 173, 105, 1)')

  // Mecanismul de filtrare -----------------------------

  if(listOfFilterGroups.value === `💎 Toate`){
    readExpenses(monthsExpenses, curentSelectMonth)
  } else {
    readExpenses(fiterItem (monthsExpenses, "grupa", listOfFilterGroups.value), curentSelectMonth)
  }

  function allExpensesFilter () {
    let filterValue = listOfFilterGroups.value
    let filteredItems = fiterItem (monthsExpenses, "grupa", filterValue)
    if(filterValue === `💎 Toate`){
      readExpenses(monthsExpenses, curentSelectMonth)
    } else {
      readExpenses(filteredItems, curentSelectMonth)
    }
  }

  listOfFilterGroups.addEventListener('input', allExpensesFilter)

  //------------------------------------------------------------

  //readExpenses(monthsExpenses, curentSelectMonth) // Vizualizeaza datele pe pagina HTML
  expensesHtmlDate (calculateSum(monthsExpenses))
  incurredExpensesHtmlDate (calculateSum(pendingExpenses))

  groupVisuallisation (monthsExpenses)
  newDateArc ('c1', calculateSum(monthsIncomes), calculateSum(monthsExpenses), 'rgba(254, 152, 112, 1)', calculateSum(monthsIncomes), calculateSum(pendingExpenses), 'rgba(250, 65, 105, 1)' )


  //Groups -----------------------------------------------------
  
  readGroups(monthsExpenses, monthsGroups, calculateSum(monthsIncomes),curentSelectMonth)
  allocatedMoneyHtmlDate (calculateSum(monthsGroups))
  moneyAvailableHtmlDate (moneyAvailable)

  newDateArc ('c2', calculateSum(monthsIncomes), calculateSum(monthsGroups), 'rgba(37, 116, 255, 1)', calculateSum(availableIncomes), moneyAvailable, 'rgba(235, 235, 245, 0.60)' )

  levelExpensese(monthsIncomes, monthsExpenses, curentSelectMonth)

}


//Filtreaza elementele din matrice care au titlul indicat
function fiterGroup (dataMonth, titleGroup) {
  let filteredObjects = dataMonth.filter(entry => entry[1].grupa === `${titleGroup}`);
  return filteredObjects
}

//Filtreaza elementele din matrice care au titlul indicat și valoarea indicată
function fiterItem (dataMonth, titleItem, valueItem) {
  const filteredData = dataMonth.filter(item => item[1][titleItem] === valueItem);
  return filteredData
}


// Noul algoritm de adaugare a luni -------------------------------------

// Incarcarea listei tipurilor de grupe
const allGroupType = [];

const monthInDBTypeGroups = ref(database, `allTypesOfGroups`);
onValue(monthInDBTypeGroups, function(snapshot) {
  const itemsArray = Object.values(snapshot.val())
  itemsArray.forEach((item) => {
    allGroupType.push(item)
  }) 
})

// Incarcarea ultimilor trei luni pentru calcularea mediei

function itemExtraction (inputNewMonth, monthsAgo, typeItems, pushHere) {
  const firstformattedDate = navigateByMonthExtract (inputNewMonth, monthsAgo)
  const firstmonthInDBIncomes = ref(database, `allMonthsSecond/${firstformattedDate}/${typeItems}`)

    onValue(firstmonthInDBIncomes, function(snapshot) {
      const itemsArray = Object.entries(snapshot.val())
      itemsArray.forEach((item) => {
        pushHere.push(item)
      }) 
    })
}

/*const firstThreeIncomes = [];
const secondThreeIncomes = [];
const firstThreeExpenses = [];
const secondThreeExpenses = [];
const allthreeGroup = [];


inputAddMonth.addEventListener('input', function () {
  // Extragem informatia despre luna si anul selectat
  let addYear = inputAddYear.value
  let addMonth = inputAddMonth.value
  let addYearMonth = `${addYear}-${addMonth}-01`
  
  const months = 3 + 1;

    itemExtraction (addYearMonth, 1, `incomes`, firstThreeIncomes)
    itemExtraction (addYearMonth, 2, `incomes`, secondThreeIncomes)
    itemExtraction (addYearMonth, 1, `expenses`, firstThreeExpenses)
    itemExtraction (addYearMonth, 2, `expenses`, secondThreeExpenses)


  for (let i = 1; i < months; i++) {

    const formattedDateD = navigateByMonthExtract (addYearMonth, i)
    const monthInDBGroups = ref(database, `allMonthsSecond/${formattedDateD}/groups`)

    onValue(monthInDBGroups, function(snapshot) {
      const itemsArray = Object.entries(snapshot.val())
      itemsArray.forEach((item) => {
        allthreeGroup.push(item)
      }) 
    })
  } 

})*/

// Efectueaza crearea lunii
addButtonMonth.addEventListener("click", function () {

  // ----------------- Extragem informatia despre luna si anul selectat -----------------

  let addYear = inputAddYear.value
  let addMonth = inputAddMonth.value
  let addYearMonth = `${addYear}-${addMonth}-01`

  // ================ Extragem veniturile ce se repeta in luna creata cu media din ultimile trei ================

  const firstThreeIncomes = []
  const secondThreeIncomes = []

  function extractNecessaryIncomes() {
    return new Promise((resolve, reject) => {
      try {
        let firstThree = itemExtraction (addYearMonth, 1, `incomes`, firstThreeIncomes)
        let secondThree = itemExtraction (addYearMonth, 2, `incomes`, secondThreeIncomes)
        resolve({firstThree, secondThree })
      } catch (error) {
        reject(error) 
      }

    })
  }

  // ================ Extragem cheltuielile create in ultimile trei luni ================

  const firstThreeExpenses = []
  const secondThreeExpenses = []

  function extractNecessaryExpenses() {
    return new Promise((resolve, reject) => {
      try {
        let firstThree = itemExtraction (addYearMonth, 1, `expenses`, firstThreeExpenses)
        let secondThree = itemExtraction (addYearMonth, 2, `expenses`, secondThreeExpenses)
        resolve({firstThree, secondThree })
      } catch (error) {
        reject(error) 
      }

    })
  }

  // ================ Extragem grupele create in ultimile trei luni ================

  const months = 3 + 1 // Numarul de luni in urma
  const allthreeGroup = [] // Le depozitam in acest array


  function extractNecessaryGroup() {
    return new Promise((resolve, reject) => {
      for (let i = 1; i < months; i++) {
        try {
          const formattedDateD = navigateByMonthExtract(addYearMonth, i)
          const monthInDBGroups = ref(database, `allMonthsSecond/${formattedDateD}/groups`)
  
          onValue(monthInDBGroups, function(snapshot) {
            const itemsArray = Object.entries(snapshot.val())
            itemsArray.forEach((item) => {
              allthreeGroup.push(item)
            })
            resolve() // Resolve after processing all items in the loop
          })
        } catch (error) {
          reject(error) // Reject if an error occurs
        }
      }
    })
  }

  // ---------------- Adauga veniturile ce se repeta in luna creata cu media din ultimile trei ----------------

  extractNecessaryIncomes()
  .then(extractNecessaryExpenses)
  .then(extractNecessaryGroup)
  .then(() => {
    for (let i = 0; i < firstThreeIncomes.length; i++) {
      const firstObject = firstThreeIncomes[i][1].titlu
      const filteredData = secondThreeIncomes.filter((item) => item[1].titlu === firstObject);
  
      const allMonthsInDBIncomes = ref(database, `allMonthsSecond/${addYearMonth}/incomes`)
  
      if (filteredData.length > 0) {
  
        let sumaDecimal = calculateSum(filteredData)/filteredData.length
        let roundedNum = Math.round(sumaDecimal);
  
        let addIncomeValue = {
          titlu: `${firstObject}`,
          suma: `${roundedNum}`,
          data: `${addYearMonth}`,
          state: "În așteptare",
          user: "Toti"
        } 
        console.log(addIncomeValue)
        push(allMonthsInDBIncomes, addIncomeValue)
      }
  
    }

  })
  .catch((error) => {
    console.error('Promise rejected:', error);
  })
  .then(() => {
    for (let i = 0; i < firstThreeExpenses.length; i++) {

      const firstObject = firstThreeExpenses[i][1].titlu
      const filteredData = secondThreeExpenses.filter((item) => item[1].titlu === firstObject);

      const allMonthsInDBExpenses = ref(database, `allMonthsSecond/${addYearMonth}/expenses`)

      if (filteredData.length > 0) {

        let sumaDecimal = calculateSum(filteredData)/filteredData.length
        let roundedNum = Math.round(sumaDecimal);

        let addExpensesValue = {
          grupa: `${filteredData[0][1].grupa}`,
          titlu: `${firstObject}`,
          suma: `${roundedNum}`,
          data: `${addYearMonth}`,
          state: "În așteptare",
          level: "Low",
          user: "Toti"
        } 
        console.log(addExpensesValue)
        push(allMonthsInDBExpenses, addExpensesValue) 
      }

    }

  })
  .catch((error) => {
    console.error('Promise rejected:', error);
  })
  .then(() => {
    for (let i = 0; i < allGroupType.length; i++) {
  
      const filteredData = allthreeGroup.filter((item) => {
        return item[1].titlu === `${allGroupType[i].titlu}`;
      });
      
      let sumItemTitle = (calculateSum(filteredData)/3).toFixed(0);
      const allMonthsInDBGroups = ref(database, `allMonthsSecond/${addYearMonth}/groups`)

      let addGroupsValue = {
        titlu: `${allGroupType[i].titlu}`,
        suma: `${sumItemTitle}`,
      } 
      console.log(addGroupsValue)
      push(allMonthsInDBGroups, addGroupsValue)
    }
  })
  .catch((error) => {
    console.error('Promise rejected:', error);
  })

  modulAddMonth.close()

  location.reload()

})

  let addGroupsValue = {
    titlu: `test`,
    suma: `456`,
  } 

  push(ref(database, `allMonthsSecond/2024-02-01/groups`), addGroupsValue)

// Acest code deschide modalul pentru adaugarea lunii -------------------------------

openModulAddMonth.addEventListener("click", function () {
  modulAddMonth.show()
})

closeModulAddMonth.addEventListener("click", function () {
  modulAddMonth.close()
})

// Acest code deschide modalul pentru vizualizarea graifcului pe perioada -------------------------------

const openCloseModulCharts = document.getElementById('js-open-modal_chart')
const modulCharts = document.getElementById('js-all_chart')

let checkOpening = false

openCloseModulCharts.addEventListener("click", function () {
  if(checkOpening === false) {
    modulCharts.show()
    openCloseModulCharts.innerHTML = 'Mai puține'
    checkOpening = true
  } else if (checkOpening === true) {
    modulCharts.close()
    openCloseModulCharts.innerHTML = 'Mai multe'
    checkOpening = false
  } 

})



// Acest code adauga un tip de grupă nou în baza de date
addButtonTitleTypesGroup.addEventListener("click", function () {
  const typesOfGroupsInDB = ref(database, `allTypesOfGroups`)
  let addTypesOfGroups = {
    titlu: `${inputTitleTypesGroup.value}`
  }
  push(typesOfGroupsInDB, addTypesOfGroups)
  
})


// Functia data citeste masivul si il vizualizeaza lista de venituri pe pagina de baza
function readIncomes(monthsIncomes, curentSelectMonth) {

  cleanLists(incomesList)

  function colorState(levelItem){
    let colorText
    if (levelItem === "Venit") {
      colorText = 'var(--color-functional-green-primary)'
    } else if (levelItem === "În așteptare"){
      colorText = 'var(--color-labels-secondary)'
    }
    return colorText
  }

  for (let i = 0; i < monthsIncomes.length; i++) {
    let percentOfTotal = diference(calculateSum(monthsIncomes), monthsIncomes[i][1].suma).toFixed(0);

    incomesList.innerHTML += `
    <div class="linie-tabel" id="js-item-line-one-income" data-id="${monthsIncomes[i][0]}" data-type="infolineinco">

      <div class="linie-tabel-chield-incomes-0">
        <div class="incomes_list_group">
          <p class="num_style">${i + 1}</p>
          <input class="incomes_list_title" type="text" id="js-venit-titlu-${monthsIncomes[i][0]}" value="${monthsIncomes[i][1].titlu}">
        </div>
        <div class="linie-tabel-lei-add">
          <input class="expenses_list_suma" type="number" id="js-venit-suma-${monthsIncomes[i][0]}" value="${monthsIncomes[i][1].suma}">
          <p class="lei_style">lei</p>
        </div>
      </div>

      <div class="linie-tabel-chield-incomes-1">
        <p class="percent_all_group">${percentOfTotal}%</p>
        <input class="incomes_list_data" type="date" id="js-venit-data-${monthsIncomes[i][0]}" value="${monthsIncomes[i][1].data}">
      </div>

      <div class="linie-tabel-chield-incomes-2">
        <select class="incomes_list_state" style="color: ${colorState(monthsIncomes[i][1].state)};" name="income-state" id="js-venit-state-${monthsIncomes[i][0]}">
          <option value="${monthsIncomes[i][1].state}" selected disabled hidden>${monthsIncomes[i][1].state}</option>
          <option value="În așteptare">În așteptare</option>
          <option value="Venit">Venit</option>
        </select>

        <select class="incomes_list_user" name="grupe-utilizatori" id="js-venit-user-${monthsIncomes[i][0]}">
          <option value="${monthsIncomes[i][1].user}" selected disabled hidden>${monthsIncomes[i][1].user}</option>
          <option value="Toti">Toti</option>
          <option value="Eugen">Eugen</option>
          <option value="Cris">Cris</option>
          <option value="Fetele">Fetele</option>
          <option value="Amelia">Amelia</option>
          <option value="Bianca">Bianca</option>
          <option value="Evelina">Evelina</option>
          <option value="Simona">Simona</option>
        </select>

      </div>

      <div class="linie-tabel-chield-incomes-3">
        <div class="expenses_list_both-buttons" >
          <button class="expenses_list_button expenses_list_button_refresh" id="js-button-update-income" data-id="${monthsIncomes[i][0]}"  data-type="updatinco">
          <span class="material-symbols-outlined" data-id="${monthsIncomes[i][0]}" data-type="updatinco">autorenew</span></button>
          <button class="expenses_list_button expenses_list_button_delete" id="js-button-delet-income" data-id="${monthsIncomes[i][0]}" data-type="delete_inco">
          <span class="material-symbols-outlined" data-id="${monthsIncomes[i][0]}" data-type="delete_inco">delete_forever</span>
          </button>
        </div>
      </div>
  
    </div>`

  
  }

  newDateRefreshExpenses (`infolineinco`, 'js-button-update-income', 'js-income-list' )
} 


// Functia data citeste masivul si il vizualizeaza lista de cheltuieli pe pagina de baza
function readExpenses(monthsExpenses, curentSelectMonth) {

  cleanLists(expensesList) // Curata lista in HTML si adauga din nou noile valori

  function colorState(levelItem){
    let colorText
    if (levelItem === "Cheltuit") {
      colorText = 'var(--color-labels-secondary)'
    } else if (levelItem === "În așteptare"){
      colorText = 'var(--color-functional-orange-primary)'
    }
    return colorText
  }
  
  function colorLevel(levelItem){
    let colorText
    if (levelItem === "High") {
      colorText = 'var(--color-functional-neo_fuchsia-primary)'
    } else if (levelItem === "Medium"){
      colorText = 'var(--color-functional-orange-primary)'
    } else if (levelItem === "Low") {
      colorText = 'var(--color-functional-green-primary)'
    }
    return colorText
  }

  onValue(typesOfGroupsInDB, function(snapshot) {

    let monthsDateSec = Object.values(snapshot.val())
    const listGroup = monthsDateSec.map(item => item.titlu);
    let optionsHTML = "";

    for (let i = 0; i < listGroup.length; i++) {

      let optionHTML = `<option value="${listGroup[i]}">${listGroup[i]}</option>`
      optionsHTML += optionHTML
    }

    for (let i = 0; i < monthsExpenses.length; i++) {
      expensesList.innerHTML += `
      <div class="linie-tabel" id="js-item-line-one" data-id="${monthsExpenses[i][0]}" data-type="infolineexp">

        <div class="linie-tabel-chield-0">
          <div class="expenses_list_group">
            <p class="num_style">${i + 1}</p>
            <select class="expenses_list_group_icon" name="grupe-cheltuieli" id="js-grupe-${monthsExpenses[i][0]}">
              <option value="${monthsExpenses[i][1].grupa}" selected disabled hidden>${monthsExpenses[i][1].grupa}</option>
              ${optionsHTML}
            </select>
          </div>
          <input class="expenses_list_title" type="text" id="js-titlu-${monthsExpenses[i][0]}" value="${monthsExpenses[i][1].titlu}">
        </div>

        <div class="linie-tabel-chield-1">
            <div class="linie-tabel-lei-add">
              <input class="expenses_list_suma" type="number" id="js-suma-${monthsExpenses[i][0]}" value="${monthsExpenses[i][1].suma}">
              <p class="lei_style">lei</p>
            </div>
            <input class="expenses_list_data" type="date" id="js-data-${monthsExpenses[i][0]}" value="${monthsExpenses[i][1].data}">
        </div>

        <div class="linie-tabel-chield-2">
          <select class="expenses_list_state" style="color: ${colorState(monthsExpenses[i][1].state)};" name="grupe-cheltuieli" id="js-state-${monthsExpenses[i][0]}">
            <option value="${monthsExpenses[i][1].state}" selected disabled hidden>${monthsExpenses[i][1].state}</option>
            <option value="În așteptare">În așteptare</option>
            <option value="Cheltuit">Cheltuit</option>
          </select>
          <select class="expenses_list_level" style="color: ${colorLevel(monthsExpenses[i][1].level)};" name="grupe-level" id="js-level-${monthsExpenses[i][0]}">
            <option value="${monthsExpenses[i][1].level}" selected disabled hidden>${monthsExpenses[i][1].level}</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div class="linie-tabel-chield-3">
          <select class="expenses_list_state" name="grupe-utilizatori" id="js-user-${monthsExpenses[i][0]}">
            <option value="${monthsExpenses[i][1].user}" selected disabled hidden>${monthsExpenses[i][1].user}</option>
            <option value="Toti">Toti</option>
            <option value="Eugen">Eugen</option>
            <option value="Cris">Cris</option>
            <option value="Fetele">Fetele</option>
            <option value="Amelia">Amelia</option>
            <option value="Bianca">Bianca</option>
            <option value="Evelina">Evelina</option>
            <option value="Simona">Simona</option>
          </select>
          <div class="expenses_list_both-buttons" >
            <button class="expenses_list_button expenses_list_button_refresh" id="js-button-updata-expenses" data-id="${monthsExpenses[i][0]}" data-type="updatexp">
              <span class="material-symbols-outlined" data-id="${monthsExpenses[i][0]}" data-type="updatexp">autorenew</span>
            </button>
            <button class="expenses_list_button expenses_list_button_delete" id="js-button-delet-expenses" data-id="${monthsExpenses[i][0]}" data-type="delete_exp">
              <span class="material-symbols-outlined" data-id="${monthsExpenses[i][0]}" data-type="delete_exp">delete_forever</span>
            </button>
          </div>
        
        </div>

      </div>`

      
    
    }
    inputGrupa.innerHTML = `${optionsHTML}`

    newDateRefreshExpenses (`infolineexp`, 'js-button-updata-expenses', 'js-lista' )
  })
} 


// Functia data citeste masivul si il vizualizeaza lista de grupe pe pagina de baza
function readGroups(monthsExpenses, monthsGroups, sumMonthsIncomes, curentSelectMonth) {

  //addingNewMonths (`2023-05-01`,monthsGroups)

  let expensesLow = fiterItem (monthsExpenses, "level", "Low")
  let expensesMedium = fiterItem (monthsExpenses, "level", "Medium")
  let expensesHigh = fiterItem (monthsExpenses, "level", "High")

  cleanLists(groupsList) // Curata lista in HTML si adauga din nou noile valori

  onValue(typesOfGroupsInDB, function(snapshot) {

    let monthsDateSec = Object.values(snapshot.val())
    const listGroup = monthsDateSec.map(item => item.titlu);
    let optionsHTML = "";

    for (let i = 0; i < listGroup.length; i++) {

      let optionHTML = `<option value="${listGroup[i]}">${listGroup[i]}</option>`
      optionsHTML += optionHTML
    }

    for (let i = 0; i < monthsGroups.length; i++) {

      let areLeft  = monthsGroups[i][1].suma - calculateSum(fiterGroup (monthsExpenses, monthsGroups[i][1].titlu))
  
      let percentOfTotal = diference(sumMonthsIncomes, monthsGroups[i][1].suma).toFixed(0);
  
      let diferenceLow = diference(calculateSum(fiterGroup (monthsExpenses, monthsGroups[i][1].titlu)), calculateSum(fiterGroup (expensesLow, monthsGroups[i][1].titlu))).toFixed(0);
  
      let diferenceMedium = diference(calculateSum(fiterGroup (monthsExpenses, monthsGroups[i][1].titlu)), calculateSum(fiterGroup (expensesMedium, monthsGroups[i][1].titlu))).toFixed(0);
  
      let diferenceHigh = diference(calculateSum(fiterGroup (monthsExpenses, monthsGroups[i][1].titlu)), calculateSum(fiterGroup (expensesHigh, monthsGroups[i][1].titlu))).toFixed(0);

      let diferencePointHtml = pointPositionCorrection (diference(monthsGroups[i][1].suma, calculateSum(fiterItem (fiterGroup (monthsExpenses, monthsGroups[i][1].titlu), "state", "Cheltuit"))).toFixed(0))
      
      groupsList.innerHTML += `
        <div class="linie-tabel" id="js-item-line-one-group" data-id="${monthsGroups[i][0]}" data-type="infolinegroup">
    
          <div class="linie-tabel-chield-group-0">
            <div class="expenses_list_group">
              <p class="num_style">${i + 1}</p>
              <select class="expenses_list_group_icon" name="grupe-cheltuieli" id="js-grupe-titlu-${monthsGroups[i][0]}">
                <option value="${monthsGroups[i][1].titlu}" selected disabled hidden>${monthsGroups[i][1].titlu}</option>
                  ${optionsHTML}
              </select>
            </div>

            <div class="suma_percent_all_group">
              <div class="linie-tabel-lei-add">
                <input class="expenses_list_suma" type="number" id="js-grupe-suma-${monthsGroups[i][0]}" value="${monthsGroups[i][1].suma}">
                <p class="lei_style">lei</p>
              </div>
            </div>

          </div>

          <div class="linie-tabel-chield-group-1">
            <p class="percent_all_group">${percentOfTotal}%</p>
            <p class="rest_all_group">Ramași ${areLeft} lei</p>
          </div>

          <div class="linie-tabel-chield-group-2">
            <div class="dim-procente-second">
              <div class="point_procente" style="left:${diferencePointHtml}%;" >
                <div class="point_procente_inside"></div>
              </div>
              <div id="js-${monthsGroups[i][1].titlu}" class="procente-second"> 
                <div class="low" style="width:${diferenceLow}%;"></div>
                <div class="medium" style="width:${diferenceMedium}%;"></div>
                <div class="high" style="width:${diferenceHigh}%;"></div>
              </div>
              <p id="loading-${monthsGroups[i][1].titlu}" class="procente-style-second">10%</p>
            </div>
            <div class="expenses_list_both-buttons" >
              <button class="expenses_list_button expenses_list_button_refresh" id="js-button-update-group" data-id="${monthsGroups[i][0]}" data-type="updategroup">
              <span class="material-symbols-outlined" data-id="${monthsGroups[i][0]}" data-type="updategroup">autorenew</span></button>
              <button class="expenses_list_button expenses_list_button_delete" id="js-button-delet-group" data-id="${monthsGroups[i][0]}" data-type="delete_group">
              <span class="material-symbols-outlined" data-id="${monthsGroups[i][0]}" data-type="delete_group">delete_forever</span>
              </button>
            </div>
        </div>

        </div>`
  
        newDate (monthsGroups[i][1].suma, calculateSum(fiterGroup (monthsExpenses, monthsGroups[i][1].titlu)), `js-${monthsGroups[i][1].titlu}`, `loading-${monthsGroups[i][1].titlu}`,10)

 
        
    }  
    inputGrupaTitlu.innerHTML = `${optionsHTML}`

    newDateRefreshExpenses (`infolinegroup`, 'js-button-update-group', 'js-group-list' )
  })

} 


//Ceva cu corectarea punctului de la grupe ------------------------
function pointPositionCorrection (itemValue){
  let diference = itemValue
  if (diference > 0) {
    diference = diference - 2
  }
  return diference
}

// Functia data schimba culoarea la butonul update daca se face clic pe linia respectiva --------------

function newDateRefreshExpenses (typeSelector, buttonItem, listName) {

  let tabel = document.getElementById(listName)

  tabel.addEventListener('click', function(event) {

    let clickedElement = event.target
    let targetParentId = typeSelector
  
    while (clickedElement != null) {
  
      if (clickedElement.dataset.type === targetParentId) {

        let itemOneLineSelect = document.querySelector(`#${buttonItem}[data-id="${clickedElement.dataset.id}"]`)
        itemOneLineSelect.style.color = 'var(--color-functional-green-secondary)'
      
        break
      }
        clickedElement = clickedElement.parentNode
    }

  })

}


// Aceasta functie calculeaza suma tuturor valorilor din masivul adaugat in argument
function calculateSum(addArray) {
  // In acest masiv sunt stocate sumele cheltuielilor
  const sumAll = []; 

  // Adauga sumele cheltuielilor in masiv si le schimba in numere
  for (let i = 0; i < addArray.length; i++) {
    sumAll.push(parseInt(addArray[i][1].suma));
  } 

  // Sumeaza taote sumele
  const sum = sumAll.reduce((accumulator, currentValue) => accumulator + currentValue, 0); 

  // Sterge toate valorile din masiv
  for (let i = 0; i < sumAll.length; i++) {
    sumAll.splice(i); 
  }
  return sum;
} 


function cleanLists(addlist) {
  addlist.innerHTML = ''
} // Functia este destinata pentru a curata listele indicate in argument


// functia data vizualizaeza veniturile totale pe luna
function incomesHtmlDate (value) {
  let valueHTML = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  inconHTMLValue.innerHTML =`<p>${valueHTML} <span class="styled-lei">lei</span></p>`
} 
// functia data vizualizaeza veniturile totale pe luna Available income
function availableIncomesHtmlDate (value) {
  let valueHTML = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  availableIncomesHtmlValue.innerHTML =`<p>${valueHTML} <span class="styled-lei">lei</span></p>`
} 

function expensesHtmlDate (value) {
  let valueHTML = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  expenHtmlValue.innerHTML =`<p>${valueHTML} <span class="styled-lei">lei</span></p>`
}

function incurredExpensesHtmlDate (value) {
  let valueHTML = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  incurredExpensesHtmlValue.innerHTML =`<p>${valueHTML} <span class="styled-lei">lei</span></p>`
}

function allocatedMoneyHtmlDate (value) {
  let valueHTML = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  allocatedMoneyHtmlValue.innerHTML =`<p>${valueHTML} <span class="styled-lei">lei</span></p>`
}


function moneyAvailableHtmlDate (value) {
  let valueHTML = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  moneyAvailableHtmlValue.innerHTML =`<p>${valueHTML} <span class="styled-lei">lei</span></p>`
}




function newDate (minued, subtrahend, elementID, valueID, paddingRight, colorLoad) {

  const procenteCheltuie = diference(minued, subtrahend).toFixed(0);

  const pozitionare = procenteCheltuie - paddingRight

  const element = document.getElementById(`${elementID}`) //importam elemetul indentificat prin ID

  element.style.backgroundColor = colorLoad
  element.style.width = `${procenteCheltuie}%`

  const statusElement = document.getElementById(`${valueID}`)

  statusElement.innerText = `${procenteCheltuie}%`
  statusElement.style.paddingLeft = `${pozitionare}%`
  statusElement.style.color = colorLoad

}



function curataCimpurile() {
  inputGrupa.innerHTML = ''
  inputTitlu.innerHTML = ''
  inputSuma.innerHTML = ''
  inputDate.innerHTML = ''
  inputState.innerHTML = ''
  inputLevel.innerHTML = ''
  inputUser.innerHTML = ''
} // Aceasta functie este necesara pentru a curtati valorile care au fost adaugate 


function newDateOneArc (canvasId, minuedFirst, subtrahendFirst, colorFirst ) {

  const procenteItemFirst = diference(minuedFirst, subtrahendFirst).toFixed(0);


  let canvas = document.getElementById(canvasId)
  let ctx = canvas.getContext('2d')
  let pi = Math.PI



  function radianCalc (percentItem) {
    let percent = percentItem;
    let degree = percent * 3.6;
    let radian = (Math.PI / 180) * degree;
    return radian
  }


  ctx.clearRect(0, 0, 348, 348)

  ctx.beginPath()
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#27282A'
  ctx.arc(174, 174, 168, 0, 2*pi, false)
  ctx.stroke()

  ctx.beginPath()
  ctx.lineWidth = 12;
  ctx.strokeStyle = colorFirst
  ctx.arc(174, 174, 168, 0, radianCalc(procenteItemFirst), false)
  ctx.lineCap = "round"
  ctx.stroke()

  ctx.fillStyle = colorFirst
  ctx.font = "bold 42px 'Jost'";
  ctx.fillText(`${procenteItemFirst}%`, 126, 190)

}


function newDateArc (canvasId, minuedFirst, subtrahendFirst, colorFirst, minuedSecond, subtrahendSecond, colorSecond ) {

  const procenteItemFirst = diference(minuedFirst, subtrahendFirst).toFixed(0);
  const procenteItemSecond = diference(minuedSecond, subtrahendSecond).toFixed(0);


  let canvas = document.getElementById(canvasId)
  let ctx = canvas.getContext('2d')
  let pi = Math.PI



  function radianCalc (percentItem) {
    let percent = percentItem;
    let degree = percent * 3.6;
    let radian = (Math.PI / 180) * degree;
    return radian
  }


  ctx.clearRect(0, 0, 348, 348)

  ctx.beginPath()
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#27282A'
  ctx.arc(174, 174, 168, 0, 2*pi, false)
  ctx.stroke()

  ctx.beginPath()
  ctx.lineWidth = 12;
  ctx.strokeStyle = colorFirst
  ctx.arc(174, 174, 168, 0, radianCalc(procenteItemFirst), false)
  ctx.lineCap = "round"
  ctx.stroke()

  ctx.fillStyle = colorFirst
  ctx.font = "bold 42px 'Jost'";
  ctx.fillText(`${procenteItemFirst}%`, 126, 156)

  ctx.beginPath()
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#27282A'
  ctx.arc(174, 174, 138, 0, 2*pi, false)
  ctx.stroke()

  ctx.beginPath()
  ctx.lineWidth = 12;
  ctx.strokeStyle = colorSecond
  ctx.arc(174, 174, 138, 0, radianCalc(procenteItemSecond), false)
  ctx.lineCap = "round"
  ctx.stroke()

  ctx.fillStyle = colorSecond
  ctx.font = "bold 42px 'Jost'";
  ctx.fillText(`${procenteItemSecond} %`, 126, 222)
  
}

function diference (dividend, divisor) {
  let venProcente = dividend /100
  let chelProcente = divisor/venProcente
  return chelProcente
}


// Vizualizam infograficul cheltuielilor pe grupe in lună ----------------------

function groupVisuallisation (monthsExpenses) {

  // Adaugam lista cheltuielilor
  const clusterGroup = document.getElementById('js-cluster_group')

  // Initiem canvas ----------------------------------------------------

  let canvas = document.getElementById('c6')
  let ctx = canvas.getContext('2d')
  let pi = Math.PI

  let rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * devicePixelRatio;
  canvas.height = rect.height * devicePixelRatio; 

  ctx.scale(devicePixelRatio, devicePixelRatio);

  canvas.style.width = rect.width + "px"
  canvas.style.height = rect.height + "px"

  //Functia data converteste procentele in radian -----------------------

  function radianCalc (percentItem) {
    let degree = percentItem * 3.6;
    let radian = (Math.PI / 180) * degree;
    return radian
  }

  ctx.clearRect(0, 0, 112, 112)

  // Aceasta functie asculta BD si extrage tipurile de grupe --------------------------

  onValue(typesOfGroupsInDB, function(snapshot) {

    let monthsDateSec = Object.values(snapshot.val())

    //Acestea sunt culorile utilizate pentru vizualizarea graficului circular --------

    let colorGroup = ['#EF4444', '#F97316', '#F6A723', '#F7BF12', '#84CC16', '#22BF5B', '#11AC78', '#0893AB', '#0E80B4', '#1162E9', '#3C3FE7', '#6E36EC', '#8F2DEB', '#BC21D4', '#B6256D', '#9D2035']

    // Acest loop calculeaza procentele pentru luna curenta ------------------------

    // Aceasta matrice este utilizata pentru pastrea grupelelor si procentele lor
    let allGroupsPercentages = []

    for (let i = 0; i < monthsDateSec.length; i++) {
      let groupPercentages = {
        grupa: monthsDateSec[i].titlu,
        percentage: diference(calculateSum(monthsExpenses), calculateSum(fiterItem (monthsExpenses, "grupa", monthsDateSec[i].titlu)))
      }
      allGroupsPercentages.push(groupPercentages)
    }

    // Acesta cod aranjeaza in ordine crescatoare matricea cu grupe si procente --------------

    allGroupsPercentages.sort((a, b) => b.percentage - a.percentage)

    // Aici are loc vizaulizare graficului ---------------------------
    
    let startRadian = 0
    clusterGroup.innerHTML = ''

    for (let i = 0; i < allGroupsPercentages.length; i++) {

      let lineWidth = 56-(i*1.4)
      let arcRadius = lineWidth/2

      let perceString = parseFloat(allGroupsPercentages[i].percentage)
      let perceRounded = perceString.toFixed(1)
      clusterGroup.innerHTML += `<div class="clusterGroup"><div class="perceRounded" style="background-color:${colorGroup[i]};">${perceRounded}%</div> ${allGroupsPercentages[i].grupa}</div>`

      ctx.beginPath()
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = `${colorGroup[i]}`
      ctx.arc(56, 56, arcRadius, startRadian, startRadian + radianCalc (allGroupsPercentages[i].percentage), false)
      ctx.stroke()

      startRadian += radianCalc (allGroupsPercentages[i].percentage)

    }

  })

}

// Vizualizam infograficul cu dimanica pe o lună

function levelExpensese (monthsIncomes, monthsExpenses, curentSelectMonth) {

  // Aflam cite zile are luna selectata ---------------------------------

  let extractDate = curentSelectMonth.slice(16, 30)
  let selectedMonth = new Date(`${extractDate}`)
  selectedMonth.setDate(1)
  selectedMonth.setHours(12)
  let year = selectedMonth.toISOString().slice(0, 4)
  let month = selectedMonth.toISOString().slice(5, 7)
  let monthNum = parseInt(month, 10);
  selectedMonth.setMonth(selectedMonth.getMonth() + 1)
  selectedMonth.setDate(selectedMonth.getDate() - 1)
  let lastDay = selectedMonth.toISOString().slice(8, 10)
  let lastDayNum = parseInt(lastDay, 10)

  // Initiem canvas ---------------------------------------------------

  let canvas = document.getElementById('c7')
  let ctx = canvas.getContext('2d')

  let wideCanvas = 1560
  let heightCanvas = 520
  
  ctx.clearRect(0, 0, wideCanvas, heightCanvas)

  ctx.beginPath()
  ctx.strokeStyle = '#FE9870'
  ctx.lineWidth = 2
  ctx.moveTo(0, heightCanvas)
  ctx.lineTo(wideCanvas, 0)
  ctx.stroke()

  // Creem o variabila care divizeaza latimea la numarul de zile, iar a doua inaltimea la procente

  let widthDivideDays = wideCanvas / lastDayNum
  let heightDivideProcent = heightCanvas / 10

  // Vizaulizam dinamica lunara a veniturilor ----------------------------

  let procenGraphicIncome = 0

  for (let i = 1, j = 0; j < lastDayNum; i++, j++) {
    
    let day = String(i).padStart(2, '0')
    let monthGraph = String(monthNum).padStart(2, '0')

    let procent = diference (calculateSum(monthsIncomes), calculateSum(fiterItem (monthsIncomes, "data",`${year}-${monthGraph}-${day}`)))
    
    procenGraphicIncome = procenGraphicIncome + procent

    ctx.beginPath()
    ctx.fillStyle = "rgba(14, 173, 105, 0.08)"
    ctx.fillRect((widthDivideDays * j), heightCanvas, widthDivideDays,  - (procenGraphicIncome * 5.2))

    ctx.beginPath()
    ctx.fillStyle = "rgba(14, 173, 105, 0.6)"
    ctx.fillRect((widthDivideDays * j), heightCanvas - (procenGraphicIncome * 5.2), widthDivideDays,  4)
  }

  //Adaugarea unu semn pentru a gasi mai repede pocentul veniturilor

  ctx.beginPath()
  ctx.fillStyle = "rgba(14, 173, 105, 0.6)"
  ctx.fillRect(42, heightCanvas - (procenGraphicIncome * 5.2), 10,  4)

  // Vizualizarea cheltuielilor planificate -------------------------------
  
  let procenGraphic = 0

  for (let i = 1, j = 0; j < lastDayNum; i++, j++) {

    let day = String(i).padStart(2, '0')
    let monthGraph = String(monthNum).padStart(2, '0')

    let procent = diference (calculateSum(monthsIncomes), calculateSum(fiterItem (monthsExpenses, "data",`${year}-${monthGraph}-${day}`)))
    
    procenGraphic = procenGraphic + procent

    ctx.clearRect(widthDivideDays * j, heightCanvas, widthDivideDays,  - (procenGraphic * 5.2))

    ctx.beginPath()
    ctx.fillStyle = "rgba(254, 152, 112, 0.20)"
    ctx.fillRect(widthDivideDays * j, heightCanvas, widthDivideDays,  - (procenGraphic * 5.2))

    ctx.beginPath()
    ctx.fillStyle = "rgba(254, 152, 112, 1)"
    ctx.fillRect(widthDivideDays * j, heightCanvas - (procenGraphic * 5.2), widthDivideDays, 4)
  }

  //Adaugarea unu semn pentru a gasi mai repede pocentul cheltuielilor planificate

  ctx.beginPath()
  ctx.fillStyle = "rgba(254, 152, 112, 1)"
  ctx.fillRect(42, heightCanvas - (procenGraphic * 5.2), 10, 4)



  // Vizualizarea cheltuielilor efectuate ---------------------------

  let procentExpensesIncurred = 0

  for (let i = 1, j = 0; j < lastDayNum; i++, j++) {

    let day = String(i).padStart(2, '0')
    let monthGraph = String(monthNum).padStart(2, '0')

    let procent = diference (calculateSum(monthsIncomes), calculateSum(fiterItem (fiterItem (monthsExpenses, "data",`${year}-${monthGraph}-${day}`), "state", "Cheltuit")))
    
    procentExpensesIncurred = procentExpensesIncurred + procent

    ctx.clearRect(widthDivideDays * j, heightCanvas, widthDivideDays,  - (procentExpensesIncurred * 5.2))

    ctx.beginPath()
    ctx.fillStyle = "rgba(250, 65, 105, 0.20)"
    ctx.fillRect(widthDivideDays * j, heightCanvas, widthDivideDays,  - (procentExpensesIncurred * 5.2))

    ctx.beginPath()
    ctx.fillStyle = "rgba(250, 65, 105, 1)"
    ctx.fillRect(widthDivideDays * j, heightCanvas - (procentExpensesIncurred * 5.2), widthDivideDays, 4)
    
  }

  //Adaugarea unu semn pentru a gasi mai repede pocentul cheltuielilor efectuate

  ctx.beginPath()
  ctx.fillStyle = "rgba(250, 65, 105, 1)"
  ctx.fillRect(42, heightCanvas - (procentExpensesIncurred * 5.2), 10, 4)

  // Crearea fundalului ----------------------------------------------------

  for (let i = 1, j = 0; j < lastDayNum; i++, j++) {

    let day = String(i).padStart(2, '0')

    ctx.beginPath()
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)"
    ctx.fillRect(((widthDivideDays * 2) * j), heightCanvas, widthDivideDays, -(heightCanvas))

    // Adaugarea zilei lunii --------------------------------
    ctx.font = "30px sans-serif";
    ctx.fontWeight = "lighter"
    ctx.fillStyle = "rgba(235, 235, 245, 0.18)";
    ctx.fillText(day, (widthDivideDays * j)+(widthDivideDays / 5), (heightCanvas - 14));
  }

  //Adaugare linii orizontale ----------------------------------

  for (let i = 1; i < 10; i++) {

    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)"
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.moveTo(widthDivideDays, heightDivideProcent * i)
    ctx.lineTo(wideCanvas, heightDivideProcent * i)
    ctx.stroke()
  }

  // Adaugarea procentelor text --------------------------------

  for (let i = 1; i < 9; i++) {

    ctx.font = "30px sans-serif";
    ctx.fontWeight = "lighter"
    ctx.fillStyle = "rgba(235, 235, 245, 0.18)";
    ctx.fillText(100 - (10 * i), 0, (heightDivideProcent * i)+(heightDivideProcent / 5))

  }

  // Vizualizam raspindirea uniforma ------------------------------

  ctx.beginPath()
  ctx.strokeStyle = 'rgba(255, 202, 98, 1)'
  ctx.lineWidth = 3
  ctx.moveTo(0, heightCanvas)
  ctx.lineTo(wideCanvas, 0)
  ctx.stroke()


  // Functionalul de evidentiere a zilei curente --------------------

  let currentDateStat = new Date().toISOString().slice(8, 10)
  let todayDateNumStat = parseInt(currentDateStat, 10)
  let dataStat = todayDateNumStat-1

  let currentMonthCompare = new Date().toISOString().slice(5, 7)
  let currentMonthCompareNum = parseInt(currentMonthCompare, 10)

  if(currentMonthCompareNum === monthNum) {
    ctx.beginPath()
    ctx.fillStyle = "rgba(254, 152, 112, 0.20)"
    ctx.fillRect(widthDivideDays * dataStat, 0, widthDivideDays, 520)
  }

}

// Crearea graficului pentru toate lunile -----------------------------

function filteringPeriods (groupChart, startMonth, endMonth) {

  onValue(allMonthsInDB, function(snapshot) {

    // Incarcam din BD toate lunile
    let monthsDateSec = Object.entries(snapshot.val())

    onValue(typesOfGroupsInDB, function(snapshot) {

      // Comutam de la toate lunile la una ---------------------------

      let filterTerm = "🚴🏻 Piață" 
      let switchingGroups = groupChart
  
      if (switchingGroups != "💎 Toate") {
        filterTerm = switchingGroups
      }


      let startDate
      let endDate 

      if(startMonth !== undefined) {
        startDate = new Date(startMonth)
        endDate = new Date(endMonth)
      } else {
        
        let allMonthsFromBD = []

        for (let i = 0; i < monthsDateSec.length; i++) {
          allMonthsFromBD.push(monthsDateSec[i][0])
        }

        // Convert date strings to Date objects
        const dates = allMonthsFromBD.map(allMonthsFromBD => new Date(allMonthsFromBD))

        // Custom sorting function for date strings
        const sortByDate = (a, b) => {
          const dateA = new Date(a)
          const dateB = new Date(b)
          return dateA - dateB
        };

        // Sort the array of date strings
        const sortedDates = dates.sort(sortByDate)

        startDate = new Date(sortedDates[sortedDates.length-6])
        endDate = new Date(sortedDates[sortedDates.length-1])
      }

      // Extragem lunile care corespund perioadei -----------------

      const filteredData = monthsDateSec.filter((item) => {
        const currentDate = new Date(item[0])
        return currentDate >= startDate && currentDate <= endDate
      })


      // Extragem grupele din lunile filtrate --------------------
  
      let allGroupsFromMonths = []
  
      for (let i = 0; i < filteredData.length; i++) {
        
        let groupsOnly = {
          months: filteredData[i][0],
          groups: Object.entries(filteredData[i][1].groups)
        }
  
        allGroupsFromMonths.push(groupsOnly)
  
      }
  
      // Aflam cheltuielile pe luna --------------------------
  
      let allGroupsExpensesMonths = []
  
      for (let i = 0; i < allGroupsFromMonths.length; i++) {
        let groups = allGroupsFromMonths[i].groups
  
        let groupsExpenses = 0
  
        for (let i = 0; i < groups.length; i++) {
        let num = parseInt(groups[i][1].suma)
        groupsExpenses += num
        }
  
        let allExpensesMonth = {
          data: allGroupsFromMonths[i].months,
          suma: groupsExpenses
        }
  
        allGroupsExpensesMonths.push(allExpensesMonth)
  
      }
  
  
      // Extragem o grupa concreta din lunile filtrate, aflam suma totala pe grupa ------------
  
      let sumGroupsSelected = 0 //Aici este totalul grupei pe toate lunile selectate
    
      let selectedGroup = [] //Aici sunt luna si suma grupei
  
      for (let i = 0; i < allGroupsFromMonths.length; i++) {
  
        const filteredData = allGroupsFromMonths[i].groups.filter(([id, item]) => item.titlu === filterTerm)
  
        let num = parseInt(filteredData[0][1].suma)
  
        sumGroupsSelected += num
  
        let concreetGroup = {
          date: allGroupsFromMonths[i].months,
          suma: num
        }
  
        selectedGroup.push(concreetGroup)
  
      }
  
      // Alfla suma lunilor si toturor grupelelor filtrate ----------------------------
  
      let allGroupsSum = []
  
      for (let i = 0; i < allGroupsFromMonths.length; i++) {
        allGroupsSum.push(calculateSum(allGroupsFromMonths[i].groups))
      }
  
      let allexpenses = 0
  
      for (let i = 0; i < allGroupsSum.length; i++) {
        allexpenses += allGroupsSum[i]
      }

      let monthstypesOfGroups = Object.values(snapshot.val())

      //Acestea sunt culorile utilizate pentru vizualizarea graficului circular --------

      let colorGroupR = ['#EF4444', '#F97316', '#F6A723', '#F7BF12', '#84CC16', '#22BF5B', '#11AC78', '#0893AB', '#0E80B4', '#1162E9', '#3C3FE7', '#6E36EC', '#8F2DEB', '#BC21D4', '#B6256D', '#9D2035']

      // Acest loop calculeaza procentele pentru grupe in raport cu toata perioada ------------------------
      // Aceasta matrice este utilizata pentru pastrea grupelelor si procentele lor

      let allGroupsPercentages = []

      for (let i = 0; i < monthstypesOfGroups.length; i++) {

        // Extragem o grupa concreta din lunile filtrate, aflam suma totala pe grupa ------------

        let sumGroupsSelected = 0 

        for (let j = 0; j < allGroupsFromMonths.length; j++) {
          
          const filteredData = allGroupsFromMonths[j].groups.filter(([id, item]) => item.titlu === monthstypesOfGroups[i].titlu)

          let num = parseInt(filteredData[0][1].suma)

          sumGroupsSelected += num

        }

        let groupPercentages = {
          grupa: monthstypesOfGroups[i].titlu,
          percentage: diference(allexpenses, sumGroupsSelected)
        }
        allGroupsPercentages.push(groupPercentages)

      }

        // Acesta cod aranjeaza in ordine crescatoare matricea cu grupe si procente --------------

        allGroupsPercentages.sort((a, b) => b.percentage - a.percentage)

        // Aflu indexul grupe selectate pentru a selecta culoarea corecta
        const index = allGroupsPercentages.findIndex(item => item.grupa === filterTerm);


        // Aici are loc vizaulizare graficului ---------------------------

        // Adaugam lista cheltuielilor
        const clusterGroupAll = document.getElementById('js-cluster_group_all')

        
        let startRadian = 0
        clusterGroupAll.innerHTML = ''

      // Vizualizam suma grupei filtrate pe pagina

      const sumGroupChart = document.getElementById('js-filter-group-sum-chart')

      if (switchingGroups != "💎 Toate") {
        let sumGroupsChartString = sumGroupsSelected.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        sumGroupChart.innerHTML = `Grupa ${sumGroupsChartString} lei`
        sumGroupChart.style.color = colorGroupR[index]
      } else {
        sumGroupChart.innerHTML = ``
  
      }


  
      // Initiem canvas pentru graficul circular ----------------------------------------------------
  
      let canvasR = document.getElementById('c9')
      let ctxR = canvasR.getContext('2d')
  
      let rect = 122
      canvasR.width = rect * devicePixelRatio;
      canvasR.height = rect * devicePixelRatio; 
  
      ctxR.scale(devicePixelRatio, devicePixelRatio);
  
      canvasR.style.width = rect + "px"
      canvasR.style.height = rect + "px"

  
      //Functia data converteste procentele in radian -----------------------
  
      function radianCalc (percentItem) {
        let degree = percentItem * 3.6;
        let radian = (Math.PI / 180) * degree;
        return radian
      }
  
      ctxR.clearRect(0, 0, 112, 112)

      if (switchingGroups === "💎 Toate" ) {
      
        for (let i = 0; i < allGroupsPercentages.length; i++) {

          let lineWidth = 56-(i*1.4)
          let arcRadius = lineWidth/2
    
          let perceString = parseFloat(allGroupsPercentages[i].percentage)
          let perceRounded = perceString.toFixed(1)
          clusterGroupAll.innerHTML += `<div class="clusterGroup"><div class="perceRounded" style="background-color:${colorGroupR[i]};">${perceRounded}%</div> ${allGroupsPercentages[i].grupa}</div>`
    
          ctxR.beginPath()
          ctxR.lineWidth = lineWidth;
          ctxR.strokeStyle = `${colorGroupR[i]}`
          ctxR.arc(56, 56, arcRadius, startRadian, startRadian + radianCalc (allGroupsPercentages[i].percentage), false)
          ctxR.stroke()
    
          startRadian += radianCalc (allGroupsPercentages[i].percentage)
    
        }

      } else {

        let allGroupsPercentages = []

        for (let i = 0; i < monthstypesOfGroups.length; i++) {

          // Extragem o grupa concreta din lunile filtrate, aflam suma totala pe grupa ------------

          let sumGroupsSelected = 0 

          for (let j = 0; j < allGroupsFromMonths.length; j++) {
            
            const filteredData = allGroupsFromMonths[j].groups.filter(([id, item]) => item.titlu === monthstypesOfGroups[i].titlu)

            let num = parseInt(filteredData[0][1].suma)

            sumGroupsSelected += num

          }

          let groupPercentages = {
            grupa: monthstypesOfGroups[i].titlu,
            percentage: diference(allexpenses, sumGroupsSelected)
          }
          allGroupsPercentages.push(groupPercentages)

        }

        // Acesta cod aranjeaza in ordine crescatoare matricea cu grupe si procente --------------

        allGroupsPercentages.sort((a, b) => b.percentage - a.percentage)

        // Aici are loc vizaulizare graficului ---------------------------

        // Adaugam lista cheltuielilor
        const clusterGroupAll = document.getElementById('js-cluster_group_all')

        
        let startRadian = 0
        clusterGroupAll.innerHTML = ''


        for (let i = 0; i < allGroupsPercentages.length; i++) {

          let lineWidth = 56-(i*1.4)
          let arcRadius = lineWidth/2
    
          let perceString = parseFloat(allGroupsPercentages[i].percentage)
          let perceRounded = perceString.toFixed(1)

    
          ctxR.beginPath()
          ctxR.lineWidth = lineWidth;
          
          if (switchingGroups != "💎 Toate" && filterTerm === allGroupsPercentages[i].grupa) {
            clusterGroupAll.innerHTML += `<div class="clusterGroup" style="opacity: 1" id="active_month"><div class="perceRounded" style="background-color:${colorGroupR[i]};">${perceRounded}%</div> ${allGroupsPercentages[i].grupa}</div>`
            ctxR.strokeStyle = `${colorGroupR[i]}`
            ctxR.globalAlpha = 1

            //Asigura navigarea pina la luna activa

            clusterGroupAll.scrollTo({
              top: i*40,
              behavior: 'smooth'
            });

          } else {
            clusterGroupAll.innerHTML += `<div class="clusterGroup" style="opacity: 0.2"><div class="perceRounded" style="background-color:${colorGroupR[i]};">${perceRounded}%</div> ${allGroupsPercentages[i].grupa}</div>`
            ctxR.strokeStyle = `${colorGroupR[i]}`
            ctxR.globalAlpha = 0.2
          }
          ctxR.arc(56, 56, arcRadius, startRadian, startRadian + radianCalc (allGroupsPercentages[i].percentage), false)
          ctxR.stroke()
    
          startRadian += radianCalc (allGroupsPercentages[i].percentage)
    
        }

      }

      // Vizualizam suma totala pe pagina
      const allSumChart = document.getElementById('js-filter-all-chart')
      let allSumChartString = allexpenses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      allSumChart.innerHTML = `Total ${allSumChartString} lei`

      // Alfam care este ce mai mare valoare

      let maxValue = Math.max(...allGroupsSum)

      //Declaram grupa de culori
  
      let colorGroup = ['#EF4444', '#F97316', '#F6A723', '#F7BF12', '#84CC16', '#22BF5B', '#11AC78', '#0893AB', '#0E80B4', '#1162E9', '#3C3FE7', '#6E36EC', '#8F2DEB', '#BC21D4', '#B6256D', '#9D2035']

      // Creem primul canvas

      let canvas = document.getElementById('c8')
      let ctx = canvas.getContext('2d')
    
      let wideCanvas = 1560
      let heightCanvas = 520
  
      // Variabile pentru introducerea denumiri lunii
      let nameMonth = 40
      let chartHeight = heightCanvas - nameMonth
  
      ctx.clearRect(0, 0, wideCanvas, heightCanvas)
  
      // Desenam fundalul pentru denumirea lunii
  
      ctx.beginPath()
      ctx.fillStyle = "rgba(26, 27, 29, 1)"
      ctx.fillRect(0, heightCanvas, wideCanvas, -nameMonth)

      // Desenam liniile orizontale pentru fundal

      let divideUnit = 1000
      let switchA = true
      let distributionMonths = maxValue / divideUnit
      let roundedUp = Math.ceil(distributionMonths) +1
      let procentUnit = (roundedUp * divideUnit)/100
    
      for (let i = 0; i < roundedUp; i++) {
  
        if(switchA === true){
          ctx.beginPath()
          ctx.fillStyle = "rgba(26, 27, 29, 1)"
          ctx.fillRect(0, (chartHeight/roundedUp)*i, wideCanvas, chartHeight/roundedUp)
          switchA = false
        } else if (switchA === false){
          ctx.beginPath()
          ctx.fillStyle = "rgba(26, 27, 29, 0)"
          ctx.fillRect(0, (chartHeight/roundedUp)*i, wideCanvas, chartHeight/roundedUp)
          switchA = true
        }
      }
  
      // Desenam liniile verticale pentru fundal
  
      let switchVertical = true
      let numVerticalLine = allGroupsFromMonths.length
      let numIterationVertical = numVerticalLine * 2
      let columWide = (wideCanvas * 0.75)/numVerticalLine
      let gapWide = (wideCanvas * 0.25)/(numVerticalLine - 1)
  
      let wideOrder = 0
      let iteraGroup = 0
      

      // Vizualizam valorile pe graficul rectangular

      for (let i = 0; i < numIterationVertical; i++) {

        if(switchVertical === true){

          //Calcularea inaltime la taota luna ---------------------------------------------
          let sumhighGroups = ((chartHeight)/100)*(allGroupsExpensesMonths[iteraGroup].suma/procentUnit)

          //Vizualizarea pe toata in fundal a lunii
          roundedRect(ctx, wideOrder, chartHeight, columWide, -sumhighGroups, 24, "rgba(39, 40, 42, 0.6)" )

          /*ctx.beginPath()
          ctx.fillStyle = "rgba(39, 40, 42, 1)"
          ctx.fillRect(wideOrder, chartHeight, columWide, -sumhighGroups)*/

          // Ce se intimpla daca este selectat toate lunile
          if (switchingGroups === "💎 Toate") {

            // Vizualizarea toturor grupeleor din lunine selectate ----------------------

            let iterateSingleGroup = allGroupsFromMonths[iteraGroup]

            iterateSingleGroup.groups.sort((a, b) => {
              const sumaA = parseInt(a[1].suma);
              const sumaB = parseInt(b[1].suma);
              return sumaB - sumaA;
            })

            let startGraph = 0
    
            for (let i = 0; i < iterateSingleGroup.groups.length; i++) {
    
              let startGraphSecond = chartHeight - startGraph
              let num = parseInt(iterateSingleGroup.groups[i][1].suma)

              let indexAll = allGroupsPercentages.findIndex(item => item.grupa === iterateSingleGroup.groups[i][1].titlu);

              let highGroup = ((chartHeight)/100)*(num/procentUnit)
              ctx.beginPath()
              ctx.fillStyle = colorGroup[indexAll]
              ctx.fillRect(wideOrder, startGraphSecond, columWide, -highGroup)
    
              startGraph += highGroup
    
            }

          } else {

            //Vizualizarea doar unei singure luni selectate -----------------------------
            let highGroup = ((chartHeight)/100)*(selectedGroup[iteraGroup].suma/procentUnit)
  
            // Vizualizarea sumei pe grupa ----------------------------------------------
            ctx.fillStyle = colorGroup[index]
            ctx.font = " 30px 'Jost'";
            ctx.textAlign = "center"
            ctx.fillText(`${selectedGroup[iteraGroup].suma}`, wideOrder+(columWide/2), (chartHeight-highGroup)-20)
  
  
            // Vizualizam grupa ----------------------------
            ctx.beginPath()
            ctx.fillStyle = colorGroup[index]
            ctx.fillRect(wideOrder, chartHeight, columWide, -highGroup)
          }

          // Vizualizarea denumirea lunii ----------------------------------------
          let groupMonth = allGroupsExpensesMonths[iteraGroup].data
          let actualMonth = groupMonth.slice(5, 7)
          let actualMonthNum = parseInt(actualMonth)

          const titleMonths = ['Ian', 'Feb', 'Mart', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

          ctx.fillStyle = "rgba(235, 235, 245, 0.3)"
          ctx.font = " 28px 'Jost'";
          ctx.textAlign = "center"
          ctx.fillText(`${titleMonths[actualMonthNum-1]}`, wideOrder+(columWide/2), heightCanvas - 10 )

          // Vizualizarea cheltuielilor pe toata luna ----------------------------
          ctx.fillStyle = "rgba(235, 235, 245, 0.6)"
          ctx.font = "28px 'Jost'";
          ctx.textAlign = "center"
          ctx.fillText(`${allGroupsExpensesMonths[iteraGroup].suma}`, wideOrder+(columWide/2), (chartHeight - sumhighGroups) + 40)

          iteraGroup ++
          switchVertical = false
          wideOrder += columWide
        } else if (switchVertical === false){
          ctx.beginPath()
          ctx.fillStyle = "rgba(26, 27, 29, 0)"
          ctx.fillRect(wideOrder, 0, gapWide, chartHeight)
          wideOrder += gapWide
          switchVertical = true
        }

      }
  
      // Functie pentru crearea rectangularelor cu coltuir rotungite
      function roundedRect(ctx, x, y, width, height, radius, color) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, 0);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, 0);
        ctx.closePath();
        
        ctx.fillStyle = color
        ctx.fill();
      }
      
      
    })

  })

}

// Mecanismul de ascultare a cimplului cu grupe pentru chart ------------------------

const listOfFilterGroupsChart = document.getElementById('js-list-of-filter-chart')
const inputStartMonth = document.getElementById('js-start-month') 
const inputEndMonth = document.getElementById('js-end-month') 
const monthsAgo = 5

onValue(allMonthsInDB, function(snapshot) {

  // Incarcam din BD toate lunile
  let monthsDateSec = Object.entries(snapshot.val())

  //Adaugam lunile existente din BD in inputuri pentru filtrare ------------------

  let allMonthsFromBD = []

  for (let i = 0; i < monthsDateSec.length; i++) {
    allMonthsFromBD.push(monthsDateSec[i][0])
  }

  // Convert date strings to Date objects
  const datesOne = allMonthsFromBD.map(allMonthsFromBD => new Date(allMonthsFromBD))

  // Custom sorting function for date strings
  const sortByDate = (a, b) => {
    const dateA = new Date(a)
    const dateB = new Date(b)
    return dateA - dateB
  };

  // Sort the array of date strings
  const dates = datesOne.sort(sortByDate)

  let startDate = new Date(dates[dates.length-6])
  let endDate = new Date(dates[dates.length-1])


  // Adaugarea lunilor existente in inputul start

  inputStartMonth.innerHTML = ``

  for (let i = 0; i < dates.length; i++) {

    // introducerea datelor in partea vizibila
    let shortYear = dates[i].getFullYear().toString().slice(-2)
    let monthAbbreviation = dates[i].toLocaleString('default', { month: 'short' })

    //introducerea datelor in value
    let formattedDate = dates[i].toISOString().split('T')[0]

    if(startDate.getTime() === dates[i].getTime()) {
      inputStartMonth.innerHTML += `<option value="${formattedDate}" selected>${monthAbbreviation} ${shortYear}</option>`
    }else {
      inputStartMonth.innerHTML += `<option value="${formattedDate}">${monthAbbreviation} ${shortYear}</option>`
    }


  }

  // Adaugarea lunilor existente in inputul end

  inputEndMonth.innerHTML =``

  for (let i = 3; i < dates.length; i++) {

    let shortYear = dates[i].getFullYear().toString().slice(-2)
    let monthAbbreviation = dates[i].toLocaleString('default', { month: 'short' })
    let formattedDate = dates[i].toISOString().split('T')[0]

    if (endDate.getTime() === dates[i].getTime()) {
      inputEndMonth.innerHTML += `<option value="${formattedDate}" selected>${monthAbbreviation} ${shortYear}</option>`
    }else{
      inputEndMonth.innerHTML += `<option value="${formattedDate}">${monthAbbreviation} ${shortYear}</option>`
    }

  }

  // Schimbarea lunii in inputul start

  inputStartMonth.addEventListener('input', function  () {

    // Extragem din input data selectata de tip string
    let indexMonthsSelect = inputStartMonth.value

    // Convertim data de tip data
    const thresholdDate = new Date(indexMonthsSelect)

    // creem un nou array care contine valorile de la data selectata in sus
    const filteredDates = dates.filter(date => new Date(date) >= thresholdDate)

    let lastMonthID 

    if(monthsAgo < filteredDates.length){
      lastMonthID = monthsAgo
    } else{
      lastMonthID = filteredDates.length - 1
    }

    // Curatim drop de fiecare data
    inputEndMonth.innerHTML = ''

    // Adaugam valorile deja filtrate in imputul end

    for (let i = 0; i < filteredDates.length; i++) {

      let shortYear = filteredDates[i].getFullYear().toString().slice(-2)
      let monthAbbreviation = filteredDates[i].toLocaleString('default', { month: 'short' })
      let formattedDate = filteredDates[i].toISOString().split('T')[0];

      ///console.log(lastMonthID === i)

  
      if (lastMonthID === i) {
        inputEndMonth.innerHTML += `<option value="${formattedDate}" selected>${monthAbbreviation} ${shortYear}</option>`
        filteringPeriods (`${listOfFilterGroupsChart.value}`, indexMonthsSelect, formattedDate)
      }else{
        inputEndMonth.innerHTML += `<option value="${formattedDate}">${monthAbbreviation} ${shortYear}</option>`
      }
  
    }

  })

  // Schimbarea lunii in inputul end

  inputEndMonth.addEventListener('input', function  () {

    // Extragem din input data selectata de tip string
    let indexStartMonthsSelect = inputStartMonth.value
    let indexEndMonthsSelect = inputEndMonth.value

    // Facem renderul la grafic
    filteringPeriods (`${listOfFilterGroupsChart.value}`, indexStartMonthsSelect, indexEndMonthsSelect)

  })


  function allExpensesFilterChart () {
    // Extragem din input data selectata de tip string
    let indexStartMonthsSelect = inputStartMonth.value
    let indexEndMonthsSelect = inputEndMonth.value

    // Facem renderul la grafic
    filteringPeriods (`${listOfFilterGroupsChart.value}`, indexStartMonthsSelect, indexEndMonthsSelect)
  }
  
  listOfFilterGroupsChart.addEventListener('input', allExpensesFilterChart)

})

filteringPeriods ("💎 Toate")

// Acest cod adauga data curenta in cimpurile cu data ----------------------

let currentDate = new Date().toISOString().slice(0, 10);
inputDate.value = currentDate;
inputIncomeDate.value = currentDate;
inputDateStartGroup.value = currentDate;

