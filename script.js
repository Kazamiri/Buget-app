import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js" //Funcția initializeApp este utilizată pentru a inițializa aplicația Firebase
import {getDatabase, ref, push, onValue, remove, update} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js" //Funcția getDatabase este utilizată pentru a obține o referință la instanța bazei de date. getDatabase, ref, push, și onValue din "firebase-database.js": Aceste funcții sunt utilizate pentru a interacționa cu baza de date în timp real Firebase.


const appSettings = {
  databaseURL: "https://buget-fb242-default-rtdb.europe-west1.firebasedatabase.app/"
} //appSettings este un obiect care conține configurația pentru inițializarea aplicației Firebase. Acesta specifică databaseURL, care este URL-ul bazei de date în timp real Firebase la care doriți să vă conectați.

const app = initializeApp(appSettings) //app este o variabilă care conține aplicația Firebase inițializată. Funcția initializeApp este apelată cu appSettings ca argument pentru a crea și inițializa aplicația.

const database = getDatabase(app) //database este o variabilă care conține o referință la instanța Firebase Realtime Database. Funcția getDatabase este apelată cu app ca argument pentru a prelua instanța bazei de date asociată cu aplicația inițializată.


const navButtonMonthLeft = document.getElementById('js-nav-left')
const navButtonMonthRight = document.getElementById('js-nav-right')
const navMonthTitle = document.getElementById('js-nav-month') // Acesta este componentul de navigare printre paginii. 


let addMonthPage = 0; // Aceasta este variabiala indica numarul dde oridne a lunii selectate

const allDateInDB = ref(database, `allMonths`) //Reprezintă o referință la locația grupelor de venituri, cheltuieli si grupe din baza de date.
const incomeInDB = ref(database, `allMonths/income`) //Reprezintă o referință la locația veniturilor din baza de date.
const expensesInDB = ref(database, "allMonths/expenses") //Reprezintă o referință la locația cheltuielilor din baza de date.
const groupsInDB = ref(database, "allMonths/groups") //Reprezintă o referință la locația grupelor din baza de date.


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
const inputDateEndGroup = document.getElementById('js-end-luna')
const addButtonGroup = document.getElementById("add-group") // Sunt cimpurile dim forma destinate pentru adaugarea cheltuielilor

const groupsList = document.getElementById('js-group-list') // Adaugarea listei de grupe pe pagina HTML



let inconHTMLValue = document.getElementById('js-arat-venituri')// Adaugarea suma veniturilor pe pagina HTML
let expenHtmlValue = document.getElementById('js-arat-cheltuieli')// Adaugarea suma cheltuielilor  pe pagina HTML js-allocated-money js-money-available
let allocatedMoneyHtmlValue = document.getElementById('js-allocated-money')
let availableIncomesHtmlValue = document.getElementById('js-available-incomes')

let incurredExpensesHtmlValue = document.getElementById('js-incurred-expenses')

let moneyAvailableHtmlValue = document.getElementById('js-money-available')




const nameMonthsDate = [
  { startDateMonth: '2023-08-01', endDateMonth: '2023-08-31'},
  { startDateMonth: '2023-07-01', endDateMonth: '2023-07-31'},
  { startDateMonth: '2023-06-01', endDateMonth: '2023-06-30'},
  { startDateMonth: '2023-05-01', endDateMonth: '2023-05-31'},
  { startDateMonth: '2023-04-01', endDateMonth: '2023-04-30'},
  { startDateMonth: '2023-03-01', endDateMonth: '2023-03-31'},
  { startDateMonth: '2023-02-01', endDateMonth: '2023-02-28'},
  { startDateMonth: '2023-01-01', endDateMonth: '2023-01-31'},
] // Aceasta este o matrice care este utilizata pentru testare a lunilor dupa perioada


navButtonMonthLeft.addEventListener("click", function () {
  if (addMonthPage != 0) {  
    addMonthPage --;
    listenAll ()
  } else {
    addMonthPage = 0
    listenAll ()
  }
}) // Aceasta functie scade cite o pagina si activeaza functia pentru redarea titlului

