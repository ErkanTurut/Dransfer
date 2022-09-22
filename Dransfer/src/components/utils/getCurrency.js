import axios from "axios";

//convert ethereum to currencies

async function getCurrency(currency) {
  const res = await axios
    .get("https://api.coingecko.com/api/v3/simple/price", {
      params: {
        ids: "ethereum",
        vs_currencies: currency,
      },
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });

  return res.data;
}

export default getCurrency;
