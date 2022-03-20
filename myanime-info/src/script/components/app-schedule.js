import "bootstrap/dist/css/bootstrap.min.css";

class AppSchedule extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <div>
        <h4>Ongoing Schedule</h4>
        <div class="list-group" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action active" id="monday-schedule" data-toggle="list" role="tab" aria-controls="home">Monday</a>
            <a class="list-group-item list-group-item-action" id="tuesday-schedule" data-toggle="list" role="tab" aria-controls="profile">Tuesday</a>
            <a class="list-group-item list-group-item-action" id="wednesday-schedule" data-toggle="list" role="tab" aria-controls="messages">Wednesday</a>
            <a class="list-group-item list-group-item-action" id="thursday-schedule" data-toggle="list" role="tab" aria-controls="settings">Thursday</a>
            <a class="list-group-item list-group-item-action" id="friday-schedule" data-toggle="list" role="tab" aria-controls="settings">Friday</a>
            <a class="list-group-item list-group-item-action" id="saturday-schedule" data-toggle="list" role="tab" aria-controls="settings">Saturday</a>
            <a class="list-group-item list-group-item-action" id="sunday-schedule" data-toggle="list" role="tab" aria-controls="settings">Sunday</a>
        </div>
        <br>
        <h5><span id="top-upcoming">Top Upcoming</span></h5>
    </div>
  `;
  }
}

customElements.define("app-schedule", AppSchedule);
