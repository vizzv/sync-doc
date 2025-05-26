'use client';   
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import {
  Table
} from '@tiptap/extension-table';
import React from 'react';

const MenuBar = ({ editor }: any) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap gap-2 border p-3 rounded mb-3">
      <button onClick={() => editor.chain().focus().undo().run()}>Undo</button>
      <button onClick={() => editor.chain().focus().redo().run()}>Redo</button>
      <button onClick={() => editor.chain().focus().setParagraph().run()}>P</button>
      {[1, 2, 3].map((level) => (
        <button
          key={level}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
        >
          H{level}
        </button>
      ))}
      <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()}>Strike</button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>Code</button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>Quote</button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
      <button onClick={() => editor.chain().focus().toggleTaskList().run()}>☑️ Task</button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>HR</button>
      <button onClick={addImage}>Image</button>
      <button onClick={addLink}>Link</button>
      <button onClick={() => editor.chain().focus().unsetLink().run()}>Unlink</button>
      <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()}>
        Table
      </button>
      <button onClick={() => editor.chain().focus().deleteTable().run()}>Del Table</button>
    </div>
  );
};

export default function FullEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Underline,
      Link,
      Image,
      Placeholder.configure({
        placeholder: 'Start typing your amazing content...',
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      HorizontalRule,
      Table.configure({ resizable: true }),
    ],
    content: '<p>Hello <strong>Full Editor</strong></p>',
  });

  return (
    <div className="max-w-4xl mx-auto">
      <MenuBar editor={editor} />
      <div className="border rounded p-4 min-h-[200px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
