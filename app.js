// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  // Göm resultat
  document.getElementById('results').style.display = 'none';

  // visa loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});


// Beräkna resultat
function calculateResults() {
  // UI vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Månadsbetalningar
  const x = Math.pow(1+ calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    // Visa resultat
    document.getElementById('results').style.display = 'block';

    // Visa loader
    document.getElementById('loading').style.display = 'none';


  } else {
    showError('Var god och fyll i alla uppgifter');
  }

}

// Visa felmeddelande
function showError(error){
  // Visa resultat
  document.getElementById('results').style.display = 'none';

  // Visa loader
  document.getElementById('loading').style.display = 'none';


  const errorDiv = document.createElement('div');

  // Element
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';

  //Skapa text node och appenda till div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert heading
  card.insertBefore(errorDiv, heading);

  // Clear error
  setTimeout(clearError, 3000);
}

  function clearError(){
    document.querySelector('.alert').remove();
  }
