export const PromptsSearch = async (name, type, tags) => {
const tagsFormatted = tags ? tags.map(tag => `"${tag}"`).join(',') : [];
const token = sessionStorage.getItem("tokenSesion");
const query = `
    {
        searchPrompt(${name ? `name: "${name}"` : ""} ${type ? `type:${type}` : ""} ${tags ? `tags:[${tagsFormatted}]` : ""}) {
          _id
          name
          type
          tags
        }
      }
    `;
//console.log(query);
//console.log(query, name, type, tags)
const response = await fetch('http://localhost:3001/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ query }),
});
return await response.json();
}