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
const allMonthsInDB = ref(database, `allMonths/months`) 


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

// De aici se incepe 
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

// Adaugarea mecanismului de filtrare

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
})

// Functiile de adaugare a itemilor

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

addButtonGroup.addEventListener("click", function () {
  const allMonthsInDBGroups = ref(database, `allMonthsSecond/${navigateByMonth (clicks)}/groups`)

  let addGroupsValue = {
    titlu: `${inputGrupaTitlu.value}`,
    suma: `${inputSumaGrupa.value}`,
  } 
  push(allMonthsInDBGroups, addGroupsValue)
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

  console.log(listOfFilterGroups.value)

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

  //----------------------------------------------------

  //readExpenses(monthsExpenses, curentSelectMonth) // Vizualizeaza datele pe pagina HTML
  expensesHtmlDate (calculateSum(monthsExpenses))
  incurredExpensesHtmlDate (calculateSum(pendingExpenses))


  newDateArc ('c1', calculateSum(monthsIncomes), calculateSum(monthsExpenses), 'rgba(254, 152, 112, 1)', calculateSum(monthsIncomes), calculateSum(pendingExpenses), 'rgba(250, 65, 105, 1)' )



  readGroups(monthsExpenses, monthsGroups, calculateSum(monthsIncomes),curentSelectMonth)
  allocatedMoneyHtmlDate (calculateSum(monthsGroups))
  moneyAvailableHtmlDate (moneyAvailable)

  newDateArc ('c2', calculateSum(monthsIncomes), calculateSum(monthsGroups), 'rgba(37, 116, 255, 1)', calculateSum(availableIncomes), moneyAvailable, 'rgba(235, 235, 245, 0.60)' )



  levelExpenseseStatistics (diference (calculateSum(monthsExpenses), calculateSum(fiterItem (monthsExpenses, "level", "Low"))),diference (calculateSum(monthsExpenses), calculateSum(fiterItem (monthsExpenses, "level", "Medium"))),diference (calculateSum(monthsExpenses), calculateSum(fiterItem (monthsExpenses, "level", "High"))))

  levelExpensese(monthsIncomes, monthsExpenses)

  levelExpenseseValue (calculateSum(fiterItem (monthsExpenses, "level", "High")), calculateSum(fiterItem (monthsExpenses, "level", "Medium")), calculateSum(fiterItem (monthsExpenses, "level", "Low")),)


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

const firstThreeIncomes = [];
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

})

// Efectueaza crearea lunii
addButtonMonth.addEventListener("click", function () {

    // Extragem informatia despre luna si anul selectat
    let addYearT = inputAddYear.value
    let addMonthT = inputAddMonth.value
    let addYearMonthT = `${addYearT}-${addMonthT}-01`

  //Adauga veniturile ce se repeta in luna creata cu media din ultimile trei
  for (let i = 0; i < firstThreeIncomes.length; i++) {

    const firstObject = firstThreeIncomes[i][1].titlu
    const filteredData = secondThreeIncomes.filter((item) => item[1].titlu === firstObject);

    const allMonthsInDBIncomes = ref(database, `allMonthsSecond/${addYearMonthT}/incomes`)

    if (filteredData.length > 0) {

      let sumaDecimal = calculateSum(filteredData)/filteredData.length
      let roundedNum = Math.round(sumaDecimal);

      let addIncomeValue = {
        titlu: `${firstObject}`,
        suma: `${roundedNum}`,
        data: `${addYearMonthT}`,
        state: "În așteptare",
        user: "Toti"
      } 
      //console.log(addIncomeValue)
      push(allMonthsInDBIncomes, addIncomeValue)
    }

  }

  //Adauga cheltuielile ce se repeta in luna creata cu media din ultimile trei
  for (let i = 0; i < firstThreeExpenses.length; i++) {

    const firstObject = firstThreeExpenses[i][1].titlu
    const filteredData = secondThreeExpenses.filter((item) => item[1].titlu === firstObject);

    const allMonthsInDBExpenses = ref(database, `allMonthsSecond/${addYearMonthT}/expenses`)

    if (filteredData.length > 0) {

      let sumaDecimal = calculateSum(filteredData)/filteredData.length
      let roundedNum = Math.round(sumaDecimal);

      let addExpensesValue = {
        grupa: `${filteredData[0][1].grupa}`,
        titlu: `${firstObject}`,
        suma: `${roundedNum}`,
        data: `${addYearMonthT}`,
        state: "În așteptare",
        level: "Low",
        user: "Toti"
      } 
      push(allMonthsInDBExpenses, addExpensesValue) 
      //console.log(addExpensesValue)
    }

  }

  //Adauga grupele in luna creata cu media din ultimile trei
  for (let i = 0; i < allGroupType.length; i++) {
  
    const filteredData = allthreeGroup.filter((item) => {
      return item[1].titlu === `${allGroupType[i].titlu}`;
    });
    
    let sumItemTitle = (calculateSum(filteredData)/3).toFixed(0);
    const allMonthsInDBGroups = ref(database, `allMonthsSecond/${addYearMonthT}/groups`)

    let addGroupsValue = {
      titlu: `${allGroupType[i].titlu}`,
      suma: `${sumItemTitle}`,
    } 
    //console.log(addGroupsValue)
    push(allMonthsInDBGroups, addGroupsValue)
  }

  modulAddMonth.close()

})

