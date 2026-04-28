import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content", "study-guides");

export interface StudyGuideFrontmatter {
  topic_id: string;
  subtest: string;
  title: string;
  summary: string;
  formula_reference: string[];
  pitfalls: string[];
  worked_examples: { prompt: string; solution: string }[];
}

export interface StudyGuide {
  frontmatter: StudyGuideFrontmatter;
  html: string;
  raw: string;
}

export function getAllTopicSlugs(): { subtest: string; slug: string }[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const results: { subtest: string; slug: string }[] = [];

  const subtestDirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  for (const entry of subtestDirs) {
    if (!entry.isDirectory()) continue;
    const subtestPath = path.join(CONTENT_DIR, entry.name);
    const files = fs.readdirSync(subtestPath);
    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      results.push({
        subtest: entry.name,
        slug: file.replace(/\.md$/, ""),
      });
    }
  }

  return results;
}

export function getStudyGuide(
  subtest: string,
  slug: string
): StudyGuide | null {
  const filePath = path.join(
    CONTENT_DIR,
    subtest.toLowerCase(),
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const html = marked.parse(content) as string;

  return {
    frontmatter: data as unknown as StudyGuideFrontmatter,
    html,
    raw,
  };
}
