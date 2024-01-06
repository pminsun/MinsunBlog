interface tagName {
  [key: string]: string;
}

export default function UseTagsColor(name: string) {
  const tagColors: tagName = {
    "Next.js": "bg-tagNext",
    TailwindCSS: "bg-tagTailwindCSS",
    Vercel: "bg-tagVercel",
    React: "bg-tagReact",
    Emotion: "bg-tagEmotion",
    Html: "bg-tagHtml",
    Css: "bg-tagCss",
    Javascript: "bg-tagJavascript",
    Typescript: "bg-tagTypescript",
    ReactNative: "bg-tagReactNative",
    Dev: "bg-tagDev",
  };

  return tagColors[name] || "";
}
