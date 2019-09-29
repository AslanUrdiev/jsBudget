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
    if(value === '' || value < 0) {
      this.budgetFeedBack.classList.add('showItem');
      this.budgetFeedBack.innerHTML = `<p>Значение не может быть пустым или отрицательным</p>`;
      const self = this;
      
      setTimeout(function(){
        self.budgetFeedBack.classList.remove('showItem');
      //изменили область видимости this была window 
      },4000);    
      }
      else {
        this.budgetAmount.textContent = value;
        this.budgetInput.value = '';
        this.showBalance();
      }
  }
  //показать итог
  showBalance() {
    const expence = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expence;
    //console.log(total - expence);
    this.balanceAmount.textContent = total;

    if(total < 0) {
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    }else if(total > 0) {
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showGreen');
    }else if(total === 0) {
      this.balance.classList.remove('showRed', 'showGreen');
      this.balance.classList.add('showBlack');
    }
  }
  // форма расходов
  submitExpenceForm() {
    const expenceValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;

    if(expenceValue === '' || amountValue === ''|| amountValue < 0) {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>Значение не может быть пустым или отрицательным</p>`;
      const self = this;
      setTimeout(function(){
        self.expenseFeedback.classList.remove('showItem');
      //изменили область видимости this была window 
      },4000);
    }else {
      let amount = parseInt(amountValue);
      this.expenseInput.value = '';
      this.amountInput.valuу = '';

      let expense = {
        id: this.itemID,
        title: expenceValue,
        amount: amount
      }
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
      //показать итог

    }
  }

  // добавить расход
  addExpense(expense) {
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `
    <div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>
    `;
    this.expenseList.appendChild(div);
  }
  //расходы
  totalExpense() {
    let total = 0;
    if(this.itemList.length > 0) {
      total = this.itemList.reduce(function(acc, curr) {
        console.log(acc + curr.amount);
        acc+=curr.amount;
        //curr это объект
        return acc;
      },0);
    }
    this.expenseAmount.textContent = total;
    //console.log(this.itemList);
    
    return total;
  }
  //изменить расходы
  editExpense(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    //удаляем из dom expense
    this.expenseList.removeChild(parent);
    //уадляем из массива
    let expense = this.itemList.filter(function(item){
      return item.id === id;
    });
    //show value
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;
    console.log(this.expenseInput);
    console.log(this.amountInput);
    //возвращает массив с подходящим условием
    let tempList = this.itemList.filter(function(item){
      return item.id !== id;
    });
    this.itemList = tempList;
    //в showBalance передается новый массив и меняет значение в dom
    this.showBalance();

    console.log(this.itemList);
  }
  //удалить расходы
  deleteExpense(element) {

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
    ui.submitExpenceForm();
  });

  //expence click
  expenseList.addEventListener('click', function(event) {
    event.preventDefault();
    //вытаскиваем родительский элемент
    if(event.target.parentElement.classList.contains('edit-icon')){
      ui.editExpense(event.target.parentElement)
    }
    else if(event.target.parentElement.classList.contains('delete-icon')){
      ui.deleteExpense(event.target.parentElement)
    }
    //console.log(event.target);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  eventListenters();
});







