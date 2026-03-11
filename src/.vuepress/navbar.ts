import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "Vue系列",
    icon: "vue",
    link: "/vue/",
  },
  {
    text: "Webpack系列",
    icon: "tool",
    link: "/webpack/",
  },
  {
    text: "AI工具系列",
    icon: "article",
    link: "/ai-tools/",
  },
  {
    text: "手机端系列",
    icon: "article",
    link: "/uniapp/",
  },
  {
    text: "服务器",
    icon: "article",
    link: "/service/",
  },
  {
    text: "基础",
    icon: "article",
    link: "/posts/",
  },
  {
    text: "标签",
    icon: "tag",
    link: "/tag/javascript/",
  },
  {
    text: "时间轴",
    icon: "time",
    link: "/timeline/",
  },
]);
