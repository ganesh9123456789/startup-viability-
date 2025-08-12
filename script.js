document.querySelectorAll('input[type="range"]').forEach(slider => {
  slider.addEventListener('input', function () {
    const valueSpan = this.nextElementSibling;
    if (valueSpan) {
      valueSpan.textContent = this.value;
    }
  });
});

document.getElementById('viability-form').addEventListener('submit', function (e) {
  e.preventDefault();
  calculateViability();
});

function calculateViability() {
  const revenueProjection = parseFloat(document.getElementById('revenue-projection').value) || 0;
  const fundingSecured = parseFloat(document.getElementById('funding-secured').value) || 0;
  const monthlyExpenses = parseFloat(document.getElementById('monthly-expenses').value) || 1;
  const breakEvenMonths = parseFloat(document.getElementById('break-even-months').value) || 1;
  const marketSize = parseFloat(document.getElementById('market-size').value) || 0;
  const marketGrowth = parseFloat(document.getElementById('market-growth').value) || 0;
  const competitionLevel = parseFloat(document.getElementById('competition-level').value) || 5;
  const marketEntryBarriers = parseFloat(document.getElementById('market-entry-barriers').value) || 5;
  const teamExperience = parseFloat(document.getElementById('team-experience').value) || 5;
  const teamSize = parseFloat(document.getElementById('team-size').value) || 1;
  const keySkills = parseFloat(document.getElementById('key-skills').value) || 5;
  const advisorScore = parseFloat(document.getElementById('advisor-score').value) || 5;
  const marketRisk = parseFloat(document.getElementById('market-risk').value) || 5;
  const technologyRisk = parseFloat(document.getElementById('technology-risk').value) || 5;
  const regulatoryRisk = parseFloat(document.getElementById('regulatory-risk').value) || 5;
  const executionRisk = parseFloat(document.getElementById('execution-risk').value) || 5;

  const fundingRatio = fundingSecured / monthlyExpenses;
  const breakEvenScore = Math.max(0, 20 - breakEvenMonths);
  const revenueScore = revenueProjection / 100;

  const financialScore = Math.min(100, fundingRatio * 10 + breakEvenScore * 3 + revenueScore * 2);

  const marketSizeScore = Math.min(100, marketSize * 10);
  const marketGrowthScore = marketGrowth * 2;
  const competitionScore = 100 - competitionLevel * 10;
  const barriersScore = marketEntryBarriers * 10;

  const marketScore = Math.min(
    100,
    marketSizeScore * 0.3 + marketGrowthScore * 0.3 + competitionScore * 0.2 + barriersScore * 0.2
  );

  const experienceScore = teamExperience * 10;
  const teamSizeScore = Math.min(100, teamSize * 5);
  const skillsScore = keySkills * 10;
  const advisorScoreWeighted = advisorScore * 10;

  const teamScore = Math.min(
    100,
    experienceScore * 0.35 + teamSizeScore * 0.25 + skillsScore * 0.25 + advisorScoreWeighted * 0.15
  );

  const avgRisk = (marketRisk + technologyRisk + regulatoryRisk + executionRisk) / 4;
  const riskScore = 100 - avgRisk * 10;

  const viabilityScore = Math.round(
    financialScore * 0.3 + marketScore * 0.3 + teamScore * 0.25 + riskScore * 0.15
  );

  document.getElementById('viability-score').textContent = viabilityScore;
  document.getElementById('financial-score').textContent = financialScore.toFixed(1);
  document.getElementById('market-score').textContent = marketScore.toFixed(1);
  document.getElementById('team-score').textContent = teamScore.toFixed(1);
  document.getElementById('risk-score').textContent = riskScore.toFixed(1);

  const recommendationText = document.getElementById('recommendation-text');
  if (viabilityScore >= 80) {
    recommendationText.textContent =
      'Strong viability. This startup shows excellent potential with solid financials, market opportunity, team, and manageable risks. Proceed with investment consideration.';
    document.querySelector('.score-circle').style.backgroundColor = '#28a745';
  } else if (viabilityScore >= 60) {
    recommendationText.textContent =
      'Moderate viability. This startup has good potential but has some areas of concern. Consider further due diligence before proceeding.';
    document.querySelector('.score-circle').style.backgroundColor = '#ffc107';
  } else if (viabilityScore >= 40) {
    recommendationText.textContent =
      'Weak viability. This startup has significant concerns in multiple areas. Consider requesting improvements or declining investment.';
    document.querySelector('.score-circle').style.backgroundColor = '#fd7e14';
  } else {
    recommendationText.textContent =
      'Poor viability. This startup has critical issues that would need to be addressed before consideration. Recommend declining or requesting major changes.';
    document.querySelector('.score-circle').style.backgroundColor = '#dc3545';
  }

  document.getElementById('results-section').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('input[type="range"]').forEach((slider) => {
    const valueSpan = slider.nextElementSibling;
    if (valueSpan) {
      valueSpan.textContent = slider.value;
    }
  });

  document.getElementById('results-section').style.display = 'none';
});

