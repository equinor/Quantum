import { SideBar } from "@equinor/eds-core-react";
import React from "react";
import "../App.css";
import { home, signature, receipt, assignment } from "@equinor/eds-icons";

interface SidebarLink {
  label: string;
  icon: typeof home;
  name: string;
}

const sidebarLinks: SidebarLink[] = [
  { label: "Commpkg", icon: home, name: "commpkg" },
  { label: "System", icon: signature, name: "system" },
  { label: "Sub System", icon: receipt, name: "subSystem" },
];

interface SidebarProps {
  selected: string;
  setSelected: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selected, setSelected }) => {
  return (
    <div id="sidebar">
      <SideBar>
        <SideBar.Content>
          <SideBar.Toggle />
          {sidebarLinks.map((linkItem) => (
            <SideBar.Link
              key={linkItem.name}
              label={linkItem.label}
              icon={linkItem.icon}
              active={selected === linkItem.name}
              onClick={() => setSelected(linkItem.name)}
            />
          ))}
          <SideBar.Button
            label="Data Inventory"
            icon={assignment}
            onClick={() =>
              window.open(
                "https://orgebf5e9d3.crm4.dynamics.com/main.aspx?appid=38ae6c73-6b92-ed11-aad0-6045bd90badd&pagetype=entitylist&etn=cr72d_lra_datainventory&viewid=cb492e4f-2bff-4758-ac08-215dd923adf0&viewType=1039"
              )
            }
          />
        </SideBar.Content>
      </SideBar>
    </div>
  );
};

export default Sidebar;
