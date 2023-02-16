interface Book {
  title: string;
  author: string;
  bookDescription: string;
  imageURL: string;
  price: string;
  category: string;
}

const books: Book[]= [
  {
    title:'Becoming',
    author:'Michelle Obama',
    bookDescription: 'In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world, chronicling the experiences that have shaped her—from her childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work, to her time spent at the world’s most famous address.',
    imageURL: 'https://m.media-amazon.com/images/P/1524763136.01._SCLZZZZZZZ_SX500_.jpg',
    price: '23.00',
    category:'Motivation'
  },
  {
    title:'Find Your People',
    author:'Jennie Allen',
    bookDescription: 'In a world that’s both more connected and more isolating than ever before, we’re often tempted to do life alone, whether because we’re so busy or because relationships feel risky and hard. But science confirms that consistent, meaningful connection with others has a powerful impact on our well-being. We are meant to live known and loved. But so many are hiding behind emotional walls that we’re experiencing an epidemic of loneliness.',
    imageURL: 'https://d1b14unh5d6w7g.cloudfront.net/0593193385.01.S001.LXXXXXXX.jpg?Expires=1676624277&Signature=GHL~Mld4c52pE~7CQLC4mnPPM2Xxp3uA4BRm7AMiImnIXEO-83DXyeFbuNK7CIANYI0Pbp9RGtpZadzZHwHD8qs4LAc4K1zopOcfU1oCiDRachMuBFvYxgWo2Y9kEyq8fDRSzoBy04MYf9yb5muTc59wJ3ewUi0PT5Md8kIIBlQ_&Key-Pair-Id=APKAIUO27P366FGALUMQ',
    price: '12.50',
    category:'Motivation'
  },
  {
    title:'Atomic Habits',
    author:'James Clear',
    bookDescription: "No matter your goals, Atomic Habits offers a proven framework for improving - every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results",
    imageURL: 'https://d1b14unh5d6w7g.cloudfront.net/0735211299.01.S001.LXXXXXXX.jpg?Expires=1676628376&Signature=bVi7nAgIDxDgGRjRdBuAGMxcEVmf6iQywt2IvEAp-av9-ynuKDHKwHKC72gbGJVv8wJc6QcbGls6hmh~MT7nbVDUN71--6-ys5mVcA-Y37yeLmZuoexPP80wlPSVbi6LIUkPxwGlfjuJ5ZDFl--eDLphPi6JSCxQ6vEfqdXZ~jI_&Key-Pair-Id=APKAIUO27P366FGALUMQ',
    price: '3.80',
    category:'Motivation'
  },
  {
    title:'Tastes Like Shakkar',
    author:'Nishar Sharma',
    bookDescription: "With aspirations of taking over her family’s event planning business, Bobbi knows that one misstep in managing the Kareena Mann and Prem Verma (#Vermann) party, along with the other weddings on her plate, will only give her uncle another reason not to promote her. That means Kareena’s big day and Bobbi's future career are on the line.",
    imageURL: 'https://m.media-amazon.com/images/I/41yYDitNvyL._SY346_.jpg',
    price: '19.45',
    category:'Romance'
  }
]
function getPopular(): void {
  const section1 = document.querySelector('.section1');
  if (section1) {
    section1.innerHTML = `
      <img src="${books[0].imageURL}" alt="${books[0].title}" onclick="createModal(0)" />
    `;
  }

  const section2 = document.querySelector('.section2');
  if (section2) {
    section2.innerHTML += `
      <img src="${books[1].imageURL}" alt="${books[1].title}" onclick="createModal(1)" />
      <img src="${books[2].imageURL}" alt="${books[2].title}" onclick="createModal(2)" />
    `;
  }

  const section3 = document.querySelector('.section3');
  if (section3) {
    section3.innerHTML += `
      <img src="${books[3].imageURL}" alt="${books[3].title}" onclick="createModal(3)" />
    `;
  }
  console.log(`${books[3].title}`);
}

getPopular();

const createModal = (num: number): void => {
  const modal = document.querySelector("#activity-modal");
  if (!modal) return;

  const index = num;
  modal.innerHTML = `
    <div class="modal-content">
      <div>
        <img src="${books[index].imageURL}" alt="${books[index].title}" />
      </div>
      <div>
        <p>${books[index].bookDescription}</p>
        <p id="price">$ ${books[index].price}</p>
        <div class="modal-btns">
          <button id="modal-close-btn">Close</button>
          <button id="add-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  `;

  const closeBtn = document.querySelector("#modal-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => closeModal());
  }
  modal.style.display = "block";
};

const closeModal = (): void => {
  const modal = document.querySelector("#activity-modal");
  if (!modal) return;
  modal.style.display = "none";
};