navButtonMonthRight.addEventListener("click", function () {
  if (addMonthPage < nameMonthsDate.length - 1) {  
    addMonthPage ++;
    listenAll ()
  } else {
    addMonthPage = nameMonthsDate.length - 1
    listenAll ()
  }
}) // Aceasta functie adauga cite o pagina si activeaza functia pentru redarea titlului



function listenAll () {
  onValue(allDateInDB, function(snapshot) {

    let itemsArray = Object.entries(snapshot.val()) 

    let monthsExpenses = Object.entries(itemsArray[0][1])
    let monthsIncomes = Object.entries(itemsArray[2][1])
    let monthsGroups = Object.entries(itemsArray[1][1])


    changeMonth (addMonthPage, monthsIncomes, monthsExpenses, monthsGroups)

  })
}


function changeMonth (numPage, actualIncomesBD, actualExpensesBD, actualGroupBD) {

  changeTitleMonth (numPage)

  let incomesMonths = selectFilteredSortMonth (numPage, actualIncomesBD)
  let expensesMonths = selectFilteredSortMonth (numPage, actualExpensesBD)
  let groupMonths = selectFilteredSortGroupMonth (numPage, actualGroupBD)
  let availableIncomes = fiterItem (incomesMonths, "state", "Venit")
  let pendingExpenses = fiterItem (expensesMonths, "state", "Cheltuit")
  let moneyAvailable = (calculateSum(availableIncomes)) - (calculateSum(pendingExpenses))


  readIncomes(incomesMonths) // Vizualizeaza datele pe pagina HTML
  incomesHtmlDate(calculateSum(incomesMonths))
  availableIncomesHtmlDate (calculateSum(availableIncomes))

  newDate (calculateSum(incomesMonths), calculateSum(availableIncomes), 'js-procente-available-incomes', 'loading-status-available-incomes', 7,'var(--color-functional-green-primary)')



  readExpenses(expensesMonths) // Vizualizeaza datele pe pagina HTML
  expensesHtmlDate (calculateSum(expensesMonths))
  incurredExpensesHtmlDate (calculateSum(pendingExpenses))

  newDate (calculateSum(incomesMonths), calculateSum(pendingExpenses), 'js-procente-incurred-expenses', 'loading-status-incurred-expenses', 7,'var(--color-functional-neo_fuchsia-primary)')

  newDate (calculateSum(incomesMonths), calculateSum(expensesMonths), 'js-procente', 'loading-status', 7, 'var(--color-functional-orange-primary)')

  //newDateArc (calculateSum(incomesMonths), calculateSum(expensesMonths) )



  readGroups(expensesMonths, groupMonths, calculateSum(incomesMonths))
  allocatedMoneyHtmlDate (calculateSum(groupMonths))
  moneyAvailableHtmlDate (moneyAvailable)

  newDate (calculateSum(incomesMonths), calculateSum(groupMonths), 'js-procente-groupa', 'loading-groupa', 7, 'var(--color-others-blue-primary)')

  newDate (calculateSum(availableIncomes), moneyAvailable, 'js-procente-money-available', 'loading-money-available', 7, 'var(--color-labels-secondary)')
  


}

function selectFilteredSortMonth (numPage, actualBD) {

  const curentSelectMonth = new Date(nameMonthsDate[numPage].startDateMonth).getMonth() + 1; // Extrage din matrice luna din obiectul a carui indice corespunde cu pagina selectata.
  const curentSelectYear = new Date(nameMonthsDate[numPage].startDateMonth).getFullYear(); // Extrage din matrice anul din obiectul a carui indice corespunde cu pagina selectata.

  let actualMonths = fileredActualMonths (curentSelectMonth, curentSelectYear, actualBD) // Extrage din masiv veniturile care corespund lunii si anului selectat

  return actualMonths.sort((a, b) => a[1].data.localeCompare(b[1].data)); // Sorteaza dupa data valorile extrase
}

function selectFilteredSortGroupMonth (numPage, actualBD) {

  const curentSelectMonth = new Date(nameMonthsDate[numPage].startDateMonth).getMonth() + 1; // Extrage din matrice luna din obiectul a carui indice corespunde cu pagina selectata.
  const curentSelectYear = new Date(nameMonthsDate[numPage].startDateMonth).getFullYear(); // Extrage din matrice anul din obiectul a carui indice corespunde cu pagina selectata.

  let actualMonths = fileredActualGroupMonths (curentSelectMonth, curentSelectYear, actualBD) // Extrage din masiv veniturile care corespund lunii si anului selectat

  return actualMonths.sort((a, b) => a[1].dataStart.localeCompare(b[1].dataStart)); // Sorteaza dupa data valorile extrase
}

