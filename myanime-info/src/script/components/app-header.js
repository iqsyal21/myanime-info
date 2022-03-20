import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

class AppHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <style>
    .sizeimage-carousel {
      width: 100%;
      height: 350px;
      object-fit: cover;
      object-position: center;
    }
    </style>

    <nav class="navbar navbar-light" style="background-color: #1A374D;">
        <div class="container-fluid">
            <a class="navbar-brand" style="color: white">MyAnime Info</a>
            <form class="d-flex">
                <input id="search-title" class="form-control mr-3" type="search" placeholder="ex : jujutsu kaisen" aria-label="Search">
                <button id="search-button" type="submit" class="btn btn-secondary">Search</button>
            </form>
        </div>
    </nav>

    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2022/01/07/555201983.jpg" class="d-block sizeimage-carousel" alt="attack on titan">
          <div class="carousel-caption d-none d-md-block">
            <h2>Attack On Titan</h2>
            <p>Turning against his former allies and enemies alike, Eren Yeager sets a disastrous plan in motion.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://pbs.twimg.com/media/E6QlUclXsAMkTFy?format=jpg&name=large" class="d-block sizeimage-carousel" alt="case study vanitas">
          <div class="carousel-caption d-none d-md-block">
            <h2>Study Case Vanitas</h2>
            <p>Scorned by others of his kind for being born under a blue moon, the vampire Vanitas grew afraid and desolate.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://i0.wp.com/wibumesta.com/wp-content/uploads/2021/03/akebi-chan-no-sailor-fuku7.jpg" class="d-block sizeimage-carousel" alt="akebi-chan no sailor fuku">
          <div class="carousel-caption d-none d-md-block">
            <h2>Akebi-chan Sailor Fuku</h2>
            <p>Ever since she was young, Komichi Akebi has always adored sailor uniforms, even going so far as to ask her mother to sew one if she succeeds in getting into her mother's alma mater, Roubai Academy.</p>
          </div>
        </div>
      </div>
      
    </div>
  `;
  }
}

customElements.define("app-header", AppHeader);
