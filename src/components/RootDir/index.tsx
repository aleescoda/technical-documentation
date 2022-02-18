import React from "react";
import ChildDir from "./ChildDir";
import { withPrefix } from "gatsby";
import "./style.module.css";

type Props = {
  name: string;
  icon: string;
  children?: JSX.Element[]; // verify type
};

export default function RootDir(props: Props) {
  const { name, icon, children } = props;

  return (
    <>
      <div className="root-container">
        <div>
          <img
            className="icon"
            src={`https://cdn.decentraland.com/${withPrefix(`/${name}.svg`)}`}
          />
          {name}
        </div>
        {children &&
          // TO-DO: type the objects, need to define data structure first
          children.map((item: any, key: number) => {
            return (
              <ChildDir
                name={item.name}
                children={item.children}
                offset={1}
                type={item.type}
                key={key}
              />
            );
          })}
      </div>
    </>
  );
}
