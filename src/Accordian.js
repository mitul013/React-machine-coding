import {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const Accordian = ({ children, autoChange = true }) => {
  let ids = Children.map(children, (child) => ({
    id: child.props.id,
    show: false,
  }));
  const [idObjs, setIdObjs] = useState(ids);
  const [active, setActive] = useState(idObjs[0]);
  const timeRef = useRef(null);

  const changeAccordianStatus = (id) => {
    const updatedIdObjs = idObjs.map((obj) => {
      if (obj.id == id) {
        obj.show = !obj.show;
      } else {
        obj.show = false;
      }
      return { ...obj };
    });
    setIdObjs([...updatedIdObjs]);
    setActiveByIndex(id);
  };

  const setActiveByIndex = (id) => {
    const idObj = idObjs.find((obj) => obj.id == id);
    setActive({ ...idObj });
  };

  useEffect(() => {
    if (autoChange) {
      timeRef.current = setTimeout(() => {
        let nextActive = idObjs.findIndex((idObj) => idObj.id == active.id);
        changeAccordianStatus(idObjs[(nextActive + 1) % idObjs.length].id);
      }, 5000);
    }
    return () => {
      timeRef?.current && clearTimeout(timeRef.current);
    };
  }, [active.id, active.show]);

  return (
    <AccordianContext.Provider
      value={{ active, setActive, changeAccordianStatus }}
    >
      {children}
    </AccordianContext.Provider>
  );
};

Accordian.item = ({ children, id }) => {
  return (
    <AccordianItemContext.Provider value={{ id }}>
      {children}
    </AccordianItemContext.Provider>
  );
};

Accordian.header = ({ children }) => {
  const { changeAccordianStatus } = useAccordian();
  const { id } = useAccordianItem();
  return <div onClick={() => changeAccordianStatus(id)}>{children}</div>;
};

Accordian.panel = ({ children }) => {
  const { active } = useAccordian();
  const { id } = useAccordianItem();
  return active.id == id && active.show ? <div>{children}</div> : null;
};

export default Accordian;

const AccordianContext = createContext();
const AccordianItemContext = createContext();

function useAccordian() {
  return useContext(AccordianContext);
}

function useAccordianItem() {
  return useContext(AccordianItemContext);
}
