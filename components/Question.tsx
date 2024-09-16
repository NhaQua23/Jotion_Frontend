import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { Menu } from "@mantine/core";
import { CircleHelp } from "lucide-react";
import "./style/style.css";

export const alertTypes = [
  {
    title: "Info",
    value: "info",
    icon: CircleHelp,
    color: "#507aff",
    backgroundColor: {
      light: "#e6ebff",
      dark: "#203380",
    },
  },
] as const;

export const Question = createReactBlockSpec(
  {
    type: "question",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      type: {
        default: "info",
        values: ["info"],
      },
    },
    content: "inline",
  },
  {
    render: (props) => {
      const alertType = alertTypes.find(
        (a) => a.value === props.block.props.type
      )!; 
      const Icon = alertType.icon;
      return (
        <div className={"alert"} data-alert-type={props.block.props.type}>
          <Menu withinPortal={false} zIndex={999999}>
            <Menu.Target>
              <div className={"alert-icon-wrapper"} contentEditable={false}>
                <Icon
                  className={"alert-icon"}
                  data-alert-icon-type={props.block.props.type}
                  size={32}
                />
              </div>
            </Menu.Target>
          </Menu>
          <div className={"inline-content"} ref={props.contentRef} />
        </div>
      );
    },
  }
);
 