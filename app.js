// Function to add a new row to the item table
function addRow() {
    const table = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
    const newRow = document.createElement('tr');  // Create a new row element

    newRow.innerHTML = `
        <td><input type="text" class="itemDesc" placeholder="Enter Item"></td>
        <td><input type="text" class="hsnSac" placeholder="Enter HSN/SAC"></td>
        <td><input type="number" class="qty" oninput="calculateRowTotal(this)" placeholder="0"></td>
        <td><input type="number" class="rate" oninput="calculateRowTotal(this)" placeholder="0"></td>
        <td><input type="number" class="sgst" oninput="calculateRowTotal(this)" value="9"></td>
        <td><input type="number" class="cgst" oninput="calculateRowTotal(this)" value="9"></td>
        <td><input type="number" class="cess" oninput="calculateRowTotal(this)" placeholder="0"></td>
        <td class="total">₹0.00</td>
    `;

    // Append the new row to the table body
    table.appendChild(newRow);
}

// Function to calculate the total for each row
function calculateRowTotal(input) {
    const row = input.closest('tr'); // Get the row for the current input
    const qty = parseFloat(row.querySelector('.qty').value) || 0;
    const rate = parseFloat(row.querySelector('.rate').value) || 0;
    const sgst = parseFloat(row.querySelector('.sgst').value) || 0;
    const cgst = parseFloat(row.querySelector('.cgst').value) || 0;
    const cess = parseFloat(row.querySelector('.cess').value) || 0;

    // Calculate the base amount (qty * rate), SGST, CGST, and total
    const baseAmount = qty * rate;
    const sgstAmount = (sgst / 100) * baseAmount;
    const cgstAmount = (cgst / 100) * baseAmount;
    const total = baseAmount + sgstAmount + cgstAmount + cess;

    // Update the total cell for the row
    row.querySelector('.total').innerText = `₹${total.toFixed(2)}`;
}

// Function to generate the invoice
function generateInvoice() {
    const yourName = document.getElementById('yourName').value;
    const yourAddress = document.getElementById('yourAddress').value;
    const customerName = document.getElementById('customerName').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const gstNumber = document.getElementById('gstNumber').value;

    // Get all rows of the item table
    const tableRows = document.querySelectorAll('#itemTable tbody tr');
    let itemDetailsHTML = `<table border="1" cellspacing="0" cellpadding="8">
        <thead>
            <tr>
                <th>Item Description</th>
                <th>HSN/SAC</th>
                <th>Qty</th>
                <th>Rate (₹)</th>
                <th>SGST (%)</th>
                <th>CGST (%)</th>
                <th>Cess (₹)</th>
                <th>Total (₹)</th>
            </tr>
        </thead>
        <tbody>`;

    // Loop through each row and extract the data
    tableRows.forEach(row => {
        const itemDesc = row.querySelector('.itemDesc').value;
        const hsnSac = row.querySelector('.hsnSac').value;
        const qty = row.querySelector('.qty').value;
        const rate = row.querySelector('.rate').value;
        const sgst = row.querySelector('.sgst').value;
        const cgst = row.querySelector('.cgst').value;
        const cess = row.querySelector('.cess').value;
        const total = row.querySelector('.total').innerText;

        itemDetailsHTML += `
            <tr>
                <td>${itemDesc}</td>
                <td>${hsnSac}</td>
                <td>${qty}</td>
                <td>${rate}</td>
                <td>${sgst}</td>
                <td>${cgst}</td>
                <td>${cess}</td>
                <td>${total}</td>
            </tr>
        `;
    });

    itemDetailsHTML += `</tbody></table>`;

    // Display the generated invoice details
    document.getElementById('invoice-output').innerHTML = `
        <h2>Invoice</h2>
        <p><strong>Your Name:</strong> ${yourName}</p>
        <p><strong>Your Address:</strong> ${yourAddress}</p>
        <p><strong>Customer Name:</strong> ${customerName}</p>
        <p><strong>Customer Address:</strong> ${customerAddress}</p>
        <p><strong>Customer GST Number:</strong> ${gstNumber}</p>
        <br>
        ${itemDetailsHTML}
    `;
}





