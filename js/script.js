let allNews = [];
// short button
const sortButton = document.getElementById("sort-button");
const loadAllCategoryNews = () => {
   toggleSpinner(true);
   const url = `https://openapi.programming-hero.com/api/news/categories`;
   fetch(url)
      .then((res) => res.json())
      .then((data) => displayAllCategoryNews(data.data.news_category))
      .catch((error) => {
         console.log(error);
      });
};
const displayAllCategoryNews = (allNews) => {
   const allNewsContainer = document.getElementById("all-news");
   for (const news of allNews) {
      const newsDiv = document.createElement("div");
      newsDiv.innerHTML = `<div id="all-news" style="cursor:pointer;" class="text-center  fw-bold " onclick="loadNews('${news.category_id}','${news.category_name}')">${news.category_name}</div>`;
      allNewsContainer.appendChild(newsDiv);
   }
   toggleSpinner(false);
};
const loadNews = (categoriesId, categoriesName) => {
   // spinner
   toggleSpinner(true);
   const url = `https://openapi.programming-hero.com/api/news/category/${categoriesId}`;
   fetch(url)
      .then((res) => res.json())
      .then((data) => {
         allNews = data.data;
         if (allNews.length > 0) {
            sortButton.classList.remove("d-none");
         } else {
            sortButton.classList.add("d-none");
         }
         showAllNews(data.data, categoriesName);
      })

      .catch((error) => console.log(error));
};

const showAllNews = (allNews, categoriesName) => {
   // show the news lenght
   const newsLength = document.getElementById("news-length");
   newsLength.innerText = ` ${allNews.length} news found in ${categoriesName} catagoery `;
   const allNewsContainer = document.getElementById("all-news-container");
   allNewsContainer.innerHTML = ``;
   allNews.forEach((news) => {
      const newsDiv = document.createElement("div");
      newsDiv.classList.add("col-12");
      newsDiv.innerHTML = `<div class="card style="height: 20rem;">
                     <div class="row">
                        <div class=" col-sm-12 col-md-3">
                           <img
                              src="${news.thumbnail_url}"
                              class=" p-3 w-100"
                              alt="..."
                           />
                        </div>
                        <div class=" col-sm-12 col-md-9">
                           <div class="card-body mt-3">
                              <h5 class="card-title">${news.title}</h5>
                              <p class="card-text mt-2" >
                                 ${
                                    news.details.length > 400
                                       ? news.details
                                            .slice(0, 400)
                                            .concat("...")
                                       : news.details
                                 }
                              </p>
                              
                           </div>
                           <div class="card-footer mt-5">
                              <div class="d-flex justify-content-between  align-items-center">
                              <div class="d-flex">
                                 <div><img style="width: 50px" class="rounded-circle " src="${
                                    news.author.img
                                 }"/></div>
                                 <div class="ps-2">
                                    <small class="fw-bold">${
                                       news.author.name
                                          ? news.author.name
                                          : "not found"
                                    }</small>
                                    <br/>
                                    <small class="fw-bold">${
                                       news.author.published_date
                                          ? news.author.published_date
                                          : "not found"
                                    }</small>
                                 </div>
                              </div>
                              <div class="d-flex align-items-center">
                              <i style=" color: #5D5FEF;" class="fa-solid fa-eye"></i>
                                 <small class=" fw-bold ps-2">${
                                    news.total_view ? news.total_view + " M" : 0
                                 }</small>
                              </div>
                              <div>
                              <i style="cursor:pointer; color: #5D5FEF;" onclick="detailsNews('${
                                 news._id
                              }')" class="fa-solid fa-arrow-right-to-bracket" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                              </div>
                              </div>
                        </div>
                     </div>
                  </div>`;
      allNewsContainer.appendChild(newsDiv);
   });
   // stop spinner
   toggleSpinner(false);
};
const handleSortByViews = () => {
   const sortedNews = allNews.sort((a, b) => b.total_view - a.total_view);
   showAllNews(sortedNews);
};
const detailsNews = (newsId) => {
   const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
   fetch(url)
      .then((res) => res.json())
      .then((data) => displayDetailsNews(data.data));
};
const displayDetailsNews = (allNews) => {
   allNews.forEach((news) => {
      const newsTitle = document.getElementById("staticBackdropLabel");
      newsTitle.innerHTML = `<p>${news.title}</p>`;
      const newsInfo = document.getElementById("news-body");
      newsInfo.innerHTML = `
      <img class="img-fluid" src='${news.image_url}'/>
      <table class="table">
         <tbody>
            <tr>
               <th>Author name : </th>
               <td>${news.author.name ? news.author.name : "not found"}</td>
               
            </tr>
             <tr>
               <th>Published date : </th>
               <td>${
                  news.author.published_date
                     ? news.author.published_date
                     : "not found"
               }</td>
            </tr>
            <tr>
               <th>Rating : </th>
               <td>${news.rating.number ? news.rating.number : "not found"}</td>
            </tr>
            <tr>
               <th>Badge: </th>
               <td>${news.rating.badge ? news.rating.badge : "not found"}</td>
            </tr>
            <tr>
               <th>Total view : </th>
               <td>${
                  news.total_view ? news.total_view + " M" : "not found"
               }</td>
            </tr>
         </tbody>
      </table>
     `;
   });
};
// loading spinner
const toggleSpinner = (isLoading) => {
   const loadingSpinner = document.getElementById("loading-spinner");
   if (isLoading) {
      loadingSpinner.classList.remove("d-none");
   } else {
      loadingSpinner.classList.add("d-none");
   }
};
loadAllCategoryNews();
