/* eslint-disable func-style */
//*********************************************Using natural language */
// async function quickstart() {
//   // Imports the Google Cloud client library
//   const language = require('@google-cloud/language');

//   // Instantiates a client
//   const client = new language.LanguageServiceClient();

//   // The text to analyze
//   const text = process.argv[2];
//   console.log(text);

//   const document = {
//     content: text,
//     type: 'PLAIN_TEXT',
//   };

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

//   const [result1] = await client.analyzeEntities({document});

//   const entities = result1.entities;

//   console.log('Entities:');
//   entities.forEach(entity => {
//     console.log(entity.name);
//     console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
//     if (entity.metadata && entity.metadata.wikipedia_url) {
//       console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
//     }
//   });
// }
//quickstart();

require("dotenv").config({path:'../.env'});

const axios = require('axios');
async function isMovie(text) {
  const config = {
    method: 'get',
    url: `https://www.omdbapi.com/?t=${text}&apikey=e95cd0d1`,
    headers: { }
  };

  return axios(config)
    .then(response=> {
      return response.data["Type"];
    })
    .catch(error=> {
      console.log(error);
    });

}
//isMovie('jumanji');

async function isCafe(name) {
  const config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&key=${process.env.API_G}`,
    headers: { }
  };

  axios(config)
    .then(response => {
      console.log(JSON.stringify(response.data.results[0].types));
    })
    .catch(error=> {
      console.log(error);
    });
}
//isCafe('wendys');

async function isProduct(input) {
  const config = {
    method: 'get',
    url: `https://api.wolframalpha.com/v2/query?input=${input}&format=plaintext&output=JSON&appid=${process.env.API_W}`,
    headers: { }
  };

  return axios(config)
    .then(response=> {
      //console.log(response["data"]["queryresult"]["datatypes"]);
      return response["data"]["queryresult"]["datatypes"];
    })
    .catch(error=> {
      console.log(error);
    });
}
//isProduct('milk');

async function isBook(input) {
  const config = {
    method: 'get',
    url: `https://www.googleapis.com/books/v1/volumes?q=${input}&key=${process.env.API_G}`,
    headers: { }
  };

  axios(config)
    .then(response => {
      console.log(JSON.stringify(response.data.items[0].volumeInfo.printType));
    })
    .catch(error=> {
      console.log(error);
    });
}
//isBook('War and peace');

module.exports = {
  isBook,
  isCafe,
  isProduct,
  isMovie
};

