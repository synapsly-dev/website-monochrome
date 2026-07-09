import synaIdLogin from '../assets/syna-id-login.png'
import { ProjectLink } from './ProjectLink'
import { SynapslyGlyph } from './SynapslyGlyph'
import { siteLinks } from '../data/siteLinks'

const footerProductLinks = Object.values(siteLinks)

export function BlackStage() {
  return (
    <div className="black-stage">
      <div className="identity-stage">
        <div className="identity-lockup">
          <div className="scroll-glyph-wrap">
            <SynapslyGlyph
              animateOnMount={false}
              className="hero-glyph scroll-glyph"
            />
          </div>
          <h2 className="syna-id-title">Syna ID</h2>
        </div>
      </div>
      <section className="glyph-story glyph-story-zhitu">
        <h3>知图</h3>
        <p>把碎片知识，看成一张可以行走的图。</p>
        <div className="story-projects">
          <ProjectLink href={siteLinks.platform.href}>{siteLinks.platform.label}</ProjectLink>
          <ProjectLink href={siteLinks.education.href}>{siteLinks.education.label}</ProjectLink>
        </div>
      </section>
      <section className="glyph-story glyph-story-qiusuo">
        <h3>求索</h3>
        <p>用问题推进理解，而不是停在答案表面。</p>
        <div className="story-projects">
          <ProjectLink href={siteLinks.hunter.href}>{siteLinks.hunter.label}</ProjectLink>
          <ProjectLink href={siteLinks.writer.href}>{siteLinks.writer.label}</ProjectLink>
        </div>
      </section>
      <section className="glyph-story glyph-story-growth">
        <h3>生长</h3>
        <p>让每一次学习，成为下一次选择的路径。</p>
        <div className="story-projects">
          <ProjectLink href={siteLinks.studio.href}>{siteLinks.studio.label}</ProjectLink>
          <ProjectLink href={siteLinks.music.href}>{siteLinks.music.label}</ProjectLink>
          <ProjectLink href={siteLinks.coboard.href}>{siteLinks.coboard.label}</ProjectLink>
        </div>
      </section>
      <div className="syna-id-showcase" aria-hidden="true">
        <img src={synaIdLogin} alt="" />
      </div>
      <div className="syna-id-copy">
        <p className="syna-id-kicker">
          <span className="syna-id-copy-line">
            <a
              className="syna-id-kicker-content"
              href="https://auth.synapsly.org"
              rel="noreferrer"
              target="_blank"
            >
              <span className="syna-id-kicker-mark" aria-hidden="true" />
              <span className="syna-id-kicker-label">
                Syna ID
                <svg
                  className="syna-id-kicker-wave"
                  viewBox="0 0 120 16"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 8.7 C10 2.7 18 13.2 26 7.4 S42 2.9 50 8.5 66 13 74 7.2 90 2.6 98 8.4 112 13 118 7.1" />
                  <path d="M1.5 9.6 C10.5 4.4 17.5 12.2 25.5 8.2 S42 4.1 50.5 9.1 66 12.1 73.5 8 89.5 4.2 98.5 9 111.5 12 118.5 8" />
                </svg>
              </span>
            </a>
          </span>
        </p>
        <p className="syna-id-copy-body">
          <span className="syna-id-copy-line">
            <span>统一身份入口，</span>
          </span>
          <span className="syna-id-copy-line">
            <span>连接账号、授权</span>
          </span>
          <span className="syna-id-copy-line">
            <span>与整个 Syna 生态。</span>
          </span>
        </p>
      </div>
      <section className="sponsors-stage" aria-label="Sponsors">
        <div className="sponsor-logo-belt" aria-label="Synapsly sponsors">
          {[
            'Aster Labs',
            'Northline',
            'Vector House',
            'Greyfield',
            'Nova Works',
            'Kite Systems',
            'Parallel',
            'Fieldstone',
            'Morrow',
            'Lineage',
            'Orbit Fund',
            'Quiet Capital',
            'Brightmatter',
            'Cobalt School',
            'Nexus Guild',
            'Horizon AI',
            'Atlas Studio',
            'Silvergrain',
            'Form Foundry',
            'Clearpath',
            'Second Light',
            'Pioneer Lab',
            'Signal Works',
            'Vertex Edu',
            'Oak & Slate',
            'Blueframe',
            'Cedar Cloud',
            'Summit One',
            'Arc Institute',
            'Lumen Grid',
            'Stonebridge',
            'Frame Logic',
            'Pulse Harbor',
            'Helio Group',
            'Root Ventures',
            'Open Field',
            'Moonbase',
            'Index North',
            'Common Room',
            'Future Desk',
          ].map((name) => (
            <span className="sponsor-logo" key={name}>
              {name}
            </span>
          ))}
        </div>
      </section>
      <section className="contact-section" aria-label="Contact">
        <div className="contact-brand" data-contact-reveal>
          <a className="contact-brand-name" href="https://synapsly.ai" rel="noreferrer" target="_blank">
            Synapsly
          </a>
          <p>AI 时代的人才成长网络</p>
        </div>
        <nav className="contact-column contact-products" aria-label="产品" data-contact-reveal>
          <h2>产品</h2>
          {footerProductLinks.map((link) => (
            <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
              {link.label}
            </a>
          ))}
          <a href="https://auth.synapsly.org" rel="noreferrer" target="_blank">
            Syna ID
          </a>
        </nav>
        <nav className="contact-column contact-company" aria-label="公司" data-contact-reveal>
          <h2>公司</h2>
          <span>
            关于我们 <em>即将上线</em>
          </span>
          <span>
            博客 <em>即将上线</em>
          </span>
          <span>
            新闻 <em>即将上线</em>
          </span>
          <span>
            招聘 <em>即将上线</em>
          </span>
        </nav>
        <address className="contact-column contact-address" data-contact-reveal>
          <h2>地址</h2>
          <span>即将补充</span>
        </address>
        <footer className="site-footer" data-contact-reveal>
          <span>© 2026 Synapsly · All rights reserved.</span>
          <nav aria-label="Legal links">
            <span>隐私政策 即将上线</span>
            <span>服务条款 即将上线</span>
          </nav>
        </footer>
      </section>
      <p className="scroll-cue scroll-continue-cue">SCROLL TO CONTINUE</p>
    </div>
  )
}
