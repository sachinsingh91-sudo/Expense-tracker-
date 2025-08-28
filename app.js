const transactionForm = document.getElementById("transaction-form");
const transactionList = document.getElementById("transaction-list");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const netBalanceEl = document.getElementById("net-balance");

let transactions = []; 

function updateSummary() {
  let income = 0,
      expense = 0;

  transactions.forEach(tx => {
    if (tx.category === "income") {
      income += tx.amount;
    } else {
      expense += tx.amount;
    }
  });

  const balance = income - expense;

  totalIncomeEl.textContent = `₹${income}`;
  totalExpenseEl.textContent = `₹${expense}`;
  netBalanceEl.textContent = `₹${balance}`;
}

function renderTransactions() {
  transactionList.innerHTML = ""; 

  transactions.forEach((tx, index) => {
    const li = document.createElement("li");
    li.classList.add("transaction-item");

    li.innerHTML = `
      <span>${tx.date} - ${tx.description} (${tx.category})</span>
      <span class="${tx.category === "income" ? "income-amount" : "expense-amount"}">
        ${tx.category === "income" ? "+" : "-"}₹${tx.amount}
      </span>
      <button class="delete-btn" data-index="${index}">clear</button>
    `;

    transactionList.appendChild(li);
  });
}

function addTransaction(e) {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (!date || !description || isNaN(amount) || !category) {
    alert("Please fill in all fields.");
    return;
  }

  const transaction = { date, description, amount, category };
  transactions.push(transaction);

  renderTransactions();
  updateSummary();

  transactionForm.reset(); 
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  renderTransactions();
  updateSummary();
}

transactionForm.addEventListener("submit", addTransaction);


transactionList.addEventListener("click", function(e) {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    deleteTransaction(index);
  }
});
