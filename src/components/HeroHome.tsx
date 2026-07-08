import { SynapslyGlyph } from './SynapslyGlyph'

export function HeroHome() {
  return (
    <div className="hero-home">
      <p className="hero-brand" aria-label="Synapsly">
        <span>Syn</span>
        <span>apsly.</span>
      </p>
      <div className="hero-word-zone hero-word-zone-left">
        <h1 className="hero-word hero-word-left">知图</h1>
      </div>
      <div className="hero-glyph-wrap" aria-hidden="true">
        <SynapslyGlyph className="hero-glyph home-glyph" />
      </div>
      <div className="hero-word-zone hero-word-zone-right">
        <h1 className="hero-word hero-word-right">求索</h1>
      </div>
      <p className="scroll-cue">SCROLL TO EXPLORE</p>
    </div>
  )
}
