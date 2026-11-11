import { AttendeeSession, CommunityType } from '../types';

export interface TopicReflection {
  chapter: number;
  topic: string;
  optionId: string;
  whatYouLeanedToward: string;
  anotherApproachToExplore: string;
  somethingToTry: string;
  youChose?: string;
  whatThisPrioritizes?: string;
  whatToWatchFor?: string;
  tryThisAction?: string;
  crossChapterNote?: string;
}

export interface FieldGuideStrength {
  title: string;
  evidence: string;
  explanation: string;
}

export interface FieldGuideApproachToExplore {
  label: string;
  text: string;
  evidence: string;
  detail?: string;
}

export interface FieldGuideCrossWorldLesson {
  title: string;
  text: string;
  worldContext: string;
}

export interface FieldGuideAction {
  title: string;
  action: string;
  exampleScript?: string;
}

export interface PersonalizedNextStep {
  title: string;
  text: string;
}

export interface FieldGuideData {
  title: string;
  subtitle: string;
  community: CommunityType;
  answeredCount: number;
  totalDecisions: number;
  isComplete: boolean;
  missingChapters: number[];
  strengths: FieldGuideStrength[];
  opportunities: FieldGuideApproachToExplore[];
  growthArea: FieldGuideApproachToExplore; // backwards-compatible alias
  anotherApproachToExplore: FieldGuideApproachToExplore;
  crossWorldLesson: FieldGuideCrossWorldLesson;
  actions: FieldGuideAction[];
  actionThisWeek: FieldGuideAction;
  personalizedNextStep: PersonalizedNextStep;
  supportingQuote: string;
  reflections: TopicReflection[];
  disclaimer: string;
}

export interface LearningAngleEntry {
  topic: string;
  chapter: number;
  label: string;
  demonstrates: string;
  strengthTitle: string;
  whatYouLeanedToward: string;
  anotherApproachToExplore: string;
  somethingToTry: string;
  exampleScript: string;
  whatThisPrioritizes: string;
  whatToWatchFor: string;
  tryThisAction: string;
}

