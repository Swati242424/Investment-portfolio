document.getElementById('investment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const type = document.getElementById('type').value;
    const name = document.getElementById('name').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const value = parseFloat(document.getElementById('value').value);
    const date = document.getElementById('date').value;

    if (type && name && amount && value && date) {
        addInvestmentToTable(type, name, amount, value, date);
        updateTotals();

        document.getElementById('type').value = 'stock';
        document.getElementById('name').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('value').value = '';
        document.getElementById('date').value = '';
    }
});

function addInvestmentToTable(type, name, amount, value, date) {
    const tableBody = document.querySelector('#portfolio tbody');
    const row = document.createElement('tr');

    const typeCell = document.createElement('td');
    typeCell.textContent = type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ');
    row.appendChild(typeCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = name;
    row.appendChild(nameCell);

    const amountCell = document.createElement('td');
    amountCell.textContent = `$${amount.toFixed(2)}`;
    row.appendChild(amountCell);

    const valueCell = document.createElement('td');
    valueCell.textContent = `$${value.toFixed(2)}`;
    row.appendChild(valueCell);

    const gainLossCell = document.createElement('td');
    const gainLoss = value - amount;
    gainLossCell.textContent = `$${gainLoss.toFixed(2)}`;
    gainLossCell.style.color = gainLoss >= 0 ? 'green' : 'red';
    row.appendChild(gainLossCell);

    const percentCell = document.createElement('td');
    const percentGainLoss = (gainLoss / amount) * 100;
    percentCell.textContent = `${percentGainLoss.toFixed(2)}%`;
    percentCell.style.color = percentGainLoss >= 0 ? 'green' : 'red';
    row.appendChild(percentCell);

    const actionsCell = document.createElement('td');
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.onclick = () => editInvestment(row, name, amount, value, date);
    actionsCell.appendChild(editButton);
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove';
    removeButton.onclick = () => removeInvestment(row);
    actionsCell.appendChild(removeButton);
    
    row.appendChild(actionsCell);

    tableBody.appendChild(row);
}

function updateTotals() {
    const tableRows = document.querySelectorAll('#portfolio tbody tr');

    let totalInvestment = 0;
    let totalValue = 0;

    tableRows.forEach(row => {
        const amount = parseFloat(row.cells[2].textContent.replace('$', ''));
        const value = parseFloat(row.cells[3].textContent.replace('$', ''));

        totalInvestment += amount;
        totalValue += value;
    });

    const totalGainLoss = totalValue - totalInvestment;

    document.getElementById('total-investment').textContent = totalInvestment.toFixed(2);
    document.getElementById('total-value').textContent = totalValue.toFixed(2);
    document.getElementById('total-gain-loss').textContent = totalGainLoss.toFixed(2);
}

function removeInvestment(row) {
    row.remove();
    updateTotals();
}

function editInvestment(row, oldName, oldAmount, oldValue, oldDate) {
    document.getElementById('type').value = row.cells[0].textContent.toLowerCase().replace(' ', '-');
    document.getElementById('name').value = oldName;
    document.getElementById('amount').value = oldAmount;
    document.getElementById('value').value = oldValue;
    document.getElementById('date').value = oldDate;

    row.remove();
    updateTotals();
}
