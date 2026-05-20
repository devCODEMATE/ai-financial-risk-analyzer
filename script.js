const analyzeBtn = document.getElementById("analyzeBtn");
const resetBtn = document.getElementById("resetBtn");
const result = document.getElementById("result");

const riskWeights = {
  volatility: {
    low: 10,
    medium: 25,
    high: 40
  },
  inflation: {
    low: 10,
    medium: 25,
    high: 35
  },
  investment: {
    bonds: 10,
    stocks: 25,
    crypto: 45
  },
  cash: {
    strong: -15,
    moderate: 5,
    weak: 25
  }
};

const explanations = {
  volatility: {
    low: "Low volatility reduces uncertainty in market movement.",
    medium: "Medium volatility adds moderate uncertainty.",
    high: "High volatility strongly increases financial uncertainty."
  },
  inflation: {
    low: "Low inflation creates a more stable financial environment.",
    medium: "Medium inflation adds pressure to financial decisions.",
    high: "High inflation increases uncertainty and potential purchasing-power risk."
  },
  investment: {
    bonds: "Bonds are usually treated as lower-risk investments.",
    stocks: "Stocks can offer growth, but they add market exposure.",
    crypto: "Crypto is highly volatile and increases uncertainty."
  },
  cash: {
    strong: "A strong cash reserve lowers overall risk.",
    moderate: "A moderate cash reserve provides limited protection.",
    weak: "A weak cash reserve increases vulnerability under uncertainty."
  }
};

function getRiskLevel(score) {
  if (score >= 75) {
    return {
      label: "High Risk",
      className: "high-risk",
      strategy: "Avoid aggressive investment decisions and prioritize capital protection."
    };
  }

  if (score >= 40) {
    return {
      label: "Medium Risk",
      className: "medium-risk",
      strategy: "Monitor conditions carefully and consider a balanced strategy."
    };
  }

  return {
    label: "Low Risk",
    className: "low-risk",
    strategy: "Conditions appear relatively stable, but uncertainty still exists."
  };
}

function analyzeRisk() {
  const volatility = document.getElementById("volatility").value;
  const inflation = document.getElementById("inflation").value;
  const investment = document.getElementById("investment").value;
  const cash = document.getElementById("cash").value;

  if (!volatility || !inflation || !investment || !cash) {
    result.innerHTML = `
      <div class="empty-result">
        Please complete all market inputs before running the analysis.
      </div>
    `;
    return;
  }

  let score =
    riskWeights.volatility[volatility] +
    riskWeights.inflation[inflation] +
    riskWeights.investment[investment] +
    riskWeights.cash[cash];

  score = Math.max(0, Math.min(score, 100));

  const confidence = Math.max(55, 100 - Math.abs(50 - score));
  const risk = getRiskLevel(score);

  const reasoning = [
    explanations.volatility[volatility],
    explanations.inflation[inflation],
    explanations.investment[investment],
    explanations.cash[cash]
  ];

  result.innerHTML = `
    <div class="risk-card ${risk.className}">
      <div class="risk-header">
        <div>
          <span class="risk-label">Estimated Risk</span>
          <h3>${risk.label}</h3>
        </div>
        <div class="score-circle">
          ${score}%
        </div>
      </div>

      <div class="meter">
        <div class="meter-fill" style="width: ${score}%"></div>
      </div>

      <div class="metrics">
        <div>
          <span>Risk Score</span>
          <strong>${score}%</strong>
        </div>
        <div>
          <span>Confidence</span>
          <strong>${confidence}%</strong>
        </div>
      </div>

      <h4>Probabilistic Reasoning</h4>
      <ul>
        ${reasoning.map(item => `<li>${item}</li>`).join("")}
      </ul>

      <h4>Suggested Strategy</h4>
      <p>${risk.strategy}</p>

      <p class="note">
        This is an educational AI demo that simplifies financial uncertainty using weighted signals.
        It is not financial advice.
      </p>
    </div>
  `;
}

function resetApp() {
  document.getElementById("volatility").value = "";
  document.getElementById("inflation").value = "";
  document.getElementById("investment").value = "";
  document.getElementById("cash").value = "";

  result.className = "empty-result";
  result.innerHTML = "Select market conditions and run the analyzer.";
}

analyzeBtn.addEventListener("click", analyzeRisk);
resetBtn.addEventListener("click", resetApp);