/* eslint-disable func-style */
async function quickstart() {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient();

  // The text to analyze
  const text = 'papa johns';

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects entities in the document
  //list of entities:
  //'UNKNOWN'
  //'PERSON'
  //'LOCATION'
  //'ORGANIZATION'
  //'EVENT'
  //'WORK_OF_ART'
  //'CONSUMER_GOOD'
  //'OTHER'
  //'PHONE_NUMBER'
  //'ADDRESS'
  //'DATE'
  //'NUMBER'
  //'PRICE'

  const [result1] = await client.analyzeEntities({document});

  const entities = result1.entities;

  console.log('Entities:');
  entities.forEach(entity => {
    console.log(entity.name);
    console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
    if (entity.metadata && entity.metadata.wikipedia_url) {
      console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
    }
  });
}
quickstart();

async function getMovie(text) {

  const request = require('request-promise-native');
  request(`https://www.omdbapi.com/?t=${text}&apikey=7a022951`)
    .then(res=>console.log(res))
    .catch(err=> console.log('ERRRRR:',err));

}
getMovie('game of thrones');
