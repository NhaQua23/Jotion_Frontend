import { GridSuggestionMenuProps, DefaultReactGridSuggestionItem } from "@blocknote/react";

export function CustomEmojiPicker(props: GridSuggestionMenuProps<DefaultReactGridSuggestionItem>) {
  return (
    <div className={"emoji-picker"} style={{ gridTemplateColumns: `repeat(${props.columns || 1}, 1fr)` }}>
      {props.items.map((item, index) => (
        // eslint-disable-next-line react/jsx-key
        <div 
          className={`emoji-picker-item${props.selectedIndex === index ? " selected" : ""}`} 
          onClick={() => props.onItemClick?.(item)}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
}