import MarkdownIt from 'markdown-it';

const md = new MarkdownIt()
    .use(require('markdown-it-deflist'))
    .use(require('@iktakahiro/markdown-it-katex'))

export function htmlFromMD(markdown: string): string {
    return md.render(markdown)
}