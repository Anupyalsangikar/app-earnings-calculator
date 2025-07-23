function calculateEarnings() {
  const downloads = parseInt(document.getElementById("downloads").value);
  if (isNaN(downloads) || downloads <= 0) {
    alert("Please enter a valid number of downloads.");
    return;
  }

  const activeUsers = Math.round(downloads * 0.2);
  document.getElementById("results").classList.remove("hidden");
  document.getElementById("totalDownloads").textContent = downloads.toLocaleString();
  document.getElementById("activeUsers").textContent = `${activeUsers.toLocaleString()} (20%)`;

  const impressionsPerUserPerDay = 3;
  const adMix = { banner: 0.5, interstitial: 0.3, rewarded: 0.2 };

  const countryData = [
    { name: "India", percent: 40, ecpm: { banner: 10, interstitial: 25, rewarded: 30 } },
    { name: "USA", percent: 25, ecpm: { banner: 60, interstitial: 100, rewarded: 120 } },
    { name: "UK", percent: 15, ecpm: { banner: 50, interstitial: 80, rewarded: 100 } },
    { name: "Canada", percent: 10, ecpm: { banner: 55, interstitial: 90, rewarded: 110 } },
    { name: "Others", percent: 10, ecpm: { banner: 20, interstitial: 40, rewarded: 60 } },
  ];

  const dailyImpressions = activeUsers * impressionsPerUserPerDay;
  const monthlyImpressions = dailyImpressions * 30;

  const countryBody = document.getElementById("countryEarningsBody");
  const cpmTableBody = document.getElementById("cpmTableBody");
  const dailyRevenueSection = document.getElementById("dailyRevenueSection");

  countryBody.innerHTML = "";
  cpmTableBody.innerHTML = "";

  let totalRevenue = 0;

  countryData.forEach(country => {
    const countryUsers = Math.round((country.percent / 100) * activeUsers);
    const countryImpressions = countryUsers * impressionsPerUserPerDay * 30;

    const revenue =
      (countryImpressions / 1000) * (
        adMix.banner * country.ecpm.banner +
        adMix.interstitial * country.ecpm.interstitial +
        adMix.rewarded * country.ecpm.rewarded
      );

    totalRevenue += revenue;

    const revenueWords = convertToWords(Math.round(revenue));

    countryBody.innerHTML += `
      <tr>
        <td>${country.name}</td>
        <td>${country.percent}%</td>
        <td>${countryImpressions.toLocaleString()}</td>
        <td>₹${Math.round(revenue).toLocaleString()}</td>
        <td>${revenueWords}</td>
      </tr>
    `;

    cpmTableBody.innerHTML += `
      <tr>
        <td>${country.name}</td>
        <td>₹${country.ecpm.banner}</td>
        <td>₹${country.ecpm.interstitial}</td>
        <td>₹${country.ecpm.rewarded}</td>
      </tr>
    `;
  });

  const dailyRevenue = Math.round(totalRevenue / 30);

  dailyRevenueSection.innerHTML = `
    <h2>📅 Daily & Monthly Revenue</h2>
    <p><strong>Daily Estimated Revenue:</strong> ₹${dailyRevenue.toLocaleString()} (${convertToWords(dailyRevenue)})</p>
    <p><strong>Monthly Estimated Revenue:</strong> ₹${Math.round(totalRevenue).toLocaleString()} (${convertToWords(Math.round(totalRevenue))})</p>
    <p><strong>Yearly Estimated Revenue:</strong> ₹${Math.round(totalRevenue * 12).toLocaleString()} (${convertToWords(Math.round(totalRevenue * 12))})</p>
  `;
}

function convertToWords(number) {
  if (number >= 10000000) return (number / 10000000).toFixed(2) + " crore";
  if (number >= 100000) return (number / 100000).toFixed(2) + " lakh";
  if (number >= 1000) return (number / 1000).toFixed(2) + " thousand";
  return number.toString();
}
