import Accordian from "./Accordian";
import "./styles.css";

export default function AppAccordian() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <br />
      <br />
      <Accordian>
        <Accordian.item id={0}>
          <Accordian.header>Header</Accordian.header>
          <Accordian.panel>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsum
          </Accordian.panel>
        </Accordian.item>
        <Accordian.item id={1}>
          <Accordian.header>Header2</Accordian.header>
          <Accordian.panel>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsum
          </Accordian.panel>
        </Accordian.item>
        <Accordian.item id={2}>
          <Accordian.header>Header3</Accordian.header>
          <Accordian.panel>
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsum
          </Accordian.panel>
        </Accordian.item>
      </Accordian>
    </div>
  );
}
