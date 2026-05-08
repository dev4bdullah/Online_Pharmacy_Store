"use client";
import { RichTextEditor } from "@mantine/rte";
import "@mantine/core/styles.css";

export default function BlogEditor({ content, setContent }) {
  return <RichTextEditor value={content} onChange={setContent} />;
}
