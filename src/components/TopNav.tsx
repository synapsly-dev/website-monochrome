import { useEffect, useRef, useState } from 'react'
import { siteLinks } from '../data/siteLinks'

type NavItem = {
  featured?: 'large' | 'wide'
  href?: string
  label: string
  meta: string
  note: string
  pageTarget?: 'contact' | 'stories' | 'sponsors' | 'synaId'
}

type NavTab = {
  id: 'sites' | 'products' | 'useCases' | 'about' | 'contact'
  items: NavItem[]
  label: string
  pageHref?: string
}

type TopNavProps = {
  page?: 'home' | 'contact'
}

const pageAnchors: NavItem[] = [
  { label: '叙事', meta: 'Scroll narrative', note: '知图、求索与生长', pageTarget: 'stories' },
  { label: 'Syna ID', meta: 'Identity', note: '统一身份入口展示', pageTarget: 'synaId' },
  { label: 'Sponsors', meta: 'Network', note: '生态支持者动态场', pageTarget: 'sponsors' },
  { label: '联系我们', meta: 'Footer', note: '邮箱、产品与公司入口', pageTarget: 'contact' },
]

const tabs: NavTab[] = [
  {
    id: 'sites',
    label: '站点',
    items: [
      { ...siteLinks.platform, featured: 'large', meta: 'synapsly.ai', note: 'AI 与教育平台入口' },
      { ...siteLinks.education, featured: 'wide', meta: 'edu.synapsly.org', note: 'K12 教育官网' },
      { ...siteLinks.hunter, meta: 'hunter.synapsly.org', note: '求职与招聘官网' },
      { ...siteLinks.studio, meta: 'studio.synapsly.org', note: '电商 Agent 官网' },
      { ...siteLinks.writer, meta: 'writer.synapsly.org', note: '写作相关入口' },
      { ...siteLinks.music, meta: 'music.synapsly.org', note: '音乐相关入口' },
      { ...siteLinks.coboard, meta: 'coboard.synapsly.org', note: '组织管理官网' },
      { ...siteLinks.shop, featured: 'wide', meta: 'shop.synapsly.org', note: '生态集合站' },
    ],
  },
  {
    id: 'products',
    label: '产品',
    items: [
      { label: 'Syna Cloud', featured: 'large', meta: 'Infrastructure', note: '云服务与部署平台占位' },
      { label: 'Syna Health', meta: 'Healthcare', note: '医疗智能与健康工作流占位' },
      { label: 'Syna Finance', meta: 'Fintech', note: '金融数据、分析与自动化占位' },
      { label: 'Syna Robotics', meta: 'Robotics', note: '具身智能与机器人平台占位' },
      { label: 'Syna Research', featured: 'wide', meta: 'R&D', note: '科研工具与科学计算占位' },
      { label: 'Syna Media', meta: 'Media', note: '媒体生产与分发占位' },
      { label: 'Syna Retail', meta: 'Retail', note: '零售智能与线下运营占位' },
      { label: 'Syna Labs', meta: 'Incubation', note: '实验性产品与业务孵化占位' },
    ],
  },
  {
    id: 'useCases',
    label: '使用场景',
    items: [
      { label: '学生学习', featured: 'large', meta: 'Students', note: '理解概念、练习能力，并形成长期路径' },
      { label: 'K12 规划', meta: 'Families', note: '选择学校、课程方向与下一步行动' },
      { label: '职业成长', meta: 'Candidates', note: '准备档案、申请材料与面试过程' },
      { label: '内容创作', meta: 'Creators', note: '调研、起草、修改、发布与复用知识' },
      { label: '商业运营', featured: 'wide', meta: 'Teams', note: '协调商品、任务、Agent 与增长循环' },
      { label: '音乐练习', meta: 'Learners', note: '练习、反馈、曲目与进度管理' },
      { label: '组织管理', meta: 'Operators', note: '让团队上下文、权限与工作状态可见' },
      { label: '生态发现', meta: 'Everyone', note: '浏览活跃站点，找到合适的起点' },
    ],
  },
  {
    id: 'about',
    label: '关于我们',
    items: [
      {
        href: 'https://synapsly.ai',
        featured: 'large',
        label: '公司介绍',
        meta: 'Synapsly',
        note: 'AI、教育、工作、创作与组织相关产品',
      },
      { href: 'https://shop.synapsly.org', featured: 'wide', label: '生态网络', meta: 'Network', note: '活跃服务与未来入口的集合点' },
      { href: 'https://github.com/synapsly-dev', label: 'GitHub', meta: 'Engineering', note: '工程组织与公开开发入口' },
      { label: '团队介绍', meta: 'Team', note: '团队介绍页面即将上线' },
      { href: 'mailto:business@synapsly.org', label: '商务合作', meta: 'business@synapsly.org', note: '合作、商业项目与机构咨询' },
      { href: 'https://auth.synapsly.org', label: 'Syna ID', meta: 'Account', note: 'Synapsly 生态的统一身份入口' },
    ],
  },
  {
    id: 'contact',
    label: '联系我们',
    pageHref: '/contact',
    items: [
      { href: 'mailto:hello@synapsly.org', featured: 'large', label: '通用联系', meta: 'hello@synapsly.org', note: '产品问题、账号咨询与一般沟通' },
      { href: 'mailto:business@synapsly.org', featured: 'wide', label: '商务合作', meta: 'business@synapsly.org', note: '合作、商业项目与机构咨询' },
      { href: 'https://github.com/synapsly-dev', label: 'GitHub', meta: 'Engineering', note: '工程组织与公开开发入口' },
      { href: 'https://auth.synapsly.org', label: 'Syna ID', meta: 'Account', note: 'Synapsly 生态的统一身份入口' },
    ],
  },
]

