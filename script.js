const issuesList = document.getElementById('issues-list');
const prevButton = document.getElementById('load-prev');
const nextButton = document.getElementById('load-next');
const pageNumberElement = document.getElementById('page-number');
let pageNumber = 1;

function loadIssues() {
  const url = `https://api.github.com/repositories/1296269/issues?page=${pageNumber}&per_page=5`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      issuesList.innerHTML = data.map(issue => `<li>${issue.title}</li>`).join('');
      pageNumberElement.textContent = `Page number ${pageNumber}`;
      prevButton.disabled = pageNumber === 1;
      nextButton.disabled = data.length === 0;
    })
    .catch(error => console.error(error));
}

loadIssues();

prevButton.addEventListener('click', () => {
  if (pageNumber > 1) {
    pageNumber--;
    loadIssues();
  }
});

nextButton.addEventListener('click', () => {
  if (!nextButton.disabled) {
    pageNumber++;
    loadIssues();
  }
});