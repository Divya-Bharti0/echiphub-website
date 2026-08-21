export default async function run(page) {
  const viewports = [
    [320, 568], [360, 800], [375, 667], [390, 844], [430, 932],
    [768, 1024], [820, 1180], [1024, 1366], [1280, 720], [1440, 900]
  ]
  const results = []
  for (const [width, height] of viewports) {
    await page.setViewportSize({ width, height })
    await page.reload({ waitUntil: 'domcontentloaded' })
    await page.waitForSelector('main')
    const result = await page.evaluate(() => {
      const viewport = window.innerWidth
      const overflowing = [...document.querySelectorAll('body *')]
        .filter((element) => {
          const rect = element.getBoundingClientRect()
          return rect.width > 0 && (rect.left < -1 || rect.right > viewport + 1)
        })
        .slice(0, 12)
        .map((element) => ({ tag: element.tagName, className: element.className?.toString().slice(0, 100) }))
      const rect = (selector) => {
        const element = document.querySelector(selector)
        if (!element) return null
        const box = element.getBoundingClientRect()
        return { width: Math.round(box.width), height: Math.round(box.height), left: Math.round(box.left), right: Math.round(box.right) }
      }
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: viewport,
        overflowing,
        hero: rect('.hero'),
        video: rect('.hero-video-wrapper'),
        header: rect('header'),
        courseStage: rect('.course-catalog-stage'),
      }
    })
    results.push({ viewport: `${width}x${height}`, ...result })
  }
  return results
}
