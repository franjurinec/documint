import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export function htmlFromMD(markdown: string): string {
    return md.render(markdown)
}