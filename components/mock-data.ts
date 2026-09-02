import type { Folder, LinkItem } from "./types";

export const folders: Folder[] = [
  { id: "dev", name: "개발", count: 4 },
  { id: "design", name: "디자인", count: 2 },
  { id: "reading", name: "읽을거리", count: 3 },
  { id: "etc", name: "기타", count: 1 },
];

export const links: LinkItem[] = [
  {
    id: "1",
    title: "Next.js 공식 문서",
    url: "https://nextjs.org/docs",
    description: "App Router와 최신 기능을 다루는 공식 문서 모음",
    folderId: "dev",
    createdAt: "2026-08-20",
  },
  {
    id: "2",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "웹 표준과 브라우저 API 레퍼런스",
    folderId: "dev",
    createdAt: "2026-08-18",
  },
  {
    id: "3",
    title: "TypeScript Handbook",
    url: "https://www.typescriptlang.org/docs/handbook/intro.html",
    description: "타입스크립트 공식 핸드북",
    folderId: "dev",
    createdAt: "2026-08-15",
  },
  {
    id: "4",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com/docs",
    description: "유틸리티 퍼스트 CSS 프레임워크 문서",
    folderId: "dev",
    createdAt: "2026-08-10",
  },
  {
    id: "5",
    title: "Refactoring UI",
    url: "https://www.refactoringui.com",
    description: "개발자를 위한 UI 디자인 가이드",
    folderId: "design",
    createdAt: "2026-08-05",
  },
  {
    id: "6",
    title: "Dribbble",
    url: "https://dribbble.com",
    description: "디자인 영감을 얻을 수 있는 커뮤니티",
    folderId: "design",
    createdAt: "2026-08-02",
  },
  {
    id: "7",
    title: "한입 뉴스레터",
    url: "https://example.com/newsletter",
    description: "매주 읽는 개발/디자인 뉴스레터",
    folderId: "reading",
    createdAt: "2026-07-28",
  },
  {
    id: "8",
    title: "이달의 아티클 모음",
    url: "https://example.com/articles",
    description: "이번 달 읽은 아티클 정리",
    folderId: "reading",
    createdAt: "2026-07-25",
  },
  {
    id: "9",
    title: "생산성 팁 10가지",
    url: "https://example.com/productivity",
    folderId: "reading",
    createdAt: "2026-07-20",
  },
  {
    id: "10",
    title: "여행 준비물 체크리스트",
    url: "https://example.com/checklist",
    folderId: "etc",
    createdAt: "2026-07-15",
  },
];