// -----------------------------------------------------------------------------
// PER-OPTION MAPPING (SUPPORTIVE, SPECIFIC, PLAIN LANGUAGE)
// -----------------------------------------------------------------------------
export const TOPIC_LEARNING_ANGLES: Record<string, LearningAngleEntry> = {
  // CHAPTER 2: CONNECTION
  opt_c2_natural: {
    topic: 'Connection',
    chapter: 2,
    label: 'Wait for a hallway moment',
    demonstrates: 'Preference for informal, low-pressure connection',
    strengthTitle: 'Keeping first impressions relaxed',
    whatYouLeanedToward:
      'Waiting for a natural conversation can keep things comfortable and unforced, which helps residents feel like neighbors rather than items on a checklist.',
    anotherApproachToExplore:
      'If your schedules rarely overlap in hallways or lounges, that casual conversation may never happen unless you open the door another way.',
    somethingToTry:
      'Keep note of two residents you rarely cross paths with and open with one brief, friendly message.',
    exampleScript: 'Ask one resident you rarely see: "Hey! Haven’t caught you in the hall yet—how’s your semester starting off? No rush to reply."',
    whatThisPrioritizes: 'Informal, low-pressure first contact.',
    whatToWatchFor: 'Schedules that never cross in shared spaces.',
    tryThisAction: 'Pair casual greetings with a quick written check-in for quiet doors.',
  },
  opt_c2_checkin: {
    topic: 'Connection',
    chapter: 2,
    label: 'Send a quick check-in',
    demonstrates: 'Direct one-on-one initiation without waiting on hallway luck',
    strengthTitle: 'Taking the first step without making it a big deal',
    whatYouLeanedToward:
      'A brief personal check-in reaches residents who stay behind closed doors instead of relying on chance encounters.',
    anotherApproachToExplore:
      'When someone is exhausted between classes and work, even a friendly message can feel like another obligation if it sounds like you need a fast reply.',
    somethingToTry:
      'Include an explicit no-rush line so quiet residents know they aren’t in trouble or expected to respond right away.',
    exampleScript: 'Text or note: "No need to answer right away—just wanted to say hi and make sure your week is going alright."',
    whatThisPrioritizes: 'Direct personal initiative.',
    whatToWatchFor: 'Accidental pressure to reply right away.',
    tryThisAction: 'Add a clear no-pressure closing to short check-ins.',
  },
  opt_c2_invite: {
    topic: 'Connection',
    chapter: 2,
    label: 'Send a casual invite',
    demonstrates: 'Inviting participation while keeping choice completely open',
    strengthTitle: 'Welcoming residents without putting them on the spot',
    whatYouLeanedToward:
      'Framing invitations casually makes social events feel optional and low-stakes instead of mandatory floor duties.',
    anotherApproachToExplore:
      'When a resident skips every event because of shifts or family responsibilities, an invitation alone may not show them other ways you can support them.',
    somethingToTry:
      'Pair event invitations with a small individual option that doesn’t require staying for a whole program.',
    exampleScript: 'Invite casually: "Swing by for snacks around 7 if you’re free—or just let me know if you want me to set one aside."',
    whatThisPrioritizes: 'Welcoming choice without pressure.',
    whatToWatchFor: 'Residents who cannot attend group events at all.',
    tryThisAction: 'Offer an easy off-schedule alternative alongside group invites.',
  },
  opt_c2_ask_pref: {
    topic: 'Connection',
    chapter: 2,
    label: 'Ask how they prefer contact',
    demonstrates: 'Respecting resident communication preferences from day one',
    strengthTitle: 'Asking how residents actually want to connect',
    whatYouLeanedToward:
      'Checking their preference upfront cuts out guesswork and shows respect for how they manage their time and energy.',
    anotherApproachToExplore:
      'Asking how they prefer contact works best when you remember their answer and occasionally verify whether that still works as their semester gets busier.',
    somethingToTry:
      'Write down the contact preference a resident gives you and follow through using only that channel next time.',
    exampleScript: 'Ask directly: "What’s the easiest way for me to check in with you—quick text, email, or saying hey in the hall?"',
    whatThisPrioritizes: 'Respecting resident agency and routines.',
    whatToWatchFor: 'Actually sticking to the preference they shared.',
    tryThisAction: 'Track each resident’s preferred contact style and use it consistently.',
  },

  // CHAPTER 3: TRUST AND BOUNDARIES
  opt_c3_perspective: {
    topic: 'Trust and boundaries',
    chapter: 3,
    label: 'Ask for their side',
    demonstrates: 'Curiosity-first listening during peer tension',
    strengthTitle: 'Listening before escalating when peers push back',
    whatYouLeanedToward:
      'Asking for a peer’s perspective lowers defensiveness fast and turns a standoff into an actual conversation.',
    anotherApproachToExplore:
      'Starting with curiosity can leave the community standard blurry if you stop at listening without calmly naming what needs to change.',
    somethingToTry:
      'Give them 30 seconds to share what happened, then state the shared standard plainly without raising your tone.',
    exampleScript: 'Say calmly: "Help me understand what’s going on from your side—I also want to keep shared spaces fair for everyone living here."',
    whatThisPrioritizes: 'Lowering defensiveness with peers.',
    whatToWatchFor: 'Keeping shared expectations unmistakably clear afterward.',
    tryThisAction: 'Listen first, then restate the quiet-hours standard simply.',
  },
  opt_c3_impact: {
    topic: 'Trust and boundaries',
    chapter: 3,
    label: 'Explain the impact',
    demonstrates: 'Grounding accountability in shared living rather than pulling rank',
    strengthTitle: 'Focusing accountability on shared living, not authority',
    whatYouLeanedToward:
      'Connecting a concern to how roommates or neighbors live together shows peers you aren’t nitpicking rules just to pull rank.',
    anotherApproachToExplore:
      'Even a calm explanation can land like a lecture if the other person hasn’t had a brief moment to share their side yet.',
    somethingToTry:
      'Keep the impact explanation to one or two sentences, then pause and ask how you can handle it together.',
    exampleScript: 'Keep it brief: "When this stays unresolved it wears on everyone sharing the space—what helps us fix it moving forward?"',
    whatThisPrioritizes: 'Shared living impact over pulling rank.',
    whatToWatchFor: 'Giving peers room to respond so it stays two-way.',
    tryThisAction: 'Pair one impact sentence with an open follow-up question.',
  },
  opt_c3_expectation: {
    topic: 'Trust and boundaries',
    chapter: 3,
    label: 'State the expectation clearly',
    demonstrates: 'Direct, predictable naming of community standards',
    strengthTitle: 'Being clear and upfront with standards',
    whatYouLeanedToward:
      'Saying clearly what the boundary is leaves no confusion in the hallway, especially with peers your own age.',
    anotherApproachToExplore:
      'Leading only with the expectation can put a defensive resident further on guard if there is no space to talk calmly or step out of view.',
    somethingToTry:
      'Follow a clear boundary with a steady invitation to talk once the hallway moment settles.',
    exampleScript: 'Follow up simply: "We still need to hold the shared agreement here. How are things going on your end otherwise?"',
    whatThisPrioritizes: 'Clarity and fairness with peers.',
    whatToWatchFor: 'Adding warmth or space so peers don’t dig in defensively.',
    tryThisAction: 'Pair firm clarity with a calm follow-up check.',
  },
  opt_c3_private: {
    topic: 'Trust and boundaries',
    chapter: 3,
    label: 'Talk privately',
    demonstrates: 'Face-saving de-escalation away from an audience',
    strengthTitle: 'Protecting dignity by stepping out of public view',
    whatYouLeanedToward:
      'Moving a tense conversation aside removes hallway onlookers so neither of you feels pressured to perform in front of peers.',
    anotherApproachToExplore:
      'Stepping aside sets a respectful tone right away, yet you still need plain, steady words once the two of you are one-on-one.',
    somethingToTry:
      'Step just down the hall together, state the impact once, and listen briefly before agreeing on next steps.',
    exampleScript: 'Invite aside: "Hey, mind stepping down the hall for a second so we can talk this through one-on-one?"',
    whatThisPrioritizes: 'De-escalation and mutual dignity.',
    whatToWatchFor: 'Delivering a clear message once you have privacy.',
    tryThisAction: 'Use a private minute to state one clear expectation calmly.',
  },

  // CHAPTER 4: COMMUNICATION
  opt_c4_groupchat: {
    topic: 'Communication',
    chapter: 4,
    label: 'Group chat',
    demonstrates: 'Broad visibility for whole-floor updates',
    strengthTitle: 'Reaching the whole community quickly',
    whatYouLeanedToward:
      'Posting in the community group chat gets general announcements out quickly so many residents see what is happening together.',
    anotherApproachToExplore:
      'Busy or stressed students routinely mute group threads that buzz all day—so important invitations can disappear for the very residents you most want to include.',
    somethingToTry:
      'Back up important group invitations with one short personal message to residents who rarely appear in the thread.',
    exampleScript: 'Send 1-on-1 after posting: "Saw you’ve been slammed lately—no pressure on Thursday’s floor thing, just wanted you to know."',
    whatThisPrioritizes: 'Fast community-wide updates.',
    whatToWatchFor: 'Quiet residents who mute active group threads.',
    tryThisAction: 'Follow group announcements with one targeted personal note.',
  },
  opt_c4_directmsg: {
    topic: 'Communication',
    chapter: 4,
    label: 'Personal message',
    demonstrates: 'Low-friction one-on-one messaging that respects busy schedules',
    strengthTitle: 'Fitting communication into tight schedules',
    whatYouLeanedToward:
      'A personal message cuts through group noise and lets residents read and respond when their classes or work shifts wrap up.',
    anotherApproachToExplore:
      'When outreach stays only one-on-one with you, quiet residents can feel connected to their RA while still feeling disconnected from neighbors next door.',
    somethingToTry:
      'Notice shared schedules or majors over text, and offer small low-pressure introductions between two compatible residents.',
    exampleScript: 'Suggest simply: "Your neighbor down the hall also works evenings and takes morning chem—want me to introduce you two sometime?"',
    whatThisPrioritizes: 'Direct, low-effort individual reach.',
    whatToWatchFor: 'Helping quiet residents build neighbor-to-neighbor ties.',
    tryThisAction: 'Bridge one-on-one rapport into peer connections.',
  },
  opt_c4_inperson: {
    topic: 'Communication',
    chapter: 4,
    label: 'In person',
    demonstrates: 'Warm, face-to-face personal outreach',
    strengthTitle: 'Bringing genuine personal warmth to check-ins',
    whatYouLeanedToward:
      'Talking in person carries tone, empathy, and presence that short messages on a phone screen cannot easily match.',
    anotherApproachToExplore:
      'Residents working evening shifts or studying elsewhere are often away when you knock—or resting right when you try the door.',
    somethingToTry:
      'If knocking goes unanswered or interrupts rest, leave a short greeting note or send a quick text instead of trying repeatedly.',
    exampleScript: 'Leave on a quick note or text: "Stopped by to say hello! Catch me whenever your week opens up."',
    whatThisPrioritizes: 'Personal face-to-face rapport.',
    whatToWatchFor: 'Opposite work/class schedules or sleeping between shifts.',
    tryThisAction: 'Pair in-person knocks with a backup written note when missed.',
  },
  opt_c4_email: {
    topic: 'Communication',
    chapter: 4,
    label: 'Short email',
    demonstrates: 'Clear, saveable written communication',
    strengthTitle: 'Giving residents clear details they can revisit',
    whatYouLeanedToward:
      'A short email gives busy students something they can save and check later without buzzing their phone during work or class.',
    anotherApproachToExplore:
      'University inboxes pile up quickly, so friendly community emails can easily get skimmed over like campus administrative notices.',
    somethingToTry:
      'Use a plain, human subject line and keep the body to two short sentences so it reads in ten seconds.',
    exampleScript: 'Subject & body: "Quick hello from 5th floor — Just checking how your week is going. Reply anytime if you ever need anything."',
    whatThisPrioritizes: 'Calm, archivable clarity.',
    whatToWatchFor: 'Standing out gently inside crowded student inboxes.',
    tryThisAction: 'Put the point in a friendly 4-word subject line.',
  },

  // CHAPTER 6: ADAPTABILITY
  opt_c6_timing: {
    topic: 'Adaptability',
    chapter: 6,
    label: 'Confirm direct channel & timing',
    demonstrates: 'Matching communication method and timing to real routines',
    strengthTitle: 'Adapting your approach to their real week',
    whatYouLeanedToward:
      'Once you learned why Plan A failed, asking which channel and time window actually fit removes guesswork and respects their rest.',
    anotherApproachToExplore:
      'Checking timing works well the first time—just remember student work shifts and exam weeks change, so an occasional check keeps it accurate.',
    somethingToTry:
      'Confirm the best channel once, then verify after trying it whether that rhythm actually works in practice.',
    exampleScript: 'Ask directly: "What days or hours are easiest for a quick text so I never bug you during shifts or sleep?"',
    whatThisPrioritizes: 'Real-world schedule alignment.',
    whatToWatchFor: 'Confirming the new rhythm works after a week or two.',
    tryThisAction: 'Verify once that the new timing still feels convenient.',
  },
  opt_c6_shorter: {
    topic: 'Adaptability',
    chapter: 6,
    label: 'Switch to short direct messages',
    demonstrates: 'Cutting reply effort when time and energy are tight',
    strengthTitle: 'Making responses effortless for overworked residents',
    whatYouLeanedToward:
      'Trimming invitations down to one quick line makes it genuinely realistic for an exhausted resident to reply between work and home duties.',
    anotherApproachToExplore:
      'Short messages still only land if they reach the channel that isn’t muted and arrive at an hour when the resident can glance at their phone.',
    somethingToTry:
      'Write quick messages that need only two words back—never three paragraphs—so replying takes seconds.',
    exampleScript: 'Short check-in: "Grabbing snacks at 7—want me to save you one by the desk? (Yes/No works!)"',
    whatThisPrioritizes: 'Respecting scarce mental energy.',
    whatToWatchFor: 'Sending short texts to the channel they actually check.',
    tryThisAction: 'Keep asks answerable in two or three words.',
  },
  opt_c6_time: {
    topic: 'Adaptability',
    chapter: 6,
    label: 'Set a time instead of drop-ins',
    demonstrates: 'Replacing surprise knocks with planned, predictable windows',
    strengthTitle: 'Trading surprise interruptions for planned check-ins',
    whatYouLeanedToward:
      'Agreeing on a time in advance protects a resident’s rest and study blocks while keeping genuine live conversation on the table.',
    anotherApproachToExplore:
      'When someone’s job or home schedule shifts at the last minute, scheduling a live chat can feel harder than sending a quick two-line text.',
    somethingToTry:
      'Offer two brief 10-minute slots alongside an easy "or just text back if this week got hectic" option.',
    exampleScript: 'Offer choice clearly: "Got 5 minutes Tuesday afternoon or after lunch Thursday—or feel free to just text if things are packed."',
    whatThisPrioritizes: 'Predictable, uninterrupted human contact.',
    whatToWatchFor: 'Offering an asynchronous fallback when weeks shift.',
    tryThisAction: 'Pair scheduled time options with an easy text alternative.',
  },
  opt_c6_contact: {
    topic: 'Adaptability',
    chapter: 6,
    label: 'Ask how often to check in',
    demonstrates: 'Sharing control over outreach frequency and personal space',
    strengthTitle: 'Honoring independence while keeping support on the table',
    whatYouLeanedToward:
      'Asking how often someone wants to hear from you reassures independent residents that they won’t feel hovered over.',
    anotherApproachToExplore:
      'When residents ask for minimal check-ins, they can sometimes hesitate to reach out first if something hard happens mid-semester.',
    somethingToTry:
      'Agree on a lighter check-in rhythm while making sure you are still the one opening the door once a month.',
    exampleScript: 'Confirm plainly: "Would checking in once a month feel right? Either way, my door and texts are open anytime something comes up."',
    whatThisPrioritizes: 'Resident autonomy and boundaries.',
    whatToWatchFor: 'Not making residents initiate every time they need help.',
    tryThisAction: 'Send one low-pressure monthly door-open note.',
  },
};

