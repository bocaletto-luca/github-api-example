#!/usr/bin/env node
const core = require('@actions/core')
const github = require('@actions/github')
const { Octokit } = require('@octokit/rest')

async function run() {
  try {
    const token = process.env.GITHUB_TOKEN || core.getInput('token')
    if (!token) throw new Error('GITHUB_TOKEN non fornito')

    const octokit = new Octokit({ auth: token })
    const { owner, repo } = github.context.repo || parseRepoFromArgs()

    // Esempio: etichetta tutte le issue aperte con “needs-triage”
    const issues = await octokit.issues.listForRepo({ owner, repo, state: 'open' })
    for (const issue of issues.data) {
      await octokit.issues.addLabels({
        owner,
        repo,
        issue_number: issue.number,
        labels: ['needs-triage']
      })
      console.log(`🏷  Issue #${issue.number} etichettata`)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

function parseRepoFromArgs() {
  const [,, repoArg] = process.argv
  const [owner, repo] = repoArg.split('/')
  if (!owner || !repo) {
    throw new Error('Uso CLI: issue-labeler owner/repo')
  }
  return { owner, repo }
}

run()
