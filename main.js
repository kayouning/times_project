// 햄버거 버튼 클릭 시 메뉴 보이기/숨기기
const toggleMenu = () => {
  const menu = document.querySelector(".menus");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
};

// 검색창 보이기/숨기기
const toggleSearch = () => {
  const searchBox = document.querySelector(".search-box");
  searchBox.style.display = searchBox.style.display === "block" ? "none" : "block";
};

const API_KEY = `9b1e78b6560b498cb57862f612b14d18`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");

// 버튼 클릭하면 카테고리별 뉴스 가져오기
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));

// 공통된 뉴스 가져오는 함수
const fetchNews = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
  } catch (error) {
    console.error("오류:", error);
  }
};

// 최신 뉴스 가져오기
const getLatestNews = () => {
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`);
  fetchNews(url);
};

// 카테고리별 뉴스 가져오기
const getNewsByCategory = (event) => {
  const category = event.target.textContent.toLowerCase();
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`);
  fetchNews(url);
};

// 키워드 검색 뉴스 가져오기
const getNewsByKeyword = () => {
  const keyword = document.getElementById("search-input").value;
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`);
  fetchNews(url);
};

// 날짜를 "X days ago" 형태로 변환하는 함수
const timeAgo = (dateString) => {
  const now = new Date();
  const pastDate = new Date(dateString);
  const diffInSeconds = Math.floor((now - pastDate) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
};

// 뉴스 리스트 렌더링
const render = () => {
  const newsHTML = newsList.map((news) => {
    // 이미지 URL이 없거나 잘못된 경우 기본 이미지 적용
    const imageUrl = news.urlToImage ? news.urlToImage : "./images/no_img.png";

    // 출처가 없을 경우 기본값 설정
    const sourceName = news.source?.name ? news.source.name : "No source";

    // 날짜 변환 (publishedAt을 'X days ago' 형식으로 변환)
    const formattedDate = news.publishedAt ? timeAgo(news.publishedAt) : "Unknown date";

    // 뉴스 설명이 없거나 길면 처리
    const description = news.description 
      ? news.description.length > 200 
        ? news.description.slice(0, 200) + "..." 
        : news.description
      : "내용 없음";

    return `
      <div class="row">
        <div class="col-lg-4">
          <img class="img-size" src="${imageUrl}" alt="뉴스 이미지"
            onerror="this.onerror=null; this.src='./images/no_img.png';">
        </div>
        <div class="col-lg-8">
          <h2 class="title">${news.title}</h2>
          <p>${description}</p>
          <div>${sourceName} - ${formattedDate}</div>
        </div>
      </div>`;
  }).join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

// 최신 뉴스 가져오기 실행
getLatestNews();
