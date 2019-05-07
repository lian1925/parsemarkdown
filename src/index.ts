import * as Markdown from "markdown-it";
import * as utils from "./utils";
import globby from "globby";

/**
 *
 *
 * @export 解析函数入口
 * @param {string} inputDir
 * @param {string} outputDir
 */
export function parser(
  inputDir: string,
  outputDir: string,
  mode: string = utils.DETAIL
) {
  // 1 获取文件列表
  globby([inputDir]).then(files => {
    let fileMap: any = {};
    files.map(item => {
      // 2 计算创建文件列表
      let newFile = item.replace("./post/", `${outputDir}/`);
      newFile = newFile.replace(".md", ".json");

      // 3 解析单个文件
      let jsonData: any = utils.parseMarkdown(item);

      // 4 写入创建文件
      utils.writeFileContent(newFile, JSON.stringify(jsonData), () => {});
      if (mode === utils.DETAIL) {
        let { ...sumarry } = jsonData;
        fileMap[newFile] = sumarry;
      } else {
        let { content, ...sumarry } = jsonData;
        fileMap[newFile] = sumarry;
      }
    });

    // 5 写入概要文件
    utils.writeFileContent(
      `${outputDir}/summary.json`,
      JSON.stringify({ fileMap }),
      () => {}
    );
  });
}

/**
 *
 *
 * @export 创建markdown文件
 * @param {string} title 标题
 * @param {string} [dir="./post/tect/"] 路径
 */
export function createMardownFile(title: string, dir: string = "./post/tech") {
  // 1 内容模版
  let content = `---
title: ${title}
createAt: ${utils.formatDateTime(new Date().toISOString())}
updateAt: ${utils.formatDateTime(new Date().toISOString())}
tags: 
category:
author: 
---

# ${title}

<!-- more -->
`;

  // 2 写入文件
  try {
    utils.writeFileContent(`${dir}/${title}.md`, content, () => {});
  } catch (error) {
    console.log(error);
  }
}
