/* eslint-disable func-style */

const stringSimilarity = require("string-similarity");
require("dotenv").config({ path: "../.env" });//import .env file
const axios = require("axios");
async function isMovie(text) {
  let val = '';
  const newText = text.trim().split(' ');
  if (newText[newText.length - 1] === 'season') { //in case the iput is ".... 4 season"
    newText.pop();
  }
  if (!isNaN(newText[newText.length - 1])) {//get rid of number at the end (like 'spiderman 2') otherwise this api will not find the movie
    newText.pop();
  }
  if (newText[newText.length - 1] === 'season') { //in case the iput is ".... season 4"
    newText.pop();
  }
  val = newText.join(' ').trim();//adapted value to pass to api
  const config = {
    method: "get",
    url: `https://www.omdbapi.com/?t=${val}&apikey=${process.env.API_O}`,
    headers: {},
  };
  console.log("VVVVV",val);
  return axios(config)
    .then((response) => {
      if (response.data['Response'] === "True") {
        const similarity = stringSimilarity.compareTwoStrings(response.data["Title"].toLowerCase(), val);
        if (similarity >= 0.8) {//since api could give the response for "mcdonalds" that they have movie "mcdonalds in the dark forest"
          return response.data["Type"];
        }
        return "doesn't match";
      } else {
        return "not exist";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

async function isCafe(name) {
  const config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&key=${process.env.API_G}`,
    headers: {},
  };

  return axios(config)
    .then((response) => {
      if (response.data.results.length >= 1) {
        return JSON.stringify(response.data.results[0].types);
      } else {
        return "doesn't match";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

async function isProduct(input) {
  const config = {
    method: "get",
    url: `https://api.wolframalpha.com/v2/query?input=${input}&format=plaintext&output=JSON&appid=${process.env.API_W}`,
    headers: {},
  };
  // let start = new Date().getTime();
  return axios(config)
    .then((response) => {
      //console.log(response["data"]["queryresult"]["datatypes"]);
      // let end = new Date().getTime();
      // let time = end - start;
      // console.log('Execution time: ' + time);
      if (response["data"]["queryresult"]["success"]) {
        return response["data"]["queryresult"]["datatypes"];
      } else {
        return 'no success';
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

async function isBook(input) {
  const config = {
    method: "get",
    url: `https://www.googleapis.com/books/v1/volumes?q=${input}&key=${process.env.API_G}`,
    headers: {},
  };

  return axios(config)
    .then((response) => {
      return JSON.stringify(response.data.items[0].volumeInfo.printType);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  isBook,
  isCafe,
  isProduct,
  isMovie,
};
