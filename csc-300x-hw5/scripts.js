'use strict';
(function () {

    const GITHUB_API_BASEURL = 'https://api.github.com/users/';
    window.addEventListener('load', init);

    function init() {
        getUserRepos();
    }


    function getUserRepos() {
        let gitHubUsername = 'AllisonWeavil';
        let url = GITHUB_API_BASEURL + gitHubUsername + '/repos?sort=created'

        fetch(url)
            .then(checkStatus)
            .then((repoData) => {

                console.log(repoData);
                let div = id('container');
                


for (const item of repoData) {
    
    let repoBox = document.createElement('div');
    repoBox.classList.add('repo-box'); 
    
    
    let repoName = document.createElement('p');
    const name = item['name'];
    repoName.innerHTML =  `<i class="fa-brands fa-github"></i> ${name}`;
    repoBox.appendChild(repoName);

    let repoDes = document.createElement('p');
    const description = item['description'];
    repoDes.innerHTML =  description;
    repoBox.appendChild(repoDes);

    let langCount = document.createElement('p');
    const language = item['language'];
    langCount.innerHTML = `<i class="fa-solid fa-code-branch"></i> ${language}`;
    repoBox.appendChild(langCount);

    let watcherCount = document.createElement('p');
    const watchers = item['watchers'];
    watcherCount.innerHTML = `<i class="fa-solid fa-eye"></i> ${watchers}`;
    repoBox.appendChild(watcherCount);

    let commitCount = document.createElement('p');
    const size = item['size'];
    commitCount.innerHTML = 'Commits:' + size;
    repoBox.appendChild(commitCount);

    let upateDate = document.createElement('p');
    const updated = item['updated_at'];
    upateDate.innerHTML = 'Updated:' + updated;
    repoBox.appendChild(upateDate);

    let repoDate = document.createElement('p');
    const date = item['created_at'];
    repoDate.innerHTML = 'Created:' + date;
    repoBox.appendChild(repoDate);

    
    div.appendChild(repoBox);
}
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    }




    //helper functions
    function id(idName) {
        return document.getElementById(idName);
    }

    function checkStatus(response) {
        if (!response.ok) {
            throw Error('Error in request: ' + response.statusText);
        }
        return response.json();
    }
})();