openModulAddMonth.addEventListener("click", function () {
  modulAddMonth.show()
})

closeModulAddMonth.addEventListener("click", function () {
  modulAddMonth.close()
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
    <div class="linie-tabel" id="js-item-line-one-income" data-id="${monthsIncomes[i][0]}">

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
          <button class="expenses_list_button expenses_list_button_refresh" id="js-button-update-income" data-id="${monthsIncomes[i][0]}">
          <span class="material-symbols-outlined">autorenew</span></button>
          <button class="expenses_list_button expenses_list_button_delete" id="js-button-delet-income" data-id="${monthsIncomes[i][0]}">
          <span class="material-symbols-outlined">delete_forever</span>
          </button>
        </div>
      </div>
  
    </div>`

    newDateRefreshExpenses (`js-item-line-one-income`, 'js-button-update-income' )

    upDateIncomes ('js-button-update-income', `${curentSelectMonth}/incomes`)
  
    deletItem ('js-button-delet-income', `${curentSelectMonth}/incomes`)

  }

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
      <div class="linie-tabel" id="js-item-line-one" data-id="${monthsExpenses[i][0]}">

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
            <button class="expenses_list_button expenses_list_button_refresh" id="js-button-updata-expenses" data-id="${monthsExpenses[i][0]}">
              <span class="material-symbols-outlined">autorenew</span>
            </button>
            <button class="expenses_list_button expenses_list_button_delete" id="js-button-delet-expenses" data-id="${monthsExpenses[i][0]}">
              <span class="material-symbols-outlined">delete_forever</span>
            </button>
          </div>
        
        </div>

      </div>`

      newDateRefreshExpenses (`js-item-line-one`, 'js-button-updata-expenses' )

      upDataExpenses ('js-button-updata-expenses', `${curentSelectMonth}/expenses`)
    
      deletItem ('js-button-delet-expenses', `${curentSelectMonth}/expenses`)

    }
    inputGrupa.innerHTML = `${optionsHTML}`
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
        <div class="linie-tabel" id="js-item-line-one-group" data-id="${monthsGroups[i][0]}">
    
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
              <button class="expenses_list_button expenses_list_button_refresh" id="js-button-update-group" data-id="${monthsGroups[i][0]}">
              <span class="material-symbols-outlined">autorenew</span></button>
              <button class="expenses_list_button expenses_list_button_delete" id="js-button-delet-group" data-id="${monthsGroups[i][0]}">
              <span class="material-symbols-outlined">delete_forever</span>
              </button>
            </div>
        </div>

        </div>`
  
        newDate (monthsGroups[i][1].suma, calculateSum(fiterGroup (monthsExpenses, monthsGroups[i][1].titlu)), `js-${monthsGroups[i][1].titlu}`, `loading-${monthsGroups[i][1].titlu}`,10)

        newDateRefreshExpenses (`js-item-line-one-group`, 'js-button-update-group' )

        upDateGroups ('js-button-update-group', `${curentSelectMonth}/groups`)
      
        deletItem ('js-button-delet-group', `${curentSelectMonth}/groups`)
    }  
    inputGrupaTitlu.innerHTML = `${optionsHTML}`

  })



} 

//Ceva cu corectarea punctului de la grupe
function pointPositionCorrection (itemValue){
  let diference = itemValue
  if (diference > 0) {
    diference = diference - 2
  }
  return diference
}

//Functia data reinoieste un venit din lista
function upDateIncomes (idButonSelector, locationFile) {

  const allButtonUpdateItems = document.querySelectorAll(`#${idButonSelector}`)

  allButtonUpdateItems.forEach((button) => {

    button.addEventListener('click', (event) => {
      const inputTitleItems = document.querySelector(`#js-venit-titlu-${button.dataset.id}`)
      const inputSumaItems = document.querySelector(`#js-venit-suma-${button.dataset.id}`)
      const inputDataItems = document.querySelector(`#js-venit-data-${button.dataset.id}`)
      const inputStateItems = document.querySelector(`#js-venit-state-${button.dataset.id}`)
      const inputUserItems = document.querySelector(`#js-venit-user-${button.dataset.id}`)

      let itemOneLineSelect = document.querySelector(`#js-button-update-income[data-id="${button.dataset.id}"]`)
      itemOneLineSelect.style.color = 'var(--color-functional-green-quarternary)'

      event.stopPropagation()

      let exactLocationOfItemInDB = ref(database, `${locationFile}/${button.dataset.id}`)

      update(exactLocationOfItemInDB, {titlu:`${inputTitleItems.value}`})
      update(exactLocationOfItemInDB, {suma:inputSumaItems.value})
      update(exactLocationOfItemInDB, {data:inputDataItems.value})
      update(exactLocationOfItemInDB, {state:`${inputStateItems.value}`})
      update(exactLocationOfItemInDB, {user:`${inputUserItems.value}`})

    })
  })
} 