const navigateToPath = (path: string) => {
  if (window.location.pathname === path) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  window.history.pushState({}, '', path)
  window.dispatchEvent(new Event('synapsly:navigation'))
  window.scrollTo({ top: 0, behavior: 'auto' })
}

export function TopNav({ page = 'home' }: TopNavProps) {
  const [activeTabId, setActiveTabId] = useState<NavTab['id']>('sites')
  const [activePageTarget, setActivePageTarget] = useState<NonNullable<NavItem['pageTarget']>>('stories')
  const [navOpen, setNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const shellRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<number | null>(null)
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0]

  useEffect(() => {
    if (page !== 'home') {
      setScrolled(false)
      closeMegaNav()
      return
    }

    let frame = 0

    const updateScrollState = () => {
      frame = 0
      const scrollY = window.scrollY
      setScrolled(scrollY > 64)

      if (scrollY > 64) {
        closeMegaNav()
      }

      const heroScroll = document.querySelector<HTMLElement>('.hero-scroll')
      const heroTop = heroScroll?.offsetTop ?? 0
      const maxHeroScroll = Math.max((heroScroll?.offsetHeight ?? 0) - window.innerHeight, 1)
      const progress = Math.min(Math.max((scrollY - heroTop) / maxHeroScroll, 0), 1)

      if (progress >= 0.82) {
        setActivePageTarget('sponsors')
        return
      }

      if (progress >= 0.58) {
        setActivePageTarget('synaId')
        return
      }

      setActivePageTarget('stories')
    }

    const onScroll = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(updateScrollState)
    }

    updateScrollState()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
      }

      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [page])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  const cancelScheduledClose = () => {
    if (closeTimerRef.current === null) {
      return
    }

    window.clearTimeout(closeTimerRef.current)
    closeTimerRef.current = null
  }

  const closeMegaNav = () => {
    cancelScheduledClose()
    setNavOpen(false)
    if (document.activeElement instanceof HTMLElement && shellRef.current?.contains(document.activeElement)) {
      document.activeElement.blur()
    }
  }

  const scheduleMegaNavClose = () => {
    if (closeTimerRef.current !== null) {
      return
    }

    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null
      closeMegaNav()
    }, 420)
  }

  const closeMegaNavAwayFromTabs = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      !(event.target instanceof Element) ||
      event.target.closest('.mega-nav-tab, .mega-nav-panel, .mega-nav-page-anchors')
    ) {
      cancelScheduledClose()
      return
    }

    scheduleMegaNavClose()
  }

  const scrollToTop = () => {
    closeMegaNav()
    if (page !== 'home') {
      navigateToPath('/')
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToPageTarget = (target: NonNullable<NavItem['pageTarget']>) => {
    closeMegaNav()

    if (target === 'contact') {
      navigateToPath('/contact')
      return
    }

    if (page !== 'home') {
      navigateToPath('/')
      window.setTimeout(() => scrollToPageTarget(target), 80)
      return
    }

    setActivePageTarget(target)

    const heroScroll = document.querySelector<HTMLElement>('.hero-scroll')
    const heroTop = heroScroll?.offsetTop ?? 0
    const maxHeroScroll = Math.max((heroScroll?.offsetHeight ?? 0) - window.innerHeight, 1)
    const progressByTarget = {
      stories: 0.22,
      synaId: 0.68,
      sponsors: 0.86,
      contact: 0.98,
    } satisfies Record<NonNullable<NavItem['pageTarget']>, number>
    const progress = progressByTarget[target] ?? 0

    window.scrollTo({
      top: heroTop + maxHeroScroll * progress,
      behavior: 'smooth',
    })
  }

  return (
    <div
      className={`top-nav-shell${navOpen ? ' is-open' : ''}${scrolled ? ' is-scrolled' : ''}`}
      ref={shellRef}
      onPointerMove={closeMegaNavAwayFromTabs}
      onPointerLeave={closeMegaNav}
    >
      <div className="top-nav-trigger" aria-hidden="true" />
      <nav className="site-mega-nav" aria-label="Synapsly navigation">
        <div className="mega-nav-topbar">
          <a
            className="mega-nav-brand"
            href="#top"
            onFocus={() => setNavOpen(true)}
            onClick={(event) => {
              event.preventDefault()
              scrollToTop()
            }}
          >
            <span>Syn</span>
            <span>apsly.</span>
          </a>
          <div className="mega-nav-tabs" aria-label="导航栏目">
            {tabs.map((tab) => (
              <button
                aria-selected={activeTab.id === tab.id || (page === 'contact' && tab.pageHref === '/contact')}
                className="mega-nav-tab"
                key={tab.id}
                onFocus={() => {
                  if (tab.pageHref) {
                    return
                  }

                  setNavOpen(true)
                  setActiveTabId(tab.id)
                }}
                onMouseEnter={() => {
                  if (tab.pageHref) {
                    cancelScheduledClose()
                    return
                  }

                  cancelScheduledClose()
                  setNavOpen(true)
                  setActiveTabId(tab.id)
                }}
                onClick={() => {
                  cancelScheduledClose()

                  if (tab.pageHref) {
                    closeMegaNav()
                    navigateToPath(tab.pageHref)
                    return
                  }

                  setNavOpen(true)
                  setActiveTabId(tab.id)
                }}
                role="tab"
                type="button"
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        {page === 'home' ? (
          <aside className="mega-nav-page-anchors" aria-label="本页锚点">
            <span className="mega-nav-anchor-spacer" aria-hidden="true" />
            <div>
              {pageAnchors.map((item) => (
                <button
                  className="mega-nav-anchor-link"
                  key={item.label}
                  onClick={() => scrollToPageTarget(item.pageTarget!)}
                  type="button"
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </aside>
        ) : null}
        <section className="mega-nav-panel" aria-label={activeTab.label}>
          <div className="mega-nav-item-grid">
            {activeTab.items.map((item) => {
              const itemClassName = ['mega-nav-item', item.featured ? `mega-nav-item-${item.featured}` : '']
                .filter(Boolean)
                .join(' ')
              const content = (
                <>
                  <span>{item.label}</span>
                  <span>{item.note}</span>
                </>
              )

              if (item.href) {
                return (
                  <a className={itemClassName} href={item.href} key={`${activeTab.id}-${item.label}`} rel="noreferrer" target="_blank">
                    {content}
                  </a>
                )
              }

              return (
                <span className={`${itemClassName} mega-nav-placeholder`} key={`${activeTab.id}-${item.label}`}>
                  {content}
                </span>
              )
            })}
          </div>
        </section>
      </nav>
      {page === 'home' ? (
        <nav className="scroll-section-nav" aria-label="本页导航">
          <div className="scroll-section-tabs">
            {pageAnchors.map((item) => (
              <button
                aria-current={activePageTarget === item.pageTarget ? 'page' : undefined}
                className="scroll-section-tab"
                key={`compact-${item.label}`}
                onClick={() => scrollToPageTarget(item.pageTarget!)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
          <a className="scroll-section-cta" href="https://auth.synapsly.org/login">
            立刻体验
          </a>
        </nav>
      ) : null}
    </div>
  )
}