function formatCommunityContext(community: CommunityType): string {
  switch (community) {
    case 'Residence hall':
      return 'In a traditional residence hall, hallway foot traffic makes it easy to assume you see everyone who wants support.';
    case 'Apartment community':
      return 'In an apartment community, separate entrances and closed deadbolts mean connection rarely happens by accident.';
    case 'New to the RA role':
      return 'Stepping into the RA role for the first time, building simple, repeatable habits matters more than getting every word perfect.';
    default:
      return 'Moving across both residence halls and apartments highlights how strongly building layout shapes who feels easy to reach.';
  }
}

function buildCh4ToCh6Note(ch4?: string, ch6?: string): string | undefined {
  if (!ch4 || !ch6) return undefined;
  const broadCh4 = ch4 === 'opt_c4_groupchat' || ch4 === 'opt_c4_email';
  const directAdjustedCh6 = ch6 === 'opt_c6_timing' || ch6 === 'opt_c6_shorter';

  if (broadCh4 && directAdjustedCh6) {
    return 'In Chapter 4 you started with broad outreach, then adjusted toward shorter or better-timed direct messages in Chapter 6 after seeing Ned’s schedule.';
  }
  if (ch4 === 'opt_c4_inperson' && ch6 !== 'opt_c6_time') {
    return 'In Chapter 4 you leaned toward knocking in person, then pivoted in Chapter 6 once unscheduled visits proved tough on Ned’s schedule.';
  }
  if (ch4 === 'opt_c4_inperson' && ch6 === 'opt_c6_time') {
    return 'You stayed consistent with personal conversation from Chapter 4 to Chapter 6, adjusting from drop-in knocks to a time set in advance.';
  }
  if (ch4 === 'opt_c4_directmsg') {
    return 'You started with personal messaging in Chapter 4 and refined the timing, length, or pace in Chapter 6 to fit between shifts.';
  }
  return 'In Chapter 6 you adjusted your approach using what you learned about Ned’s classes, work shifts, and home responsibilities.';
}

