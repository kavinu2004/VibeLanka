import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* =========================================================================
   VIBE LANKA — Marketing Site
   Editorial · South Coast strip as hero · Fraunces × DM Mono × Familjen Grotesk
   ========================================================================= */

const tokens = {
  ink: "#181614",
  paper: "#FAF7F2",
  paperDeep: "#F2EDE5",
  paperWarm: "#EFE8DD",
  ember: "#D4471C",
  emberDeep: "#A8330F",
  emberWarm: "#E86A40",
  muted: "#8A857E",
  mutedDeep: "#5C5851",
};

const SOUTH_COAST_STRIP = [
  { name: "Mirissa", x: 6, peopleNow: 487, peakTime: "Sunset" },
  { name: "Weligama", x: 18, peopleNow: 642, peakTime: "Morning surf" },
  { name: "Midigama", x: 30, peopleNow: 218, peakTime: "Afternoon" },
  { name: "Ahangama", x: 44, peopleNow: 894, peakTime: "All day" },
  { name: "Talalla", x: 60, peopleNow: 156, peakTime: "Quiet" },
  { name: "Dickwella", x: 74, peopleNow: 312, peakTime: "Brunch" },
  { name: "Hiriketiya", x: 90, peopleNow: 1124, peakTime: "Tonight" },
];

const TRENDING_TONIGHT = [
  { name: "Smoke & Bitters", area: "Hiriketiya", count: 412, pct: 100 },
  { name: "Dots Bay House", area: "Hiriketiya", count: 287, pct: 70 },
  { name: "Ceylon Sliders", area: "Ahangama", count: 198, pct: 48 },
  { name: "Galle Face Green", area: "Colombo", count: 156, pct: 38 },
  { name: "Kabalana Point", area: "Ahangama", count: 134, pct: 33 },
  { name: "Hideaway", area: "Arugam Bay", count: 89, pct: 22 },
];

const PLACE_CARDS = [
  {
    name: "Smoke & Bitters",
    sub: "Hiriketiya · Bar",
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1200&q=80",
    pct: 88,
    tags: ["Party", "Social"],
  },
  {
    name: "Ceylon Sliders",
    sub: "Ahangama · Café",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&q=80",
    pct: 79,
    tags: ["Chill", "Social"],
  },
  {
    name: "Salt House",
    sub: "Hiriketiya · Restaurant",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    pct: 70,
    tags: ["Romantic", "Chill"],
  },
];

