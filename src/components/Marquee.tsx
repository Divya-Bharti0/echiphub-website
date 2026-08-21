import { ANNOUNCEMENTS, AnnouncementItem } from '../lib/courseData'

interface ItemProps {
  a: AnnouncementItem
}

function Item({ a }: ItemProps) {
  return (
    <a href={a.href} target="_blank" rel="noopener noreferrer" className="announce">
      <span className="chip-dot" />
      <span className="tag">{a.tag}</span>
      <span>{a.text}</span>
    </a>
  )
}

export default function Marquee() {
  return (
    <div className="marquee-bar w-full overflow-hidden whitespace-nowrap py-2.5" role="region" aria-label="Announcements">
      <div className="scroll-track">
        {ANNOUNCEMENTS.map((a, i) => <Item key={i} a={a} />)}
        {/* duplicate for seamless loop */}
        {ANNOUNCEMENTS.map((a, i) => <Item key={`d${i}`} a={a} />)}
      </div>
    </div>
  )
}
