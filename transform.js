const {readFile} = require('fs').promises;

async function transform() {
  const taxonomy = JSON.parse(await readFile('./tech-lab-content-taxonomy-v2', 'utf8'));
  console.log(JSON.stringify(Array.from(collect(taxonomy, '')), null, 2));
}

function* collect(taxonomy, parent) {
  for (const category of taxonomy) {
    const id = Object.keys(category)[0];
    if (!id.match(new RegExp(`^${parent}\\d+$`))) continue;
    yield {
      id,
      name: name(category),
      children: Array.from(collect(taxonomy, `${id}.`)),
    }
  }
}

function name(category) {
  if (typeof category === 'string') return category;
  return name(Object.values(category)[0]);
}

transform();