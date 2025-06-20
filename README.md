# GitHub API Example
#### Author: Bocaletto Luca

Example Demo di CLI e Action che etichetta tutte le issue aperte con `needs-triage`.

## Installazione CLI

    npm install -g bocaletto-luca/github-api-demo
    issue-labeler owner/repo

## Utilizzo come GitHub Action

    uses: bocaletto-luca/github-api-demo@v1.0.0
    with:
      token: ${{ secrets.GITHUB_TOKEN }}

##Architettura

    src/index.js: core logic

    action.yml: config Action

    .github/workflows/ci.yml: test automation

##Licenza

GPL © bocaletto-luca
