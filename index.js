class Person {
    constructor(name, expense_map) {
        this.name = name;
        this.expense_map = expense_map;
    }
}

class Expense {
    constructor(name, personThatPayed, otherPeople, cost) {
        this.name = name;
        this.personThatPayed = personThatPayed;
        this.otherPeople = otherPeople;
        this.cost = cost;
    }
}

let peopleList = new Array();
let expenseList = new Array();
let balance = new Map();
let title ='';

function addTitle() {
    var text = document.getElementById("showTitle");
    text.style.display = "none";
    title = text.value;
    let tit = document.getElementById("trip");
    tit.append(title);
    var text = document.getElementById("addTitle");
    text.style.display = "none";
    var text = document.getElementById("addPersonButton");
    text.style.display = "block";
    var text = document.getElementById("addExpenseButton");
    text.style.display = "block";
}

function showPersonInput() {
    var text = document.getElementById("showPerson");
    if (!text.style.display) {
        text.style.display = "none";
    }
    if (text.style.display === "none") {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
    var text = document.getElementById("addPerson");
    if (!text.style.display) {
        text.style.display = "none";
    }
    if (text.style.display === "none") {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

function addPerson() {
    let name = document.getElementById("showPerson").value;
    let expense_map = new Map();
    peopleList.push(p = new Person(name,expense_map));
    printPeople()
    var text = document.getElementById("peopleLabel");
    text.style.display = "block";
}

function printPeople() {
    let list = document.getElementById("peopleList");
    let li = document.createElement("li");
    li.innerText = peopleList[peopleList.length-1].name;
    list.appendChild(li);
}

function addExpense() {
    var text = document.getElementById("showExpense");
    text.style.display = "block";
    var text = document.getElementById("paidByLabel");
    text.style.display = "block";
    var text = document.getElementById("usedByLabel");
    text.style.display = "block";
    var text = document.getElementById("addExpense");
    text.style.display = "block";
    var text = document.getElementById("showPrice");
    text.style.display = "block";
    peopleList.forEach((person)=>{
        const id = `person-${person}`;
        const label = document.createElement('label');
        label.setAttribute("for", id);
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "person";
        checkbox.value = person.name;
        checkbox.id = id;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(person.name));
        document.querySelector("#checkboxes").appendChild(label);
    });
    peopleList.forEach((person)=>{
        const id = `person2-${person}`;
        const label = document.createElement('label');
        label.setAttribute("for", id);
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "person2";
        checkbox.value = person.name;
        checkbox.id = id;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(person.name));
        document.querySelector("#checkboxes2").appendChild(label);
    });
}

function addNewExpense() {
    let expenseName = document.getElementById("showExpense").value;
    let price = document.getElementById("showPrice").value;
    var checkboxes = document.querySelectorAll('input[name="person"]:checked');
    var values = [];
        checkboxes.forEach((checkbox) => {
            values.push(checkbox.value);
        });
    let personThatPayed = values[0];
    var checkboxes = document.querySelectorAll('input[name="person2"]:checked');
    var values = [];
        checkboxes.forEach((checkbox) => {
            values.push(checkbox.value);
        });
    expenseList.push(e = new Expense(expenseName,personThatPayed,values,price));
    printExpense()
    var text = document.getElementById("expenseLabel");
    text.style.display = "block";
    var text = document.getElementById("showBalance");
    text.style.display = "block";
}

function printExpense() {
    let list = document.getElementById("expenseList");
    let li = document.createElement("li");
    li.innerText = expenseList[expenseList.length-1].name + " " + expenseList[expenseList.length-1].cost + "$ paid by: "+ expenseList[expenseList.length-1].personThatPayed;
    list.appendChild(li);
}

function showBalance() {
    peopleList.forEach(person => {
        peopleList.forEach(per => {
            person.expense_map.set(per.name, 0);
        })
    })
    peopleList.forEach(person => {
        expenseList.forEach(expense => {
            if (person.name == expense.personThatPayed){
                var cost = expense.cost/expense.otherPeople.length;
                expense.otherPeople.forEach(per => {
                    var newCost = person.expense_map.get(per);
                    newCost += cost;
                    person.expense_map.set(per, newCost);
                })
            }
        })
    });
    printBalance();
}

function printBalance() {
    peopleList.forEach(person => {
        var map = new Map();
        peopleList.forEach(per => {
            if (person.name == per.name){
                map.set(person.name, 0);
            } else {
                var debt = per.expense_map.get(person.name);
                var profit = person.expense_map.get(per.name);
                if (debt != 0){
                    profit -= debt;
                }
                map.set(per.name, profit);
            }
        })
        balance.set(person.name, map);
    })
    var text = document.getElementById("balanceLabel");
    text.style.display = "block";
    var text = document.getElementById("balanceList");
    text.style.display = "block";
    let list = document.getElementById("balanceList");
    list.innerHTML = '';
    peopleList.forEach(person => {
        var map = balance.get(person.name);
        peopleList.forEach(per => {
            var value = map.get(per.name);
            if(value>0){ 
                let li = document.createElement("li");
                li.innerText = per.name + " should pay " + person.name + " "+ value.toFixed(2) + "$";
                list.appendChild(li);
            }
        })
    })
}

