import type { ReactNode } from 'react'

type ProjectLinkProps = {
  children: ReactNode
  className?: string
  href?: string
}

export function ProjectLink({ children, className, href }: ProjectLinkProps) {
  const classes = ['story-project-link', className].filter(Boolean).join(' ')
  const opensInNewTab = href?.startsWith('http') ?? false
  const content = (
    <>
      <span className="story-project-mark" aria-hidden="true" />
      <span className="story-project-label">
        {children}
        <svg
          className="story-project-wave"
          viewBox="0 0 120 16"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M2 8.7 C10 2.7 18 13.2 26 7.4 S42 2.9 50 8.5 66 13 74 7.2 90 2.6 98 8.4 112 13 118 7.1" />
          <path d="M1.5 9.6 C10.5 4.4 17.5 12.2 25.5 8.2 S42 4.1 50.5 9.1 66 12.1 73.5 8 89.5 4.2 98.5 9 111.5 12 118.5 8" />
        </svg>
      </span>
    </>
  )

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        rel={opensInNewTab ? 'noreferrer' : undefined}
        target={opensInNewTab ? '_blank' : undefined}
      >
        {content}
      </a>
    )
  }

  return <span className={classes}>{content}</span>
}
