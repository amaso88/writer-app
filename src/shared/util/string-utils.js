export const getWordCount = word => {
  let texto = word;
  let primerBlanco = /^ /;
  let ultimoBlanco = / $/;
  let variosBlancos = /[ ]+/g;
  texto = texto.replace(variosBlancos, " ");
  texto = texto.replace(primerBlanco, "");
  texto = texto.replace(ultimoBlanco, "");
  return texto.split(" ").length;
};
