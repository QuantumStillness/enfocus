
// Function to extract insights from markdown content
export const extractMarkdownInsights = (content: string): string => {
  const insights: { [key: string]: string[] } = {
    'Insights': [],
    'Gratitude': [],
    'Intention': [],
    'Affirmation': [],
    'Challenge': []
  };
  
  // Extract insights section
  const insightsMatch = content.match(/<h2>Insights<\/h2>(.*?)(?=<h2>|$)/is);
  if (insightsMatch && insightsMatch[1]) {
    const insightsList = insightsMatch[1].match(/<li>(.*?)<\/li>/g);
    if (insightsList) {
      insights['Insights'] = insightsList.map(item => item.replace(/<\/?li>/g, ''));
    }
  }

  // Extract gratitude items (often prefixed with "Gratitude:" or in a section)
  const gratitudeSection = content.match(/<strong>Gratitude:<\/strong>(.*?)(?=<strong>|$)/is);
  if (gratitudeSection && gratitudeSection[1]) {
    insights['Gratitude'] = gratitudeSection[1].split(',').map(item => item.trim());
  }
  
  // Extract intentions
  const intentionSection = content.match(/<strong>Intention:<\/strong>(.*?)(?=<strong>|$)/is);
  if (intentionSection && intentionSection[1]) {
    insights['Intention'] = [intentionSection[1].trim()];
  }
  
  // Extract affirmations
  const affirmationSection = content.match(/<strong>Affirmation:<\/strong>(.*?)(?=<strong>|$)/is);
  if (affirmationSection && affirmationSection[1]) {
    insights['Affirmation'] = [affirmationSection[1].trim()];
  }
  
  // Extract challenges
  const challengesMatch = content.match(/<h2>Challenges<\/h2>(.*?)(?=<h2>|$)/is);
  if (challengesMatch && challengesMatch[1]) {
    const challengeList = challengesMatch[1].match(/<li>(.*?)<\/li>/g);
    if (challengeList) {
      insights['Challenge'] = challengeList.map(item => item.replace(/<\/?li>/g, ''));
    }
  }
  
  // Create HTML for insights summary
  let insightsHTML = '';
  let hasInsights = false;
  
  for (const [category, items] of Object.entries(insights)) {
    if (items.length > 0) {
      hasInsights = true;
      break;
    }
  }
  
  if (hasInsights) {
    insightsHTML = '<div class="mt-6 p-4 border border-gray-200 rounded-md bg-gray-50">';
    insightsHTML += '<h3 class="text-lg font-medium text-gray-900 mb-2">Key Insights</h3>';
    
    for (const [category, items] of Object.entries(insights)) {
      if (items.length > 0) {
        insightsHTML += `<div class="mb-3">`;
        insightsHTML += `<h4 class="text-sm font-medium text-gray-700">${category}</h4>`;
        insightsHTML += '<ul class="list-disc pl-5 text-sm">';
        
        items.forEach(item => {
          insightsHTML += `<li class="text-gray-600">${item}</li>`;
        });
        
        insightsHTML += '</ul></div>';
      }
    }
    
    insightsHTML += '</div>';
  }
  
  return insightsHTML;
};

