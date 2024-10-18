import { Divider, SideBar } from "@equinor/eds-core-react";
import React from "react";
import "../../App.css";
import {
  add,
  bar_chart,
  home,
  play,
  table_chart,
  timeline,
} from "@equinor/eds-icons";

interface SidebarLink {
  label: string;
  icon: typeof home;
  name: string;
}

const sidebarLinks: SidebarLink[] = [
  { label: "Table", icon: table_chart, name: "table" },
  { label: "Analytics", icon: bar_chart, name: "analytics" },
  { label: "Gantt", icon: timeline, name: "gantt" },
];

interface SidebarProps {
  selected: string;
  setSelected: (name: string) => void;
  fetchData: () => void;
  handleCreate: () => void;
}

const CommpkgSidebar: React.FC<SidebarProps> = ({
  fetchData,
  handleCreate,
  selected,
  setSelected,
}) => {
  return (
    <div id="sidebar">
      <SideBar>
        <SideBar.Content>
          <SideBar.Toggle />

          <Divider
            size="2"
            color="medium"
            style={{
              marginBlock: 0,
            }}
          />
          <SideBar.Button label="Get Commpkg" icon={play} onClick={fetchData} />
          <Divider
            size="2"
            color="medium"
            style={{
              marginBlock: 0,
            }}
          />
          <SideBar.Button
            label="Create Commpkg"
            icon={add}
            onClick={handleCreate}
          />
          <Divider
            size="2"
            color="medium"
            style={{
              marginBlock: 0,
            }}
          />
          {sidebarLinks.map((linkItem) => (
            <SideBar.Link
              key={linkItem.name}
              label={linkItem.label}
              icon={linkItem.icon}
              active={selected === linkItem.name}
              onClick={() => setSelected(linkItem.name)}
            />
          ))}
        </SideBar.Content>
      </SideBar>
    </div>
  );
};

export default CommpkgSidebar;
