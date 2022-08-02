export const randName = [
  ["Ariel", "Atofe", "Miko", "Kishirika Kishirisu"],
  [
    "Perugius", "Sieg", "Pax", "Darius", "Nokopara", "Hitogami",
    "Dark King Vita", "Gal Farion", "Luke", "Somal", "Philemon",
    "Orsted"
  ]
]

const randomName = (gender?: 0 | 1) => {
  let genderIndex: number
  if (gender !== undefined) genderIndex = gender
  else {
    if (Math.floor(Math.random() * 10) !== 0 ) genderIndex = 1
    else genderIndex = 0
  }
  return randName[genderIndex][Math.floor(Math.random() * randName[genderIndex].length)]
}

export default randomName
