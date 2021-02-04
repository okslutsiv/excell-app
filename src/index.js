import "@/styles/index.scss";
import { Excel } from "@/components/excel/Excel";
import { Formula } from "@/components/formula/Formula";
import { Header } from "@/components/header/Header";
import { Table } from "@/components/table/Table";
import { Toolbar } from "@/components/toolbar/Toolbar";

const excel = new Excel("#root", {
  components: [Header, Toolbar, Formula, Table],
});
excel.render();

console.log("Excel 🚀 ");
