import { Page } from "../Page";
import { $ } from "@core/dom";
import { createDashboardList } from "./dashboard.template";
export class DashboardPage extends Page {
  constructor(params) {
    super(params);
  }
  getRoot() {
    const now = Date.now().toString();
    return $.create("div", "db").html(
      `<div class="db__header">
          <h1>Pure JS Excel Dashboard</h1>
        </div>
        <div class="db__new">
          <div class="db__view">
            <a href="#excel/${now}" class="db__create"
              >Add<br />
              New<br />
              Table</a
            >
          </div>
        </div>
            ${createDashboardList()}
        `
    );
  }
  destroy() {
    console.log("Bye, dashboard!");
  }
}
