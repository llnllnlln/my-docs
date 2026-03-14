import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "结实的基底",
    icon: "article",
    link: "/posts/",
  },
  {
    text: "Vue系列",
    icon: "vue",
    link: "/vue/",
  },
  {
    text: "项目小结",
    icon: "article",
    link: "/project/",
  },
  {
    text: "工程化",
    icon: "tool",
    link: "/webpack/",
  },
  {
    text: "AI工具",
    icon: "article",
    children:["/ai-tools/Claude code快速上手.md"]
  },
  {
    text: "手机端",
    icon: "article",
    children: ["/uniapp/uniapp基础.md", "/uniapp/uniapp实战.md"]
  },
  {
    text: "后端",
    icon: "geometry",
    link: "/service/",
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
  {
    text: "掘金",
    link: "https://juejin.cn/user/4344913237918861/posts",
    icon: "lightbulb",
  },
]);
