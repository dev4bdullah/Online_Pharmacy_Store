import React from "react";

function Desinput({ content, setContent, title }: any) {
  return (
    <div className="w-full flex flex-col gap-2 mb-2.5 border-none">
      <strong>{title}</strong>

      <div className="min-h-[5rem] flex relative pb-20">
        {/* Replacing BlogEditor with a simple textarea */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 p-2 border rounded-md resize-none"
          placeholder="Write your description here..."
        />
      </div>
    </div>
  );
}

export default Desinput;
