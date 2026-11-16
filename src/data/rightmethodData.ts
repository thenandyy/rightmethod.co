import panoKeynoteImg from '../assets/images/pano_keynote_stage_1794810265316.jpg';
import panoFiresideImg from '../assets/images/pano_fireside_panel_1794810265990.jpg';
import panoPodcastImg from '../assets/images/pano_studio_podcast_1794810266683.jpg';
import panoSummitImg from '../assets/images/pano_summit_crowd_1794810266870.jpg';
import panoEditorialImg from '../assets/images/pano_editorial_shoot_1794810268455.jpg';

import portraitFounderMaleImg from '../assets/images/portrait_founder_male_1794810267723.jpg';
import portraitFounderFemaleImg from '../assets/images/portrait_founder_female_1794810268159.jpg';
import portraitCoachLeaderImg from '../assets/images/portrait_coach_leader_1794810268313.jpg';
import portraitCreatorVcImg from '../assets/images/portrait_creator_vc_1794810269625.jpg';

import reelTalkingHeadImg from '../assets/images/reel_talking_head_frame_1794813487317.jpg';
import reelPersonalBrandImg from '../assets/images/reel_personal_brand_frame_1794813488160.jpg';
import reelEducationalImg from '../assets/images/reel_educational_frame_1794813488823.jpg';
import reelPodcastClipImg from '../assets/images/reel_podcast_clip_frame_1794813489150.jpg';

export interface SiteConfig {
  brandName: string;
  domain: string;
  bookingUrl: string;
  partnerEmail: string;
  careersEmail: string;
  /** Drop your landscape studio reel .mp4 URL or /assets/hero-reel.mp4 path here when ready */
  heroVideoUrl: string;
  socialLinks: {
    linkedin: string;
    instagram: string;
  };
}

/**
 * Editable site configuration.
 * Replace `bookingUrl` with your live Cal.com scheduling link, set `heroVideoUrl` for your live .mp4 reel, and update social URLs when ready.
 */
export const SITE_CONFIG: SiteConfig = {
  brandName: 'RIGHTMETHOD',
  domain: 'rightmethod.co',
  bookingUrl: 'https://cal.com/rightmethod/strategy-call',
  partnerEmail: 'partner@rightmethod.co',
  careersEmail: 'career@rightmethod.co',
  heroVideoUrl: '',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/company/rightmethod-placeholder',
    instagram: 'https://www.instagram.com/rightmethod.co',
  },
};

export interface HeroOrbitVideoSlot {
  id: string;
  slotIndex: string;
  category: string;
  descriptor: string;
  /** Drop your actual 9:16 vertical client .mp4 URL here */
  videoUrl: string;
  /** Optional replaceable still preview URL */
  posterUrl: string;
  duration: string;
}

/**
 * Editable 9:16 vertical short-form video showcase slots orbiting the RIGHTMETHOD wordmark.
 * Replace `videoUrl` with your actual vertical .mp4 clips when ready.
 */
export const HERO_ORBIT_VIDEOS: HeroOrbitVideoSlot[] = [
  {
    id: 'orbit-founder-pb',
    slotIndex: '01',
    category: 'Founder Personal Branding',
    descriptor: 'Category authority clip',
    videoUrl: '',
    posterUrl: reelPersonalBrandImg,
    duration: '00:54',
  },
  {
    id: 'orbit-talking-head',
    slotIndex: '02',
    category: 'Talking-Head Leadership',
    descriptor: 'Direct-to-camera insight',
    videoUrl: '',
    posterUrl: reelTalkingHeadImg,
    duration: '00:48',
  },
  {
    id: 'orbit-podcast-clip',
    slotIndex: '03',
    category: 'Podcast Clips',
    descriptor: 'Fireside thesis cut',
    videoUrl: '',
    posterUrl: reelPodcastClipImg,
    duration: '01:15',
  },
  {
    id: 'orbit-educational',
    slotIndex: '04',
    category: 'Educational Content',
    descriptor: 'Pattern breakdown',
    videoUrl: '',
    posterUrl: reelEducationalImg,
    duration: '01:04',
  },
  {
    id: 'orbit-executive-pb',
    slotIndex: '05',
    category: 'Executive Branding',
    descriptor: 'Leadership perspective',
    videoUrl: '',
    posterUrl: panoKeynoteImg,
    duration: '00:58',
  },
  {
    id: 'orbit-storytelling',
    slotIndex: '06',
    category: 'Short-Form Storytelling',
    descriptor: 'Narrative retention edit',
    videoUrl: '',
    posterUrl: panoEditorialImg,
    duration: '00:52',
  },
];

export const HERO_METHOD_SEQUENCE = [
  'AUDIENCE SIGNALS',
  'PATTERN RECOGNITION',
  'CONTENT ENGINEERING',
  'ORGANIC GROWTH',
] as const;

