// Language-independent package scoring based on funnel answer keys.
export default function recommendPackage(answers) {
  const scores = { start: 0, business: 0, premium: 0 };

  switch (answers.need) {
    case 'new-site': scores.start += 2; scores.business += 1; break;
    case 'seo': scores.business += 2; break;
    case 'shop': scores.premium += 3; break;
    case 'automation': scores.premium += 3; break;
  }
  switch (answers.website) {
    case 'none': scores.start += 1; break;
    case 'outdated': scores.business += 1; break;
    case 'satisfied': scores.business += 1; scores.premium += 1; break;
    case 'in-progress': scores.business += 1; break;
  }
  switch (answers.business) {
    case 'shop': scores.premium += 2; break;
    case 'services': scores.business += 1; break;
    case 'hospitality': scores.business += 1; break;
    case 'other': scores.start += 1; break;
  }

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}
