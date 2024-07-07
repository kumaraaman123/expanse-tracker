"use strict";
//output
let balanceAmtEL = document.getElementById("balanceAmt");
let incomeAmtEl = document.getElementById("incomeAmt");
let expenseAmtEl = document.getElementById("expenseAmt");
//input
const inputTitleEl = document.getElementById("inputTitle");
const inputAmountEl = document.getElementById("inputAmount");
const amountTypeEl = document.getElementById("amountType");
const btnTransactionEl = document.getElementById("btnTransaction");
const listEl = document.getElementById("list");

// localStorage.clear();
//localStorage
let transactions = localStorage.getItem("transactions");
//global variable
transactions = transactions ? JSON.parse(transactions) : [];
let balance = 0;
let income = 0;
let expense = 0;

//Function
const init = () => {
  showItem(transactions);
  calculateValue(transactions);
};

btnTransactionEl.addEventListener("click", (e) => {
  listEl.innerHTML = null;
  e.preventDefault();
  let titleInput = inputTitleEl.value;
  let amountInput = inputAmountEl.value;
  let amountType = amountTypeEl.value;
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  const currentDate = `${day}-${month}-${year}`;
  const transaction = {
    id: Date.now(),
    date: currentDate,
    title: titleInput,
    amount: amountInput,
    amountType,
  };

  if (
    titleInput.trim() &&
    amountInput.trim() &&
    (amountType === "Income" || amountType === "Expense")
  ) {
    transactions.push(transaction);
    showItem(transactions);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  } else {
    alert("Input Field Is Mandatory");
  }
  inputTitleEl.value = null;
  inputAmountEl.value = null;
});

const showItem = (transactions) => {
  transactions.map((transaction) => {
    const { id, date, title, amount, amountType } = transaction;
    let amt = "";
    const list = document.createElement("li");
    if (amountType === "Income") {
      list.className = "income";
      amt = `${amount}`;
      localStorage.setItem("transactions", JSON.stringify(transactions));
    } else {
      list.className = "expense";
      amt = `- ${amount}`;
    }

    list.innerHTML = `
      <span class="date">${date}</span>
      <span class="titleInput">${title}</span>
      <span class="amt">${amt}</span>
      <button class="btnDelete" onClick = "deleteItem(${id})">X</button>`;
    listEl.appendChild(list);
  });
  calculateValue(transactions);
};

const deleteItem = (id) => {
  listEl.innerHTML = null;
  transactions = transactions.filter((val) => id !== val.id);

  localStorage.setItem("transactions", JSON.stringify(transactions));
  showItem(transactions);
  calculateValue(transactions);
};

const calculateValue = (transactions) => {
  const incomeArray = [];
  const expenseArray = [];
  const amtArray = transactions.map((value) => {
    const number = Number(value.amount);
    value.amountType === "Income"
      ? incomeArray.push(number)
      : expenseArray.push(number);
  });

  income = incomeArray.reduce((prev, val) => prev + val, 0);
  expense = expenseArray.reduce((prev, val) => prev + val, 0);
  balance = income - expense;

  balanceAmtEL.innerHTML = `₹ ${balance}`;
  incomeAmtEl.innerHTML = `₹ ${income}`;
  expenseAmtEl.innerHTML = `₹ ${expense}`;
  // dought
  // const incomeArray = transactions.filter(
  //   (transaction) => "Income" === transaction.amountType
  // );
  // const expenseArray = transactions.filter(
  //   (transaction) => "Expense" === transaction.amountType
  // );
};

init();