export interface HeroProofMetric {
  id: string;
  value: string;
  label: string;
}

/**
 * Preserved first-screen proof figures.
 */
export const HERO_PROOF_METRICS: HeroProofMetric[] = [
  {
    id: 'views',
    value: '180M+',
    label: 'ORGANIC VIEWS',
  },
  {
    id: 'followers',
    value: '2.4M+',
    label: 'FOLLOWERS BUILT',
  },
  {
    id: 'revenue',
    value: '$45M+',
    label: 'CLIENT REVENUE',
  },
];

export interface NavItem {
  label: string;
  href: string;
  sectionId: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Content Engineering', href: '#content-engineering', sectionId: 'content-engineering' },
  { label: 'The Right Ones', href: '#the-right-ones', sectionId: 'the-right-ones' },
  { label: 'RightMethods', href: '#rightmethods', sectionId: 'rightmethods' },
  { label: 'Philosophy', href: '#philosophy', sectionId: 'philosophy' },
];

export interface ClientProfile {
  id: string;
  fullName: string;
  company: string;
  growthMetric: string;
  portraitUrl: string;
  initials: string;
}

/**
 * Editable Client Showcase Data (Square Photos · Click for White Label Details).
 * Replace `portraitUrl`, `fullName`, `company`, and `growthMetric` with real client data.
 */
export const CLIENT_SHOWCASE: ClientProfile[] = [
  {
    id: 'client-01',
    fullName: 'Client Partner 01',
    company: 'Company Name (Placeholder)',
    growthMetric: 'Replace with verified growth metric',
    portraitUrl: portraitFounderMaleImg,
    initials: '01',
  },
  {
    id: 'client-02',
    fullName: 'Client Partner 02',
    company: 'Venture Fund (Placeholder)',
    growthMetric: 'Replace with verified growth metric',
    portraitUrl: portraitFounderFemaleImg,
    initials: '02',
  },
  {
    id: 'client-03',
    fullName: 'Client Partner 03',
    company: 'Advisory Practice (Placeholder)',
    growthMetric: 'Replace with verified growth metric',
    portraitUrl: portraitCoachLeaderImg,
    initials: '03',
  },
  {
    id: 'client-04',
    fullName: 'Client Partner 04',
    company: 'Technology Venture (Placeholder)',
    growthMetric: 'Replace with verified growth metric',
    portraitUrl: portraitCreatorVcImg,
    initials: '04',
  },
  {
    id: 'client-05',
    fullName: 'Client Partner 05',
    company: 'Enterprise Group (Placeholder)',
    growthMetric: 'Replace with verified growth metric',
    portraitUrl: portraitFounderMaleImg,
    initials: '05',
  },
  {
    id: 'client-06',
    fullName: 'Client Partner 06',
    company: 'Early-Stage Capital (Placeholder)',
    growthMetric: 'Replace with verified growth metric',
    portraitUrl: portraitFounderFemaleImg,
    initials: '06',
  },
  {
    id: 'client-07',
    fullName: 'Client Partner 07',
    company: 'Executive Coaching (Placeholder)',
    growthMetric: 'Replace with verified growth metric',
    portraitUrl: portraitCoachLeaderImg,
    initials: '07',
  },
  {
    id: 'client-08',
    fullName: 'Client Partner 08',
    company: 'Consumer Brand (Placeholder)',
    growthMetric: 'Replace with verified growth metric',
    portraitUrl: portraitCreatorVcImg,
    initials: '08',
  },
];

export interface PanoramaPhoto {
  id: string;
  imageUrl: string;
  alt: string;
}

/**
 * Editable Client Panorama Photos (Just Photos — 3D Curved Ring).
 * Replace `imageUrl` with real client photographs.
 */
export const CLIENT_PANORAMA_PHOTOS: PanoramaPhoto[] = [
  { id: 'pano-01', imageUrl: panoKeynoteImg, alt: 'Founder keynote speaking moment on an editorial stage' },
  { id: 'pano-02', imageUrl: panoFiresideImg, alt: 'Fireside panel conversation with venture and founder leaders' },
  { id: 'pano-03', imageUrl: panoPodcastImg, alt: 'Cinema-lit founder podcast studio recording session' },
  { id: 'pano-04', imageUrl: panoSummitImg, alt: 'Leadership summit crowd and main-stage conference atmosphere' },
  { id: 'pano-05', imageUrl: panoEditorialImg, alt: 'Founder editorial video shoot on a studio set' },
  { id: 'pano-06', imageUrl: panoFiresideImg, alt: 'Executive fireside conversation in moody architectural lighting' },
  { id: 'pano-07', imageUrl: panoSummitImg, alt: 'Summit audience and speaker stage perspective' },
  { id: 'pano-08', imageUrl: panoKeynoteImg, alt: 'Keynote address delivered in monochrome stage lighting' },
  { id: 'pano-09', imageUrl: panoEditorialImg, alt: 'Editorial production set for flagship personal brand filming' },
  { id: 'pano-10', imageUrl: panoPodcastImg, alt: 'Long-form studio interview recording session' },
  { id: 'pano-11', imageUrl: panoKeynoteImg, alt: 'Main stage founder talk and audience moment' },
  { id: 'pano-12', imageUrl: panoSummitImg, alt: 'Architectural conference hall and founder gathering' },
];

