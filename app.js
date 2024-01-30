// formulare budeme spracovavat iba tu
document.querySelectorAll('form').forEach(f => f.addEventListener('submit', (e) => e.preventDefault()));

const chybaParagraph = document.querySelector('p.chyba');
const vysledkyDiv = document.querySelector('div.vysledky');
const intervalForm = document.querySelector('form#intervalForm');

intervalForm.addEventListener('submit', () => {
    vysledkyDiv.innerHTML = "";
    chybaParagraph.innerText = "";
    
    const data = new FormData(intervalForm);
    const prve = data.get('horna-hranica');
    const posledne = data.get('dolna-hranica');

    if (!prve || !posledne) return chybaParagraph.innerText = "musis zadat obe hranice!";
    if (prve > posledne) return chybaParagraph.innerText = "horny interval musi byt vacsi ako dolny!";

    const vysledky = [];

    for (let i = prve; i <= posledne; i++) {
        for (let j = prve; j <= posledne; j++) {
            const vysledok = Math.sqrt(Math.pow(i, 2) + Math.pow(j, 2));
            if (vysledok % 1 > 0 || vysledky.find(item => item[0] === j && item[1] === i)) continue;

            vysledky.push([i, j]);
        }
    }

    vysledky.forEach(i => {
        const vysledokSpan = document.createElement('span');
        vysledokSpan.classList.add('vysledok');
        vysledokSpan.innerText = i.join(', ');
        vysledkyDiv.append(vysledokSpan);
    });
})