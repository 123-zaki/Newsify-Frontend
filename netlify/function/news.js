
// ---> Direct Fetching (From Frontend)

// export async function netlifyFetchNews(category) {
//   const apiKey = import.meta.env.VITE_NEWS_API_KEY; // store key in Netlify env vars
//   const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=10&apiKey=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     console.log("Data upper: ", data);

//     return {
//       statusCode: 200,
//       body: JSON.stringify(data),
//       headers: {
//         "Access-Control-Allow-Origin": "*", // allow your frontend
//       },
//     };
//   } catch (err) {
//     return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
//   }
// }


// export async function netlifyFetchFilteredNews(searchQuery) {
//   const apiKey = import.meta.env.VITE_NEWS_API_KEY; // store key in Netlify env vars
//   const url = `https://newsapi.org/v2/everything?q=${searchQuery
//     .trim()
//     .toLowerCase()}&pageSize=10&apiKey=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     return {
//       statusCode: 200,
//       body: JSON.stringify(data),
//       headers: {
//         "Access-Control-Allow-Origin": "*", // allow your frontend
//       },
//     };
//   } catch (err) {
//     return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
//   }
// }

// ---> Fetching From Backend (Indirect)

export async function netlifyFetchNews(category) {
  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/articles/get-articles`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({category}),
    });

    const data = await response.json();

    // console.log("Data lower: ", data.data);

    return {
      statusCode: 200,
      body: JSON.stringify(data.data),
      headers: {
        "Access-Control-Allow-Origin": "*", // allow your frontend
      },
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}

export async function netlifyFetchFilteredNews(searchQuery) {
  const url = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/articles/get-filtered-news`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({searchQuery})
    });
  
    const data = await response.json();
    console.log("Filtered News: ", data.data);

    return {
      statusCode: 200,
      body: JSON.stringify(data.data),
      headers: {
        "Access-Control-Allow-Origin": "*", // allow your frontend
      },
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}