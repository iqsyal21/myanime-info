import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function main() {
  const baseUrl = "https://jikan1.p.rapidapi.com";

  const getItemUpcoming = () => {
    axios
      .get(`${baseUrl}/top/anime/1/upcoming`, {
        headers: {
          "x-rapidapi-host": "jikan1.p.rapidapi.com",
          "x-rapidapi-key":
            "5018babd9emsh82c0eeb7db8a3bbp1e15abjsnd2088df52b22",
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((responseJson) => {
        if (responseJson.error) {
          showResponseMessage(responseJson.message);
        } else {
          renderAllItemCard(responseJson.top);
        }
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  const getItemSchedule = (day) => {
    axios
      .get(`${baseUrl}/schedule/${day}`, {
        headers: {
          "x-rapidapi-host": "jikan1.p.rapidapi.com",
          "x-rapidapi-key":
            "5018babd9emsh82c0eeb7db8a3bbp1e15abjsnd2088df52b22",
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((responseJson) => {
        if (responseJson.error) {
          showResponseMessage(responseJson.message);
        } else {
          switch (day) {
            case "monday":
              renderAllItemTable(responseJson.monday);
              break;
            case "tuesday":
              renderAllItemTable(responseJson.tuesday);
              break;
            case "wednesday":
              renderAllItemTable(responseJson.wednesday);
              break;
            case "thursday":
              renderAllItemTable(responseJson.thursday);
              break;
            case "friday":
              renderAllItemTable(responseJson.friday);
              break;
            case "saturday":
              renderAllItemTable(responseJson.saturday);
              break;
            case "sunday":
              renderAllItemTable(responseJson.sunday);
              break;
            default:
              alert("day is not found");
              break;
          }
        }
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  const getItemSearch = (title) => {
    axios
      .get(`https://jikan1.p.rapidapi.com/search/anime?q=${title}`, {
        headers: {
          "x-rapidapi-host": "jikan1.p.rapidapi.com",
          "x-rapidapi-key":
            "5018babd9emsh82c0eeb7db8a3bbp1e15abjsnd2088df52b22",
        },
      })
      .then((response) => {
        return response.data;
      })
      .then((responseJson) => {
        if (responseJson.error) {
          showResponseMessage(responseJson.message);
        } else {
          renderAllItemSearch(responseJson.results);
        }
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  // function render upcoming anime
  const renderAllItemCard = (data) => {
    const resultAnime = document.querySelector("#anime-card-item");
    resultAnime.innerHTML = "";

    data.forEach((item) => {
      if (item.episodes == null) {
        item.episodes = "-";
      }
      if (item.start_date == null) {
        item.start_date = "-";
      }
      if (item.end_date == null) {
        item.end_date = "-";
      }
      if (item.score == "0") {
        item.score = "-";
      }

      resultAnime.innerHTML += `
      <style>
      .card-item {
        width: 14rem;
      }
      @media screen and (max-width: 1024px) {
        .card-item {
          width: 100%;
        }
      }
      </style>
      <div class="card card-item m-2">
        <img src="${item.image_url}" class="img-thumbnail" alt="image thumbnail">
        <div class="card-body">
          <h5 class="card-title">#${item.rank} (id : ${item.mal_id})</h5>
          <h5 class="card-title">${item.title}</h5>
          <table class="mt-3 mb-3">
            <tr>
              <td>Episodes</td>
              <td>: ${item.episodes}</td>
            </tr>
            <tr>
              <td>Start</td>
              <td>: ${item.start_date}</td>
            </tr>
            <tr>
              <td>End</td>
              <td>: ${item.end_date}</td>
            </tr>
            <tr>
              <td>Score</td>
              <td>: ${item.score}</td>
            </tr>
          </table>
          <p><a href="${item.url}" class="btn btn-primary">More Info</a></p>
        </div>
      </div>
      `;
    });
  };

  // function render schedule anime
  const renderAllItemTable = (data) => {
    const hiddenItem = document.getElementById("anime-card-item");
    hiddenItem.classList.add("d-none");

    const tableSchedule = document.getElementById("table-schedule");
    tableSchedule.innerHTML = `
    <table class="table table-bordered table-striped table-dark">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Episodes</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody id="listItem">
        </tbody>
    </table>
    `;

    const listScheduleElements = document.querySelector("#listItem");
    listScheduleElements.innerHTML = "";

    data.forEach((item) => {
      if (item.episodes == null) {
        item.episodes = "-";
      }
      if (item.score == null) {
        item.score = "-";
      }

      listScheduleElements.innerHTML += `
      <tr>
        <th scope="row">${item.mal_id}</th>
        <td><img src="${item.image_url}" alt="thumbnails ${item.title}" class="img-thumbnail"></td>
        <td>${item.title}</td>
        <td>${item.episodes}</td>
        <td>${item.score}</td>
      </tr>
      `;
    });
  };

  // function render search anime
  const renderAllItemSearch = (data) => {
    const resultAnime = document.querySelector("#anime-search-item");
    resultAnime.innerHTML = "";

    for (let i = 0; i < 3; i++) {
      resultAnime.innerHTML += `
      <h2>${data[i].title}</h2>
      <img src="${data[i].image_url}" class="img-thumbnail" alt="image thumbnail">
      <dl class="row mt-3">
        <dt class="col-sm-2">MyAnimeList Id</dt>
        <dd class="col-sm-10">${data[i].mal_id}</dd>

        <dt class="col-sm-2">Episodes</dt>
        <dd class="col-sm-10">${data[i].episodes}</dd>

        <dt class="col-sm-2 text-truncate">Score</dt>
        <dd class="col-sm-10">${data[i].score}</dd>

        <dt class="col-sm-2">Nesting</dt>
        <dd class="col-sm-10">
          <p>${data[i].synopsis}</p>
        </dd>
      </dl>
      `;
    }
  };

  const showResponseMessage = (message = "Check your internet connection") => {
    alert(message);
  };

  document.addEventListener("DOMContentLoaded", () => {
    // get item upcoming anime
    const getValueCard = document.getElementById("top-upcoming");
    getValueCard.addEventListener("click", () => {
      const hiddenTable = document.getElementById("table-schedule");
      hiddenTable.classList.add("d-none");
      const displaySearch = document.getElementById("anime-search-item");
      displaySearch.classList.add("d-none");
      const displayCard = document.getElementById("anime-card-item");
      displayCard.classList.remove("d-none");
    });
    getItemUpcoming();

    // get item shcedule anime
    const getValueTable = document.getElementById("list-tab");
    getValueTable.addEventListener("click", () => {
      const hiddenCard = document.getElementById("anime-card-item");
      hiddenCard.classList.add("d-none");
      const displaySearch = document.getElementById("anime-search-item");
      displaySearch.classList.add("d-none");
      const displayTable = document.getElementById("table-schedule");
      displayTable.classList.remove("d-none");
    });

    const daySelectMonday = document.getElementById("monday-schedule");
    daySelectMonday.addEventListener("click", () => {
      const daySelect = "monday";
      getItemSchedule(daySelect);
    });

    const daySelectTuesday = document.getElementById("tuesday-schedule");
    daySelectTuesday.addEventListener("click", () => {
      const daySelect = "tuesday";
      getItemSchedule(daySelect);
    });

    const daySelectWednesday = document.getElementById("wednesday-schedule");
    daySelectWednesday.addEventListener("click", () => {
      const daySelect = "wednesday";
      getItemSchedule(daySelect);
    });

    const daySelectThursday = document.getElementById("thursday-schedule");
    daySelectThursday.addEventListener("click", () => {
      const daySelect = "thursday";
      getItemSchedule(daySelect);
    });

    const daySelectFriday = document.getElementById("friday-schedule");
    daySelectFriday.addEventListener("click", () => {
      const daySelect = "friday";
      getItemSchedule(daySelect);
    });

    const daySelectSaturday = document.getElementById("saturday-schedule");
    daySelectSaturday.addEventListener("click", () => {
      const daySelect = "saturday";
      getItemSchedule(daySelect);
    });

    const daySelectSunday = document.getElementById("sunday-schedule");
    daySelectSunday.addEventListener("click", () => {
      const daySelect = "sunday";
      getItemSchedule(daySelect);
    });

    // get item search
    const searchForm = document.getElementById("search-button");
    searchForm.addEventListener("click", function (event) {
      const hiddenCard = document.getElementById("anime-card-item");
      hiddenCard.classList.add("d-none");
      const hiddenTable = document.getElementById("table-schedule");
      hiddenTable.classList.add("d-none");
      const displaySearch = document.getElementById("anime-search-item");
      displaySearch.classList.remove("d-none");

      const valueTitle = document.getElementById("search-title").value;
      event.preventDefault();
      getItemSearch(valueTitle);
    });
  });
}

export default main;
