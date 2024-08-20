import { Octokit, App } from "https://esm.sh/octokit";
const octokit = new Octokit({ });
var parts = window.location.search.substr(1).split("&");
var $_GET = {};
for (var i = 0; i < parts.length; i++) {
    var temp = parts[i].split("=");
    $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}

var name = $_GET['name']; // 1
// tysm stack overflow!
const issueData = await octokit.paginate("GET /repos/{owner}/{repo}/issues", {
  owner: "github",
  repo: "docs",
  per_page: 100,
  headers: {
    "x-github-api-version": "2022-11-28",
  },
},
    (response, done) => response.data.map((issue) => {
    if (issue.title.includes("test")) {
      done()
    }
    return ({title: issue.title, author: issue.user.login})
  })
);
