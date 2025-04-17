import React, { memo, useEffect, useRef, useState } from "react";
import { Editor } from "https://esm.sh/@tiptap/core@2.6.6";
import StarterKit from "https://esm.sh/@tiptap/starter-kit@2.6.6";
import Highlight from "https://esm.sh/@tiptap/extension-highlight@2.6.6";
import Underline from "https://esm.sh/@tiptap/extension-underline@2.6.6";
import Link from "https://esm.sh/@tiptap/extension-link@2.6.6";
import TextAlign from "https://esm.sh/@tiptap/extension-text-align@2.6.6";
import Image from "https://esm.sh/@tiptap/extension-image@2.6.6";
import YouTube from "https://esm.sh/@tiptap/extension-youtube@2.6.6";
import TextStyle from "https://esm.sh/@tiptap/extension-text-style@2.6.6";
import FontFamily from "https://esm.sh/@tiptap/extension-font-family@2.6.6";
import { Color } from "https://esm.sh/@tiptap/extension-color@2.6.6";
import Bold from "https://esm.sh/@tiptap/extension-bold@2.6.6";

const textSizeDropdown = FlowbiteInstances.getInstance(
  "Dropdown",
  "textSizeDropdown"
);
const typographyDropdown = FlowbiteInstances.getInstance(
  "Dropdown",
  "typographyDropdown"
);
const fontFamilyDropdown = FlowbiteInstances.getInstance(
  "Dropdown",
  "fontFamilyDropdown"
);
const colors = [
  { hex: "#1A56DB", name: "Blue" },
  { hex: "#0E9F6E", name: "Green" },
  { hex: "#FACA15", name: "Yellow" },
  { hex: "#F05252", name: "Red" },
  { hex: "#FF8A4C", name: "Orange" },
  { hex: "#0694A2", name: "Teal" },
  { hex: "#B4C6FC", name: "Light indigo" },
  { hex: "#8DA2FB", name: "Indigo" },
  { hex: "#5145CD", name: "Purple" },
  { hex: "#771D1D", name: "Brown" },
  { hex: "#FCD9BD", name: "Light orange" },
  { hex: "#99154B", name: "Bordo" },
  { hex: "#7E3AF2", name: "Dark Purple" },
  { hex: "#CABFFD", name: "Light" },
  { hex: "#D61F69", name: "Dark Pink" },
  { hex: "#F8B4D9", name: "Pink" },
  { hex: "#F6C196", name: "Cream" },
  { hex: "#A4CAFE", name: "Light Blue" },
  // { hex: "#5145CD", name: "Dark Blue" },
  { hex: "#B43403", name: "Orange Brown" },
  { hex: "#FCE96A", name: "Light Yellow" },
  { hex: "#1E429F", name: "Navy Blue" },
  { hex: "#768FFD", name: "Light Purple" },
  { hex: "#BCF0DA", name: "Light Green" },
  { hex: "#EBF5FF", name: "Sky Blue" },
  { hex: "#16BDCA", name: "Cyan" },
  { hex: "#E74694", name: "Pink" },
  { hex: "#83B0ED", name: "Darker Sky Blue" },
  { hex: "#03543F", name: "Forest Green" },
  { hex: "#111928", name: "Black" },
  { hex: "#4B5563", name: "Stone" },
  { hex: "#6B7280", name: "Gray" },
  { hex: "#D1D5DB", name: "Light Gray" },
  { hex: "#F3F4F6", name: "Cloud Gray" },
  { hex: "#F9FAFB", name: "Heaven Gray" },
];
const fonts = [
  { name: "Default", family: "Inter, ui-sans-serif" },
  { name: "Arial", family: "Arial, sans-serif" },
  { name: "Courier New", family: "'Courier New', monospace" },
  { name: "Georgia", family: "Georgia, serif" },
  {
    name: "Lucida Sans Unicode",
    family: "'Lucida Sans Unicode', sans-serif",
  },
  { name: "Tahoma", family: "Tahoma, sans-serif" },
  { name: "Times New Roman", family: "'Times New Roman', serif" },
  { name: "Trebuchet MS", family: "'Trebuchet MS', sans-serif" },
  { name: "Verdana", family: "Verdana, sans-serif" },
];