export interface WorkflowStage {
  step: string;
  title: string;
  humanInput: string;
  machineLeverage: string;
  output: string;
}

export const AI_WORKFLOW_STAGES: WorkflowStage[] = [
  {
    step: '01',
    title: 'Audience intelligence',
    humanInput: 'Qualitative interviews and psychological framing',
    machineLeverage: 'Cross-channel comment and conversation clustering',
    output: 'A tension map of what your audience genuinely cares about.',
  },
  {
    step: '02',
    title: 'Research & insight',
    humanInput: 'Subject-matter depth and lived operating experience',
    machineLeverage: 'Rapid synthesis of niche discourse and white-space gaps',
    output: 'High-conviction editorial theses grounded in real practice.',
  },
  {
    step: '03',
    title: 'Pattern recognition',
    humanInput: 'Editorial judgement and narrative taste',
    machineLeverage: 'Hook cadence, retention curve, and format signal detection',
    output: 'Repeatable story architectures calibrated to your voice.',
  },
  {
    step: '04',
    title: 'Content engineering',
    humanInput: 'Original perspective, nuance, and authentic storytelling',
    machineLeverage: 'Structured drafting pipelines and multi-angle asset prep',
    output: 'Platform-native posts and short-form video systems.',
  },
  {
    step: '05',
    title: 'Distribution',
    humanInput: 'Contextual timing and peer dialogue',
    machineLeverage: 'Sequenced Instagram and LinkedIn publishing cadences',
    output: 'Precision reach among the exact peers, buyers, and founders.',
  },
  {
    step: '06',
    title: 'Continuous optimisation',
    humanInput: 'Strategic calibration of positioning and pillars',
    machineLeverage: 'Retention telemetry feeding the next 30-day cycle',
    output: 'Compounding organic influence that converts into opportunity.',
  },
];

export interface PillarItem {
  number: string;
  title: string;
  headline: string;
  body: string;
  mechanic: string;
}

export const CORE_PILLARS: PillarItem[] = [
  {
    number: '01',
    title: 'Audience First',
    headline: 'Understand the human before engineering the content.',
    body: 'We begin with the audience, not the algorithm. Their motivations, frustrations, and aspirations determine what deserves to be created.',
    mechanic: 'Motivation mapping · Belief shifts',
  },
  {
    number: '02',
    title: 'Authentic Content',
    headline: 'Your perspective is the differentiator.',
    body: 'We don’t manufacture personalities or force people into viral templates. We uncover the lived expertise that makes every individual distinctive.',
    mechanic: 'Voice extraction · Non-transferable insight',
  },
  {
    number: '03',
    title: 'Niche Intelligence',
    headline: 'Relevance creates the strongest connection.',
    body: 'A message that speaks to everyone resonates with no one. We study the exact industry context and peer conversations that matter.',
    mechanic: 'Category literacy · Signal over noise',
  },
  {
    number: '04',
    title: 'RightMethods · Secret Ingredient',
    headline: 'Specialised strategy and methods for the top 1%.',
    body: 'The secret ingredient for personal branding: bespoke research, positioning, storytelling, and distribution engineered for category leaders.',
    mechanic: 'Top 1% architecture · Compounding credibility',
  },
];

export interface PhilosophyPrinciple {
  number: string;
  label: string;
  headline: string;
  summary: string;
  questionPrompt: string;
}

export const PHILOSOPHY_PRINCIPLES: PhilosophyPrinciple[] = [
  {
    number: '01',
    label: 'FIRST PRINCIPLES',
    headline: 'The algorithm is a reflection of human behaviour.',
    summary:
      'Instead of chasing every platform update, we start with why someone cares, pauses mid-scroll, trusts an idea, and shares it.',
    questionPrompt: 'Why does this stop the right person mid-scroll?',
  },
  {
    number: '02',
    label: 'PATTERN RECOGNITION',
    headline: 'Virality isn’t a formula. Human behaviour leaves patterns.',
    summary:
      'We never copy yesterday’s viral post. We isolate the underlying psychological trigger and craft an original expression for you.',
    questionPrompt: 'What behavioural pattern sits underneath the attention?',
  },
  {
    number: '03',
    label: 'STRATEGIC POSITIONING',
    headline: 'Being visible is not the same as being remembered.',
    summary:
      'A durable personal brand owns one unmistakable worldview — defining what you are known for and which rooms you lead.',
    questionPrompt: 'What mental category does your name own?',
  },
];

