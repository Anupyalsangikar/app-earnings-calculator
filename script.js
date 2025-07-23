function numberToWords(num) {
  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const remainder = Math.floor(num % 1000);

  let parts = [];
  if (crore) parts.push(`${crore} Crore`);
  if (lakh) parts.push(`${lakh} Lakh`);
  if (thousand) parts.push(`${thousand} Thousand`);
  if (remainder) parts.push(`${remainder}`);
  return parts.length ? parts.join(' ') + ' Rupees' : '0 Rupees';
}

function calculateEarnings() {
  const downloads = parseInt(document.getElementById("downloads").value);
  if (isNaN(downloads) || downloads <= 0) {
    alert("Please enter a valid number of downloads.");
    return;
  }

  const activeUsers = downloads * 0.2;
  const dailyImpressions = activeUsers * 3;
  const monthlyImpressions = dailyImpressions * 30;

  document.getElementById("totalDownloads").textContent = downloads.toLocaleString();
  document.getElementById("activeUsers").textContent = activeUsers.toLocaleString();

  const countries = [
    {
      name: "🇮🇳 India",
      percent: 0.4,
      cpm: { banner: 40, inter: 120, reward: 200 },
    },
    {
      name: "🇺🇸 USA",
      percent: 0.2,
      cpm: { banner: 150, inter: 350, reward: 800 },
    },
    {
      name: "🇬🇧 UK",
      percent: 0.15,
      cpm: { banner: 120, inter: 300, reward: 600 },
    },
    {
      name: "🇨🇦 Canada",
      percent: 0.1,
      cpm: { banner: 100, inter: 250, reward: 500 },
    },
    {
      name: "🌍 Other",
      percent: 0.15,
      cpm: { banner: 60, inter: 180, reward: 350 },
    },
  ];

  const adMix = {
    banner: 0.5,
    inter: 0.3,
    reward: 0.2,
  };

  let totalRevenue = 0;
  let countryRows = "";
  let cpmRows = "";

  countries.forEach(c => {
    const countryImpressions = monthlyImpressions * c.percent;

    const bannerImp = countryImpressions * adMix.banner;
    const interImp = countryImpressions * adMix.inter;
    const rewardImp = countryImpressions * adMix.reward;

    const bannerRev = (bannerImp / 1000) * c.cpm.banner;
    const interRev = (interImp / 1000) * c.cpm.inter;
    const rewardRev = (rewardImp / 1000) * c.cpm.reward;

    const countryTotal = bannerRev + interRev + rewardRev;
    totalRevenue += countryTotal;

    countryRows += `
      <tr>
        <td>${c.name}</td>
        <td>${(c.percent * 100).toFixed(0)}%</td>
        <td>${Math.round(countryImpressions).toLocaleString()}</td>
        <td>₹${countryTotal.toFixed(2).toLocaleString()}</td>
        <td>${numberToWords(Math.round(countryTotal))}</td>
      </tr>
    `;

    cpmRows += `
      <tr>
        <td>${c.name}</td>
        <td>₹${c.cpm.banner}</td>
        <td>₹${c.cpm.inter}</td>
        <td>₹${c.cpm.reward}</td>
      </tr>
    `;
  });

  document.getElementById("countryEarningsBody").innerHTML = countryRows;
  document.getElementById("cpmTableBody").innerHTML = cpmRows;

  document.getElementById("dailyRevenueSection").innerHTML = `
    <h3>📅 Estimated Daily Earnings (All Countries)</h3>
    <p><strong>₹${(totalRevenue / 30).toFixed(2).toLocaleString()}</strong> per day<br>
    <small>(${numberToWords(Math.round(totalRevenue / 30))})</small></p>

    <h3>📆 Estimated Monthly Revenue</h3>
    <p><strong>₹${totalRevenue.toFixed(2).toLocaleString()}</strong><br>
    <small>(${numberToWords(Math.round(totalRevenue))})</small></p>

    <h3>📈 Estimated Yearly Revenue</h3>
    <p><strong>₹${(totalRevenue * 12).toFixed(2).toLocaleString()}</strong><br>
    <small>(${numberToWords(Math.round(totalRevenue * 12))})</small></p>
  `;

  document.getElementById("results").classList.remove("hidden");
}
