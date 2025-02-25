const API_KEY=`9b1e78b6560b498cb57862f612b14d18`
let newsList = [];
const getLatesNews = async() => {
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
  //자바스크립트는 개발자가 필요로 하는 기본함수 제공해줌 -> 그중 하나가 URL 
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("뉴스",newsList)
};


const render=()=>{
const newsHTML= newsList.map((news) =>`<div class="row">
<div class="col-lg-4">
  <img class="img-size"
    src=${news.urlToImage}
    alt="뉴스이미지">
</div>
<div class="col-lg-8">
  <h2>${news.title}</h2>
  <p>${news.description}</p>
  <div>
    ${news.source.name}${news.publishedAt}
  </div>
</div>
</div>`).join("");



document.getElementById("news-board").innerHTML=newsHTML
}

getLatesNews()