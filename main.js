const API_KEY=`9b1e78b6560b498cb57862f612b14d18`
let news = [];
const getLatesNews = async() => {
  const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
  //자바스크립트는 개발자가 필요로 하는 기본함수 제공해줌 -> 그중 하나가 URL 
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log("뉴스",news)
};
//Fetch = 

getLatesNews()