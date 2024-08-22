import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

import AppAccordian from "./AppAccordian";
import AppSearchBox from "./AppSearchBox";
import AppComment from "./AppComment";
import InfiniteScrollList from "./ReactVirtulisation/InfiniteScrollList";
import NestedCheckBox from "./NestedCheckBox/NestedCheckbox";
import AppPagination from "./AppPagination";
import AppOtp from "./AppOtp";
import TicTaeToe from "./TicTaeToe/TicTaeToe";
import SnakeGame from "./snake-game/SnakeGame";
import CountryCapitalGame from "./CountryCapitalGame/CountryCapitalGame";
import PintrestLayout from "./pintrest/pintrest-layout";
import MineSweeper from "./minesweeper/MineSweeper";
import InlineSuggestion from "./InlineSuggestion/InlineSuggestion";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const items = [
  {
    id: 11,
    content: "content 11",
  },
  {
    id: 12,
    content: "content 12",
  },
  {
    id: 13,
    content: "content 13",
  },
  {
    id: 1,
    content: "content 1",
  },
  {
    id: 2,
    content: "content 2",
  },
  {
    id: 3,
    content: "content 3",
  },
  {
    id: 4,
    content: "content 4",
  },
  {
    id: 5,
    content: "content 5",
  },
  {
    id: 6,
    content: "content 6",
  },
];

root.render(
  <>
    {/* <AppAccordian />
    <AppSearchBox />
    <AppComment /> */}
    {/* <InfiniteScrollList items={items} containerHeight={500} itemHeight={100} /> */}
    {/* <NestedCheckBox /> */}
    {/* <AppPagination /> */}
    {/* <AppOtp /> */}
    {/* <TicTaeToe /> */}
    {/* <SnakeGame /> */}
    {/* <CountryCapitalGame /> */}
    {/* <MineSweeper /> */}
    {/* <PintrestLayout /> */}
    <InlineSuggestion />
  </>
);
