// 햄버거 버튼 클릭 시 메뉴 보이기/숨기기
const toggleMenu = () => {
  const menu = document.querySelector(".menus");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
};

const toggleSearch = () => {
  const searchBox = document.querySelector(".search-box");
  searchBox.style.display = searchBox.style.display === "block" ? "none" : "block";
};


const API_KEY=`9b1e78b6560b498cb57862f612b14d18`
let newsList = [];
const menus = document.querySelectorAll(".menus button");

// 버튼 클릭하면 카테고리별 뉴스 가져오기
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))

// 공통된 뉴스 가져오는 함수
const fetchNews = async (url) => {
  try {
      const response = await fetch(url);
      const data = await response.json();
      newsList = data.articles;
      render();
  } catch (error) {
      console.error("뉴스를 불러오는 중 오류 발생:", error);
  }
};



// 최신 뉴스 가져오기
const getLatestNews = () => {
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
  //자바스크립트는 개발자가 필요로 하는 기본함수 제공해줌 -> 그중 하나가 URL 
  fetchNews(url);
};


// 카테고리별 뉴스 가져오기
const getNewsByCategory=(event)=>{
  const category = event.target.textContent.toLowerCase();
// console.log("카테고리",category)
const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`);

fetchNews(url);
}

// 키워드 검색 뉴스 가져오기
const getNewsByKeyword=()=>{
  const keyword = document.getElementById("search-input").value;
// console.log(keyword);
const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`);

fetchNews(url);
};



const render=()=>{
const newsHTML= newsList.map((news) =>{
  const description = news.description 
            ? news.description.length > 200 
                ? news.description.slice(0, 200) + "..." 
                : news.description
            : "내용 없음"; 



        return `<div class="row">
<div class="col-lg-4">
  <img class="img-size"
    src=${news.urlToImage}
    alt="뉴스이미지">
</div>
<div class="col-lg-8">
  <h2>${news.title}</h2>
  <p>${description}</p>
  <div>
    ${news.source.name}${news.publishedAt}
  </div>
</div>
</div>`}).join("");



document.getElementById("news-board").innerHTML=newsHTML
}

getLatestNews()

//버튼들에 클릭이벤트
//카테고리별 뉴스 가져오기
//뉴스 렌더(보여주기)