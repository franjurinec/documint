document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('search-button').onclick = () => {
        document.getElementById('search-container').style.display = "contents"
    }

    document.getElementById('search-background').onclick = () => {
        document.getElementById('search-container').style.display = "none"
        document.getElementById('search-input').value = ""
        document.getElementById('search-results').replaceChildren()
    }

    document.getElementById('search-input').addEventListener('input', async (e) => {
        let resultsContainer = document.getElementById('search-results')
        resultsContainer.replaceChildren()

        if (searchMap === undefined) return

	let searchRegEx = new RegExp(e.target.value.toLowerCase(), 'g')

        let searchResults = await Promise.all(searchMap.map(async fileContent => {
            let titleMatches = fileContent.name.toLowerCase().match(searchRegEx)?.length ?? 0
            let contentMatches = fileContent.content.match(searchRegEx)?.length ?? 0
            return {
                name: fileContent.name,
                titleMatches: titleMatches,
                contentMatches: contentMatches
            }
        }))

        let searchResultNames = searchResults
            .filter(e => e.titleMatches > 0 || e.contentMatches > 0)
            .sort((e1, e2) => e2.titleMatches - e1.titleMatches || e2.contentMatches - e1.contentMatches)
            .slice(0, 5)
            .map(e => e.name)

        searchResultNames.forEach(name => {
            let resultLink = document.createElement("a")
            resultLink.href = name + ".html"
            let resultElement = document.createElement("div")
            resultElement.className = "select-none w-full px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
            resultElement.innerHTML = name
            resultLink.appendChild(resultElement)
            resultsContainer.appendChild(resultLink)
        })

        
    })

});