export interface MythRealityItem {
  id: string;
  index: string;
  myth: string;
  reality: string;
  rightmethodPrinciple: string;
}

export const MYTHS_VS_REALITY: MythRealityItem[] = [
  {
    id: 'myth-01',
    index: 'NOISE 01',
    myth: 'Post every day to grow.',
    reality:
      'Frequency without relevance only creates noise. Depth of audience connection always beats calendar volume.',
    rightmethodPrinciple: 'Signal density outweighs posting volume.',
  },
  {
    id: 'myth-02',
    index: 'NOISE 02',
    myth: 'Follow viral trends to build a personal brand.',
    reality:
      'A trend earns fleeting attention. A distinctive perspective earns lasting recognition.',
    rightmethodPrinciple: 'Borrowed formats expire; owned viewpoints compound.',
  },
  {
    id: 'myth-03',
    index: 'NOISE 03',
    myth: 'The algorithm determines your growth.',
    reality:
      'Human behaviour shapes every signal platforms reward. Understand the audience first.',
    rightmethodPrinciple: 'Algorithms follow human retention, curiosity, and trust.',
  },
  {
    id: 'myth-04',
    index: 'NOISE 04',
    myth: 'AI can create an entire personal brand.',
    reality:
      'AI accelerates execution, but it cannot replace lived experience, judgement, or genuine expertise.',
    rightmethodPrinciple: 'Human insight is the source; intelligence multiplies it.',
  },
  {
    id: 'myth-05',
    index: 'NOISE 05',
    myth: 'More content means more opportunities.',
    reality:
      'The right message reaching the right people is worth more than a calendar full of forgettable posts.',
    rightmethodPrinciple: 'Precision distribution turns attention into trust.',
  },
];

export interface PlaybookPhase {
  phase: string;
  days: string;
  title: string;
  subtitle: string;
  deliverables: string[];
}

export const NINETY_DAY_PLAYBOOK: PlaybookPhase[] = [
  {
    phase: 'Stage 01',
    days: 'DAYS 01–30',
    title: 'UNDERSTAND',
    subtitle: 'Research before publishing.',
    deliverables: [
      'Personal brand audit and differentiation.',
      'Audience intelligence and competitor mapping.',
      'Strategic positioning and core content pillars.',
      'High-leverage growth opportunity identification.',
    ],
  },
  {
    phase: 'Stage 02',
    days: 'DAYS 31–60',
    title: 'ENGINEER',
    subtitle: 'Turn strategy into a repeatable content system.',
    deliverables: [
      'Content architecture and authentic storytelling.',
      'Platform-native asset development.',
      'Instagram and LinkedIn distribution cadence.',
      'Live content testing and audience signal reading.',
    ],
  },
  {
    phase: 'Stage 03',
    days: 'DAYS 61–90',
    title: 'OPTIMISE',
    subtitle: 'Improve what works. Strengthen what matters.',
    deliverables: [
      'Pattern recognition and retention analysis.',
      'High-intent audience engagement loops.',
      'Narrative refinement and distribution tuning.',
      'Compounding 90-day strategy iteration.',
    ],
  },
];

export interface SpecialistRole {
  index: string;
  roleTitle: string;
  craftFocus: string;
}

export const SPECIALIST_TEAM: SpecialistRole[] = [
  {
    index: '01',
    roleTitle: 'Personal Brand Specialist',
    craftFocus: 'Executive positioning & authority architecture',
  },
  {
    index: '02',
    roleTitle: 'Creative Director',
    craftFocus: 'Visual taste, narrative direction & coherence',
  },
  {
    index: '03',
    roleTitle: 'Audience Researcher',
    craftFocus: 'Psychographics, tension mapping & buyer signals',
  },
  {
    index: '04',
    roleTitle: 'Brand Researcher',
    craftFocus: 'Category white space & deep market intelligence',
  },
  {
    index: '05',
    roleTitle: 'Content Strategist',
    craftFocus: 'Platform ecosystems, hooks & growth cadence',
  },
  {
    index: '06',
    roleTitle: 'Ghostwriter',
    craftFocus: 'Voice extraction, theses & long-form essays',
  },
  {
    index: '07',
    roleTitle: 'Scriptwriter',
    craftFocus: 'Retention pacing & high-signal storytelling',
  },
  {
    index: '08',
    roleTitle: 'Content Writer',
    craftFocus: 'Sharp editorial copy & high-conviction posts',
  },
  {
    index: '09',
    roleTitle: 'Graphic Designer',
    craftFocus: 'Editorial systems, typography & visual clarity',
  },
  {
    index: '10',
    roleTitle: 'Video Editor',
    craftFocus: 'Rhythm, motion craft & studio-grade cuts',
  },
];