function buildCrossWorldLesson(community: CommunityType, ch2?: string, ch4?: string): FieldGuideCrossWorldLesson {
  const favorsHallwayOrInPerson = ch2 === 'opt_c2_natural' || ch4 === 'opt_c4_inperson';

  if (community === 'Residence hall') {
    return {
      title: 'What residence hall RAs can borrow from apartments',
      worldContext: 'Residence Hall Setting',
      text: favorsHallwayOrInPerson
        ? 'When corridor chatter comes naturally, it’s easy to overlook residents whose work or lab hours keep them out of the hallway. Borrow from apartment RAs: treat behind-closed-door residents with intentional, low-key texts rather than relying only on hallway run-ins.'
        : 'In busy halls, students can feel constantly "on display." Borrow from apartment RAs: keep check-ins short, predictable, and respectful of closed doors so privacy still feels real.',
    };
  }

  if (community === 'Apartment community') {
    return {
      title: 'What apartment RAs can borrow from residence halls',
      worldContext: 'Apartment Setting',
      text: 'Physical distance and locked doors make isolation look normal in apartments. Borrow from hall RAs: treat predictable shared stops—mailrooms, laundry rooms, courtyard walkways—as gentle greeting zones paired with short personal check-ins.',
    };
  }

  if (community === 'New to the RA role') {
    return {
      title: 'Carrying habits across both settings',
      worldContext: 'New RA Perspective',
      text: 'Whether you walk an interior hallway or exterior breezeways, combine warm casual visibility in common spaces with one low-pressure message option for residents you haven’t seen lately.',
    };
  }

  return {
    title: 'Matching outreach to building layout',
    worldContext: 'Residence Hall & Apartment Perspective',
    text: 'Working across both worlds shows there is no single "best" outreach tool—hallways reward visible greetings, while locked apartments rely on clear, schedule-aware personal check-ins.',
  };
}