function newDateRefreshExpenses (lineItem, buttonItem) {

  const allItemLine = document.querySelectorAll(`#${lineItem}`)

  allItemLine.forEach((line) => {
    line.addEventListener('click', () => {
      let itemOneLineSelect = document.querySelector(`#${buttonItem}[data-id="${line.dataset.id}"]`)
      itemOneLineSelect.style.color = 'var(--color-functional-green-secondary)'
    })
  })
}

//Functia data reinoieste o cheltuiala din lista
function upDataExpenses (idButonSelector, locationFile) {

  const allButtonUpdateItems = document.querySelectorAll(`#${idButonSelector}`)

  allButtonUpdateItems.forEach((button) => {

    button.addEventListener('click', (event) => {
      const inputGroupsItems = document.querySelector(`#js-grupe-${button.dataset.id}`)
      const inputTitleItems = document.querySelector(`#js-titlu-${button.dataset.id}`)
      const inputSumaItems = document.querySelector(`#js-suma-${button.dataset.id}`)
      const inputDataItems = document.querySelector(`#js-data-${button.dataset.id}`)
      const inputStateItems = document.querySelector(`#js-state-${button.dataset.id}`)
      const inputLevelItems = document.querySelector(`#js-level-${button.dataset.id}`)
      const inputUserItems = document.querySelector(`#js-user-${button.dataset.id}`)

      let itemOneLineSelect = document.querySelector(`#js-button-updata-expenses[data-id="${button.dataset.id}"]`)
      itemOneLineSelect.style.color = 'var(--color-functional-green-quarternary)'

      event.stopPropagation()
  
      let exactLocationOfItemInDB = ref(database, `${locationFile}/${button.dataset.id}`)

      update(exactLocationOfItemInDB, {grupa:`${inputGroupsItems.value}`})
      update(exactLocationOfItemInDB, {titlu:`${inputTitleItems.value}`})
      update(exactLocationOfItemInDB, {suma:inputSumaItems.value})
      update(exactLocationOfItemInDB, {data:inputDataItems.value})
      update(exactLocationOfItemInDB, {state:`${inputStateItems.value}`})
      update(exactLocationOfItemInDB, {level:`${inputLevelItems.value}`})
      update(exactLocationOfItemInDB, {user:`${inputUserItems.value}`})

    })
  })
}


