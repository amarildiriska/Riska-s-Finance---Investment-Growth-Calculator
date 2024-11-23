document.getElementById('investmentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const principal = parseFloat(document.getElementById('amount').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    const years = parseInt(document.getElementById('years').value);
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
    const n = parseInt(document.getElementById('compoundingFrequency').value); // Compounding frequency

    // Compound interest formula with monthly contributions
    const totalAmount = calculateCompoundInterest(principal, rate, years, n, monthlyContribution);
    const results = document.getElementById('results');

    // Format numbers in accounting format
    const formattedTotalAmount = formatCurrency(totalAmount);

    // Show results
    results.style.display = 'block';
    results.innerHTML = `
        <h3>Investment Growth Breakdown</h3>
        <p>Final Amount: ${formattedTotalAmount}</p>
        <table>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                ${generateYearlyBreakdown(principal, rate, years, n, monthlyContribution)}
            </tbody>
        </table>
    `;
});

// Function to calculate compound interest with monthly contributions
function calculateCompoundInterest(principal, rate, years, n, monthlyContribution) {
    const compoundFactor = 1 + (rate / n);
    const totalPeriods = n * years;
    let futureValue = principal * Math.pow(compoundFactor, totalPeriods);

    for (let i = 0; i < totalPeriods; i++) {
        futureValue += monthlyContribution * Math.pow(compoundFactor, (totalPeriods - i - 1));
    }

    return futureValue;
}

// Function to generate yearly breakdown of the investment
function generateYearlyBreakdown(principal, rate, years, n, monthlyContribution) {
    let rows = '';
    for (let i = 1; i <= years; i++) {
        const amount = calculateCompoundInterest(principal, rate, i, n, monthlyContribution);
        const formattedAmount = formatCurrency(amount);
        rows += `
            <tr>
                <td>${i}</td>
                <td>${formattedAmount}</td>
            </tr>
        `;
    }
    return rows;
}

// Function to format numbers in accounting format (comma-separated, two decimals)
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}