// -----------------------------------------------------------------------------
// DETERMINISTIC RULE-BASED PERSONALIZED FIELD GUIDE GENERATOR
// -----------------------------------------------------------------------------
export function generateFieldGuide(session: AttendeeSession): FieldGuideData {
  const ch2 = session.answers[2];
  const ch3 = session.answers[3];
  const ch4 = session.answers[4];
  const ch6 = session.answers[6];
  const community: CommunityType = session.selectedCommunity || 'Both';

  const decisionChapters = [2, 3, 4, 6];
  const answeredChapters = decisionChapters.filter((ch) =>
    Boolean(session.answers[ch] && TOPIC_LEARNING_ANGLES[session.answers[ch]])
  );
  const missingChapters = decisionChapters.filter(
    (ch) => !session.answers[ch] || !TOPIC_LEARNING_ANGLES[session.answers[ch]]
  );
  const answeredCount = answeredChapters.length;
  const isComplete = answeredCount === decisionChapters.length;

  // Reflections breakdown for expandable evidence
  const reflections: TopicReflection[] = answeredChapters.map((ch) => {
    const optId = session.answers[ch];
    const data = TOPIC_LEARNING_ANGLES[optId];
    return {
      chapter: ch,
      topic: data.topic,
      optionId: optId,
      whatYouLeanedToward: data.whatYouLeanedToward,
      anotherApproachToExplore: data.anotherApproachToExplore,
      somethingToTry: data.somethingToTry,
      youChose: data.label,
      whatThisPrioritizes: data.whatYouLeanedToward,
      whatToWatchFor: data.anotherApproachToExplore,
      tryThisAction: data.somethingToTry,
      crossChapterNote: ch === 6 ? buildCh4ToCh6Note(ch4, ch6) : undefined,
    };
  });

  // Cross-chapter combination flags
  const isNaturalAndInPerson = ch2 === 'opt_c2_natural' && ch4 === 'opt_c4_inperson';
  const isBroadcastInitial = ch4 === 'opt_c4_groupchat' || ch4 === 'opt_c4_email';
  const isDirectAdaptedCh6 = ch6 === 'opt_c6_timing' || ch6 === 'opt_c6_shorter';
  const isBroadcastToDirectShift = isBroadcastInitial && isDirectAdaptedCh6;
  const isInPersonToShift = ch4 === 'opt_c4_inperson' && Boolean(ch6 && ch6 !== 'opt_c6_time');
  const isAutonomyCluster =
    (['opt_c2_invite', 'opt_c2_ask_pref'].includes(ch2 || '') &&
      ['opt_c6_contact', 'opt_c6_timing'].includes(ch6 || '')) ||
    (ch2 === 'opt_c2_natural' && ch6 === 'opt_c6_contact');
  const isDirectOutreachPair =
    ch2 === 'opt_c2_checkin' && (ch4 === 'opt_c4_directmsg' || ch4 === 'opt_c4_inperson');
  const isFirmStandards = ch3 === 'opt_c3_expectation' || ch3 === 'opt_c3_impact';
  const isCalmPeerDialogue = ch3 === 'opt_c3_perspective' || ch3 === 'opt_c3_private';

  // ---------------------------------------------------------------------------
  // 1. YOUR STRENGTHS (1–2 SUBSTANTIVE ENTRIES)
  // ---------------------------------------------------------------------------
  interface CandidateStrength extends FieldGuideStrength {
    chapters: number[];
    priority: number;
  }

  const strengthCandidates: CandidateStrength[] = [];

  if (isNaturalAndInPerson) {
    strengthCandidates.push({
      priority: 100,
      chapters: [2, 4],
      title: 'Leaving room for comfortable, personal connection',
      evidence: 'Chapters 2 & 4: Wait for a hallway moment + In person',
      explanation: `Waiting for everyday openings and talking face-to-face keeps relationships warm and natural instead of transactional. ${formatCommunityContext(community)}`,
    });
  }

  if (isBroadcastToDirectShift) {
    strengthCandidates.push({
      priority: 98,
      chapters: [4, 6],
      title: 'Adjusting your approach when you learn what works',
      evidence: `Chapters 4 & 6: ${TOPIC_LEARNING_ANGLES[ch4!].label} → ${TOPIC_LEARNING_ANGLES[ch6!].label}`,
      explanation: `After starting with a broad channel, you changed course once you saw that Ned mutes noisy chats and works 25 hours a week. Adapting based on real life helps residents actually receive your care instead of tuning out repeated broadcasts.`,
    });
  } else if (isInPersonToShift) {
    strengthCandidates.push({
      priority: 96,
      chapters: [4, 6],
      title: 'Shifting away from drop-ins once timing got tight',
      evidence: `Chapters 4 & 6: In person → ${TOPIC_LEARNING_ANGLES[ch6!].label}`,
      explanation:
        'You valued warm face-to-face contact at first, then changed your plan once you saw how surprise knocks disrupt sleep and work prep. That flexibility helps keep goodwill intact.',
    });
  }

  if (isAutonomyCluster) {
    strengthCandidates.push({
      priority: 94,
      chapters: [2, 6],
      title: 'Respecting residents’ space and control over timing',
      evidence: `Chapters 2 & 6: ${TOPIC_LEARNING_ANGLES[ch2!].label} + ${TOPIC_LEARNING_ANGLES[ch6!].label}`,
      explanation:
        'Your answers give residents clear voice over how and how often connection happens. Letting busy students set comfortable limits lowers resentment and makes support feel respectful rather than intrusive.',
    });
  }

  if (isDirectOutreachPair) {
    strengthCandidates.push({
      priority: 90,
      chapters: [2, 4],
      title: 'Opening direct doors instead of relying on chance encounters',
      evidence: `Chapters 2 & 4: Send a quick check-in + ${TOPIC_LEARNING_ANGLES[ch4!].label}`,
      explanation: `Rather than waiting on hallway luck, you stepped forward with direct one-on-one outreach. ${formatCommunityContext(community)}`,
    });
  }

  const baseChOrder: Record<number, number> = { 3: 84, 6: 82, 2: 80, 4: 78 };
  answeredChapters.forEach((ch) => {
    const optId = session.answers[ch];
    const angle = TOPIC_LEARNING_ANGLES[optId];
    strengthCandidates.push({
      priority: baseChOrder[ch] ?? 75,
      chapters: [ch],
      title: angle.strengthTitle,
      evidence: `Chapter ${ch}: ${angle.label}`,
      explanation: angle.whatYouLeanedToward,
    });
  });

  strengthCandidates.sort((a, b) => b.priority - a.priority);

  const strengths: FieldGuideStrength[] = [];
  const coveredChapters = new Set<number>();
  for (const item of strengthCandidates) {
    if (strengths.length >= 2) break;
    const redundantSingle =
      strengths.length === 1 &&
      answeredChapters.length >= 2 &&
      item.chapters.every((c) => coveredChapters.has(c));
    if (redundantSingle) continue;
    strengths.push({
      title: item.title,
      evidence: item.evidence,
      explanation: item.explanation,
    });
    item.chapters.forEach((c) => coveredChapters.add(c));
  }

  if (answeredCount === 0) {
    strengths.push({
      title: 'Waiting for your scenario answers',
      evidence: `Selected setting: ${community}`,
      explanation:
        'Once you choose responses in Chapters 2, 3, 4, and 6, this guide will reflect what your specific choices prioritize in practice.',
    });
  }

  // ---------------------------------------------------------------------------
  // 2. WHAT YOU COULD WORK ON (1–2 RELEVANT OPPORTUNITIES)
  // 3. WHAT TO TRY NEXT (CONCRETE ACTIONS + EXAMPLE SCRIPTS TIED 1-TO-1)
  // ---------------------------------------------------------------------------
  const opportunities: FieldGuideApproachToExplore[] = [];
  const actions: FieldGuideAction[] = [];

  if (answeredCount === 0) {
    opportunities.push({
      label: 'Try answering at least two scenarios first',
      evidence: 'No chapter decisions recorded yet',
      text: 'This guide derives every takeaway directly from your choices rather than guessing a generic personality summary. Pick your moves in Chapters 2 through 6 to see personalized feedback.',
      detail: 'Your choices across outreach, peer tension, communication channels, and Plan B adaptation combine here automatically.',
    });
    actions.push({
      title: 'Complete Chapters 2, 3, 4, and 6',
      action: 'Use the menu above or walk chapter by chapter to record how you would handle each moment.',
      exampleScript: 'Start in Chapter 2 ("The Invisible Resident") and choose how you would start a connection.',
    });
  } else {
    // PRIMARY OPPORTUNITY (grounded in outreach/communication/adaptation combination)
    if (isNaturalAndInPerson && !isDirectAdaptedCh6 && ch6 !== 'opt_c6_contact') {
      opportunities.push({
        label: 'Reaching residents whose schedules never overlap with yours',
        evidence: 'From your Chapter 2 and 4 choices',
        text: 'Waiting for a natural conversation can keep things comfortable. But if someone works evening shifts or stays behind closed doors, your paths might never cross—so a brief message or asking when they’re free makes that first connection possible.',
        detail: 'In-person warmth works great with visible residents; pairing it with one easy asynchronous check-in prevents quiet residents from disappearing off your radar.',
      });
      actions.push({
        title: 'Ask for an easy way to reach them',
        action: 'Next time you leave a note or catch a resident briefly, find out which method and time work best when doors stay shut.',
        exampleScript: 'Ask one resident you rarely see: "What’s the easiest way for me to check in with you?"',
      });
    } else if (isBroadcastToDirectShift) {
      opportunities.push({
        label: 'Checking back to confirm your updated plan works',
        evidence: 'From your Chapter 4 and 6 choices',
        text: 'Changing from group channels to shorter or better-timed messages shows real flexibility. Still, one adjustment is only a guess until you confirm with the resident that the new format is genuinely convenient rather than another unread message.',
        detail: 'Turning your Plan B into a quick two-way check keeps residents from silently muting the new channel too.',
      });
      actions.push({
        title: 'Confirm the new channel feels easy',
        action: 'After trying a shorter or timed personal text, ask once whether that rhythm actually works around their job and classes.',
        exampleScript: 'Try texting: "Is a quick check-in like this around noon easy to catch between your shifts?"',
      });
    } else if (isAutonomyCluster) {
      opportunities.push({
        label: 'Keeping support visible without making residents initiate every time',
        evidence: 'From your Chapter 2 and 6 choices',
        text: 'Respecting independence keeps residents from feeling hovered over. What this approach can overlook is that overwhelmed students working 25 hours a week rarely want to bother their RA first—so occasional light-touch outreach from you keeps support accessible.',
        detail: 'Letting residents control frequency works best when you stay responsible for opening a zero-pressure door every few weeks.',
      });
      actions.push({
        title: 'Send one zero-pressure door-open note a month',
        action: 'Stick with your lighter contact pace, while sending a short note you explicitly label as "no reply needed."',
        exampleScript: 'Try sending: "No need to answer unless you need anything—just checking in for the month and reminding you I’m around."',
      });
    } else if (isBroadcastInitial && ch6 && !isDirectAdaptedCh6) {
      opportunities.push({
        label: 'Reaching busy students who mute or skim group feeds',
        evidence: 'From your Chapter 4 and 6 choices',
        text: 'Group chats and short emails work well for shared logistics, yet students carrying heavy work and home responsibilities routinely mute noisy threads. Pairing broad updates with one direct message catches residents who stay silent in group channels.',
        detail: 'Scheduling time or agreeing on pace still starts with getting one personal message through.',
      });
      actions.push({
        title: 'Back up one group post with a brief text',
        action: 'Keep your group announcement, then send two short lines privately to one or two residents you haven’t heard from lately.',
        exampleScript: 'Send 1-on-1: "Quick hello—no pressure on Thursday’s floor snack, just wanted to see how your week’s going."',
      });
    } else if (ch4 === 'opt_c4_directmsg' && isDirectAdaptedCh6) {
      opportunities.push({
        label: 'Helping quiet residents connect with neighbors, not only you',
        evidence: 'From your Chapter 4 and 6 choices',
        text: 'Short, well-timed direct messages work smoothly for one-on-one support. What personal texts alone can overlook is helping a busy resident discover one neighbor nearby who shares a class, major, or late work schedule.',
        detail: 'Community feels lighter for both of you when support isn’t bottlenecked exclusively through the RA.',
      });
      actions.push({
        title: 'Bridge one shared routine or interest',
        action: 'Once a resident replies comfortably by text, offer a low-pressure introduction to a neighbor in a similar boat.',
        exampleScript: 'Ask over text: "Another person down the hall works nights too and grabs coffee before Friday lab—want an intro?"',
      });
    } else {
      // Single-chapter or varied combination opportunity grounded strictly in highest-signal answered outreach/adaptation
      const anchorCh = answeredChapters.includes(4)
        ? 4
        : answeredChapters.includes(6)
        ? 6
        : answeredChapters.includes(2)
        ? 2
        : answeredChapters[0];
      const angle = TOPIC_LEARNING_ANGLES[session.answers[anchorCh]];
      opportunities.push({
        label: `Balancing what your Chapter ${anchorCh} choice might overlook`,
        evidence: `Chapter ${anchorCh}: ${angle.label}`,
        text: `${angle.whatYouLeanedToward} ${angle.anotherApproachToExplore}`,
        detail: answeredCount < 4
          ? `Only ${answeredCount} of 4 scenarios answered so far (missing Chapters ${missingChapters.join(', ')}). Answering the remaining scenarios adds cross-chapter perspective.`
          : undefined,
      });
      actions.push({
        title: `Try a quick Chapter ${anchorCh} follow-through`,
        action: angle.somethingToTry,
        exampleScript: angle.exampleScript,
      });
    }

    // SECONDARY GENUINE OPPORTUNITY (only added when Chapter 3 adds a genuinely distinct peer-accountability dimension not already echoed!)
    if (ch3 && TOPIC_LEARNING_ANGLES[ch3] && answeredCount >= 2 && opportunities.length < 2) {
      if (isFirmStandards && (ch2 === 'opt_c2_checkin' || ch4 === 'opt_c4_inperson')) {
        opportunities.push({
          label: 'Adding a quick listening pause alongside clear expectations',
          evidence: `Chapter 3: ${TOPIC_LEARNING_ANGLES[ch3].label}`,
          text: 'Direct clarity leaves little confusion with peers your own age. Still, in hallway pushback, pausing briefly for their perspective before repeating the rule keeps mutual respect from feeling like you are pulling rank.',
        });
        actions.push({
          title: 'Pair a clear boundary with one open question',
          action: 'Name the floor impact cleanly, then give the resident ten seconds to explain before wrapping up.',
          exampleScript: 'Say steadily: "We still need to keep the shared standard here—what’s going on from your side so we can figure this out?"',
        });
      } else if (isCalmPeerDialogue) {
        const ch3Angle = TOPIC_LEARNING_ANGLES[ch3];
        opportunities.push({
          label: 'Keeping boundaries plain after you de-escalate',
          evidence: `Chapter 3: ${ch3Angle.label}`,
          text: `${ch3Angle.whatYouLeanedToward} ${ch3Angle.anotherApproachToExplore}`,
        });
        actions.push({
          title: 'Close a calm conversation with one clear boundary',
          action: ch3Angle.somethingToTry,
          exampleScript: ch3Angle.exampleScript,
        });
      }
    }
  }

  const primaryOpp = opportunities[0];
  const primaryAct = actions[0];

  const personalizedNextStep: PersonalizedNextStep = answeredCount === 4
    ? {
        title: primaryAct.title,
        text: primaryAct.exampleScript || primaryAct.action,
      }
    : {
        title: answeredCount === 0 ? 'Complete Your Chapters' : primaryAct.title,
        text: answeredCount === 0
          ? 'Explore Chapters 2 through 6 to unlock personalized strategies tailored to your answers.'
          : `${primaryAct.action} (${4 - answeredCount} chapter choice${4 - answeredCount === 1 ? '' : 's'} remaining for cross-chapter patterns.)`,
      };

  return {
    title: 'My RA Field Guide',
    subtitle: 'Personalized guidance from your choices',
    community,
    answeredCount,
    totalDecisions: 4,
    isComplete,
    missingChapters,
    strengths,
    opportunities,
    growthArea: primaryOpp,
    anotherApproachToExplore: primaryOpp,
    crossWorldLesson: buildCrossWorldLesson(community, ch2, ch4),
    actions,
    actionThisWeek: primaryAct,
    personalizedNextStep,
    supportingQuote: 'Same role. Different world. Small adjustments change who feels supported.',
    reflections,
    disclaimer:
      'Generated locally from your community setting and scenario choices. These suggestions reflect practical tradeoffs in these scenarios, not a judgment of your ability as an RA.',
  };
}
