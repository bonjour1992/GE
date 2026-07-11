export async function fetchAPI(url, method, body) {

    const res = await fetch("http://localhost:3000/" + url,
        {
            method: method,
            headers: { "Content-Type": "application/json", Authorization: 'GRANT', },
            body: JSON.stringify(body)
        })
    return await res.json()


}

export async function getElement(id) {
    return await fetchAPI("element/" + id, 'GET')
}

export async function getList(jeu,type) {
    return await fetchAPI("element/" + jeu+"/"+type, 'GET')
}

export async function updateElement( id, content) {
    return await fetchAPI("element/" + id, 'POST', content)
}

export async function updateRemp( jeu, content) {
    return await fetchAPI("remp/update/" + jeu, 'POST', content)
}


export async function getRemp(jeu)
{
        return await fetchAPI("remp/" + jeu, 'GET')

}

export async function getSearch(jeu)
{
        return await fetchAPI("element/search/" + jeu, 'GET')

}