function changeTitleMonth (numPage) {

  const titleMonths = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Noiembrie', 'Decembrie'] // Aceste valori sun utilizate pentru a arata pe pagina html care luna a fost selectata

  const curentSelectMonth = new Date(nameMonthsDate[numPage].startDateMonth).getMonth() + 1; // Extrage din matrice luna din obiectul a carui indice corespunde cu pagina selectata.
  const curentSelectYear = new Date(nameMonthsDate[numPage].startDateMonth).getFullYear(); // Extrage din matrice anul din obiectul a carui indice corespunde cu pagina selectata.
  const curentTitleMonth = titleMonths[curentSelectMonth - 1] // I se atribuie din masiv denumirea lunii care a carui indice corespunde cu luna curenta selectata.

  navMonthTitle.innerHTML =`${curentTitleMonth} ${curentSelectYear}` // I se atribuie denumirea lunii si anul lunii selectate.

}


function fileredActualMonths (month, year, bazaDate) {
  const filteredLuna = bazaDate.filter((luna) => {
    const entryDate = new Date(luna[1].data);
    const entryYear = entryDate.getFullYear();
    const entryMonth = entryDate.getMonth() + 1; // Months are zero-based, so we add 1.
    return entryYear === year && entryMonth === month;
  });
  return filteredLuna;
} // Selecteaz din baza cheltuielile care corespund cu anul si luna


function fileredActualGroupMonths (month, year, bazaDate) {
  const filteredLuna = bazaDate.filter((luna) => {
    const entryDate = new Date(luna[1].dataStart);
    const entryYear = entryDate.getFullYear();
    const entryMonth = entryDate.getMonth() + 1; // Months are zero-based, so we add 1.
    return entryYear === year && entryMonth === month;
  });
  return filteredLuna;
} // Selecteaz din baza cheltuielile care corespund cu anul si luna

//fiterGroup (groupTitle)


function fiterGroup (dataMonth, titleGroup) {
  let filteredObjects = dataMonth.filter(entry => entry[1].grupa === `${titleGroup}`);
  return filteredObjects
}
function fiterItem (dataMonth, titleItem, valueItem) {
  const filteredData = dataMonth.filter(item => item[1][titleItem] === valueItem);
  return filteredData
}


//const filteredData = data.filter(item => item[1]["state"] === "Venit");

addButtonIncome.addEventListener("click", function () {
  let addIncomeValue = {
    titlu: `${inputIncomeTitle.value}`,
    suma: `${inputIncomeSuma.value}`,
    data: `${inputIncomeDate.value}`,
    state: `${inputIncomeState.value}`,
    user: `${inputIncomeUser.value}`
  } // Atribuim proprietatilor din obiect valorile introduse in cimpurile venituri
  
  push(incomeInDB, addIncomeValue) // Adaugam obiectul cu valorile adugate de user in masivul firebase, venituri
  
})


addButtonExpenses.addEventListener("click", function () {
  let addExpensesValue = {
    grupa: `${inputGrupa.value}`,
    titlu: `${inputTitlu.value}`,
    suma: `${inputSuma.value}`,
    data: `${inputDate.value}`,
    state: `${inputState.value}`,
    level: `${inputLevel.value}`,
    user: `${inputUser.value}`
  } // Atribuim proprietatilor din obiect valorile introduse in cimpurile cheltuieli
  
  push(expensesInDB, addExpensesValue) // Adaugam obiectul cu valorile adugate de user in masivul firebase
  
})

addButtonGroup.addEventListener("click", function () {
  let addGroupValue = {
    titlu: `${inputGrupaTitlu.value}`,
    suma: `${inputSumaGrupa.value}`,
    dataStart: `${inputDateStartGroup.value}`,
    dataEnd: `${inputDateEndGroup.value}`,

  } // Atribuim proprietatilor din obiect valorile introduse in cimpurile venituri
  
  push(groupsInDB, addGroupValue) // Adaugam obiectul cu valorile adugate de user in masivul firebase, venituri
  
})



