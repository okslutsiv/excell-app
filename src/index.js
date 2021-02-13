import "@/styles/index.scss";
import { Router } from "@core/router/Router";
import { DashboardPage } from "@core/router/pages/DashboardPage";
import { ExcelPage } from "@core/router/pages/ExcelPage";

new Router(document.getElementById("root"), {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
