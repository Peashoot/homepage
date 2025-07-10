import { defineComponent, h } from "vue";

/**
 * 加载SVG文件内容
 * @param name - SVG文件名称（不带.svg扩展名）
 * @returns Promise<string> - SVG内容字符串
 */
export async function fetchSvgContent(name: string): Promise<string> {
  try {
    // 使用正确的动态导入语法
    // @vite-ignore
    const module = await import(`../assets/icons/${name}.svg?raw`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load SVG file: ${name}`, error);
    return "";
  }
}

/**
 * 创建SVG组件
 * @param name - SVG文件名称
 * @returns Vue组件
 */
export function createSvgComponent(name: string) {
  return defineComponent({
    setup() {
      return () => h("img", { src: `/src/assets/icons/${name}.svg` });
    },
  });
}