const TextEditor = ({ onChange, initData }) => {
  const [color, setColor] = useState("#e66465");
  // const [editorContent, setEditorContent] = useState("");
  const [hasSetContent, setHasSetContent] = useState(false);
  const editorRef = useRef(null);
  const editorInstance = useRef(null); // ✅ Dùng useRef để lưu trữ instance của editor

  useEffect(() => {
    if (!editorRef.current || editorInstance.current) return; // ✅ Đảm bảo chỉ khởi tạo một lần
    const FontSizeTextStyle = TextStyle.extend({
      addAttributes() {
        return {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return { style: "font-size: " + attributes.fontSize };
            },
          },
        };
      },
    });
    const CustomBold = Bold.extend({
      // Override the renderHTML method
      renderHTML({ mark, HTMLAttributes }) {
        const { style, ...rest } = HTMLAttributes;

        // Merge existing styles with font-weight
        const newStyle = "font-weight: bold;" + (style ? " " + style : "");

        return ["span", { ...rest, style: newStyle.trim() }, 0];
      },
      // Ensure it doesn't exclude other marks
      addOptions() {
        return {
          ...this.parent?.(),
          HTMLAttributes: {},
        };
      },
    });
    editorInstance.current = new Editor({
      element: editorRef.current,
      extensions: [
        StarterKit.configure({
          textStyle: false,
          bold: false,
          marks: {
            bold: false,
          },
        }),
        // Include the custom Bold extension
        CustomBold,
        Color,
        FontSizeTextStyle,
        FontFamily,
        Highlight,
        Underline,
        Link.configure({
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Image,
        YouTube,
      ],
      content: "",
      editorProps: {
        attributes: {
          class:
            "h-full format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none",
        },
      },
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onChange(html);
      },
    });

    console.log("editorInstance", editorInstance.current);

    return () => {
      editorInstance.current?.destroy();
      editorInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (editorInstance.current && initData && !hasSetContent) {
      editorInstance.current.commands.setContent(initData, false);
      setHasSetContent(true);
    }
  }, [initData]);

  return (
    <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
      <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap items-center">
          <div className="flex items-center space-x-1 rtl:space-x-reverse flex-wrap">
            <button
              id="toggleBoldButton"
              data-tooltip-target="tooltip-bold"
              type="button"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() =>
                editorInstance.current?.chain().focus().toggleBold().run()
              }
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6"
                />
              </svg>
              <span className="sr-only">Bold</span>
            </button>
            <div
              id="tooltip-bold"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Toggle bold
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button
              id="toggleItalicButton"
              data-tooltip-target="tooltip-italic"
              type="button"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() =>
                editorInstance.current?.chain().focus().toggleItalic().run()
              }
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m8.874 19 6.143-14M6 19h6.33m-.66-14H18"
                />
              </svg>
              <span className="sr-only">Italic</span>
            </button>
            <div
              id="tooltip-italic"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Toggle italic
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button
              id="toggleUnderlineButton"
              data-tooltip-target="tooltip-underline"
              type="button"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() =>
                editorInstance.current?.chain().focus().toggleUnderline().run()
              }
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M6 19h12M8 5v9a4 4 0 0 0 8 0V5M6 5h4m4 0h4"
                />
              </svg>
              <span className="sr-only">Underline</span>
            </button>
            <div
              id="tooltip-underline"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Toggle underline
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button
              id="toggleStrikeButton"
              data-tooltip-target="tooltip-strike"
              type="button"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() =>
                editorInstance.current?.chain().focus().toggleStrike().run()
              }
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 6.2V5h12v1.2M7 19h6m.2-14-1.677 6.523M9.6 19l1.029-4M5 5l6.523 6.523M19 19l-7.477-7.477"
                />
              </svg>
              <span className="sr-only">Strike</span>
            </button>
            <div
              id="tooltip-strike"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Toggle strike
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button
              id="toggleHighlightButton"
              data-tooltip-target="tooltip-highlight"
              type="button"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() =>
                editorInstance.current
                  ?.chain()
                  .focus()
                  .toggleHighlight({
                    color: editorInstance.current.isActive("highlight")
                      ? undefined
                      : "#ffc078", // if is already highlighted，unset the highlight color
                  })
                  .run()
              }
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M9 19.2H5.5c-.3 0-.5-.2-.5-.5V16c0-.2.2-.4.5-.4h13c.3 0 .5.2.5.4v2.7c0 .3-.2.5-.5.5H18m-6-1 1.4 1.8h.2l1.4-1.7m-7-5.4L12 4c0-.1 0-.1 0 0l4 8.8m-6-2.7h4m-7 2.7h2.5m5 0H17"
                />
              </svg>
              <span className="sr-only">Highlight</span>
            </button>
            <div
              id="tooltip-highlight"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Toggle highlight
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button
              id="toggleCodeButton"
              type="button"
              data-tooltip-target="tooltip-code"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() =>
                editorInstance.current?.chain().focus().toggleCode().run()
              }
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"
                />
              </svg>
              <span className="sr-only">Code</span>
            </button>
            <div
              id="tooltip-code"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Format code
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button
              id="toggleLinkButton"
              data-tooltip-target="tooltip-link"
              type="button"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() =>
                editorInstance.current
                  ?.chain()
                  .focus()
                  .toggleLink({
                    href: window.prompt(
                      "Enter image URL:",
                      "https://flowbite.com"
                    ),
                  })
                  .run()
              }
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"
                />
              </svg>
              <span className="sr-only">Link</span>
            </button>
            <div
              id="tooltip-link"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Add link
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button
              id="removeLinkButton"
              data-tooltip-target="tooltip-remove-link"
              type="button"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() =>
                editorInstance.current?.chain().focus().unsetLink().run()
              }
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M13.2 9.8a3.4 3.4 0 0 0-4.8 0L5 13.2A3.4 3.4 0 0 0 9.8 18l.3-.3m-.3-4.5a3.4 3.4 0 0 0 4.8 0L18 9.8A3.4 3.4 0 0 0 13.2 5l-1 1m7.4 14-1.8-1.8m0 0L16 16.4m1.8 1.8 1.8-1.8m-1.8 1.8L16 20"
                />
              </svg>
              <span className="sr-only">Remove link</span>
            </button>
            <div
              id="tooltip-remove-link"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Remove link
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button
              id="toggleTextSizeButton"
              data-dropdown-toggle="textSizeDropdown"
              type="button"
              data-tooltip-target="tooltip-text-size"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 6.2V5h11v1.2M8 5v14m-3 0h6m2-6.8V11h8v1.2M17 11v8m-1.5 0h3"
                />
              </svg>
              <span className="sr-only">Text size</span>
            </button>
            <div
              id="tooltip-text-size"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Text size
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div
              id="textSizeDropdown"
              className="z-10 hidden w-72 rounded-sm bg-white p-2 shadow-sm dark:bg-gray-700"
            >
              <ul
                className="space-y-1 text-sm font-medium"
                aria-labelledby="toggleTextSizeButton"
              >
                {[16, 12, 14, 18, 24, 36].map((size) => (
                  <li key={size}>
                    <button
                      data-text-size={`${size}px`}
                      type="button"
                      className={`flex justify-between items-center w-full rounded-sm px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white ${
                        size === 16
                          ? "text-base"
                          : size === 12
                          ? "text-xs"
                          : size === 14
                          ? "text-sm"
                          : size === 18
                          ? "text-lg"
                          : size === 24
                          ? "text-2xl"
                          : "text-4xl"
                      }`}
                      onClick={() => {
                        editorInstance.current
                          ?.chain()
                          .focus()
                          .setMark("textStyle", { size })
                          .run();

                        // Hide the dropdown after selection
                        textSizeDropdown.hide();
                      }}
                    >
                      {size}px
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              id="toggleTextColorButton"
              data-dropdown-toggle="textColorDropdown"
              type="button"
              data-tooltip-target="tooltip-text-color"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                fill="none"
                viewBox="0 0 25 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="m6.532 15.982 1.573-4m-1.573 4h-1.1m1.1 0h1.65m-.077-4 2.725-6.93a.11.11 0 0 1 .204 0l2.725 6.93m-5.654 0H8.1m.006 0h5.654m0 0 .617 1.569m5.11 4.453c0 1.102-.854 1.996-1.908 1.996-1.053 0-1.907-.894-1.907-1.996 0-1.103 1.907-4.128 1.907-4.128s1.909 3.025 1.909 4.128Z"
                />
              </svg>
              <span className="sr-only">Text color</span>
            </button>
            <div
              id="tooltip-text-color"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Text color
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div
              id="textColorDropdown"
              className="z-10 hidden w-48 rounded-sm bg-white p-2 shadow-sm dark:bg-gray-700"
            >
              <div className="grid grid-cols-6 gap-2 group mb-3 items-center p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  type="color"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="border-gray-200 border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 rounded-md p-px px-1 hover:bg-gray-50 group-hover:bg-gray-50 dark:group-hover:bg-gray-700 w-full h-8 col-span-3"
                  onClick={(event) => {
                    const selectedColor = event.target.value;

                    // Apply the selected color to the selected text
                    editorInstance.current
                      ?.chain()
                      .focus()
                      .setColor(selectedColor)
                      .run();
                  }}
                />
                <label
                  htmlFor="color"
                  className="text-gray-500 dark:text-gray-400 text-sm font-medium col-span-3 group-hover:text-gray-900 dark:group-hover:text-white"
                >
                  Pick a color
                </label>
              </div>
              <div className="grid grid-cols-6 gap-1 mb-3">
                {colors.map(({ hex, name }) => (
                  <button
                    key={hex}
                    type="button"
                    onClick={() =>
                      editorInstance.current
                        ?.chain()
                        .focus()
                        .setColor(hex)
                        .run()
                    }
                    style={{ backgroundColor: hex }}
                    className="w-6 h-6 rounded-md"
                  >
                    <span className="sr-only">{name}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                id="reset-color"
                className="py-1.5 text-sm font-medium text-gray-500 focus:outline-none bg-white rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white w-full dark:hover:bg-gray-600"
                onClick={() => editorInstance.current.commands.unsetColor()}
              >
                Reset color
              </button>
            </div>
            <button
              id="toggleFontFamilyButton"
              data-dropdown-toggle="fontFamilyDropdown"
              type="button"
              data-tooltip-target="tooltip-font-family"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m10.6 19 4.298-10.93a.11.11 0 0 1 .204 0L19.4 19m-8.8 0H9.5m1.1 0h1.65m7.15 0h-1.65m1.65 0h1.1m-7.7-3.985h4.4M3.021 16l1.567-3.985m0 0L7.32 5.07a.11.11 0 0 1 .205 0l2.503 6.945h-5.44Z"
                />
              </svg>
              <span className="sr-only">Font family</span>
            </button>
            <div
              id="tooltip-font-family"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Font Family
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <div
              id="fontFamilyDropdown"
              className="z-10 hidden w-48 rounded-sm bg-white p-2 shadow-sm dark:bg-gray-700"
            >
              <ul
                className="space-y-1 text-sm font-medium"
                aria-labelledby="toggleFontFamilyButton"
              >
                {fonts.map((font, index) => (
                  <li key={index}>
                    <button
                      data-font-family={font.family}
                      type="button"
                      style={{ fontFamily: font.family }}
                      className="flex justify-between items-center w-full text-sm rounded-sm px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white"
                      onClick={() => {
                        editorInstance.current
                          ?.chain()
                          .focus()
                          .setFontFamily(font)
                          .run();

                        // Hide the dropdown after selection
                        fontFamilyDropdown.hide();
                      }}
                    >
                      {font.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-1">
              <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
            </div>
            <button
              id="toggleLeftAlignButton"
              type="button"
              data-tooltip-target="tooltip-left-align"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() =>
                editorInstance.current
                  ?.chain()
                  .focus()
                  .setTextAlign("left")
                  .run()
              }
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 6h8m-8 4h12M6 14h8m-8 4h12"
                />
              </svg>
              <span className="sr-only">Align left</span>
            </button>
            <div
              id="tooltip-left-align"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Align left
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button
              id="toggleCenterAlignButton"
              type="button"
              data-tooltip-target="tooltip-center-align"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() =>
                editorInstance.current
                  ?.chain()
                  .focus()
                  .setTextAlign("center")
                  .run()
              }
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 6h8M6 10h12M8 14h8M6 18h12"
                />
              </svg>
              <span className="sr-only">Align center</span>
            </button>
            <div
              id="tooltip-center-align"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Align center
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button
              id="toggleRightAlignButton"
              type="button"
              data-tooltip-target="tooltip-right-align"
              className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() =>
                editorInstance.current
                  ?.chain()
                  .focus()
                  .setTextAlign("right")
                  .run()
              }
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 6h-8m8 4H6m12 4h-8m8 4H6"
                />
              </svg>
              <span className="sr-only">Align right</span>
            </button>
            <div
              id="tooltip-right-align"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
            >
              Align right
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-2 flex-wrap">
          <button
            id="typographyDropdownButton"
            data-dropdown-toggle="typographyDropdown"
            className="flex items-center justify-center rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 dark:hover:text-white dark:focus:ring-gray-600"
            type="button"
          >
            Format
            <svg
              className="-me-0.5 ms-1.5 h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 9-7 7-7-7"
              />
            </svg>
          </button>
          <div className="ps-1.5">
            <span className="block w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
          </div>
          {/* <!-- Heading Dropdown --> */}
          <div
            id="typographyDropdown"
            className="z-10 hidden w-72 rounded-sm bg-white p-2 shadow-sm dark:bg-gray-700"
          >
            <ul
              className="space-y-1 text-sm font-medium"
              aria-labelledby="typographyDropdownButton"
            >
              <li>
                <button
                  id="toggleParagraphButton"
                  type="button"
                  className="flex justify-between items-center w-full text-base rounded-sm px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white"
                  onClick={() => {
                    editorInstance.current
                      ?.chain()
                      .focus()
                      .setParagraph()
                      .run();
                    typographyDropdown.hide();
                  }}
                >
                  Paragraph
                  <div className="space-x-1.5">
                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">
                      Cmd
                    </kbd>
                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">
                      Alt
                    </kbd>
                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">
                      0
                    </kbd>
                  </div>
                </button>
              </li>
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <li key={level}>
                  <button
                    data-heading-level={level}
                    type="button"
                    className="flex justify-between items-center w-full text-base rounded-sm px-3 py-2 hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-600 dark:text-white"
                    onClick={() => {
                      editorInstance.current
                        ?.chain()
                        .focus()
                        .toggleHeading({ level: parseInt(level) })
                        .run();
                      typographyDropdown.hide();
                    }}
                  >
                    Heading {level}
                    <div className="space-x-1.5">
                      <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">
                        Cmd
                      </kbd>
                      <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">
                        Alt
                      </kbd>
                      <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-400 dark:border-gray-500">
                        {level}
                      </kbd>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            id="addImageButton"
            type="button"
            data-tooltip-target="tooltip-image"
            className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            onClick={() =>
              editorInstance.current
                ?.chain()
                .focus()
                .setImage({
                  src: window.prompt(
                    "Enter image URL:",
                    "https://placehold.co/600x400"
                  ),
                })
                .run()
            }
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Add image</span>
          </button>
          <div
            id="tooltip-image"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
          >
            Add image
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button
            id="addVideoButton"
            type="button"
            data-tooltip-target="tooltip-video"
            className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            onClick={() => {
              const url = window.prompt(
                "Enter YouTube URL:",
                "https://www.youtube.com/watch?v=KaLxCiilHns"
              );
              if (url) {
                return editorInstance.current.commands.setYoutubeVideo({
                  src: url,
                  width: 640,
                  height: 480,
                });
              }
            }}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm-2 4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H9Zm0 2h2v2H9v-2Zm7.965-.557a1 1 0 0 0-1.692-.72l-1.268 1.218a1 1 0 0 0-.308.721v.733a1 1 0 0 0 .37.776l1.267 1.032a1 1 0 0 0 1.631-.776v-2.984Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Add video</span>
          </button>
          <div
            id="tooltip-video"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
          >
            Add video
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button
            id="toggleListButton"
            type="button"
            data-tooltip-target="tooltip-list"
            className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            onClick={() =>
              editorInstance.current?.chain().focus().toggleBulletList().run()
            }
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"
              />
            </svg>
            <span className="sr-only">Toggle list</span>
          </button>
          <div
            id="tooltip-list"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
          >
            Toggle list
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button
            id="toggleOrderedListButton"
            type="button"
            data-tooltip-target="tooltip-ordered-list"
            className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            onClick={() =>
              editorInstance.current?.chain().focus().toggleOrderedList().run()
            }
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"
              />
            </svg>
            <span className="sr-only">Toggle ordered list</span>
          </button>
          <div
            id="tooltip-ordered-list"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
          >
            Toggle ordered list
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button
            id="toggleBlockquoteButton"
            type="button"
            data-tooltip-target="tooltip-blockquote-list"
            className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            onClick={() =>
              editorInstance.current?.chain().focus().toggleBlockquote().run()
            }
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M6 6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3H5a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2H6Zm9 0a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Toggle blockquote</span>
          </button>
          <div
            id="tooltip-blockquote-list"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
          >
            Toggle blockquote
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button
            id="toggleHRButton"
            type="button"
            data-tooltip-target="tooltip-hr-list"
            className="p-1.5 text-gray-500 rounded-sm cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            onClick={() =>
              editorInstance.current?.chain().focus().setHorizontalRule().run()
            }
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 12h14"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                d="M6 9.5h12m-12 9h12M6 7.5h12m-12 9h12M6 5.5h12m-12 9h12"
              />
            </svg>
            <span className="sr-only">Toggle Horizontal Rule</span>
          </button>
          <div
            id="tooltip-hr-list"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
          >
            Toggle Horizontal Rule
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </div>
      <div className="min-h-96 px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
        <label htmlFor="wysiwyg1" className="sr-only">
          Write comment
        </label>
        <div
          ref={editorRef}
          id="wysiwyg1"
          className="h-full block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
        ></div>
      </div>
    </div>
  );
};
export default memo(TextEditor);
