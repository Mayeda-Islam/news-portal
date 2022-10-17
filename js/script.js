const loadAllCategoryNews = () => {
   const url = `https://openapi.programming-hero.com/api/news/categories`;
   fetch(url)
      .then((res) => res.json())
      .then((data) => displayAllCategoryNews(data.data.news_category))
      .catch((error) => {
         console.log(error);
      });
};
const displayAllCategoryNews = (allNews) => {
   for (const news of allNews) {
      const allNewsContainer = document.getElementById("all-news");
      const newsDiv = document.createElement("div");
      newsDiv.classList.add("col");
      newsDiv.innerHTML = `<div class='text-center' onclick="loadNews('${news.category_id}')">${news.category_name}</div>`;
      allNewsContainer.appendChild(newsDiv);
   }
};
const loadNews = (newsId) => {
   console.log(newsId);
   const url = `https://openapi.programming-hero.com/api/news/category/${newsId}`;
   fetch(url)
      .then((res) => res.json())
      .then((data) => showAllNew(data.data))
      .catch((error) => console.log(error));
};
const showAllNew = (allNews) => {
   console.log(allNews.length);
   // show the news lenght
   const newsLength = document.getElementById("news-length");
   newsLength.innerText = ` ${allNews.category_name} is news  ${allNews.length}`;
   const allNewsContainer = document.getElementById("all-news-container");
   allNewsContainer.innerHTML = ``;
   allNews.forEach((news) => {
      const newsDiv = document.createElement("div");
      newsDiv.classList.add("col-12");
      newsDiv.innerHTML = `<div class="card style="height: 20rem;">
                     <div class="row">
                        <div class="col-3">
                           <img
                              src="${news.thumbnail_url}"
                              class=" p-3 w-100"
                              alt="..."
                           />
                        </div>
                        <div class="col-9">
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
                                    <small>${
                                       news.author.name
                                          ? news.author.name
                                          : "not found"
                                    }</small>
                                    <br/>
                                    <small>${
                                       news.author.published_date
                                          ? news.author.published_date
                                          : "not found"
                                    }</small>
                                 </div>
                              </div>
                              <div class="d-flex align-items-center">
                              <i class="fa-solid fa-eye"></i>
                                 <small class=" ps-2">${
                                    news.total_view ? news.total_view : 0
                                 }</small>
                              </div>
                              <div>
                              <i onclick="detailsNews('${
                                 news._id
                              }')" class="fa-solid fa-arrow-right-to-bracket" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                              </div>
                              </div>
                        </div>
                     </div>
                  </div>`;
      allNewsContainer.appendChild(newsDiv);
   });
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
               <td>${news.total_view ? news.total_view : "not found"}</td>
            </tr>
         </tbody>
      </table>
     `;
   });
};
loadAllCategoryNews();