export default function VibeLankaSite() {
  return (
    <div style={s.page}>
      <GlobalStyles />
      <Nav />
      <Hero />
      <PhilosophyBar />
      <FeatureExplainer />
      <SouthCoastShowcase />
      <ThreeWaysToFind />
      <PlanShowcase />
      <PartnerSection />
      <Manifesto />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  const [coastsOpen, setCoastsOpen] = useState(false);
  return (
    <nav style={s.nav}>
      <div style={s.navInner}>
        <span style={s.navLogo}>
          Vibe<em style={s.navLogoItalic}>Lanka</em>
        </span>
        <ul style={s.navLinks}>
          <li
            style={s.navLinkWrap}
            onMouseEnter={() => setCoastsOpen(true)}
            onMouseLeave={() => setCoastsOpen(false)}
          >
            <a href="#strip" style={s.navLink}>
              The Coasts
              <span style={s.navCaret}>↓</span>
            </a>
            <AnimatePresence>
              {coastsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
                  style={s.navDropdown}
                >
                  <span style={s.navDropdownKicker}>BY MONSOON SEASON</span>
                  <a href="#strip" style={s.navDropdownItem}>
                    <span style={s.navDropdownName}>South Coast</span>
                    <span style={s.navDropdownMeta}>Nov — Apr</span>
                  </a>
                  <a href="#strip" style={s.navDropdownItem}>
                    <span style={s.navDropdownName}>East Coast</span>
                    <span style={s.navDropdownMeta}>May — Sep</span>
                  </a>
                  <a href="#strip" style={s.navDropdownItem}>
                    <span style={s.navDropdownName}>West Coast</span>
                    <span style={s.navDropdownMeta}>Year-round</span>
                  </a>
                  <a href="#strip" style={s.navDropdownItem}>
                    <span style={s.navDropdownName}>North Coast</span>
                    <span style={s.navDropdownMeta}>Mar — Oct</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          <li style={s.navLinkWrap}>
            <a href="#trending" style={s.navLink}>Trending</a>
          </li>
          <li style={s.navLinkWrap}>
            <a href="#partner" style={s.navLink}>Venues</a>
          </li>
        </ul>
        <a href="#cta" style={s.navCta}>
          <span>Get the app</span>
          <span style={{ marginLeft: 8 }}>↗</span>
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={s.hero}>
      <div style={s.heroKicker}>
        <span className="vl-pulse-dot" style={s.heroKickerDot} />
        <span>LIVE · 06°55′N 80°48′E · {currentClock()}</span>
      </div>

      <h1 style={s.heroTitle}>
        <span style={s.heroLine}>The bay,</span>
        <span style={{ ...s.heroLine, color: tokens.ember }}>
          <em style={s.heroLineItalic}>tonight.</em>
        </span>
      </h1>

      <p style={s.heroSub}>
        Vibe Lanka tracks where Sri Lanka is going right now: bars, cafés,
        community gatherings across the south coast strip and beyond. Live
        updates direct from the venue. Built by Sri Lanka. For the world.
      </p>

      <div style={s.heroActions}>
        <a href="#cta" style={s.heroCta}>
          <span>Get the app</span>
          <span style={{ marginLeft: 12 }}>↗</span>
        </a>
        <a href="#strip" style={s.heroCtaGhost}>
          See tonight's map
        </a>
      </div>

      <CoastStrip />
    </section>
  );
}

function CoastStrip() {
  return (
    <div style={s.stripWrap} id="strip">
      <div style={s.stripLabels}>
        <span style={s.stripLabelLeft}>WEST</span>
        <span style={s.stripLabelCenter}>SOUTH COAST · MIRISSA → HIRIKETIYA</span>
        <span style={s.stripLabelRight}>EAST</span>
      </div>

      <div style={s.stripContainer}>
        <svg
          viewBox="0 0 100 14"
          preserveAspectRatio="none"
          style={s.stripSvg}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0,7 C 6,5 12,8 18,6 C 26,4 32,8 40,6 C 48,4 56,8 62,6 C 70,4 78,7 86,5 C 92,4 96,7 100,6"
            stroke={tokens.ember}
            strokeWidth="0.4"
            fill="none"
            strokeLinecap="round"
          />
          {SOUTH_COAST_STRIP.map((town) => (
            <g key={town.name} transform={`translate(${town.x}, 6)`}>
              <circle cx="0" cy="0" r="1.2" fill={tokens.ember} opacity="0.18" />
              <circle cx="0" cy="0" r="0.5" fill={tokens.ember} />
            </g>
          ))}
        </svg>

        <div style={s.stripTowns}>
          {SOUTH_COAST_STRIP.map((town, i) => (
            <motion.div
              key={town.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              style={{ ...s.stripTown, left: `${town.x}%` }}
            >
              <span style={s.stripTownName}>{town.name}</span>
              <span style={s.stripTownCount}>{town.peopleNow.toLocaleString()}</span>
              <span style={s.stripTownLabel}>{town.peakTime}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhilosophyBar() {
  const items = [
    "NO PLACEHOLDER LISTINGS",
    "PHONES, NOT REVIEWS",
    "LOCALS WROTE THIS",
    "FEATURED IS PAID, MARKED",
    "TRENDING IS NOT",
    "MIDNIGHT VOTE RESET",
    "ROUTING BY TUK-TUK",
  ];
  return (
    <div style={s.tickerBar}>
      <div style={s.ticker} className="vl-ticker">
        {[...items, ...items].map((item, i) => (
          <span key={i} style={s.tickerItem}>
            <span style={s.tickerDot} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeatureExplainer() {
  return (
    <section style={s.section}>
      <SectionMeta number="01" label="What it is" />
      <div style={s.featureGrid}>
        <div style={s.featureCol}>
          <h2 style={s.featureLead}>
            A <em style={s.featureItalic}>local-first</em> map of where Sri
            Lanka actually is right now — not where it was last summer.
          </h2>
        </div>
        <div style={s.featureColRight}>
          <p style={s.featureCopy}>
            Tourist guides go stale in eight months. Google reviews bury the
            two-year-old kottu shop your driver swears by. Vibe Lanka is the
            opposite: an app that knows the bay flat-emptied at noon, that
            Smoke & Bitters is at 88% tonight, that the Hiriketiya yoga
            shala starts at seven on Tuesdays.
          </p>
          <p style={s.featureCopy}>
            We track three things: where the must-visits are by area, where
            the crowd actually is right now, and which venues paid to be
            seen. We mark the third one clearly — it's the only way the
            first two stay honest.
          </p>
        </div>
      </div>
    </section>
  );
}

function SouthCoastShowcase() {
  return (
    <section style={{ ...s.section, background: tokens.paperDeep }}>
      <SectionMeta number="02" label="The strip" mode="dark-bg" />
      <div style={s.showcaseGrid}>
        <div style={s.showcaseTextCol}>
          <h2 style={s.showcaseTitle}>
            Mirissa<br />
            to<br />
            <em style={s.showcaseItalic}>Hiriketiya</em>
          </h2>
          <p style={s.showcaseCopy}>
            Seven towns across forty kilometres of coast. The same app
            shows you the surf at Weligama at seven a.m. and the bar at
            Hiriketiya at ten p.m. Tap a town. The map redraws.
          </p>
          <div style={s.showcaseStats}>
            <Stat value="7" label="towns" />
            <Stat value="42 km" label="of coast" />
            <Stat value="1,124" label="now in Hiri" sub="updated 2m ago" />
          </div>
        </div>

        <div style={s.showcasePhoneCol}>
          <PhoneMockup variant="map" />
        </div>
      </div>

      <div style={s.cardsStrip}>
        {PLACE_CARDS.map((p, i) => (
          <PlaceCard key={p.name} place={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function PlaceCard({ place, index }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.32, 0.72, 0, 1] }}
      style={{
        ...s.placeCard,
        transform: hover ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      <div style={s.placeCardImgWrap}>
        <img src={place.image} alt={place.name} style={s.placeCardImg} />
        <div style={s.placeCardImgOverlay} />
        <div style={s.placeCardPctBadge}>
          <span style={s.placeCardPctNum}>{place.pct}</span>
          <span style={s.placeCardPctSign}>%</span>
        </div>
      </div>
      <div style={s.placeCardBody}>
        <span style={s.placeCardSub}>{place.sub.toUpperCase()}</span>
        <h3 style={s.placeCardName}>{place.name}</h3>
        <div style={s.placeCardTags}>
          {place.tags.map((t) => (
            <span key={t} style={s.placeCardTag}>{t}</span>
          ))}
          <span style={s.placeCardTagDot} />
          <span style={s.placeCardVibe}>vibrant tonight</span>
        </div>
      </div>
    </motion.div>
  );
}

function ThreeWaysToFind() {
  return (
    <section style={s.section} id="trending">
      <SectionMeta number="03" label="Three ways to find" />
      <div style={s.threeGrid}>
        <FindBlock
          tag="MAP"
          tagColor={tokens.ink}
          title="Map"
          subtitle="The must-visits, by area."
          description="Open the app, tap your area chip — South Coast, Ella, Colombo, Kandy, Arugam Bay. The map redraws around you. Pins are editorial picks. Time-of-day filter shows what's open right now."
          metric="Editorial · 5 areas"
        />
        <FindBlock
          tag="TRENDING"
          tagColor={tokens.ember}
          title="Trending"
          subtitle="Where everyone is, right now."
          description="Live crowd density. Phones at the location, fed every two minutes. Heat bars show relative count. Not paid. Not influenced by reviews. Just: where is the room actually full tonight."
          metric="Live · updates every 2 min"
        />
        <FindBlock
          tag="FEATURED"
          tagColor={tokens.mutedDeep}
          title="Featured"
          subtitle="One slot per category, per area."
          description="Paid placement, clearly marked SPONSORED. We vet every venue before they take a slot — bad food doesn't get on this page. One per category per area, so the page never bloats."
          metric="Curated · paid placement"
        />
      </div>

      <div style={s.trendingPreview}>
        <div style={s.trendingPreviewHead}>
          <span style={s.trendingPreviewKicker}>
            <span className="vl-pulse-dot" style={s.trendingPreviewDot} />
            TRENDING NOW · LIVE
          </span>
          <span style={s.trendingPreviewMeta}>
            Updated 2m ago · {currentClock()}
          </span>
        </div>
        <ul style={s.trendingList}>
          {TRENDING_TONIGHT.map((t, i) => (
            <TrendingPreviewRow key={t.name} item={t} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FindBlock({ tag, tagColor, title, subtitle, description, metric }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      style={s.findBlock}
    >
      <div style={s.findBlockHead}>
        <span style={{ ...s.findBlockTag, background: tagColor }}>{tag}</span>
      </div>
      <h3 style={s.findBlockTitle}>{title}</h3>
      <p style={s.findBlockSubtitle}>{subtitle}</p>
      <div style={s.findBlockRule} />
      <p style={s.findBlockDescription}>{description}</p>
      <span style={s.findBlockMetric}>{metric}</span>
    </motion.div>
  );
}

function TrendingPreviewRow({ item, index }) {
  const heatColor = item.pct > 80 ? tokens.ember : item.pct > 40 ? tokens.emberWarm : tokens.muted;
  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={s.trendingRow}
    >
      <div style={s.trendingRowText}>
        <span style={s.trendingRowName}>{item.name}</span>
        <span style={s.trendingRowArea}>{item.area}</span>
      </div>
      <div style={s.trendingRowBarTrack}>
        <motion.div
          style={{ ...s.trendingRowBar, background: heatColor }}
          initial={{ width: 0 }}
          whileInView={{ width: `${item.pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 + index * 0.08, ease: [0.32, 0.72, 0, 1] }}
        />
      </div>
      <span style={s.trendingRowCount}>{item.count}</span>
    </motion.li>
  );
}

function PlanShowcase() {
  return (
    <section style={s.section}>
      <SectionMeta number="04" label="The plan" />
      <div style={s.planGrid}>
        <div style={s.planTextCol}>
          <h2 style={s.planTitle}>
            Save it.<br />
            Route it.<br />
            <em style={s.planItalic}>Leave on time.</em>
          </h2>
          <p style={s.planCopy}>
            Save anywhere. Drop saved places into a route and the plan
            assembles itself: arrival times, how long to stay, when to leave,
            travel method between stops — walk for under two kilometres,
            tuk-tuk for the south coast hops, car when you're crossing the
            island.
          </p>
          <div style={s.planFeatures}>
            <PlanFeature label="Auto-routing" detail="real Sri Lankan travel times" />
            <PlanFeature label="Stay durations" detail="based on category — café 60m, bar 120m" />
            <PlanFeature label="Leave-by alerts" detail="so you make the next stop on time" />
          </div>
        </div>
        <div style={s.planPhoneCol}>
          <PhoneMockup variant="plan" />
        </div>
      </div>
    </section>
  );
}

function PlanFeature({ label, detail }) {
  return (
    <div style={s.planFeature}>
      <span style={s.planFeatureLabel}>{label}</span>
      <span style={s.planFeatureDetail}>{detail}</span>
    </div>
  );
}

function PartnerSection() {
  return (
    <section style={{ ...s.section, background: tokens.ink, color: tokens.paper }} id="partner">
      <SectionMeta number="05" label="For venues" mode="inverted" />
      <div style={s.partnerGrid}>
        <div>
          <h2 style={{ ...s.partnerTitle, color: tokens.paper }}>
            Run a place
            <br />
            people <em style={{ color: tokens.ember, fontStyle: "italic" }}>
              should
            </em> know about?
          </h2>
          <p style={s.partnerCopy}>
            Featured slots are paid. Clearly disclosed. Vetted before the
            venue makes the page. One slot per category per area per month —
            so the page never bloats and partners never compete inside it.
          </p>
        </div>
        <div style={s.partnerCard}>
          <span style={s.partnerCardKicker}>BECOME A PARTNER</span>
          <ul style={s.partnerList}>
            <li style={s.partnerListItem}>
              <span style={s.partnerListNum}>01</span>
              <span style={s.partnerListLabel}>
                Top of Featured in your area
              </span>
            </li>
            <li style={s.partnerListItem}>
              <span style={s.partnerListNum}>02</span>
              <span style={s.partnerListLabel}>
                A SPONSORED tag — clearly disclosed
              </span>
            </li>
            <li style={s.partnerListItem}>
              <span style={s.partnerListNum}>03</span>
              <span style={s.partnerListLabel}>
                One slot per category per area per month
              </span>
            </li>
            <li style={s.partnerListItem}>
              <span style={s.partnerListNum}>04</span>
              <span style={s.partnerListLabel}>
                Live count, vibe vote, everything in the app
              </span>
            </li>
          </ul>
          <a href="mailto:partners@vibelanka.com" style={s.partnerEmail}>
            partners@vibelanka.com ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section style={{ ...s.section, paddingTop: 120, paddingBottom: 120 }}>
      <div style={s.manifestoWrap}>
        <span style={s.manifestoKicker}>—— OUR THESIS</span>
        <p style={s.manifestoBody}>
          The internet went stale on the south coast. Travel blogs that
          haven't been updated since 2019. Reviews about a chef who left in
          2022. A "best of" listicle written in a Bali co-working space by
          someone who flew over for four nights. <em style={s.manifestoItalic}>
            Vibe Lanka is built by the people who actually live on the
            bay.
          </em> Updated in real time by the phones at the venue. If the
          place is empty, the app says so. If it's heaving, you'll know
          before you leave the house.
        </p>
        <p style={s.manifestoSig}>
          — V.L. · Hiriketiya, 2026
        </p>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={s.ctaSection} id="cta">
      <h2 style={s.ctaTitle}>
        Get on<br />
        <em style={s.ctaItalic}>the bay.</em>
      </h2>
      <p style={s.ctaCopy}>
        Free. iOS and Android. Built in Colombo, fed by the south coast,
        going wider every month.
      </p>
      <div style={s.ctaButtons}>
        <a href="#" style={s.ctaButton}>
          <span style={s.ctaButtonKicker}>DOWNLOAD ON</span>
          <span style={s.ctaButtonName}>App Store</span>
        </a>
        <a href="#" style={s.ctaButton}>
          <span style={s.ctaButtonKicker}>GET IT ON</span>
          <span style={s.ctaButtonName}>Google Play</span>
        </a>
      </div>
      <p style={s.ctaTinyPrint}>
        Currently rolling out across the south coast. Ella, Colombo, Kandy,
        Arugam Bay live. North coast in beta. Sign up for area-specific
        launches at <a href="mailto:hello@vibelanka.com" style={s.ctaInlineLink}>
          hello@vibelanka.com
        </a>.
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.footerInner}>
        <div style={s.footerLogo}>
          <span style={s.footerLogoText}>
            Vibe<em style={s.footerLogoItalic}>Lanka</em>
          </span>
          <span style={s.footerLogoCoords}>06°55′N 80°48′E</span>
        </div>
        <div style={s.footerCols}>
          <FooterCol title="Product" links={[
            { label: "South Coast", href: "#strip" },
            { label: "Trending", href: "#trending" },
            { label: "The plan", href: "#" },
          ]} />
          <FooterCol title="For venues" links={[
            { label: "Partner program", href: "#partner" },
            { label: "Become featured", href: "mailto:partners@vibelanka.com" },
          ]} />
          <FooterCol title="Company" links={[
            { label: "Manifesto", href: "#" },
            { label: "Contact", href: "mailto:hello@vibelanka.com" },
            { label: "Press", href: "mailto:press@vibelanka.com" },
          ]} />
        </div>
      </div>
      <div style={s.footerBottom}>
        <span style={s.footerCopy}>
          © Vibe Lanka 2026 · Made on the bay
        </span>
        <span style={s.footerLive}>
          <span className="vl-pulse-dot" style={s.footerLiveDot} />
          LIVE · {currentClock()}
        </span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div style={s.footerCol}>
      <span style={s.footerColTitle}>{title.toUpperCase()}</span>
      <ul style={s.footerColLinks}>
        {links.map((l) => (
          <li key={l.label} style={s.footerColLink}>
            <a href={l.href} style={s.footerColAnchor}>{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhoneMockup({ variant }) {
  return (
    <div style={s.phone}>
      <div style={s.phoneNotch} />
      <div style={s.phoneScreen}>
        {variant === "map" ? <PhoneMapPreview /> : <PhonePlanPreview />}
      </div>
    </div>
  );
}

function PhoneMapPreview() {
  return (
    <div style={s.phoneInner}>
      <div style={s.phoneHeader}>
        <div style={s.phoneKicker}>
          <span>NEAR YOU · LIVE</span>
        </div>
        <div style={s.phoneAreaChips}>
          <span style={{ ...s.phoneAreaChip, background: tokens.ink, color: tokens.paper }}>South Coast</span>
          <span style={s.phoneAreaChip}>Ella</span>
          <span style={s.phoneAreaChip}>Colombo</span>
        </div>
      </div>
      <div style={s.phoneAreaTitle}>
        <span style={s.phoneAreaRegion}>MIRISSA → HIRIKETIYA</span>
        <h3 style={s.phoneAreaName}>South Coast</h3>
      </div>
      <div style={s.phoneMap}>
        <svg viewBox="0 0 100 30" style={{ width: "100%", height: 110, display: "block" }}>
          <rect x="0" y="0" width="100" height="30" fill={tokens.muted} opacity="0.1" />
          <path
            d="M 0,18 C 6,16 12,19 18,17 C 26,15 32,19 40,17 C 48,15 56,19 62,17 C 70,15 78,18 86,16 C 92,15 96,18 100,17"
            stroke={tokens.ember}
            strokeWidth="0.6"
            fill="none"
          />
          {[6, 18, 30, 44, 60, 74, 90].map((x, i) => (
            <g key={i} transform={`translate(${x}, 17)`}>
              <circle cx="0" cy="0" r="1.4" fill={tokens.ember} opacity="0.2" />
              <circle cx="0" cy="0" r="0.6" fill={tokens.ember} />
            </g>
          ))}
          <text x="6" y="6" fontSize="2.5" textAnchor="middle" fill={tokens.ink} fontFamily="serif" fontStyle="italic">Mirissa</text>
          <text x="44" y="6" fontSize="2.5" textAnchor="middle" fill={tokens.ink} fontFamily="serif" fontStyle="italic">Ahangama</text>
          <text x="90" y="6" fontSize="2.5" textAnchor="middle" fill={tokens.ink} fontFamily="serif" fontStyle="italic">Hiriketiya</text>
        </svg>
      </div>
      <div style={s.phoneList}>
        {[
          { name: "Smoke & Bitters", meta: "Hiriketiya · Bar", count: 142 },
          { name: "Weligama Bay", meta: "Weligama · Beach", count: 187 },
          { name: "Ceylon Sliders", meta: "Ahangama · Café", count: 89 },
        ].map((item) => (
          <div key={item.name} style={s.phoneListItem}>
            <div style={s.phoneListImg} />
            <div style={s.phoneListText}>
              <span style={s.phoneListMeta}>{item.meta.toUpperCase()}</span>
              <span style={s.phoneListName}>{item.name}</span>
            </div>
            <span style={s.phoneListCount}>{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhonePlanPreview() {
  const stops = [
    { num: "01", time: "08:00", name: "Shady Lane", sub: "Mirissa · Café", stay: "1h" },
    { num: "02", time: "09:30", name: "Weligama Bay", sub: "Weligama · Surf", stay: "2h" },
    { num: "03", time: "12:30", name: "Ceylon Sliders", sub: "Ahangama · Café", stay: "1h" },
  ];
  return (
    <div style={s.phoneInner}>
      <div style={s.phoneHeader}>
        <div style={s.phoneKicker}>
          <span>YOUR PLAN · DAY 01</span>
        </div>
        <h3 style={{ ...s.phoneAreaName, marginTop: 8 }}>The plan.</h3>
      </div>
      <div style={s.phoneSummary}>
        <div style={s.phoneSummaryItem}>
          <span style={s.phoneSummaryLabel}>STARTS</span>
          <span style={s.phoneSummaryValue}>08:00</span>
        </div>
        <div style={s.phoneSummaryItem}>
          <span style={s.phoneSummaryLabel}>ENDS</span>
          <span style={s.phoneSummaryValue}>13:30</span>
        </div>
        <div style={s.phoneSummaryItem}>
          <span style={s.phoneSummaryLabel}>STOPS</span>
          <span style={s.phoneSummaryValue}>3</span>
        </div>
      </div>
      <div style={s.phoneStops}>
        {stops.map((stop, i) => (
          <React.Fragment key={stop.num}>
            {i > 0 && (
              <div style={s.phoneTravel}>
                <span style={s.phoneTravelDot} />
                <span style={s.phoneTravelDot} />
                <span style={s.phoneTravelLabel}>Tuk-tuk · 12m</span>
              </div>
            )}
            <div style={s.phoneStop}>
              <div style={s.phoneStopNum}>{stop.num}</div>
              <div style={s.phoneStopText}>
                <span style={s.phoneStopName}>{stop.name}</span>
                <span style={s.phoneStopSub}>{stop.sub}</span>
              </div>
              <div style={s.phoneStopTimeCol}>
                <span style={s.phoneStopTime}>{stop.time}</span>
                <span style={s.phoneStopStay}>{stop.stay}</span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function SectionMeta({ number, label, mode = "default" }) {
  const color =
    mode === "inverted" ? tokens.muted :
    mode === "dark-bg" ? tokens.mutedDeep :
    tokens.muted;
  return (
    <div style={{ ...s.sectionMeta, color }}>
      <span style={{ ...s.sectionMetaNum, color: mode === "inverted" ? tokens.ember : tokens.ember }}>
        {number}
      </span>
      <span style={s.sectionMetaLine} />
      <span style={s.sectionMetaLabel}>{label.toUpperCase()}</span>
    </div>
  );
}

function Stat({ value, label, sub }) {
  return (
    <div style={s.stat}>
      <span style={s.statValue}>{value}</span>
      <span style={s.statLabel}>{label}</span>
      {sub && <span style={s.statSub}>{sub}</span>}
    </div>
  );
}

function currentClock() {
  return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,0..100&family=DM+Mono:wght@400;500&family=Familjen+Grotesk:wght@400;500;600&display=swap');

      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; }
      body {
        font-family: 'Familjen Grotesk', system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
        background: ${tokens.paper};
        color: ${tokens.ink};
      }
      a { color: inherit; text-decoration: none; }
      ul { list-style: none; padding: 0; margin: 0; }
      button { font-family: inherit; }

      @keyframes vl-pulse-dot {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      .vl-pulse-dot { animation: vl-pulse-dot 1.5s cubic-bezier(0.32, 0.72, 0, 1) infinite; }

      @keyframes vl-ticker {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .vl-ticker { animation: vl-ticker 60s linear infinite; }

      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }
        .vl-ticker { animation: none; }
      }

      @media (max-width: 900px) {
        .responsive-grid-2 { grid-template-columns: 1fr !important; }
        .responsive-grid-3 { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
}

const s = {
  page: { minHeight: "100vh", background: tokens.paper },

  nav: {
    position: "sticky", top: 0, zIndex: 100,
    background: "rgba(250,247,242,0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: `1px solid ${tokens.paperDeep}`,
  },
  navInner: {
    maxWidth: 1400, margin: "0 auto", padding: "20px 40px",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center", gap: 32,
  },
  navLogo: {
    fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 400,
    color: tokens.ink, letterSpacing: "-0.02em",
    justifySelf: "start",
  },
  navLogoItalic: { fontStyle: "italic", fontWeight: 400 },
  navLinks: {
    display: "flex",
    gap: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  navLinkWrap: {
    position: "relative",
  },
  navLink: {
    fontFamily: "'DM Mono', monospace", fontSize: 12,
    letterSpacing: "0.1em", textTransform: "uppercase",
    color: tokens.ink, fontWeight: 500, transition: "color 200ms",
    display: "inline-flex", alignItems: "center", gap: 6,
    cursor: "pointer", whiteSpace: "nowrap",
  },
  navCaret: {
    fontSize: 9, opacity: 0.6, marginTop: 1,
  },
  navDropdown: {
    position: "absolute",
    top: "calc(100% + 12px)",
    left: "50%",
    transform: "translateX(-50%)",
    minWidth: 240,
    background: tokens.paper,
    border: `1px solid ${tokens.ink}`,
    borderRadius: 4,
    padding: "16px 0 8px",
    boxShadow: "0 12px 40px -8px rgba(24,22,20,0.18)",
    zIndex: 200,
  },
  navDropdownKicker: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 9,
    letterSpacing: "0.18em",
    color: tokens.muted,
    fontWeight: 500,
    padding: "0 20px 12px",
    display: "block",
    borderBottom: `1px solid ${tokens.paperDeep}`,
    marginBottom: 4,
  },
  navDropdownItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    padding: "10px 20px",
    transition: "background 150ms",
  },
  navDropdownName: {
    fontFamily: "'Fraunces', serif",
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: 400,
    color: tokens.ink,
    letterSpacing: "-0.01em",
  },
  navDropdownMeta: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 9,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: tokens.ember,
    fontWeight: 500,
  },
  navCta: {
    fontFamily: "'DM Mono', monospace", fontSize: 12,
    letterSpacing: "0.1em", textTransform: "uppercase",
    color: tokens.paper, background: tokens.ink,
    padding: "10px 18px", borderRadius: 999,
    fontWeight: 500, display: "flex", alignItems: "center",
    justifySelf: "end", whiteSpace: "nowrap",
  },

  hero: {
    maxWidth: 1400, margin: "0 auto",
    padding: "80px 40px 0",
    display: "flex", flexDirection: "column",
    alignItems: "center", textAlign: "center",
  },
  heroKicker: {
    display: "flex", alignItems: "center", gap: 8,
    fontFamily: "'DM Mono', monospace", fontSize: 11,
    letterSpacing: "0.18em", textTransform: "uppercase",
    color: tokens.muted, marginBottom: 32, fontWeight: 500,
  },
  heroKickerDot: {
    width: 7, height: 7, borderRadius: "50%", background: tokens.ember,
  },
  heroTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(72px, 14vw, 220px)", fontWeight: 300,
    fontVariationSettings: "'opsz' 144, 'SOFT' 30",
    color: tokens.ink, margin: 0, lineHeight: 0.85,
    letterSpacing: "-0.05em", textAlign: "center",
  },
  heroLine: { display: "block" },
  heroLineItalic: { fontStyle: "italic", fontWeight: 400 },
  heroSub: {
    fontFamily: "'Fraunces', serif",
    fontSize: 22,
    fontWeight: 400,
    fontVariationSettings: "'opsz' 144, 'SOFT' 50",
    lineHeight: 1.45,
    color: tokens.mutedDeep,
    maxWidth: 640,
    margin: "40px auto 0",
    letterSpacing: "-0.015em",
  },
  heroActions: {
    display: "flex", gap: 12, marginTop: 36, marginBottom: 80,
    flexWrap: "wrap", justifyContent: "center",
  },
  heroCta: {
    display: "inline-flex", alignItems: "center",
    padding: "16px 28px", background: tokens.ink, color: tokens.paper,
    fontFamily: "'Familjen Grotesk', sans-serif", fontSize: 16,
    fontWeight: 500, borderRadius: 4,
    transition: "transform 200ms cubic-bezier(0.32, 0.72, 0, 1)",
  },
  heroCtaGhost: {
    display: "inline-flex", alignItems: "center",
    padding: "16px 28px", color: tokens.ink,
    fontFamily: "'Familjen Grotesk', sans-serif", fontSize: 16,
    fontWeight: 500, border: `1px solid ${tokens.ink}`, borderRadius: 4,
  },

  stripWrap: { width: "100%", paddingBottom: 80 },
  stripLabels: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    fontFamily: "'DM Mono', monospace", fontSize: 10,
    letterSpacing: "0.18em", color: tokens.muted,
    marginBottom: 20, paddingBottom: 12, borderBottom: `1px solid ${tokens.ink}`,
  },
  stripLabelLeft: {},
  stripLabelCenter: { color: tokens.ink, fontWeight: 500 },
  stripLabelRight: {},
  stripContainer: { width: "100%", position: "relative" },
  stripSvg: { width: "100%", height: 60, display: "block" },
  stripTowns: {
    position: "relative", height: 100, width: "100%", marginTop: 12,
  },
  stripTown: {
    position: "absolute", transform: "translateX(-50%)",
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: 4, minWidth: 80,
  },
  stripTownName: {
    fontFamily: "'Fraunces', serif", fontSize: 16,
    fontStyle: "italic", fontWeight: 400,
    color: tokens.ink, letterSpacing: "-0.01em",
  },
  stripTownCount: {
    fontFamily: "'Fraunces', serif", fontSize: 24,
    fontWeight: 300, color: tokens.ember,
    letterSpacing: "-0.025em", lineHeight: 1,
  },
  stripTownLabel: {
    fontFamily: "'DM Mono', monospace", fontSize: 9,
    letterSpacing: "0.14em", textTransform: "uppercase", color: tokens.muted,
  },

  tickerBar: {
    background: tokens.ink, color: tokens.paper,
    padding: "16px 0", overflow: "hidden", width: "100%",
  },
  ticker: { display: "inline-flex", whiteSpace: "nowrap", gap: 48 },
  tickerItem: {
    fontFamily: "'DM Mono', monospace", fontSize: 13,
    letterSpacing: "0.16em", fontWeight: 500,
    display: "inline-flex", alignItems: "center", gap: 16, paddingRight: 16,
  },
  tickerDot: {
    width: 5, height: 5, borderRadius: "50%",
    background: tokens.ember, display: "inline-block", flexShrink: 0,
  },

  section: { maxWidth: 1400, margin: "0 auto", padding: "120px 40px" },
  sectionMeta: {
    display: "flex", alignItems: "center", gap: 16,
    fontFamily: "'DM Mono', monospace", fontSize: 11,
    letterSpacing: "0.18em", fontWeight: 500, marginBottom: 64,
  },
  sectionMetaNum: {
    fontFamily: "'Fraunces', serif", fontSize: 32,
    fontStyle: "italic", fontWeight: 400,
    color: tokens.ember, letterSpacing: "-0.02em",
  },
  sectionMetaLine: {
    width: 60, height: 1, background: "currentColor", opacity: 0.5,
  },
  sectionMetaLabel: { textTransform: "uppercase" },

  featureGrid: {
    display: "grid", gridTemplateColumns: "1.2fr 1fr",
    gap: 80, alignItems: "start",
  },
  featureCol: {},
  featureColRight: { paddingTop: 16 },
  featureLead: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300,
    fontVariationSettings: "'opsz' 144, 'SOFT' 50",
    color: tokens.ink, margin: 0, lineHeight: 1, letterSpacing: "-0.035em",
  },
  featureItalic: { fontStyle: "italic", fontWeight: 400, color: tokens.ember },
  featureCopy: {
    fontFamily: "'Familjen Grotesk', sans-serif", fontSize: 17,
    lineHeight: 1.6, color: tokens.mutedDeep, margin: "0 0 20px",
  },

  showcaseGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: 80, alignItems: "center", marginBottom: 80,
  },
  showcaseTextCol: {},
  showcasePhoneCol: { display: "flex", justifyContent: "center" },
  showcaseTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(56px, 8vw, 120px)", fontWeight: 300,
    fontVariationSettings: "'opsz' 144, 'SOFT' 30",
    color: tokens.ink, margin: 0, lineHeight: 0.92, letterSpacing: "-0.04em",
  },
  showcaseItalic: { fontStyle: "italic", fontWeight: 400, color: tokens.ember },
  showcaseCopy: {
    fontFamily: "'Familjen Grotesk', sans-serif", fontSize: 17,
    lineHeight: 1.6, color: tokens.mutedDeep,
    margin: "32px 0", maxWidth: 480,
  },
  showcaseStats: {
    display: "flex", gap: 40, marginTop: 40,
    paddingTop: 32, borderTop: `1px solid ${tokens.ink}`, flexWrap: "wrap",
  },
  stat: { display: "flex", flexDirection: "column", gap: 4 },
  statValue: {
    fontFamily: "'Fraunces', serif", fontSize: 40,
    fontWeight: 300, color: tokens.ink,
    lineHeight: 1, letterSpacing: "-0.03em", fontStyle: "italic",
  },
  statLabel: {
    fontFamily: "'DM Mono', monospace", fontSize: 10,
    letterSpacing: "0.18em", textTransform: "uppercase",
    color: tokens.muted, fontWeight: 500, marginTop: 6,
  },
  statSub: {
    fontFamily: "'DM Mono', monospace", fontSize: 9,
    color: tokens.mutedDeep, letterSpacing: "0.06em", marginTop: 2,
  },

  cardsStrip: {
    display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24,
  },
  placeCard: {
    background: tokens.paper, borderRadius: 4,
    overflow: "hidden",
    transition: "transform 400ms cubic-bezier(0.32, 0.72, 0, 1)",
    display: "block",
  },
  placeCardImgWrap: {
    width: "100%", height: 360, position: "relative", overflow: "hidden",
  },
  placeCardImg: {
    width: "100%", height: "100%", objectFit: "cover", display: "block",
  },
  placeCardImgOverlay: {
    position: "absolute", inset: 0,
    background: "linear-gradient(180deg, transparent 50%, rgba(24,22,20,0.4) 100%)",
  },
  placeCardPctBadge: {
    position: "absolute", top: 16, right: 16,
    background: tokens.paper, padding: "10px 14px", borderRadius: 2,
    display: "flex", alignItems: "baseline", gap: 1,
  },
  placeCardPctNum: {
    fontFamily: "'Fraunces', serif", fontSize: 24,
    fontWeight: 400, color: tokens.ember,
    letterSpacing: "-0.02em", lineHeight: 1, fontStyle: "italic",
  },
  placeCardPctSign: {
    fontFamily: "'DM Mono', monospace", fontSize: 11,
    color: tokens.ember, fontWeight: 500,
  },
  placeCardBody: { padding: "20px 4px" },
  placeCardSub: {
    fontFamily: "'DM Mono', monospace", fontSize: 10,
    letterSpacing: "0.16em", color: tokens.muted, fontWeight: 500,
  },
  placeCardName: {
    fontFamily: "'Fraunces', serif", fontSize: 26,
    fontWeight: 400, color: tokens.ink,
    margin: "8px 0 12px", letterSpacing: "-0.02em", lineHeight: 1.05,
  },
  placeCardTags: {
    display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
  },
  placeCardTag: {
    padding: "3px 10px", border: `1px solid ${tokens.ink}`,
    borderRadius: 999, fontFamily: "'DM Mono', monospace",
    fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
  },
  placeCardTagDot: {
    width: 4, height: 4, borderRadius: "50%",
    background: tokens.ember, margin: "0 4px",
  },
  placeCardVibe: {
    fontFamily: "'DM Mono', monospace", fontSize: 10,
    letterSpacing: "0.06em", color: tokens.ember,
    fontWeight: 500, fontStyle: "italic",
  },

  threeGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
    gap: 32, marginBottom: 80,
  },
  findBlock: {
    padding: "32px 28px", border: `1px solid ${tokens.ink}`,
    borderRadius: 4, display: "flex", flexDirection: "column", minHeight: 360,
  },
  findBlockHead: { marginBottom: 32 },
  findBlockTag: {
    display: "inline-block", padding: "5px 10px",
    color: tokens.paper, fontFamily: "'DM Mono', monospace",
    fontSize: 10, letterSpacing: "0.16em", fontWeight: 500, borderRadius: 2,
  },
  findBlockTitle: {
    fontFamily: "'Fraunces', serif", fontSize: 36,
    fontWeight: 300,
    fontVariationSettings: "'opsz' 144, 'SOFT' 50",
    color: tokens.ink, margin: 0, lineHeight: 1, letterSpacing: "-0.03em",
  },
  findBlockSubtitle: {
    fontFamily: "'Fraunces', serif", fontSize: 18,
    fontStyle: "italic", fontWeight: 400, color: tokens.ember,
    margin: "12px 0 0", letterSpacing: "-0.01em",
  },
  findBlockRule: { width: 32, height: 1, background: tokens.ink, margin: "20px 0" },
  findBlockDescription: {
    fontFamily: "'Familjen Grotesk', sans-serif", fontSize: 15,
    lineHeight: 1.55, color: tokens.mutedDeep, margin: 0, flex: 1,
  },
  findBlockMetric: {
    fontFamily: "'DM Mono', monospace", fontSize: 10,
    letterSpacing: "0.16em", textTransform: "uppercase",
    color: tokens.muted, fontWeight: 500,
    marginTop: 24, paddingTop: 20, borderTop: `1px solid ${tokens.paperDeep}`,
  },

  trendingPreview: {
    background: tokens.paperWarm, border: `1px solid ${tokens.ink}`,
    borderRadius: 4, padding: "32px 40px",
  },
  trendingPreviewHead: {
    display: "flex", justifyContent: "space-between", alignItems: "baseline",
    paddingBottom: 20, borderBottom: `1px solid ${tokens.ink}`, marginBottom: 16,
  },
  trendingPreviewKicker: {
    fontFamily: "'DM Mono', monospace", fontSize: 11,
    letterSpacing: "0.18em", color: tokens.ember, fontWeight: 500,
    display: "flex", alignItems: "center", gap: 8,
  },
  trendingPreviewDot: {
    width: 6, height: 6, borderRadius: "50%", background: tokens.ember,
  },
  trendingPreviewMeta: {
    fontFamily: "'DM Mono', monospace", fontSize: 10,
    letterSpacing: "0.14em", color: tokens.muted,
  },
  trendingList: { display: "flex", flexDirection: "column" },
  trendingRow: {
    display: "grid", gridTemplateColumns: "1.2fr 2fr 60px",
    gap: 24, alignItems: "center",
    padding: "16px 0", borderBottom: `1px solid ${tokens.paperDeep}`,
  },
  trendingRowText: { display: "flex", flexDirection: "column", gap: 2 },
  trendingRowName: {
    fontFamily: "'Fraunces', serif", fontSize: 19,
    fontWeight: 400, color: tokens.ink, letterSpacing: "-0.015em",
  },
  trendingRowArea: {
    fontFamily: "'DM Mono', monospace", fontSize: 10,
    letterSpacing: "0.14em", textTransform: "uppercase", color: tokens.muted,
  },
  trendingRowBarTrack: {
    width: "100%", height: 8, background: tokens.paperDeep,
    borderRadius: 4, overflow: "hidden",
  },
  trendingRowBar: { height: "100%", borderRadius: 4 },
  trendingRowCount: {
    fontFamily: "'Fraunces', serif", fontSize: 22,
    fontWeight: 300, color: tokens.ink,
    fontStyle: "italic", textAlign: "right", letterSpacing: "-0.02em",
  },

  planGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: 80, alignItems: "center",
  },
  planTextCol: {},
  planPhoneCol: { display: "flex", justifyContent: "center" },
  planTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 300,
    fontVariationSettings: "'opsz' 144, 'SOFT' 30",
    color: tokens.ink, margin: 0, lineHeight: 0.92, letterSpacing: "-0.04em",
  },
  planItalic: { fontStyle: "italic", fontWeight: 400, color: tokens.ember },
  planCopy: {
    fontFamily: "'Familjen Grotesk', sans-serif", fontSize: 17,
    lineHeight: 1.6, color: tokens.mutedDeep,
    margin: "32px 0 40px", maxWidth: 480,
  },
  planFeatures: {
    display: "flex", flexDirection: "column",
    gap: 0, borderTop: `1px solid ${tokens.ink}`,
  },
  planFeature: {
    display: "grid", gridTemplateColumns: "1fr 2fr",
    gap: 24, padding: "16px 0",
    borderBottom: `1px solid ${tokens.paperDeep}`, alignItems: "baseline",
  },
  planFeatureLabel: {
    fontFamily: "'DM Mono', monospace", fontSize: 12,
    letterSpacing: "0.14em", textTransform: "uppercase",
    color: tokens.ink, fontWeight: 500,
  },
  planFeatureDetail: {
    fontFamily: "'Fraunces', serif", fontSize: 18,
    fontStyle: "italic", fontWeight: 400,
    color: tokens.mutedDeep, letterSpacing: "-0.01em",
  },

  partnerGrid: {
    display: "grid", gridTemplateColumns: "1.3fr 1fr",
    gap: 80, alignItems: "start",
  },
  partnerTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 300,
    fontVariationSettings: "'opsz' 144, 'SOFT' 30",
    margin: 0, lineHeight: 0.95, letterSpacing: "-0.035em",
  },
  partnerCopy: {
    fontFamily: "'Familjen Grotesk', sans-serif", fontSize: 17,
    lineHeight: 1.6, color: tokens.muted,
    margin: "32px 0 0", maxWidth: 520,
  },
  partnerCard: {
    border: `1px solid ${tokens.paper}`,
    padding: "32px 28px", background: "transparent",
  },
  partnerCardKicker: {
    fontFamily: "'DM Mono', monospace", fontSize: 11,
    letterSpacing: "0.18em", color: tokens.ember, fontWeight: 500,
    display: "block", marginBottom: 28,
  },
  partnerList: { display: "flex", flexDirection: "column" },
  partnerListItem: {
    display: "grid", gridTemplateColumns: "32px 1fr",
    gap: 14, alignItems: "baseline",
    padding: "14px 0", borderBottom: `1px solid rgba(250,247,242,0.15)`,
  },
  partnerListNum: {
    fontFamily: "'DM Mono', monospace", fontSize: 11,
    letterSpacing: "0.12em", color: tokens.ember, fontWeight: 500,
  },
  partnerListLabel: {
    fontFamily: "'Fraunces', serif", fontSize: 17,
    fontWeight: 400, color: tokens.paper, letterSpacing: "-0.01em",
  },
  partnerEmail: {
    display: "block", fontFamily: "'Fraunces', serif",
    fontSize: 22, fontStyle: "italic", color: tokens.ember,
    fontWeight: 400, letterSpacing: "-0.01em",
    marginTop: 28, paddingTop: 24,
    borderTop: `1px solid rgba(250,247,242,0.15)`,
  },

  manifestoWrap: { maxWidth: 880, margin: "0 auto", textAlign: "left" },
  manifestoKicker: {
    fontFamily: "'DM Mono', monospace", fontSize: 11,
    letterSpacing: "0.2em", color: tokens.ember, fontWeight: 500,
    display: "block", marginBottom: 32,
  },
  manifestoBody: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 300,
    lineHeight: 1.35, color: tokens.ink, margin: 0, letterSpacing: "-0.02em",
  },
  manifestoItalic: { fontStyle: "italic", fontWeight: 400, color: tokens.ember },
  manifestoSig: {
    fontFamily: "'DM Mono', monospace", fontSize: 12,
    letterSpacing: "0.16em", textTransform: "uppercase",
    color: tokens.muted, margin: "32px 0 0",
  },

  ctaSection: {
    background: tokens.paperWarm, padding: "120px 40px", textAlign: "center",
  },
  ctaTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "clamp(72px, 12vw, 180px)", fontWeight: 300,
    fontVariationSettings: "'opsz' 144, 'SOFT' 30",
    color: tokens.ink, margin: 0, lineHeight: 0.85, letterSpacing: "-0.05em",
  },
  ctaItalic: { fontStyle: "italic", fontWeight: 400, color: tokens.ember },
  ctaCopy: {
    fontFamily: "'Familjen Grotesk', sans-serif", fontSize: 18,
    color: tokens.mutedDeep, margin: "32px auto 40px", maxWidth: 480,
  },
  ctaButtons: {
    display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap",
  },
  ctaButton: {
    background: tokens.ink, color: tokens.paper,
    padding: "14px 28px", borderRadius: 4,
    display: "flex", flexDirection: "column", gap: 2, minWidth: 200,
    transition: "transform 200ms cubic-bezier(0.32, 0.72, 0, 1)",
  },
  ctaButtonKicker: {
    fontFamily: "'DM Mono', monospace", fontSize: 9,
    letterSpacing: "0.16em", color: tokens.muted, fontWeight: 500,
  },
  ctaButtonName: {
    fontFamily: "'Fraunces', serif", fontSize: 22,
    fontWeight: 400, color: tokens.paper, letterSpacing: "-0.015em",
  },
  ctaTinyPrint: {
    fontFamily: "'Familjen Grotesk', sans-serif", fontSize: 13,
    lineHeight: 1.5, color: tokens.muted,
    margin: "40px auto 0", maxWidth: 520,
  },
  ctaInlineLink: {
    color: tokens.ember, textDecoration: "underline",
    textDecorationThickness: 1, textUnderlineOffset: 3,
  },

  footer: { background: tokens.ink, color: tokens.paper, padding: "80px 0 0" },
  footerInner: {
    maxWidth: 1400, margin: "0 auto", padding: "0 40px",
    display: "grid", gridTemplateColumns: "1.5fr 2fr", gap: 60,
  },
  footerLogo: { display: "flex", flexDirection: "column", gap: 16 },
  footerLogoText: {
    fontFamily: "'Fraunces', serif", fontSize: 48,
    fontWeight: 300, color: tokens.paper,
    letterSpacing: "-0.03em", lineHeight: 1,
  },
  footerLogoItalic: { fontStyle: "italic", fontWeight: 400, color: tokens.ember },
  footerLogoCoords: {
    fontFamily: "'DM Mono', monospace", fontSize: 11,
    letterSpacing: "0.16em", color: tokens.muted,
  },
  footerCols: {
    display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32,
  },
  footerCol: { display: "flex", flexDirection: "column", gap: 16 },
  footerColTitle: {
    fontFamily: "'DM Mono', monospace", fontSize: 11,
    letterSpacing: "0.18em", color: tokens.ember, fontWeight: 500,
  },
  footerColLinks: { display: "flex", flexDirection: "column", gap: 10 },
  footerColLink: {},
  footerColAnchor: {
    fontFamily: "'Familjen Grotesk', sans-serif", fontSize: 15, color: tokens.paper,
  },
  footerBottom: {
    maxWidth: 1400, margin: "60px auto 0", padding: "32px 40px",
    borderTop: `1px solid rgba(250,247,242,0.15)`,
    display: "flex", justifyContent: "space-between", alignItems: "center",
    fontFamily: "'DM Mono', monospace", fontSize: 10,
    letterSpacing: "0.16em", color: tokens.muted,
    textTransform: "uppercase", flexWrap: "wrap", gap: 16,
  },
  footerCopy: {},
  footerLive: {
    display: "flex", alignItems: "center", gap: 8, color: tokens.ember,
  },
  footerLiveDot: {
    width: 6, height: 6, borderRadius: "50%", background: tokens.ember,
  },

  phone: {
    width: 300, height: 620, background: tokens.ink,
    borderRadius: 44, padding: 8,
    boxShadow: "0 50px 100px -30px rgba(24,22,20,0.4), 0 30px 60px -20px rgba(24,22,20,0.3)",
    position: "relative", flexShrink: 0,
  },
  phoneNotch: {
    position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)",
    width: 90, height: 24, background: tokens.ink, borderRadius: 14, zIndex: 5,
  },
  phoneScreen: {
    width: "100%", height: "100%", background: tokens.paper,
    borderRadius: 36, overflow: "hidden", position: "relative",
  },
  phoneInner: { padding: "48px 18px 18px", height: "100%", overflow: "hidden" },
  phoneHeader: { paddingBottom: 16, borderBottom: `1px solid ${tokens.paperDeep}` },
  phoneKicker: {
    fontFamily: "'DM Mono', monospace", fontSize: 9,
    letterSpacing: "0.16em", color: tokens.muted,
    fontWeight: 500, marginBottom: 10,
  },
  phoneAreaChips: { display: "flex", gap: 6 },
  phoneAreaChip: {
    padding: "5px 9px", border: `1px solid ${tokens.ink}`,
    borderRadius: 999, fontFamily: "'DM Mono', monospace",
    fontSize: 9, letterSpacing: "0.08em",
    textTransform: "uppercase", color: tokens.ink, fontWeight: 500,
  },
  phoneAreaTitle: { padding: "16px 0" },
  phoneAreaRegion: {
    fontFamily: "'DM Mono', monospace", fontSize: 8,
    letterSpacing: "0.18em", color: tokens.muted, fontWeight: 500,
  },
  phoneAreaName: {
    fontFamily: "'Fraunces', serif", fontSize: 32,
    fontWeight: 300, color: tokens.ink,
    margin: "4px 0 0", letterSpacing: "-0.04em", lineHeight: 1,
  },
  phoneMap: {
    background: tokens.paperWarm,
    border: `1px solid ${tokens.paperDeep}`,
    borderRadius: 4, overflow: "hidden", marginBottom: 16,
  },
  phoneList: { display: "flex", flexDirection: "column" },
  phoneListItem: {
    display: "grid", gridTemplateColumns: "32px 1fr 32px",
    gap: 10, alignItems: "center",
    padding: "10px 0", borderTop: `1px solid ${tokens.paperDeep}`,
  },
  phoneListImg: {
    width: 32, height: 32, background: tokens.paperDeep, borderRadius: 2,
  },
  phoneListText: { minWidth: 0 },
  phoneListMeta: {
    fontFamily: "'DM Mono', monospace", fontSize: 7,
    letterSpacing: "0.14em", color: tokens.muted, fontWeight: 500, display: "block",
  },
  phoneListName: {
    fontFamily: "'Fraunces', serif", fontSize: 13,
    fontWeight: 400, color: tokens.ink, letterSpacing: "-0.01em",
    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
    display: "block", marginTop: 2,
  },
  phoneListCount: {
    fontFamily: "'DM Mono', monospace", fontSize: 10,
    color: tokens.ember, textAlign: "right", fontWeight: 500,
  },

  phoneSummary: {
    display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
    gap: 8, padding: "12px 0", margin: "16px 0 0",
    borderTop: `1px solid ${tokens.ink}`, borderBottom: `1px solid ${tokens.ink}`,
  },
  phoneSummaryItem: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
  },
  phoneSummaryLabel: {
    fontFamily: "'DM Mono', monospace", fontSize: 8,
    letterSpacing: "0.16em", color: tokens.muted, fontWeight: 500,
  },
  phoneSummaryValue: {
    fontFamily: "'Fraunces', serif", fontSize: 16,
    fontWeight: 300, fontStyle: "italic", color: tokens.ink, letterSpacing: "-0.02em",
  },
  phoneStops: { paddingTop: 16, display: "flex", flexDirection: "column" },
  phoneStop: {
    display: "grid", gridTemplateColumns: "28px 1fr 36px",
    gap: 10, alignItems: "center",
    padding: "8px 6px", background: tokens.paper,
    border: `1px solid ${tokens.paperDeep}`, borderRadius: 4,
  },
  phoneStopNum: {
    fontFamily: "'DM Mono', monospace", fontSize: 9,
    letterSpacing: "0.1em", color: tokens.ember, fontWeight: 500,
    background: tokens.paperWarm, padding: "3px 5px",
    borderRadius: 2, border: `1px solid ${tokens.ember}`, textAlign: "center",
  },
  phoneStopText: { minWidth: 0 },
  phoneStopName: {
    fontFamily: "'Fraunces', serif", fontSize: 13,
    fontWeight: 400, color: tokens.ink, letterSpacing: "-0.01em",
    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
    display: "block", lineHeight: 1.2,
  },
  phoneStopSub: {
    fontFamily: "'DM Mono', monospace", fontSize: 8,
    color: tokens.muted, letterSpacing: "0.06em",
    display: "block", marginTop: 2,
  },
  phoneStopTimeCol: {
    display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2,
  },
  phoneStopTime: {
    fontFamily: "'Fraunces', serif", fontSize: 12,
    fontStyle: "italic", fontWeight: 400, color: tokens.ink, letterSpacing: "-0.01em",
  },
  phoneStopStay: {
    fontFamily: "'DM Mono', monospace", fontSize: 9, color: tokens.muted,
  },
  phoneTravel: {
    display: "flex", alignItems: "center", gap: 8, padding: "4px 0 4px 14px",
  },
  phoneTravelDot: {
    width: 2, height: 2, borderRadius: "50%", background: tokens.muted,
  },
  phoneTravelLabel: {
    fontFamily: "'DM Mono', monospace", fontSize: 9,
    color: tokens.muted, letterSpacing: "0.06em", marginLeft: 4,
  },
};
