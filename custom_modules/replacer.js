module.exports = (temp, fighter) => {
  let output = temp.replace(/\$FighterName/g, fighter.name);
  output = output.replace(/\$FighterAge/g, fighter.age);
  output = output.replace(/\$FighterCountry/g, fighter.country);
  output = output.replace(/\$ID/g, fighter.id);
  output = output.replace(/\$FighterBrief/g, fighter.brief);
  if (fighter.champion == false) {
    output = output.replace(/\$NotChamp/g, "not_champ");
  }
  return output;
};