listenAll ()



function readIncomes(valueRead) {

  cleanLists(incomesList)

  for (let i = 0; i < valueRead.length; i++) {
    incomesList.innerHTML += `
    <div class="linie-tabel">

      <div class="expenses_list_group">
        <p class="num_style">${i + 1}</p>

        <input class="expenses_list_title" type="text" id="js-venit-titlu-${valueRead[i][0]}" value="${valueRead[i][1].titlu}">
      </div>
      
      <input class="expenses_list_suma" type="number" id="js-venit-suma-${valueRead[i][0]}" value="${valueRead[i][1].suma}">
      
      <input class="expenses_list_data" type="date" id="js-venit-data-${valueRead[i][0]}" value="${valueRead[i][1].data}">

      <select class="expenses_list_state" name="income-state" id="js-venit-state-${valueRead[i][0]}">
        <option value="${valueRead[i][1].state}" selected disabled hidden>${valueRead[i][1].state}</option>
        <option value="În așteptare">În așteptare</option>
        <option value="Venit">Venit</option>
      </select>

      <select class="expenses_list_state" name="grupe-utilizatori" id="js-venit-user-${valueRead[i][0]}">
        <option value="${valueRead[i][1].user}" selected disabled hidden>${valueRead[i][1].user}</option>
        <option value="Toti">Toti</option>
        <option value="Eugen">Eugen</option>
        <option value="Cris">Cris</option>
        <option value="Amelia">Amelia</option>
        <option value="Bianca">Bianca</option>
        <option value="Evelina">Evelina</option>
        <option value="Simona">Simona</option>
      </select>


      <div class="expenses_list_both-buttons" >
        <button class="expenses_list_button expenses_list_button_refresh" id="js-button-update-income" data-id="${valueRead[i][0]}">
        <span class="material-symbols-outlined">autorenew</span></button>
      <button class="expenses_list_button expenses_list_button_delete" id="js-button-delet-income" data-id="${valueRead[i][0]}">
        <span class="material-symbols-outlined">delete_forever</span>
        </button>
      </div>

    </div>`
  }

  upDateIncomes ('js-button-update-income', 'allMonths/income')

  deletItem ('js-button-delet-income', 'allMonths/income')

} // Functia data citeste masivul si il vizualizeaza lista de venituri pe pagina de baza



