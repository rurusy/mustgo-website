import { useEffect } from 'react'

// Keeps <html lang> in sync with the page's language.
// index.html ships lang="ko" for direct loads, but SPA navigation between
// / and /en must update it at runtime for a11y and SEO. Each page calls this
// on mount, so the destination route always sets the correct value.
export function useHtmlLang(lang) {
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
}
