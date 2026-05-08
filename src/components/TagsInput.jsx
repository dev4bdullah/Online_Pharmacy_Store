import React from "react";

function TagsInput({
  maxLength = undefined,
  placeholder = "Enter Tag without hash",
  title,
  tags,
  settags,
  setText,
  Text,
  removeTag,
}) {
  return (
    <div className="w-full flex flex-col   mb-2.5 gap-2">
      <strong>{title}</strong>

      <div className="w-full bg-[#f7f7f7] border border-[#b1b1b1] box-border rounded-xl px-3 py-5 outline-none min-h-20 flex items-center    gap-5 flex-wrap">
        <div className="w-fit flex items-center gap-2 flex-wrap">
          {tags.map((e) => (
            <span
              key={e}
              className="relative mr-2 bg-[#D9D9D9] px-5 py-2 rounded-lg flex items-center text-black font-poppine font-semibold"
            >
              {e}
              <span
                className="absolute max-h-5 -top-2 -right-1 bg-[#340831] text-white rounded-full px-1.5 py-1 cursor-pointer flex  items-center justify-center"
                onClick={() => removeTag(e)} // Handle tag removal
              >
                <i className="fas fa-times text-xs"></i>
              </span>
            </span>
          ))}
        </div>

        <input
          type="text"
          className=" outline-none bg-transparent flex"
          placeholder={placeholder}
          maxLength={maxLength}
          value={Text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // const tagsArray = Text.split("").filter(
              //   (tag) => tag.startsWith("#") && tag.length > 1
              // );
              settags(Text);
              setText("");
            }
          }}
        />
      </div>
    </div>
  );
}

export default TagsInput;
