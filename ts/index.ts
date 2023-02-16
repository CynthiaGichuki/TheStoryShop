document.addEventListener("DOMContentLoaded", function() {
    let outputList: HTMLElement = document.getElementById("list-output")!;
    let searchResult: HTMLElement = document.getElementById("searchResult")!;
    let searchBox: HTMLInputElement = document.querySelector('#search-box')!;
    let topmain: HTMLElement = document.getElementById("topmain")!;
    let authorsdiv: HTMLElement = document.getElementById("authorsdiv")!;
    let bookUrl: string = "https://www.googleapis.com/books/v1/volumes?q=";
    let apiKey: string = "key=<API_KEY>";
    let placeHldr: string = '<img src="https://via.placeholder.com/150">';
    let searchData: string;
  
    //listener for search button
    document.getElementById("search")!.addEventListener("click", function () {
      searchResult.innerHTML = "Search Results";
      outputList.innerHTML = ""; //empty html output
      document.body.style.backgroundImage = "url('')";
      searchData = searchBox.value;
  
      //handling empty search input field
      if (searchData === "" || searchData === null) {
        displayError();
      } else {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', bookUrl + searchData);
        xhr.responseType = 'json';
        xhr.onload = function() {
          if (xhr.status === 200) {
            console.log(xhr.response);
            displayResults(xhr.response);
          } else {
            alert("Something went wrong.. <br>" + "Try again!");
          }
        };
        xhr.send();
      }
  
      searchBox.value = ""; //clear search box

        //formatting output
        function formatOutput(bookImg: string, title: string, author: string, publisher: string, bookLink: string, bookIsbn: string): string {
            const viewUrl = `book.html?isbn=${bookIsbn}`; //constructing link for bookviewer
            const htmlCard = `<div class="col-lg-6">
             <div class="card" style="">
               <div class="row no-gutters">
                 <div class="col-md-4">
                   <img src="${bookImg}" class="card-img" alt="...">
                 </div>
                 <div class="col-md-8">
                   <div class="card-body">
                     <h5 class="card-title">${title}</h5>
                     <p class="card-text">Author: ${author}</p>
                     <p class="card-text">Publisher: ${publisher}</p>
                     <a target="_blank" href="${viewUrl}" class="btn btn-secondary">Add to Cart</a>
                   </div>
                 </div>
               </div>
             </div>
           </div>`;
            return htmlCard;
        }
    
        //handling error for empty search box
        function displayError(): void {
            alert("search term can not be empty!")
        }
    });
    