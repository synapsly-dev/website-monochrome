import { type CSSProperties, useId, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const CIRCLE_DASH_OVERDRAW = 2

const GLYPH_NODES = {
  base: { cx: 8, cy: 22, r: 2.35 },
  middle: { cx: 14.5, cy: 14.5, r: 2.85 },
  top: { cx: 22, cy: 9, r: 3.75 },
} as const

const connectionPath = (
  from: (typeof GLYPH_NODES)[keyof typeof GLYPH_NODES],
  to: (typeof GLYPH_NODES)[keyof typeof GLYPH_NODES],
) => {
  const dx = to.cx - from.cx
  const dy = to.cy - from.cy
  const distance = Math.hypot(dx, dy)

  if (distance === 0) {
    return `M${from.cx} ${from.cy} L${to.cx} ${to.cy}`
  }

  const ux = dx / distance
  const uy = dy / distance
  const startX = from.cx + ux * from.r
  const startY = from.cy + uy * from.r
  const endX = to.cx - ux * to.r
  const endY = to.cy - uy * to.r

  return `M${startX} ${startY} L${endX} ${endY}`
}

const GLYPH_METRICS = {
  viewBoxSize: 32,
  lineWidth: 1.45,
  topOutlineWidth: 0.78,
  smallOutlineWidth: 0.28,
  nodes: GLYPH_NODES,
  lines: {
    topToMiddle: connectionPath(GLYPH_NODES.top, GLYPH_NODES.middle),
    middleToBase: connectionPath(GLYPH_NODES.middle, GLYPH_NODES.base),
  },
} as const

type SynapslyGlyphProps = {
  animateOnMount?: boolean
  className?: string
}

export function SynapslyGlyph({
  animateOnMount = true,
  className,
}: SynapslyGlyphProps) {
  const glyphRef = useRef<SVGSVGElement>(null)
  const glyphId = useId().replace(/:/g, '')
  const {
    lineWidth,
    lines,
    nodes,
    smallOutlineWidth,
    topOutlineWidth,
    viewBoxSize,
  } = GLYPH_METRICS
  const glyphStyle = {
    '--glyph-line-width': `${lineWidth}`,
    '--glyph-top-outline-width': `${topOutlineWidth}`,
    '--glyph-small-outline-width': `${smallOutlineWidth}`,
  } as CSSProperties

  useGSAP(
    () => {
      const glyph = glyphRef.current

      if (!glyph) {
        return
      }

      if (!animateOnMount) {
        return
      }

      const outlines = gsap.utils.toArray<SVGGeometryElement>('.glyph-node-outline', glyph)
      const fills = gsap.utils.toArray<SVGCircleElement>('.glyph-node-fill', glyph)
      const expansionNodes = gsap.utils.toArray<SVGCircleElement>(
        '.glyph-node-expansion',
        glyph,
      )
      const fillMaskInners = gsap.utils.toArray<SVGCircleElement>(
        '.glyph-node-fill-mask-inner',
        glyph,
      )
      const lines = gsap.utils.toArray<SVGPathElement>('.glyph-line', glyph)

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

      gsap.set(fills, { autoAlpha: 0 })
      gsap.set(expansionNodes, { autoAlpha: 0 })
      fillMaskInners.forEach((maskInner) => {
        gsap.set(maskInner, {
          attr: { r: maskInner.dataset.maskStartRadius ?? 0 },
        })
      })

      const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

      timeline
        .set(outlines, { autoAlpha: 1 })
        .to(outlines, {
          strokeDasharray: (_, target) => {
            const outline = target as SVGGeometryElement
            return `${outline.dataset.drawLength} ${outline.dataset.gapLength}`
          },
          duration: 1.2,
        })
        .set(fills, { autoAlpha: 1 })
        .to(fillMaskInners, {
          attr: { r: 0 },
          duration: 0.42,
          ease: 'power2.inOut',
        })
        .set(lines, { autoAlpha: 1 })
        .to(lines, {
          strokeDasharray: (_, target) => {
            const line = target as SVGPathElement
            return `${line.dataset.drawLength} ${line.dataset.gapLength}`
          },
          duration: 0.95,
        })
    },
    { scope: glyphRef },
  )

  return (
    <svg
      ref={glyphRef}
      className={className}
      data-glyph-part="root"
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      role="img"
      aria-label="Synapsly glyph"
      xmlns="http://www.w3.org/2000/svg"
      style={glyphStyle}
    >
      <defs>
        <mask
          id={`${glyphId}-base-fill-mask`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={viewBoxSize}
          height={viewBoxSize}
        >
          <circle
            cx={nodes.base.cx}
            cy={nodes.base.cy}
            r={nodes.base.r}
            fill="white"
          />
          <circle
            className="glyph-node-fill-mask-inner"
            data-glyph-part="node-base-fill-mask-inner"
            data-mask-start-radius={nodes.base.r}
            cx={nodes.base.cx}
            cy={nodes.base.cy}
            r={nodes.base.r}
            fill="black"
          />
        </mask>
        <mask
          id={`${glyphId}-middle-fill-mask`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={viewBoxSize}
          height={viewBoxSize}
        >
          <circle
            cx={nodes.middle.cx}
            cy={nodes.middle.cy}
            r={nodes.middle.r}
            fill="white"
          />
          <circle
            className="glyph-node-fill-mask-inner"
            data-glyph-part="node-middle-fill-mask-inner"
            data-mask-start-radius={nodes.middle.r}
            cx={nodes.middle.cx}
            cy={nodes.middle.cy}
            r={nodes.middle.r}
            fill="black"
          />
        </mask>
        <mask
          id={`${glyphId}-top-fill-mask`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={viewBoxSize}
          height={viewBoxSize}
        >
          <circle
            cx={nodes.top.cx}
            cy={nodes.top.cy}
            r={nodes.top.r}
            fill="white"
          />
          <circle
            className="glyph-node-fill-mask-inner"
            data-glyph-part="node-top-fill-mask-inner"
            data-mask-start-radius={nodes.top.r}
            cx={nodes.top.cx}
            cy={nodes.top.cy}
            r={nodes.top.r}
            fill="black"
          />
        </mask>
        <mask
          id={`${glyphId}-top-line-mask`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={viewBoxSize}
          height={viewBoxSize}
        >
          <path
            className="glyph-line-mask glyph-line-mask-top-to-middle"
            data-glyph-part="line-top-middle-mask"
            d={lines.topToMiddle}
            fill="none"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={lineWidth}
          />
        </mask>
        <mask
          id={`${glyphId}-middle-line-mask`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={viewBoxSize}
          height={viewBoxSize}
        >
          <path
            className="glyph-line-mask glyph-line-mask-middle-to-base"
            data-glyph-part="line-middle-base-mask"
            d={lines.middleToBase}
            fill="none"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={lineWidth}
          />
        </mask>
      </defs>

      <g
        className="glyph-lines"
        data-glyph-part="lines"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          className="glyph-line glyph-line-top-to-middle"
          data-glyph-part="line-top-middle"
          d={lines.topToMiddle}
          mask={`url(#${glyphId}-top-line-mask)`}
        />
        <path
          className="glyph-line glyph-line-middle-to-base"
          data-glyph-part="line-middle-base"
          d={lines.middleToBase}
          mask={`url(#${glyphId}-middle-line-mask)`}
        />
      </g>

      <g className="glyph-nodes" data-glyph-part="nodes">
        <circle
          className="glyph-node-fill glyph-node-fill-base"
          data-glyph-part="node-base-fill"
          cx={nodes.base.cx}
          cy={nodes.base.cy}
          r={nodes.base.r}
          mask={`url(#${glyphId}-base-fill-mask)`}
        />
        <circle
          className="glyph-node-expansion glyph-node-expansion-middle"
          data-glyph-part="node-middle-expansion"
          cx={nodes.middle.cx}
          cy={nodes.middle.cy}
          r="0"
        />
        <circle
          className="glyph-node-fill glyph-node-fill-middle"
          data-glyph-part="node-middle-fill"
          cx={nodes.middle.cx}
          cy={nodes.middle.cy}
          r={nodes.middle.r}
          mask={`url(#${glyphId}-middle-fill-mask)`}
        />
        <circle
          className="glyph-node-fill glyph-node-fill-top"
          data-glyph-part="node-top-fill"
          cx={nodes.top.cx}
          cy={nodes.top.cy}
          r={nodes.top.r}
          mask={`url(#${glyphId}-top-fill-mask)`}
        />
      </g>

      <g className="glyph-outlines" data-glyph-part="outlines" fill="none">
        <circle
          className="glyph-node-outline glyph-node-outline-base"
          data-glyph-part="node-base-outline"
          cx={nodes.base.cx}
          cy={nodes.base.cy}
          r={nodes.base.r}
        />
        <circle
          className="glyph-node-outline glyph-node-outline-middle"
          data-glyph-part="node-middle-outline"
          cx={nodes.middle.cx}
          cy={nodes.middle.cy}
          r={nodes.middle.r}
        />
        <circle
          className="glyph-node-outline glyph-node-outline-top"
          data-glyph-part="node-top-outline"
          cx={nodes.top.cx}
          cy={nodes.top.cy}
          r={nodes.top.r}
        />
      </g>
    </svg>
  )
}