function readExpenses(valueRead) {

  cleanLists(expensesList) // Curata lista in HTML si adauga din nou noile valori

  for (let i = 0; i < valueRead.length; i++) {
    expensesList.innerHTML += `
    <div class="linie-tabel" >

    <div class="expenses_list_group">

    <p class="num_style">${i + 1}</p>

    <select class="expenses_list_group_icon" name="grupe-cheltuieli" id="js-grupe-${valueRead[i][0]}">
      <option value="${valueRead[i][1].grupa}" selected disabled hidden>${valueRead[i][1].grupa}</option>
      <option value="🚴🏻 Piață">🚴🏻 Piață</option>
      <option value="🚪 Gazdă">🚪 Gazdă</option>
      <option value="🍔 Market">🍔 Market</option>
      <option value="🛀 Igienă">🛀 Igienă</option>
      <option value="💊 Farmacie">💊 Farmacie</option>
      <option value="🧸 Jucării">🧸 Jucării</option>
      <option value="👚 Haine">👚 Haine</option>
      <option value="🚸 Grădiniță">🚸 Grădiniță</option>
      <option value="🏫 Școală">🏫 Școală</option>
      <option value="💶 Investiți">💶 Investiți</option>
      <option value="🏥 Spital">🏥 Spital</option>
      <option value="📱 Telefoane">📱 Telefoane</option>
      <option value="📆 Abonamente">📆 Abonamente</option>
      <option value="🚌 Transport">🚌 Transport</option>
      <option value="🎟️ Unitare">🎟️ Unitare</option>
    </select>

    </div>

      <input class="expenses_list_title" type="text" id="js-titlu-${valueRead[i][0]}" value="${valueRead[i][1].titlu}">

      
      <input class="expenses_list_suma" type="number" id="js-suma-${valueRead[i][0]}" value="${valueRead[i][1].suma}">

      <input class="expenses_list_data" type="date" id="js-data-${valueRead[i][0]}" value="${valueRead[i][1].data}">

      <select class="expenses_list_state" name="grupe-cheltuieli" id="js-state-${valueRead[i][0]}">
        <option value="${valueRead[i][1].state}" selected disabled hidden>${valueRead[i][1].state}</option>
        <option value="În așteptare">În așteptare</option>
        <option value="Cheltuit">Cheltuit</option>
      </select>

      <select class="expenses_list_state" name="grupe-level" id="js-level-${valueRead[i][0]}">
        <option value="${valueRead[i][1].level}" selected disabled hidden>${valueRead[i][1].level}</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select class="expenses_list_state" name="grupe-utilizatori" id="js-user-${valueRead[i][0]}">
        <option value="${valueRead[i][1].user}" selected disabled hidden>${valueRead[i][1].user}</option>
        <option value="Toti">Toti</option>
        <option value="Eugen">Eugen</option>
        <option value="Cris">Cris</option>
        <option value="Amelia">Amelia</option>
        <option value="Bianca">Bianca</option>
        <option value="Evelina">Evelina</option>
        <option value="Simona">Simona</option>
      </select>

      <div class="expenses_list_both-buttons" >
        <button class="expenses_list_button expenses_list_button_refresh" id="js-button-updata-expenses" data-id="${valueRead[i][0]}">
        <span class="material-symbols-outlined">autorenew</span></button>
      <button class="expenses_list_button expenses_list_button_delete" id="js-button-delet-expenses" data-id="${valueRead[i][0]}">
        <span class="material-symbols-outlined">delete_forever</span>
      </button>
      </div>

    </div>`
  }

  upDataExpenses ('js-button-updata-expenses', 'allMonths/expenses')

  deletItem ('js-button-delet-expenses', 'allMonths/expenses')

} // Functia data citeste masivul si il vizualizeaza lista de cheltuieli pe pagina de baza