//Functia data reinoieste o grupa
function upDateGroups (idButonSelector, locationFile) {

  const allButtonUpdateItems = document.querySelectorAll(`#${idButonSelector}`)

  allButtonUpdateItems.forEach((button) => {

    button.addEventListener('click', (event) => {

      const inputTitleItems = document.querySelector(`#js-grupe-titlu-${button.dataset.id}`)

      const inputSumaItems = document.querySelector(`#js-grupe-suma-${button.dataset.id}`)

      let itemOneLineSelect = document.querySelector(`#js-button-update-group[data-id="${button.dataset.id}"]`)
      itemOneLineSelect.style.color = 'var(--color-functional-green-quarternary)'

      event.stopPropagation()

      let exactLocationOfItemInDB = ref(database, `${locationFile}/${button.dataset.id}`)

      update(exactLocationOfItemInDB, {titlu:`${inputTitleItems.value}`})
      update(exactLocationOfItemInDB, {suma:inputSumaItems.value})

    })
  })
}

//Functia data sterge un item cum ar fi un venit, o cheltuiala, o grupa
function deletItem (idButonSelector, locationFile) {
  
  const allButtonDeleteExpenses = document.querySelectorAll(`#${idButonSelector}`)

  allButtonDeleteExpenses.forEach((button) => {
    button.addEventListener('click', () => {

      let exactLocationOfItemInDB = ref(database, `${locationFile}/${button.dataset.id}`)
      remove(exactLocationOfItemInDB)
    })
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

function levelExpenseseStatistics (valueLow, valueMedium, valueHigh) {
  
  let canvas = document.getElementById('c6')
  let ctx = canvas.getContext('2d')
  let pi = Math.PI

  let rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * devicePixelRatio;
  canvas.height = rect.height * devicePixelRatio; 

  ctx.scale(devicePixelRatio, devicePixelRatio);

  canvas.style.width = rect.width + "px"
  canvas.style.height = rect.height + "px"


  function radianCalc (percentItem) {
    let percent = percentItem;
    let degree = percent * 3.6;
    let radian = (Math.PI / 180) * degree;
    return radian
  }

    let low = radianCalc (valueLow)
    let medium = radianCalc (valueLow) + radianCalc (valueMedium);
    let high = radianCalc (valueLow) + radianCalc (valueMedium) + radianCalc (valueHigh);

  ctx.clearRect(0, 0, 112, 112)


  ctx.beginPath()
  ctx.lineWidth = 56;
  ctx.strokeStyle = '#27282A'
  ctx.arc(56, 56, 28, 0, 2*pi, false)
  ctx.stroke()

 ctx.beginPath()
  ctx.lineWidth = 56;
  ctx.strokeStyle = '#0EAD69'
  ctx.arc(56, 56, 28, 0, low, false)
  ctx.stroke()

  ctx.beginPath()
  ctx.lineWidth = 56;
  ctx.strokeStyle = '#FE9870'
  ctx.arc(56, 56, 28, low, medium, false)
  ctx.stroke()

  ctx.beginPath()
  ctx.lineWidth = 56;
  ctx.strokeStyle = '#FA4169'
  ctx.arc(56, 56, 28, medium, high, false)
  ctx.stroke()
}

function levelExpensese (incomes, expenses) {

  let canvas = document.getElementById('c7')
  let ctx = canvas.getContext('2d')
  
  ctx.clearRect(0, 0, 1560, 520)

  ctx.beginPath()
  ctx.strokeStyle = '#FE9870'
  ctx.lineWidth = 2;
  ctx.moveTo(0, 520)
  ctx.lineTo(1560, 0)
  ctx.stroke()

  // Initialize variables to store the smallest and largest dates
  let smallestDate = new Date(expenses[0][1].data);
  let largestDate = new Date(expenses[0][1].data);


  // Iterate through the data and update the smallest and largest dates
  for (const item of expenses) {
      const currentDate = new Date(item[1].data);
      if (currentDate < smallestDate) {
          smallestDate = currentDate;
      }
      if (currentDate > largestDate) {
          largestDate = currentDate;
      }
  }


  // Convert the smallest and largest dates back to string format
  const smallestDateString = smallestDate.toISOString().split('T')[0];
  const largestDateString = largestDate.toISOString().split('T')[0];

  const [, , , , , , , , one, two ] = largestDateString;
  const todayDateStr = one + two
  var todayDateNum = parseInt(todayDateStr, 10);


  for (let i = 0; i < todayDateNum; i++) {

    let resultDate = smallestDate.toISOString().split('T')[0];
  
    let procent = diference (calculateSum(incomes), calculateSum(filterPeriod(expenses, smallestDateString, resultDate)))
    
    smallestDate.setDate(smallestDate.getDate() + 1);

    ctx.beginPath()
    ctx.strokeStyle = '#0EAD69'
    ctx.lineWidth = 5;
    ctx.moveTo(0 + (i * 52), 520 - (procent*5.2))
    ctx.lineTo(52 + (i * 52), 520 - (procent*5.2))
    ctx.stroke()
  }

  
  // Functionalul de evidentiere a zilei curente
  let currentDateStat = new Date().toISOString().slice(8, 10);
  var todayDateNumStat = parseInt(currentDateStat, 10);
  let dataStat = todayDateNumStat-1;

  ctx.beginPath()
  ctx.fillStyle = "rgba(14, 173, 105, 0.20)";
  ctx.fillRect(52 * dataStat, 0, 52, 520);


  /*if(window.innerWidth <= 575) {
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(235, 235, 245, 0.30)'
    ctx.lineWidth = 6;
    ctx.moveTo(22 + (52 * dataStat), 512)
    ctx.lineTo(30 + (52 * dataStat), 512)
    ctx.lineCap = "round"
    ctx.stroke()
  } else{
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(235, 235, 245, 0.30)'
    ctx.lineWidth = 8;
    ctx.moveTo(26 + (52 * dataStat), 512)
    ctx.lineTo(26 + (52 * dataStat), 512)
    ctx.lineCap = "round"
    ctx.stroke()
  }*/

}

function levelExpenseseValue (valueHigh, valueMedium, valueLow) {
  const levelTitleHigh = document.getElementById('js-title-high')
  const levelTitleMedium = document.getElementById('js-title-medium')
  const levelTitleLow = document.getElementById('js-title-low')

  let valueStringHigh = valueHigh.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  let valueStringMedium = valueMedium.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  let valueStringLow = valueLow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  levelTitleHigh.innerHTML = `<p>High: <span class="level_text_title_bold">${valueStringHigh}</span> lei</p>`
  levelTitleMedium.innerHTML = `<p>Medium: <span class="level_text_title_bold">${valueStringMedium}</span> lei</p>`
  levelTitleLow.innerHTML = `<p>Low: <span class="level_text_title_bold">${valueStringLow}</span> lei</p>`

}

function filterPeriod (data, startDate, endDate) {

  //const startDate = '2023-09-01';
  //const endDate = '2023-09-02';
  
  const filteredData = data.filter(([_, item]) => {
    const itemDate = item.data;
    return itemDate >= startDate && itemDate <= endDate;
  });
  
  return filteredData
}

let currentDate = new Date().toISOString().slice(0, 10);
inputDate.value = currentDate;
inputIncomeDate.value = currentDate;
inputDateStartGroup.value = currentDate;
