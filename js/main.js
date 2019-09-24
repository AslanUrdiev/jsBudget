class UI {
  constructor() {
    this.budgetFeedBack = document.querySelector('.budget-feedback');
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }
  //submit budget method
  submitBudgetForm() {
    const value = this.budgetInput.value;
    if(value ==='' || value < 0) {
      this.budgetFeedBack.classList.add('showItem')
    }
    
  }

}

function eventListenters() {
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");
  //new instance
  const ui = new UI();

  //budget for submit
  budgetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        ui.submitBudgetForm();
      });

  //expenceList for submit
  expenseForm.addEventListener('submit', function(e) {
      e.preventDefault();
    });

  //expence click
  expenseList.addEventListener('submit', function() {

    });
}

document.addEventListener('DOMContentLoaded', function() {
  eventListenters();
});