function readGroups(expensesBD, groupBD, incomesAll) {

  let expensesLow = fiterItem (expensesBD, "level", "Low")
  let expensesMedium = fiterItem (expensesBD, "level", "Medium")
  let expensesHigh = fiterItem (expensesBD, "level", "High")

  cleanLists(groupsList) // Curata lista in HTML si adauga din nou noile valori

  for (let i = 0; i < groupBD.length; i++) {
    let areLeft  = groupBD[i][1].suma - calculateSum(fiterGroup (expensesBD, groupBD[i][1].titlu))

    let percentOfTotal = diference(incomesAll, groupBD[i][1].suma).toFixed(0);

    let diferenceLow = diference(calculateSum(fiterGroup (expensesBD, groupBD[i][1].titlu)), calculateSum(fiterGroup (expensesLow, groupBD[i][1].titlu))).toFixed(0);

    let diferenceMedium = diference(calculateSum(fiterGroup (expensesBD, groupBD[i][1].titlu)), calculateSum(fiterGroup (expensesMedium, groupBD[i][1].titlu))).toFixed(0);

    let diferenceHigh = diference(calculateSum(fiterGroup (expensesBD, groupBD[i][1].titlu)), calculateSum(fiterGroup (expensesHigh, groupBD[i][1].titlu))).toFixed(0);


    groupsList.innerHTML += `
      <div class="linie-tabel" >

      <div class="expenses_list_group">
        <p class="num_style">${i + 1}</p>

        <select class="expenses_list_group_icon" name="grupe-cheltuieli" id="js-grupe-titlu-${groupBD[i][0]}">
          <option value="${groupBD[i][1].titlu}" selected disabled hidden>${groupBD[i][1].titlu}</option>
            <option value="🚴🏻 Piață">🚴🏻 Piață</option>
            <option value="🚪 Gazdă">🚪 Gazdă</option>
            <option value="🍔 Market">🍔 Market</option>
            <option value="🛀 Igienă">🛀 Igienă</option>
            <option value="💊 Farmacie">💊 Farmacie</option>
            <option value="🧸 Jucării">🧸 Jucării</option>
            <option value="👚 Haine">👚 Haine</option>
            <option value="🚸 Grădiniță">🚸 Grădiniță</option>
            <option value="🏫 Școală">🏫 Școală</option>
            <option value="💶 Investiți">💶 Investiți</option>
            <option value="🏥 Spital">🏥 Spital</option>
            <option value="📱 Telefoane">📱 Telefoane</option>
            <option value="📆 Abonamente">📆 Abonamente</option>
            <option value="🚌 Transport">🚌 Transport</option>
            <option value="🎟️ Unitare">🎟️ Unitare</option>
        </select>

      </div>

        <div class="suma_percent_all_group">
          <input class="expenses_list_suma" type="number" id="js-grupe-suma-${groupBD[i][0]}" value="${groupBD[i][1].suma}">
          <p class="percent_all_group">${percentOfTotal}%</p>
        </div>

        <p class="rest_all_group">Ramași ${areLeft} lei</p>

        <div class="dim-procente-second">
          <div id="js-${groupBD[i][1].titlu}" class="procente-second"> 
          <div class="low" style="width:${diferenceLow}%;"></div>
          <div class="medium" style="width:${diferenceMedium}%;"></div>
          <div class="high" style="width:${diferenceHigh}%;"></div>
          </div>
          <p id="loading-${groupBD[i][1].titlu}" class="procente-style-second">10%</p>
        </div>

        <div class="expenses_list_both-buttons" >
          <button class="expenses_list_button expenses_list_button_refresh" id="js-button-update-group" data-id="${groupBD[i][0]}">
          <span class="material-symbols-outlined">autorenew</span></button>
          <button class="expenses_list_button expenses_list_button_delete" id="js-button-delet-group" data-id="${groupBD[i][0]}">
          <span class="material-symbols-outlined">delete_forever</span>
          </button>
        </div>
      </div>`

      newDate (groupBD[i][1].suma, calculateSum(fiterGroup (expensesBD, groupBD[i][1].titlu)), `js-${groupBD[i][1].titlu}`, `loading-${groupBD[i][1].titlu}`,10)

  }  

  upDateGroups ('js-button-update-group', 'allMonths/groups')

  deletItem ('js-button-delet-group', 'allMonths/groups')

} // Functia data citeste masivul si il vizualizeaza lista de cheltuieli pe pagina de baza



function upDateIncomes (idButonSelector, locationFile) {

  const allButtonUpdateItems = document.querySelectorAll(`#${idButonSelector}`)

  allButtonUpdateItems.forEach((button) => {

    button.addEventListener('click', () => {
      const inputTitleItems = document.querySelector(`#js-venit-titlu-${button.dataset.id}`)
      const inputSumaItems = document.querySelector(`#js-venit-suma-${button.dataset.id}`)
      const inputDataItems = document.querySelector(`#js-venit-data-${button.dataset.id}`)
      const inputStateItems = document.querySelector(`#js-venit-state-${button.dataset.id}`)
      const inputUserItems = document.querySelector(`#js-venit-user-${button.dataset.id}`)

      let exactLocationOfItemInDB = ref(database, `${locationFile}/${button.dataset.id}`)

      update(exactLocationOfItemInDB, {titlu:`${inputTitleItems.value}`})
      update(exactLocationOfItemInDB, {suma:inputSumaItems.value})
      update(exactLocationOfItemInDB, {data:inputDataItems.value})
      update(exactLocationOfItemInDB, {state:`${inputStateItems.value}`})
      update(exactLocationOfItemInDB, {user:`${inputUserItems.value}`})

    })
  })
} //Functia data reinoieste un item cum ar fi un venit, o cheltuiala, o grupa

