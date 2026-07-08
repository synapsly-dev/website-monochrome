import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { BlackStage } from './components/BlackStage'
import { HeroHome } from './components/HeroHome'
import { TopNav } from './components/TopNav'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const CIRCLE_DASH_OVERDRAW = 2

function App() {
  const shellRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const shell = shellRef.current

      if (!shell) {
        return
      }

      const heroScreen = shell.querySelector<HTMLElement>('.hero-screen')
      const stage = shell.querySelector<HTMLElement>('.black-stage')
      const home = shell.querySelector<HTMLElement>('.hero-home')
      const homeGlyph = shell.querySelector<SVGSVGElement>('.home-glyph')
      const scrollGlyph = shell.querySelector<SVGSVGElement>('.scroll-glyph')
      const identityLockup = shell.querySelector<HTMLElement>('.identity-lockup')
      const scrollGlyphWrap = shell.querySelector<HTMLElement>('.scroll-glyph-wrap')
      const synaIdTitle = shell.querySelector<HTMLElement>('.syna-id-title')
      const synaIdShowcase = shell.querySelector<HTMLElement>('.syna-id-showcase')
      const synaIdCopy = shell.querySelector<HTMLElement>('.syna-id-copy')
      const sponsorsStage = shell.querySelector<HTMLElement>('.sponsors-stage')
      const sponsorLogos = gsap.utils.toArray<HTMLElement>(
        '.sponsor-logo',
        shell,
      )
      const contactSection = shell.querySelector<HTMLElement>('.contact-section')
      const scrollContinueCue = shell.querySelector<HTMLElement>(
        '.scroll-continue-cue',
      )
      const zhituStory = shell.querySelector<HTMLElement>('.glyph-story-zhitu')
      const qiusuoStory = shell.querySelector<HTMLElement>('.glyph-story-qiusuo')
      const growthStory = shell.querySelector<HTMLElement>('.glyph-story-growth')
      const storyPanels = gsap.utils.toArray<HTMLElement>('.glyph-story', shell)
      const synaIdCopyLines = gsap.utils.toArray<HTMLElement>(
        '.syna-id-copy-line > span',
        shell,
      )

      if (
        !heroScreen ||
        !stage ||
        !home ||
        !homeGlyph ||
        !scrollGlyph ||
        !identityLockup ||
        !scrollGlyphWrap ||
        !synaIdTitle ||
        !synaIdShowcase ||
        !synaIdCopy ||
        !sponsorsStage ||
        !contactSection ||
        !scrollContinueCue ||
        !zhituStory ||
        !qiusuoStory ||
        !growthStory
      ) {
        return
      }

      const updatePointerGlow = (event: PointerEvent) => {
        const rect = heroScreen.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 100
        const y = ((event.clientY - rect.top) / rect.height) * 100

        heroScreen.style.setProperty('--mx', `${x}%`)
        heroScreen.style.setProperty('--my', `${y}%`)
      }

      heroScreen.addEventListener('pointermove', updatePointerGlow)

      const homeWords = gsap.utils.toArray<HTMLElement>('.hero-word-zone', home)
      const homeNonWords = gsap.utils.toArray<HTMLElement>(
        '.hero-brand, .hero-glyph-wrap, .scroll-cue',
        home,
      )

      const getHomeGlyphPart = <ElementType extends Element>(part: string) =>
        homeGlyph.querySelector<ElementType>(`[data-glyph-part="${part}"]`)

      const getGlyphPart = <ElementType extends Element>(part: string) =>
        scrollGlyph.querySelector<ElementType>(`[data-glyph-part="${part}"]`)

      const finalLockupScale = 0.1
      const measureAlignedLockupX = () => {
        const lockupRect = identityLockup.getBoundingClientRect()
        const glyphRect = scrollGlyphWrap.getBoundingClientRect()
        const showcaseRect = synaIdShowcase.getBoundingClientRect()
        const lockupOriginX = lockupRect.left + lockupRect.width / 2
        const finalGlyphLeft =
          lockupOriginX + (glyphRect.left - lockupOriginX) * finalLockupScale

        return showcaseRect.left - finalGlyphLeft
      }

      const homeMiddleExpansion = getHomeGlyphPart<SVGCircleElement>(
        'node-middle-expansion',
      )
      const topOutline = getGlyphPart<SVGGeometryElement>('node-top-outline')
      const middleOutline = getGlyphPart<SVGGeometryElement>(
        'node-middle-outline',
      )
      const baseOutline = getGlyphPart<SVGGeometryElement>(
        'node-base-outline',
      )
      const topFill = getGlyphPart<SVGCircleElement>('node-top-fill')
      const middleFill = getGlyphPart<SVGCircleElement>('node-middle-fill')
      const baseFill = getGlyphPart<SVGCircleElement>('node-base-fill')
      const topFillMask = getGlyphPart<SVGCircleElement>(
        'node-top-fill-mask-inner',
      )
      const middleFillMask = getGlyphPart<SVGCircleElement>(
        'node-middle-fill-mask-inner',
      )
      const baseFillMask = getGlyphPart<SVGCircleElement>(
        'node-base-fill-mask-inner',
      )
      const topLine = getGlyphPart<SVGPathElement>('line-top-middle')
      const middleLine = getGlyphPart<SVGPathElement>('line-middle-base')

      const outlines = [topOutline, middleOutline, baseOutline].filter(
        (outline): outline is SVGGeometryElement => outline !== null,
      )
      const fills = [topFill, middleFill, baseFill].filter(
        (fill): fill is SVGCircleElement => fill !== null,
      )
      const lines = [topLine, middleLine].filter(
        (line): line is SVGPathElement => line !== null,
      )

      if (
        !homeMiddleExpansion ||
        !topFill ||
        !middleFill ||
        !baseFill ||
        !topFillMask ||
        !middleFillMask ||
        !baseFillMask ||
        !topLine ||
        !middleLine
      ) {
        return
      }

      outlines.forEach((outline) => {
        const length = outline.getTotalLength()
        const drawLength = length + CIRCLE_DASH_OVERDRAW
        const gap = length * 2
        gsap.set(outline, {
          autoAlpha: 0,
          strokeDasharray: `0 ${gap}`,
          strokeDashoffset: 0,
        })
        outline.dataset.drawLength = `${drawLength}`
        outline.dataset.gapLength = `${gap}`
      })

      lines.forEach((line) => {
        const length = line.getTotalLength()
        const drawLength = length + CIRCLE_DASH_OVERDRAW
        const gap = length * 2
        gsap.set(line, {
          autoAlpha: 0,
          strokeDasharray: `0 ${gap}`,
          strokeDashoffset: 0,
        })
        line.dataset.drawLength = `${drawLength}`
        line.dataset.gapLength = `${gap}`
      })

      gsap.set(stage, {
        autoAlpha: 0,
      })
      gsap.set(heroScreen, {
        '--noise-dot': '#000000',
        '--noise-opacity': 0.035,
        '--noise-blend': 'multiply',
        '--glow-rgb': '0 0 0',
        '--glow-alpha': '5%',
        '--glow-size': '22rem',
      })
      gsap.set(scrollGlyph, { autoAlpha: 0 })
      gsap.set(fills, { autoAlpha: 0 })
      ;[topFillMask, middleFillMask, baseFillMask].forEach((maskInner) => {
        gsap.set(maskInner, {
          attr: { r: maskInner.dataset.maskStartRadius ?? 0 },
        })
      })
      gsap.set(homeMiddleExpansion, { autoAlpha: 0, attr: { r: 0 } })
      gsap.set(synaIdTitle, { autoAlpha: 0, x: 140, scale: 0.94 })
      gsap.set(synaIdShowcase, { autoAlpha: 0, y: '72vh' })
      gsap.set(synaIdCopy, { autoAlpha: 0, y: 'calc(80px - 12vh)' })
      gsap.set(scrollContinueCue, { autoAlpha: 0, y: 10 })
      gsap.set(storyPanels, { autoAlpha: 0 })
      const createStoryReveal = (
        story: HTMLElement,
        variant: 'trace' | 'seek' | 'grow',
      ) => {
        const heading = story.querySelector<HTMLElement>('h3')
        const body = story.querySelector<HTMLElement>('p')
        const projects = story.querySelector<HTMLElement>('.story-projects')

        if (!heading || !body || !projects) {
          return gsap.timeline({ paused: true })
        }

        const storyParts = [heading, body, projects].filter(
          (part): part is HTMLElement => part !== null,
        )
        const reveal = gsap.timeline({ paused: true }).to(story, {
          autoAlpha: 1,
          duration: 0.2,
          ease: 'power1.out',
        })

        if (variant === 'trace') {
          gsap.set(storyParts, {
            autoAlpha: 0,
            x: -46,
            y: 10,
            clipPath: 'inset(0 100% 0 0)',
          })

          return reveal
            .to(heading, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              clipPath: 'inset(0 0% 0 0)',
              duration: 0.72,
              ease: 'expo.out',
            })
            .to(
              body,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                clipPath: 'inset(0 0% 0 0)',
                duration: 0.68,
                ease: 'expo.out',
              },
              '<0.1',
            )
            .to(
              projects,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                clipPath: 'inset(0 0% 0 0)',
                duration: 0.6,
                ease: 'power3.out',
              },
              '<0.08',
            )
        }

        if (variant === 'seek') {
          gsap.set(heading, { autoAlpha: 0, x: 40, y: -30, rotate: 0.8 })
          gsap.set(body, { autoAlpha: 0, x: -34, y: 26, rotate: -0.45 })
          gsap.set(projects, { autoAlpha: 0, x: 36, y: 8 })

          return reveal
            .to(heading, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              rotate: 0,
              duration: 0.7,
              ease: 'power3.out',
            })
            .to(
              body,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                rotate: 0,
                duration: 0.78,
                ease: 'power4.out',
              },
              '<0.06',
            )
            .to(
              projects,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.62,
                ease: 'power3.out',
              },
              '<0.12',
            )
        }

        gsap.set(heading, {
          autoAlpha: 0,
          y: 54,
          scaleY: 0.76,
          transformOrigin: '50% 100%',
        })
        gsap.set(body, { autoAlpha: 0, y: 42, scale: 0.985 })
        gsap.set(projects, { autoAlpha: 0, y: 28, scale: 0.98 })

        return reveal
          .to(heading, {
            autoAlpha: 1,
            y: 0,
            scaleY: 1,
            duration: 0.74,
            ease: 'back.out(1.18)',
          })
          .to(
            body,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.72,
              ease: 'power3.out',
            },
            '<0.08',
          )
          .to(
            projects,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.64,
              ease: 'power3.out',
            },
            '<0.1',
          )
      }
      const zhituStoryReveal = createStoryReveal(zhituStory, 'trace')
      const qiusuoStoryReveal = createStoryReveal(qiusuoStory, 'seek')
      const growthStoryReveal = createStoryReveal(growthStory, 'grow')
      gsap.set(synaIdCopyLines, { yPercent: 115, opacity: 0.2 })
      const copyReveal = gsap
        .timeline({ paused: true })
        .to(synaIdCopy, {
          autoAlpha: 1,
          y: '-12vh',
          duration: 0.55,
          ease: 'power2.out',
        })
        .to(
          synaIdCopyLines,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.08,
          },
          '<0.08',
        )
      const showSynaIdCopy = () => {
        copyReveal.timeScale(1).play()
      }
      const hideSynaIdCopy = () => {
        copyReveal.timeScale(1).reverse()
      }
      gsap.set(sponsorsStage, { autoAlpha: 0 })
      gsap.set(sponsorLogos, {
        autoAlpha: 0,
        x: (index) => `${index % 2 === 0 ? -64 : 64}vw`,
        y: (index) => `${index % 2 === 0 ? -38 : -26}vh`,
      })
      const sponsorsAutoTimeline = gsap.timeline({
        paused: true,
      })
      const sponsorsLoopDuration = 58
      const sponsorLogoTravelDuration = 18

      sponsorLogos.forEach((logo, index) => {
        const isLeftLoop = index % 2 === 0
        const delay = (index / sponsorLogos.length) * sponsorsLoopDuration
        const path = isLeftLoop
          ? [
              { x: '-64vw', y: '-38vh' },
              { x: '-18vw', y: '-38vh' },
              { x: '35vw', y: '-38vh' },
              { x: '42vw', y: '-20vh' },
              { x: '42vw', y: '20vh' },
              { x: '30vw', y: '32vh' },
              { x: '-18vw', y: '32vh' },
              { x: '-64vw', y: '32vh' },
            ]
          : [
              { x: '64vw', y: '-26vh' },
              { x: '18vw', y: '-26vh' },
              { x: '-35vw', y: '-26vh' },
              { x: '-42vw', y: '-10vh' },
              { x: '-42vw', y: '22vh' },
              { x: '-30vw', y: '42vh' },
              { x: '18vw', y: '42vh' },
              { x: '64vw', y: '42vh' },
            ]

        sponsorsAutoTimeline.fromTo(
          logo,
          {
            x: path[0].x,
            y: path[0].y,
          },
          {
            keyframes: path.slice(1).map((point) => ({
              ...point,
              duration: 1 / (path.length - 1),
            })),
            duration: sponsorLogoTravelDuration,
            repeat: -1,
            repeatDelay: sponsorsLoopDuration - sponsorLogoTravelDuration,
            ease: 'none',
          },
          delay,
        )
      })
      sponsorsAutoTimeline.play(0)
      gsap.set(sponsorLogos, {
        autoAlpha: 0,
      })
      const contactRevealParts = gsap.utils.toArray<HTMLElement>(
        '[data-contact-reveal]',
        contactSection,
      )

      gsap.set(contactRevealParts, { autoAlpha: 0, y: 34 })
      gsap
        .timeline({
          scrollTrigger: {
            trigger: contactSection,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        })
        .to(contactRevealParts, {
          autoAlpha: 1,
          y: 0,
          duration: 0.86,
          ease: 'power3.out',
          stagger: 0.055,
        })

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: shell.querySelector('.hero-scroll'),
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
          scrub: 0.8,
        },
      })
      const setStoryActive = (
        storyReveal: gsap.core.Timeline,
        entering: boolean,
      ) => {
        const direction = timeline.scrollTrigger?.direction ?? 1
        const shouldShow = direction === 1 ? entering : !entering

        if (shouldShow) {
          storyReveal.play()
        } else {
          storyReveal.reverse()
        }
      }
      let isSponsorsActive = false
      let isSponsorsHovered = false
      const setSponsorsLoopActive = (active: boolean) => {
        if (active === isSponsorsActive) {
          return
        }

        isSponsorsActive = active

        if (!active) {
          isSponsorsHovered = false
          sponsorsAutoTimeline.play()
          return
        }

        if (!isSponsorsHovered) {
          sponsorsAutoTimeline.play()
        }
      }
      const pauseSponsorLogos = () => {
        isSponsorsHovered = true
        if (isSponsorsActive) {
          sponsorsAutoTimeline.pause()
        }
      }
      const resumeSponsorLogos = () => {
        isSponsorsHovered = false
        if (isSponsorsActive) {
          sponsorsAutoTimeline.play()
        }
      }

      sponsorLogos.forEach((logo) => {
        logo.addEventListener('pointerenter', pauseSponsorLogos)
        logo.addEventListener('pointerleave', resumeSponsorLogos)
      })

      timeline
        .set(homeMiddleExpansion, {
          autoAlpha: 1,
          attr: {
            'data-glyph-layer': 'expanding-background',
          },
          onComplete: () => homeGlyph.appendChild(homeMiddleExpansion),
        })
        .to(homeMiddleExpansion, {
          attr: { r: 260 },
          duration: 0.28,
          ease: 'expo.in',
        })
        .set(stage, { autoAlpha: 1 })
        .set(heroScreen, {
          '--noise-dot': '#ffffff',
          '--noise-opacity': 0.025,
          '--noise-blend': 'screen',
          '--glow-rgb': '255 255 255',
          '--glow-alpha': '4%',
          '--glow-size': '24rem',
        })
        .set(homeNonWords, { autoAlpha: 0 })
        .to(homeWords, {
          autoAlpha: 0,
          y: -10,
          duration: 0.16,
          ease: 'power2.in',
        })
        .to({}, { duration: 0.1 })
        .set(home, { autoAlpha: 0 })
        .to(scrollGlyph, { autoAlpha: 1, duration: 0.01 })
        .set(topOutline, { autoAlpha: 1 })
        .to(topOutline, {
          strokeDasharray: `${topOutline?.dataset.drawLength} ${topOutline?.dataset.gapLength}`,
          duration: 0.13,
        })
        .set(topFill, { autoAlpha: 1 })
        .to(topFillMask, {
          attr: { r: 0 },
          duration: 0.07,
          ease: 'power1.inOut',
        })
        .call(() => setStoryActive(zhituStoryReveal, true))
        .to({}, { duration: 0.26 })
        .call(() => setStoryActive(zhituStoryReveal, false))
        .set(topLine, { autoAlpha: 1 })
        .to(topLine, {
          strokeDasharray: `${topLine.dataset.drawLength} ${topLine.dataset.gapLength}`,
          duration: 0.12,
        })
        .set(middleOutline, { autoAlpha: 1 })
        .to(middleOutline, {
          strokeDasharray: `${middleOutline?.dataset.drawLength} ${middleOutline?.dataset.gapLength}`,
          duration: 0.12,
        })
        .set(middleFill, { autoAlpha: 1 })
        .to(middleFillMask, {
          attr: { r: 0 },
          duration: 0.06,
          ease: 'power1.inOut',
        })
        .call(() => setStoryActive(qiusuoStoryReveal, true))
        .to({}, { duration: 0.26 })
        .call(() => setStoryActive(qiusuoStoryReveal, false))
        .set(middleLine, { autoAlpha: 1 })
        .to(middleLine, {
          strokeDasharray: `${middleLine.dataset.drawLength} ${middleLine.dataset.gapLength}`,
          duration: 0.12,
        })
        .set(baseOutline, { autoAlpha: 1 })
        .to(baseOutline, {
          strokeDasharray: `${baseOutline?.dataset.drawLength} ${baseOutline?.dataset.gapLength}`,
          duration: 0.11,
        })
        .set(baseFill, { autoAlpha: 1 })
        .to(baseFillMask, {
          attr: { r: 0 },
          duration: 0.06,
          ease: 'power1.inOut',
        })
        .call(() => setStoryActive(growthStoryReveal, true))
        .to({}, { duration: 0.26 })
        .call(() => setStoryActive(growthStoryReveal, false))
        .to(scrollContinueCue, {
          autoAlpha: 1,
          y: 0,
          duration: 0.08,
          ease: 'power2.out',
        })
        .to({}, { duration: 0.24 })
        .to(scrollContinueCue, {
          autoAlpha: 0,
          y: -8,
          duration: 0.08,
          ease: 'power2.in',
        })
        .to(synaIdTitle, {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.12,
          ease: 'power3.out',
        })
        .to(
          identityLockup,
          {
            scale: finalLockupScale,
            x: measureAlignedLockupX,
            y: '-39vh',
            duration: 0.34,
            ease: 'power3.inOut',
          },
        )
        .addLabel('synaIdMedia')
        .to(
          synaIdShowcase,
          {
            autoAlpha: 1,
            y: '-18vh',
            duration: 0.34,
            ease: 'power2.out',
          },
          '<0.08',
        )
        .to(
          {},
          {
            duration: 0.08,
            onStart: showSynaIdCopy,
            onReverseComplete: hideSynaIdCopy,
          },
          'synaIdMedia+=0.12',
        )
        .to({}, { duration: 0.18 })
        .to(
          {},
          {
            duration: 0.08,
            onStart: hideSynaIdCopy,
            onReverseComplete: showSynaIdCopy,
          },
        )
        .to(synaIdShowcase, {
          autoAlpha: 0,
          y: '-24vh',
          duration: 0.14,
          ease: 'power2.in',
        }, '<')
        .to(
          synaIdTitle,
          {
            autoAlpha: 0,
            duration: 0.14,
            ease: 'power2.inOut',
          },
          '<',
        )
        .set(identityLockup, { autoAlpha: 1 })
        .to(
          identityLockup,
          {
            scale: 0.54,
            x: 0,
            y: 0,
            duration: 0.34,
            ease: 'power3.inOut',
          },
          '<0.04',
        )
        .to(
          scrollGlyph,
          {
            autoAlpha: 1,
            filter: 'none',
            duration: 0.12,
            ease: 'power2.out',
          },
          '<',
        )
        .addLabel('sponsorsStart')
        .set(sponsorsStage, { autoAlpha: 1 })
        .to(sponsorLogos, {
          autoAlpha: 1,
          duration: 0.16,
          ease: 'power1.out',
        })
        .to({}, { duration: 0.62 })
        .to(sponsorLogos, {
          autoAlpha: 0,
          duration: 0.08,
          ease: 'power1.in',
        })
        .to(
          identityLockup,
          {
            autoAlpha: 0,
            duration: 0.08,
            ease: 'power1.in',
          },
          '<',
        )
        .addLabel('sponsorsEnd')
        .set(sponsorsStage, { autoAlpha: 0 })
        .to({}, { duration: 0.16 })

      const syncSponsorsLoop = () => {
        const start = timeline.labels.sponsorsStart
        const end = timeline.labels.sponsorsEnd

        if (typeof start !== 'number' || typeof end !== 'number') {
          return
        }

        const time = timeline.time()
        setSponsorsLoopActive(time >= start && time <= end)
      }

      timeline.eventCallback('onUpdate', syncSponsorsLoop)
      timeline.eventCallback('onReverseComplete', syncSponsorsLoop)
      syncSponsorsLoop()

      return () => {
        heroScreen.removeEventListener('pointermove', updatePointerGlow)
        sponsorLogos.forEach((logo) => {
          logo.removeEventListener('pointerenter', pauseSponsorLogos)
          logo.removeEventListener('pointerleave', resumeSponsorLogos)
        })
      }
    },
    { scope: shellRef },
  )

  return (
    <main ref={shellRef} className="site-shell" id="top">
      <TopNav />
      <section className="hero-scroll" aria-label="Synapsly monochrome home">
        <div className="hero-screen">
          <HeroHome />
          <BlackStage />
        </div>
      </section>
      <section className="contact-section" aria-label="Contact">
        <header className="contact-intro" data-contact-reveal>
          <p>Contact</p>
          <h2>
            路漫漫其修远兮，吾将上下而
            <span className="contact-quote-emphasis">求索</span>。
          </h2>
        </header>
        <nav className="contact-link-row" aria-label="Contact links" data-contact-reveal>
          <a href="mailto:hello@synapsly.org">hello@synapsly.org</a>
          <a href="mailto:business@synapsly.org">business@synapsly.org</a>
          <a href="https://github.com/synapsly-dev" rel="noreferrer" target="_blank">
            GitHub
          </a>
          <a href="https://synapsly.ai" rel="noreferrer" target="_blank">
            Website
          </a>
        </nav>
        <form className="newsletter-form" data-contact-reveal>
          <label htmlFor="newsletter-email">Join us</label>
          <div className="newsletter-control">
            <input id="newsletter-email" type="email" placeholder="Your email" />
            <button type="button" aria-label="Subscribe">
              →
            </button>
          </div>
        </form>
        <footer className="site-footer" data-contact-reveal>
          <span>©2026 Synapsly</span>
          <span>Built by Minsecrus</span>
        </footer>
      </section>
    </main>
  )
}

export default App

