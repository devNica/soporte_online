var pib = [{
    "geo": "Nicaragua",
    "2005": 23,
    "2006": 45,
    "2007": 145,
    "2008": 1458

},
{
    "geo": "Honduras",
    "2005": 89,
    "2006": 56,
    "2007": 125

},
{
    "geo": "El_Salvador",
    "2005": 12,
    "2006": 69,
    "2007": 145

},
{
    "geo": "Guatemala",
    "2005": '',
    "2006": '',
    "2007": ''

}
]

//var geo = [];

organizar = (acc, current) => ({
    ...acc,
    ...{
        [current.geo]: Object.values(current).slice(0, 3).filter(x => x !== '')
    }
})
let probar = pib.reduce(organizar, {})

console.log(probar)