function upDataExpenses (idButonSelector, locationFile) {

  const allButtonUpdateItems = document.querySelectorAll(`#${idButonSelector}`)

  allButtonUpdateItems.forEach((button) => {

    button.addEventListener('click', () => {
      const inputGroupsItems = document.querySelector(`#js-grupe-${button.dataset.id}`)
      const inputTitleItems = document.querySelector(`#js-titlu-${button.dataset.id}`)
      const inputSumaItems = document.querySelector(`#js-suma-${button.dataset.id}`)
      const inputDataItems = document.querySelector(`#js-data-${button.dataset.id}`)
      const inputStateItems = document.querySelector(`#js-state-${button.dataset.id}`)
      const inputLevelItems = document.querySelector(`#js-level-${button.dataset.id}`)
      const inputUserItems = document.querySelector(`#js-user-${button.dataset.id}`)

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
} //Functia data reinoieste un item cum ar fi un venit, o cheltuiala, o grupa

function upDateGroups (idButonSelector, locationFile) {

  const allButtonUpdateItems = document.querySelectorAll(`#${idButonSelector}`)

  allButtonUpdateItems.forEach((button) => {

    button.addEventListener('click', () => {
      const inputTitleItems = document.querySelector(`#js-grupe-titlu-${button.dataset.id}`)

      const inputSumaItems = document.querySelector(`#js-grupe-suma-${button.dataset.id}`)

      let exactLocationOfItemInDB = ref(database, `${locationFile}/${button.dataset.id}`)

      update(exactLocationOfItemInDB, {titlu:`${inputTitleItems.value}`})
      update(exactLocationOfItemInDB, {suma:inputSumaItems.value})

    })
  })
} //Functia data reinoieste un item cum ar fi un venit, o cheltuiala, o grupa

function deletItem (idButonSelector, locationFile) {

  const allButtonDeleteExpenses = document.querySelectorAll(`#${idButonSelector}`)

  allButtonDeleteExpenses.forEach((button) => {
    button.addEventListener('click', () => {
      let exactLocationOfItemInDB = ref(database, `${locationFile}/${button.dataset.id}`)
      remove(exactLocationOfItemInDB)
    })
  })
} //Functia data sterge un item cum ar fi un venit, o cheltuiala, o grupa



function calculateSum(addArray) {
  const sumAll = []; // In acest masiv sunt stocate sumele cheltuielilor

  for (let i = 0; i < addArray.length; i++) {
    sumAll.push(parseInt(addArray[i][1].suma));
  } // Adauga sumele cheltuielilor in masiv si le schimba in numere

  const sum = sumAll.reduce((accumulator, currentValue) => accumulator + currentValue, 0); // Sumeaza taote sumele

  for (let i = 0; i < sumAll.length; i++) {
    sumAll.splice(i); // Sterge toate valorile din masiv
  }

  return sum;
} // Aceasta functie calculeaza suma tuturor valorilor din masivul adaugat in argument


function cleanLists(addlist) {
  addlist.innerHTML = ''
} // Functia este destinata pentru a curata listele indicate in argument



function incomesHtmlDate (value) {
  let valueHTML = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  inconHTMLValue.innerHTML =`<p>${valueHTML} <span class="styled-lei">lei</span></p>`
} // functia data vizualizaeza veniturile totale pe luna

function availableIncomesHtmlDate (value) {
  let valueHTML = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  availableIncomesHtmlValue.innerHTML =`<p>${valueHTML} <span class="styled-lei">lei</span></p>`
} // functia data vizualizaeza veniturile totale pe luna Available income

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

/*function newDateArc (minued, subtrahend ) {

  const procenteCheltuie = diference(minued, subtrahend).toFixed(0);

  let canvas = document.getElementById('c1')
  let ctx = canvas.getContext('2d')
  let pi = Math.PI

  let percent = procenteCheltuie;
  let degree = percent * 3.6;
  let radian = (Math.PI / 180) * degree;

  ctx.clearRect(0, 0, 400, 400)

  ctx.beginPath()
  ctx.lineWidth = 20;
  ctx.strokeStyle = 'rgba(254, 152, 112, 0.1)'
  ctx.arc(200, 200, 180, 0, 2*pi, false)
  ctx.stroke()

  ctx.beginPath()
  ctx.lineWidth = 20;
  ctx.strokeStyle = 'rgba(254, 152, 112, 1)'
  ctx.arc(200, 200, 180, 0, radian, false)
  ctx.lineCap = "round"
  ctx.stroke()

  ctx.fillStyle = 'rgba(254, 152, 112, 1)'
  ctx.font = "bold 60px sans-serif";
  ctx.fillText(`${procenteCheltuie} %`, 160, 230)
  
}*/

function diference (dividend, divisor) {
  let venProcente = dividend /100
  let chelProcente = divisor/venProcente
  return chelProcente
}









