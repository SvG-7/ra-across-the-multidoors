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
  growthArea: FieldGuideApproachToExplore; // backwards-compatible alias
  anotherApproachToExplore: FieldGuideApproachToExplore;
  crossWorldLesson: FieldGuideCrossWorldLesson;
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
  whatThisPrioritizes: string; // backwards compatibility
  whatToWatchFor: string;      // backwards compatibility
  tryThisAction: string;       // backwards compatibility
}

// -----------------------------------------------------------------------------
// PER-OPTION MAPPING (WHAT IT SHOWS, WHEN IT HELPS, TRADEOFF, COMPLEMENT)
// -----------------------------------------------------------------------------
export const TOPIC_LEARNING_ANGLES: Record<string, LearningAngleEntry> = {
  // CHAPTER 2: CONNECTION ("Ned rarely attends events, and you hardly ever see them...")
  opt_c2_natural: {
    topic: 'Connection',
    chapter: 2,
    label: 'Find a natural opportunity to talk',
    demonstrates: 'Preference for informal, low-pressure connection',
    strengthTitle: 'Room for informal, unforced connection',
    whatYouLeanedToward: 'Waiting for an everyday moment keeps conversation relaxed and avoids putting a resident on the spot.',
    anotherApproachToExplore: 'Residents whose work or class schedules keep them out of shared spaces rarely cross paths with you casually.',
    somethingToTry: 'Note who you have not seen in shared spaces for two weeks, and reach out once with a brief low-stakes greeting.',
    whatThisPrioritizes: 'Waiting for an everyday moment keeps conversation relaxed and avoids putting a resident on the spot.',
    whatToWatchFor: 'Residents whose work or class schedules keep them out of shared spaces rarely cross paths with you casually.',
    tryThisAction: 'Note who you have not seen in shared spaces for two weeks, and reach out once with a brief low-stakes greeting.',
  },
  opt_c2_checkin: {
    topic: 'Connection',
    chapter: 2,
    label: 'Send a brief personal check-in',
    demonstrates: 'Direct one-on-one initiation',
    strengthTitle: 'Taking a clear first step to connect',
    whatYouLeanedToward: 'A short personal message opens a direct line with a quiet resident instead of waiting to bump into them.',
    anotherApproachToExplore: 'A direct message can still feel like one more task to answer unless you make clear there is no rush.',
    somethingToTry: 'Send a one-sentence hello that takes the pressure off replying right away: "No need to answer fast—just checking in this week."',
    whatThisPrioritizes: 'A short personal message opens a direct line with a quiet resident instead of waiting to bump into them.',
    whatToWatchFor: 'A direct message can still feel like one more task to answer unless you make clear there is no rush.',
    tryThisAction: 'Send a one-sentence hello that takes the pressure off replying right away: "No need to answer fast—just checking in this week."',
  },
  opt_c2_invite: {
    topic: 'Connection',
    chapter: 2,
    label: 'Offer a low-pressure invitation',
    demonstrates: 'Inviting participation while protecting resident choice',
    strengthTitle: 'Welcoming residents without pressure',
    whatYouLeanedToward: 'Making clear they can join or pass helps invitations feel welcoming instead of mandatory.',
    anotherApproachToExplore: 'When someone skips events because of work or family duties, invitations alone may not reveal what kind of support they actually want.',
    somethingToTry: 'Include an easy alternative next to event invites, like grabbing a quick to-go snack or chatting for five minutes on the way in.',
    whatThisPrioritizes: 'Making clear they can join or pass helps invitations feel welcoming instead of mandatory.',
    whatToWatchFor: 'When someone skips events because of work or family duties, invitations alone may not reveal what kind of support they actually want.',
    tryThisAction: 'Include an easy alternative next to event invites, like grabbing a quick to-go snack or chatting for five minutes on the way in.',
  },
  opt_c2_ask_pref: {
    topic: 'Connection',
    chapter: 2,
    label: 'Ask how they prefer to connect',
    demonstrates: 'Respecting resident communication preferences and autonomy',
    strengthTitle: 'Honoring how residents prefer to hear from you',
    whatYouLeanedToward: 'Asking their preferred contact style upfront avoids guessing and shows respect for their time.',
    anotherApproachToExplore: 'Asking early builds trust best when you remember and consistently stick to the option they picked.',
    somethingToTry: 'Ask one simple preference question early on—"Quick text, email, or brief hallway hellos?"—and save their answer.',
    whatThisPrioritizes: 'Asking their preferred contact style upfront avoids guessing and shows respect for their time.',
    whatToWatchFor: 'Asking early builds trust best when you remember and consistently stick to the option they picked.',
    tryThisAction: 'Ask one simple preference question early on—"Quick text, email, or brief hallway hellos?"—and save their answer.',
  },

  // CHAPTER 3: TRUST AND BOUNDARIES ("A resident your age challenges you when you address a policy concern...")
  opt_c3_expectation: {
    topic: 'Trust and boundaries',
    chapter: 3,
    label: 'State the expectation clearly',
    demonstrates: 'Clear, direct naming of shared standards',
    strengthTitle: 'Clear expectations with peers',
    whatYouLeanedToward: 'Stating the standard plainly helps prevent confusion so peers know exactly what is expected right away.',
    anotherApproachToExplore: 'Leading strictly with the rule can make peers feel talked down to if there is no room to hear their side afterward.',
    somethingToTry: 'State the standard clearly in one calm sentence, then ask how things looked from their side once the hallway settles.',
    whatThisPrioritizes: 'Stating the standard plainly helps prevent confusion so peers know exactly what is expected right away.',
    whatToWatchFor: 'Leading strictly with the rule can make peers feel talked down to if there is no room to hear their side afterward.',
    tryThisAction: 'State the standard clearly in one calm sentence, then ask how things looked from their side once the hallway settles.',
  },
  opt_c3_perspective: {
    topic: 'Trust and boundaries',
    chapter: 3,
    label: 'Ask for their perspective',
    demonstrates: 'Curiosity-first listening with a peer',
    strengthTitle: 'Listening before reacting in peer tension',
    whatYouLeanedToward: 'Inviting their view first lowers defensiveness and helps you understand context before responding.',
    anotherApproachToExplore: 'Opening with curiosity needs a clear follow-up statement so the community expectation doesn’t stay blurry.',
    somethingToTry: 'Listen briefly to their explanation, then name the shared quiet-hours boundary calmly in plain words.',
    whatThisPrioritizes: 'Inviting their view first lowers defensiveness and helps you understand context before responding.',
    whatToWatchFor: 'Opening with curiosity needs a clear follow-up statement so the community expectation doesn’t stay blurry.',
    tryThisAction: 'Listen briefly to their explanation, then name the shared quiet-hours boundary calmly in plain words.',
  },
  opt_c3_impact: {
    topic: 'Trust and boundaries',
    chapter: 3,
    label: 'Explain the concern and its impact',
    demonstrates: 'Connecting boundaries to neighbor impact rather than authority',
    strengthTitle: 'Keeping accountability focused on neighbors',
    whatYouLeanedToward: 'Explaining how the issue affects people living nearby turns a policy reminder into shared community care.',
    anotherApproachToExplore: 'Even a well-meaning explanation can feel like a lecture if the resident hasn’t had a chance to respond yet.',
    somethingToTry: 'Keep the impact statement to two short sentences—focused on neighbors resting or studying—then ask what they think would help.',
    whatThisPrioritizes: 'Explaining how the issue affects people living nearby turns a policy reminder into shared community care.',
    whatToWatchFor: 'Even a well-meaning explanation can feel like a lecture if the resident hasn’t had a chance to respond yet.',
    tryThisAction: 'Keep the impact statement to two short sentences—focused on neighbors resting or studying—then ask what they think would help.',
  },
  opt_c3_private: {
    topic: 'Trust and boundaries',
    chapter: 3,
    label: 'Suggest talking privately',
    demonstrates: 'De-escalating away from peers to protect dignity',
    strengthTitle: 'Protecting dignity by stepping aside',
    whatYouLeanedToward: 'Moving a tense peer conversation out of public view takes away audience pressure so both sides can speak honestly.',
    anotherApproachToExplore: 'Setting a private space helps tone right away, but you still need clear, simple wording once the two of you talk.',
    somethingToTry: 'Say quietly—"Can we step down the hall for a minute?"—then state the concern simply and hear them out.',
    whatThisPrioritizes: 'Moving a tense peer conversation out of public view takes away audience pressure so both sides can speak honestly.',
    whatToWatchFor: 'Setting a private space helps tone right away, but you still need clear, simple wording once the two of you talk.',
    tryThisAction: 'Say quietly—"Can we step down the hall for a minute?"—then state the concern simply and hear them out.',
  },

  // CHAPTER 4: COMMUNICATION ("Which channel would you try first for a community invitation?")
  opt_c4_groupchat: {
    topic: 'Communication',
    chapter: 4,
    label: 'Community group chat',
    demonstrates: 'Broad group sharing across the community at once',
    strengthTitle: 'Sharing updates quickly with the whole floor',
    whatYouLeanedToward: 'Posting in a group chat lets many neighbors see open invitations together without singling anyone out.',
    anotherApproachToExplore: 'Residents working long shifts or juggling classes often mute busy group threads and miss those announcements.',
    somethingToTry: 'Pair group invitations with a short individual check-in for residents who haven’t been active in the thread.',
    whatThisPrioritizes: 'Posting in a group chat lets many neighbors see open invitations together without singling anyone out.',
    whatToWatchFor: 'Residents working long shifts or juggling classes often mute busy group threads and miss those announcements.',
    tryThisAction: 'Pair group invitations with a short individual check-in for residents who haven’t been active in the thread.',
  },
  opt_c4_directmsg: {
    topic: 'Communication',
    chapter: 4,
    label: 'Personal message',
    demonstrates: 'Direct one-on-one written outreach that fits tight schedules',
    strengthTitle: 'Reaching busy residents on their schedule',
    whatYouLeanedToward: 'A personal text lets a resident see your note and respond whenever classes or work shifts finish.',
    anotherApproachToExplore: 'If all contact happens one-on-one with you, quiet residents may miss chances to meet peers with similar routines.',
    somethingToTry: 'Keep personal texts short with one easy question, and introduce neighbors who share classes or off-hours schedules when it fits.',
    whatThisPrioritizes: 'A personal text lets a resident see your note and respond whenever classes or work shifts finish.',
    whatToWatchFor: 'If all contact happens one-on-one with you, quiet residents may miss chances to meet peers with similar routines.',
    tryThisAction: 'Keep personal texts short with one easy question, and introduce neighbors who share classes or off-hours schedules when it fits.',
  },
  opt_c4_inperson: {
    topic: 'Communication',
    chapter: 4,
    label: 'In-person conversation',
    demonstrates: 'Warm, face-to-face personal contact',
    strengthTitle: 'Building genuine face-to-face rapport',
    whatYouLeanedToward: 'Talking in person conveys tone and warmth that short messages on a screen often miss.',
    anotherApproachToExplore: 'Residents with off-campus jobs or opposite class schedules are hard to catch at their door.',
    somethingToTry: 'When someone isn’t around or has their door closed, leave a short greeting card or follow up via a quick text.',
    whatThisPrioritizes: 'Talking in person conveys tone and warmth that short messages on a screen often miss.',
    whatToWatchFor: 'Residents with off-campus jobs or opposite class schedules are hard to catch at their door.',
    tryThisAction: 'When someone isn’t around or has their door closed, leave a short greeting card or follow up via a quick text.',
  },
  opt_c4_email: {
    topic: 'Communication',
    chapter: 4,
    label: 'Short email',
    demonstrates: 'Clear, saveable written communication',
    strengthTitle: 'Keeping details easy to revisit later',
    whatYouLeanedToward: 'A brief email gives busy students details they can save and check later without interrupting work or class.',
    anotherApproachToExplore: 'Student inboxes get crowded fast, so warm community invitations can blend into official campus mail.',
    somethingToTry: 'Put the main point right in the subject line and keep the note to two short lines so it takes ten seconds to read.',
    whatThisPrioritizes: 'A brief email gives busy students details they can save and check later without interrupting work or class.',
    whatToWatchFor: 'Student inboxes get crowded fast, so warm community invitations can blend into official campus mail.',
    tryThisAction: 'Put the main point right in the subject line and keep the note to two short lines so it takes ten seconds to read.',
  },

  // CHAPTER 6: ADAPTABILITY ("Ned explains group chats are muted, unexpected visits are difficult...")
  opt_c6_timing: {
    topic: 'Adaptability',
    chapter: 6,
    label: 'Confirm their preferred direct channel and timing',
    demonstrates: 'Matching outreach channel and timing to the resident’s real week',
    strengthTitle: 'Matching outreach to real schedules',
    whatYouLeanedToward: 'Confirming both the channel and best time window stops wasted knocks and catches Ned when energy allows.',
    anotherApproachToExplore: 'Asking for a good window helps most when you also check whether that rhythm still works as weeks change.',
    somethingToTry: 'Ask which two days and hours work easiest for a quick message, and use only that channel going forward.',
    whatThisPrioritizes: 'Confirming both the channel and best time window stops wasted knocks and catches Ned when energy allows.',
    whatToWatchFor: 'Asking for a good window helps most when you also check whether that rhythm still works as weeks change.',
    tryThisAction: 'Ask which two days and hours work easiest for a quick message, and use only that channel going forward.',
  },
  opt_c6_shorter: {
    topic: 'Adaptability',
    chapter: 6,
    label: 'Make the invitation shorter and easier to answer',
    demonstrates: 'Lowering the effort required to respond between commitments',
    strengthTitle: 'Making replies quick and manageable',
    whatYouLeanedToward: 'Keeping invitations short lets an overworked student reply in seconds without feeling drained.',
    anotherApproachToExplore: 'Even short notes get buried if they arrive during shifts or inside a channel the resident rarely opens.',
    somethingToTry: 'Write your next check-in so a resident can answer with three words or a quick tap—such as "Yes / Maybe next week."',
    whatThisPrioritizes: 'Keeping invitations short lets an overworked student reply in seconds without feeling drained.',
    whatToWatchFor: 'Even short notes get buried if they arrive during shifts or inside a channel the resident rarely opens.',
    tryThisAction: 'Write your next check-in so a resident can answer with three words or a quick tap—such as "Yes / Maybe next week."',
  },
  opt_c6_time: {
    topic: 'Adaptability',
    chapter: 6,
    label: 'Arrange a convenient time to talk',
    demonstrates: 'Replacing surprise visits with predictable, agreed-upon time',
    strengthTitle: 'Replacing drop-ins with planned check-ins',
    whatYouLeanedToward: 'Setting an agreed time protects Ned’s rest and study windows instead of knocking unexpectedly.',
    anotherApproachToExplore: 'If schedules shift at short notice, a scheduled talk can still feel heavier than a quick two-line text check-in.',
    somethingToTry: 'Offer two brief 10-minute slots—alongside "or just reply by text if this week is packed"—so rescheduling is easy.',
    whatThisPrioritizes: 'Setting an agreed time protects Ned’s rest and study windows instead of knocking unexpectedly.',
    whatToWatchFor: 'If schedules shift at short notice, a scheduled talk can still feel heavier than a quick two-line text check-in.',
    tryThisAction: 'Offer two brief 10-minute slots—alongside "or just reply by text if this week is packed"—so rescheduling is easy.',
  },
  opt_c6_contact: {
    topic: 'Adaptability',
    chapter: 6,
    label: 'Ask how much contact they want',
    demonstrates: 'Letting the resident set comfortable outreach frequency',
    strengthTitle: 'Respecting independence around how often you check in',
    whatYouLeanedToward: 'Asking how much contact feels helpful reassures independent residents they won’t feel crowded.',
    anotherApproachToExplore: 'When contact stays light, busy residents can still hesitate to reach out first if they run into a problem.',
    somethingToTry: 'Agree on a lighter check-in rhythm while leaving one clear promise: "You never have to reply fast—text anytime if you need anything."',
    whatThisPrioritizes: 'Asking how much contact feels helpful reassures independent residents they won’t feel crowded.',
    whatToWatchFor: 'When contact stays light, busy residents can still hesitate to reach out first if they run into a problem.',
    tryThisAction: 'Agree on a lighter check-in rhythm while leaving one clear promise: "You never have to reply fast—text anytime if you need anything."',
  },
};

function formatChapterList(chapters: number[]): string {
  if (chapters.length === 0) return 'your choices';
  if (chapters.length === 1) return `From your Chapter ${chapters[0]} choice`;
  if (chapters.length === 2) return `From your Chapter ${chapters[0]} and ${chapters[1]} choices`;
  const init = chapters.slice(0, -1).join(', ');
  return `From your Chapter ${init}, and ${chapters[chapters.length - 1]} choices`;
}

function buildCh4ToCh6Note(ch4: string | undefined, ch6: string | undefined): string | undefined {
  if (!ch4 || !ch6) return undefined;
  const broadCh4 = ch4 === 'opt_c4_groupchat' || ch4 === 'opt_c4_email';
  const tailoredCh6 = ch6 === 'opt_c6_timing' || ch6 === 'opt_c6_shorter';

  if (broadCh4 && tailoredCh6) {
    return 'You started with a broader channel in Chapter 4, then shifted toward shorter or better-timed direct outreach in Chapter 6 after seeing Ned’s schedule constraints.';
  }
  if (ch4 === 'opt_c4_inperson' && (ch6 === 'opt_c6_timing' || ch6 === 'opt_c6_shorter' || ch6 === 'opt_c6_contact')) {
    return 'You leaned toward in-person conversation in Chapter 4, then adjusted in Chapter 6 once you learned unscheduled visits are hard on Ned’s work-study routine.';
  }
  if (ch4 === 'opt_c4_inperson' && ch6 === 'opt_c6_time') {
    return 'You stayed consistent with personal conversation from Chapter 4 to Chapter 6, adjusting from unannounced visits to a time Ned agrees to in advance.';
  }
  if (ch4 === 'opt_c4_directmsg' && (ch6 === 'opt_c6_timing' || ch6 === 'opt_c6_shorter' || ch6 === 'opt_c6_contact')) {
    return 'You favored personal messaging in Chapter 4 and refined the timing, length, or pace in Chapter 6 to fit Ned’s evening shifts.';
  }
  return 'In Chapter 6, you used what you learned about Ned’s schedule to adjust how and when outreach happens.';
}

function buildCrossWorldLesson(
  community: CommunityType,
  ch2?: string,
  ch4?: string,
  ch6?: string
): FieldGuideCrossWorldLesson {
  const mostlyInPersonOrOrganic = ch2 === 'opt_c2_natural' || ch4 === 'opt_c4_inperson';
  const mostlyAutonomy = ['opt_c2_invite', 'opt_c2_ask_pref'].includes(ch2 || '') || ch6 === 'opt_c6_contact';

  if (community === 'Residence hall') {
    return {
      title: mostlyInPersonOrOrganic
        ? 'From apartment RAs: plan past hallway luck'
        : 'From apartment RAs: clear contact windows',
      worldContext: 'Residence Hall RA Perspective',
      text: mostlyInPersonOrOrganic
        ? 'Traditional halls make chance greetings feel easy, which can hide residents with packed off-campus routines. Borrowing from apartment RAs: agree on a low-key text or note backup for people you rarely see in the corridor.'
        : 'High-density halls often pull RAs into constant unplanned door knocks. Borrowing from apartment RAs: pair floor warmth with simple, agreed contact windows so quiet residents don’t feel crowded.',
    };
  }

  if (community === 'Apartment community') {
    return {
      title: mostlyAutonomy
        ? 'From hall RAs: keep warmth visible outside closed doors'
        : 'From hall RAs: everyday shared greetings',
      worldContext: 'Apartment Community RA Perspective',
      text: mostlyAutonomy
        ? 'Apartment deadbolts make independence feel natural, yet residents still appreciate noticing a familiar face. Borrowing from hall RAs: pair light digital check-ins with quick greetings near mailboxes and walkways so support stays visible.'
        : 'Separate apartment breezeways make spontaneous floor connections rarer. Borrowing from hall RAs: turn regular stops at mailrooms or courtyards into brief, welcoming hellos alongside direct outreach.',
    };
  }

  if (community === 'New to the RA role') {
    return {
      title: 'Building simple habits that travel well',
      worldContext: 'New RA Perspective',
      text: 'As you step into the RA role, pair warm everyday visibility with one straightforward way for quieter residents to reply on their own schedule.',
    };
  }

  return {
    title: 'Matching the approach to the setting',
    worldContext: 'Residence Hall & Apartment Perspective',
    text: 'Working across both environments means blending everyday warmth in shared spaces with low-friction, pre-agreed direct check-ins when closed doors and off-campus jobs limit in-person contact.',
  };
}

// -----------------------------------------------------------------------------
// DETERMINISTIC RULE-BASED FIELD GUIDE GENERATOR
// -----------------------------------------------------------------------------
export function generateFieldGuide(session: AttendeeSession): FieldGuideData {
  const ch2 = session.answers[2];
  const ch3 = session.answers[3];
  const ch4 = session.answers[4];
  const ch6 = session.answers[6];
  const community: CommunityType = session.selectedCommunity || 'Both';

  const decisionChapters = [2, 3, 4, 6];
  const answeredChapters = decisionChapters.filter((ch) => Boolean(session.answers[ch] && TOPIC_LEARNING_ANGLES[session.answers[ch]]));
  const missingChapters = decisionChapters.filter((ch) => !session.answers[ch] || !TOPIC_LEARNING_ANGLES[session.answers[ch]]);
  const answeredCount = answeredChapters.length;
  const isComplete = answeredCount === decisionChapters.length;

  // Build per-chapter reflection entries cleanly from saved IDs
  const reflections: TopicReflection[] = [];
  answeredChapters.forEach((ch) => {
    const optId = session.answers[ch];
    const data = TOPIC_LEARNING_ANGLES[optId];
    reflections.push({
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
    });
  });

  // ---------------------------------------------------------------------------
  // PATTERN FLAGS DERIVED STRICTLY FROM ACTUAL ANSWERS (NO GUESSING)
  // ---------------------------------------------------------------------------
  const isNaturalAndInPerson = ch2 === 'opt_c2_natural' && ch4 === 'opt_c4_inperson';
  const isBroadcastInitial = ch4 === 'opt_c4_groupchat' || ch4 === 'opt_c4_email';
  const isTargetedDirectCh6 = ch6 === 'opt_c6_timing' || ch6 === 'opt_c6_shorter';
  const isBroadcastToDirectAdjustment = isBroadcastInitial && isTargetedDirectCh6;

  const isCh2Autonomy = ch2 === 'opt_c2_invite' || ch2 === 'opt_c2_ask_pref';
  const isCh6Autonomy = ch6 === 'opt_c6_contact' || ch6 === 'opt_c6_timing';
  const isIndependencePattern =
    (isCh2Autonomy && isCh6Autonomy) ||
    (ch2 === 'opt_c2_natural' && ch6 === 'opt_c6_contact');

  const isDirectOutreachCombo =
    ch2 === 'opt_c2_checkin' && (ch4 === 'opt_c4_directmsg' || ch4 === 'opt_c4_inperson');
  const isDirectBoundaries = ch3 === 'opt_c3_expectation' || ch3 === 'opt_c3_impact';
  const isCalmDeescalation = ch3 === 'opt_c3_perspective' || ch3 === 'opt_c3_private';
  const isDirectLowEffort =
    ch4 === 'opt_c4_directmsg' && (ch6 === 'opt_c6_shorter' || ch6 === 'opt_c6_timing');

  // ---------------------------------------------------------------------------
  // 1. TWO POTENTIAL STRENGTHS (DERIVED FROM ACTUAL ANSWERS + COMBINATIONS)
  // ---------------------------------------------------------------------------
  interface CandidateStrength extends FieldGuideStrength {
    chapters: number[];
    priority: number;
  }

  const candidateStrengths: CandidateStrength[] = [];

  if (isNaturalAndInPerson) {
    candidateStrengths.push({
      priority: 100,
      chapters: [2, 4],
      title: 'You made room for informal, personal connection',
      evidence: 'From your Chapter 2 and 4 choices',
      explanation: 'Waiting for natural moments and talking face-to-face keeps interactions relaxed, warm, and unforced.',
    });
  }

  if (isBroadcastToDirectAdjustment) {
    candidateStrengths.push({
      priority: 98,
      chapters: [4, 6],
      title: 'You adapted outreach after learning more',
      evidence: 'From your Chapter 4 and 6 choices',
      explanation: 'Starting with a broad update and shifting toward shorter, better-timed direct contact responds directly to Ned’s muted chats and work hours.',
    });
  } else if (ch4 === 'opt_c4_inperson' && (ch6 === 'opt_c6_timing' || ch6 === 'opt_c6_shorter' || ch6 === 'opt_c6_contact')) {
    candidateStrengths.push({
      priority: 96,
      chapters: [4, 6],
      title: 'You adjusted from in-person visits to fit Ned’s week',
      evidence: 'From your Chapter 4 and 6 choices',
      explanation: 'After favoring face-to-face connection in Chapter 4, you pivoted away from unexpected drop-ins once work and home responsibilities were clear.',
    });
  }

  if (isIndependencePattern) {
    const chList = [2, 6];
    candidateStrengths.push({
      priority: 94,
      chapters: chList,
      title: 'You consistently respected resident independence',
      evidence: formatChapterList(chList),
      explanation: 'Your choices let residents shape how, when, or how often contact happens instead of pressing for constant engagement.',
    });
  }

  if (isDirectLowEffort) {
    candidateStrengths.push({
      priority: 92,
      chapters: [4, 6],
      title: 'You kept outreach brief and low-pressure',
      evidence: 'From your Chapter 4 and 6 choices',
      explanation: 'Pairing personal messages with short prompts or better timing makes staying in touch realistic between classes and shifts.',
    });
  }

  if (isDirectOutreachCombo) {
    candidateStrengths.push({
      priority: 90,
      chapters: [2, 4],
      title: 'You leaned toward direct, personal initiation',
      evidence: 'From your Chapter 2 and 4 choices',
      explanation: 'Instead of leaving quiet residents to chance hallway encounters, your choices opened direct one-on-one doors.',
    });
  }

  // Individual answered-chapter strengths (guaranteed distinct & accurate per choice)
  const chapterPriority: Record<number, number> = { 6: 80, 3: 78, 2: 76, 4: 74 };
  answeredChapters.forEach((ch) => {
    const optId = session.answers[ch];
    const angle = TOPIC_LEARNING_ANGLES[optId];
    candidateStrengths.push({
      priority: chapterPriority[ch] ?? 70,
      chapters: [ch],
      title: angle.strengthTitle,
      evidence: `From your Chapter ${ch} choice`,
      explanation: angle.whatYouLeanedToward,
    });
  });

  candidateStrengths.sort((a, b) => b.priority - a.priority);

  const strengths: FieldGuideStrength[] = [];
  const usedChapters = new Set<number>();

  // Pick up to 2 strengths covering distinct decision evidence where possible
  for (const cand of candidateStrengths) {
    if (strengths.length >= 2) break;
    const allChaptersAlreadyFeatured = cand.chapters.every((c) => usedChapters.has(c));
    if (strengths.length === 1 && allChaptersAlreadyFeatured && answeredChapters.length >= 2) {
      continue;
    }
    strengths.push({
      title: cand.title,
      evidence: cand.evidence,
      explanation: cand.explanation,
    });
    cand.chapters.forEach((c) => usedChapters.add(c));
  }

  // Honest handling when 0 or 1 scenario decisions have been made
  if (answeredCount === 0) {
    strengths.push(
      {
        title: 'Community context selected',
        evidence: `Community focus: ${community === 'Both' ? 'Residence Hall & Apartment' : community}`,
        explanation: 'Complete Chapters 2, 3, 4, and 6 so your choices—not defaults—shape your personalized takeaways.',
      },
      {
        title: 'No scenario decisions recorded yet',
        evidence: 'Missing Chapters 2, 3, 4, and 6',
        explanation: 'Nothing is assumed before you choose; revisit any decision chapter to see patterns across your approaches.',
      }
    );
  } else if (strengths.length === 1) {
    const remainingText = missingChapters.length > 0
      ? `Only Chapter ${answeredChapters[0]} is answered so far (Chapters ${missingChapters.join(', ')} are still open).`
      : 'Your community lens shapes how you apply these choices day-to-day.';
    strengths.push({
      title: community === 'Apartment community'
        ? 'Apartment context: behind closed doors'
        : community === 'Residence hall'
        ? 'Residence hall context: shared corridor life'
        : community === 'New to the RA role'
        ? 'Starting lens as a new RA'
        : 'Dual-community lens across halls and apartments',
      evidence: answeredCount === 1
        ? `Based only on your Chapter ${answeredChapters[0]} choice (${answeredCount}/4 complete)`
        : 'Based on your selected community',
      explanation: remainingText,
    });
  }

  // ---------------------------------------------------------------------------
  // 2. ONE OPPORTUNITY TO EXPLORE + 3. ONE PRACTICAL NEXT STEP (COHESIVE PAIR)
  // ---------------------------------------------------------------------------
  let anotherApproachToExplore: FieldGuideApproachToExplore;
  let actionThisWeek: FieldGuideAction;
  let personalizedNextStep: PersonalizedNextStep;

  if (answeredCount === 0) {
    anotherApproachToExplore = {
      label: 'Explore one scenario chapter first',
      evidence: 'No decisions saved yet',
      text: 'Choose how you would approach Chapter 2 or Chapter 3 so this guide can compare your real choices.',
      detail: 'Because your sessions derive every strength and tradeoff locally from your selected option IDs, partial or empty runs never fill in fake personality labels.',
    };
    actionThisWeek = {
      title: 'Start with Chapter 2 or Chapter 3',
      action: 'Pick an option in any unlocked decision chapter to generate specific reflection notes.',
    };
    personalizedNextStep = {
      title: 'Record Your First Choices',
      text: 'Once you answer the four decision points, return here for a connected look at how your outreach style works together.',
    };
  } else if (isNaturalAndInPerson && !isTargetedDirectCh6 && ch6 !== 'opt_c6_contact') {
    anotherApproachToExplore = {
      label: 'Make contact easier for residents you rarely see',
      evidence: 'From your Chapter 2 and 4 choices',
      text: 'Your choices prioritize warm in-person moments, though residents on opposite work and class schedules rarely linger in hallways.',
      detail: 'Relying mainly on chance greetings and face-to-face visits works smoothly when schedules overlap, yet residents working 25-hour off-campus shifts can stay unseen. Asking once how and when they prefer contact builds an easy bridge without feeling pushy.',
    };
    actionThisWeek = {
      title: 'Ask preferred contact method and time',
      action: 'On your next check-in, ask which contact method and time window works best when you aren’t around at the same hour.',
    };
    personalizedNextStep = {
      title: 'Keep the Warmth, Add One Reliable Channel',
      text: community === 'Apartment community'
        ? 'In an apartment setting with closed deadbolts, keep your natural warmth and pair it with one agreed-upon message route.'
        : 'Combine your natural hallway presence with one pre-agreed direct check-in option for residents whose shifts keep them away.',
    };
  } else if (isBroadcastToDirectAdjustment) {
    anotherApproachToExplore = {
      label: 'Check whether your revised approach works',
      evidence: 'From your Chapter 4 and 6 choices',
      text: 'Shifting from group messages toward brief or timed direct outreach shows flexibility—now verify with the resident that the new format actually fits.',
      detail: 'Changing tactics after hearing Ned’s schedule constraints avoids repeating what got muted. A quick check-in confirms you didn’t just swap one missed message for an awkward hour, turning adaptation into two-way trust.',
    };
    actionThisWeek = {
      title: 'Verify the adjusted message fits their week',
      action: 'After trying a shorter or timed direct check-in, ask in one brief line whether that channel and timing feel easy to answer.',
    };
    personalizedNextStep = {
      title: 'Close the Feedback Loop',
      text: 'When you switch channels based on a resident’s workload, ask once whether the change made staying in touch easier for them.',
    };
  } else if (isIndependencePattern) {
    anotherApproachToExplore = {
      label: 'Keep support clearly available without waiting on residents',
      evidence: 'From your Chapter 2 and 6 choices',
      text: 'Your choices suggest strong respect for resident autonomy, though overwhelmed residents often hesitate to reach out first when life gets heavy.',
      detail: 'Giving people space avoids crowding them, yet "less frequent contact" can accidentally feel like an empty hallway when a student doesn’t want to bother their RA. Sending an occasional, zero-pressure reminder keeps support visible without demanding replies.',
    };
    actionThisWeek = {
      title: 'Send a light, no-reply-needed check-in',
      action: 'Keep your light check-in pace, and add one clear line showing they never need to initiate first or reply right away to stay supported.',
    };
    personalizedNextStep = {
      title: 'Pair Autonomy With Predictable Doors Open',
      text: 'Let independent residents control how often you meet, while staying consistent with occasional low-pressure notes from your side.',
    };
  } else if (isBroadcastInitial && ch6 && ch6 !== 'opt_c6_timing' && ch6 !== 'opt_c6_shorter') {
    anotherApproachToExplore = {
      label: 'Back up group messages with brief personal outreach',
      evidence: 'From your Chapter 4 and 6 choices',
      text: 'Group announcements and short emails handle logistics cleanly, yet busy students frequently mute active floor threads or skim crowded inboxes.',
      detail: 'Scheduling a convenient time (or checking cadence) helps once someone answers, while reaching muted-chat residents first takes one lightweight direct touchpoint.',
    };
    actionThisWeek = {
      title: 'Follow one broadcast with a quick direct line',
      action: 'After your next community announcement or email, send a two-line personal note to two residents who rarely attend programs.',
    };
    personalizedNextStep = {
      title: 'Blend Group Scale With Quiet 1-on-1 Notes',
      text: 'Use broad channels for shared info while keeping one brief personal channel open for residents with little free time.',
    };
  } else if (isDirectOutreachCombo && isDirectBoundaries) {
    anotherApproachToExplore = {
      label: 'Build in easy exits alongside direct clarity',
      evidence: formatChapterList([2, 3, 4]),
      text: 'Your choices lean toward clear, direct expectations and personal follow-through—just leave clear breathing room so busy residents don’t feel cornered.',
      detail: 'Directness keeps standards honest and outreach reliable, yet residents balancing work and family pressure respond better when paired with an explicit opt-out or choice of timing.',
    };
    actionThisWeek = {
      title: 'Add a zero-rush line to your next direct message',
      action: 'On your next personal check-in, lead with "No rush replying tonight" and ask what channel feels lightest when their week is packed.',
    };
    personalizedNextStep = {
      title: 'Match Clarity With Low-Pressure Timing',
      text: 'Keep your direct, honest style while explicitly giving busy residents control over when and how they respond.',
    };
  } else if (isCalmDeescalation && (ch4 === 'opt_c4_directmsg' || ch6 === 'opt_c6_shorter' || ch6 === 'opt_c6_contact')) {
    const chEvidence = [3, ...(ch4 === 'opt_c4_directmsg' ? [4] : []), ...(['opt_c6_shorter', 'opt_c6_contact'].includes(ch6 || '') ? [6] : [])];
    anotherApproachToExplore = {
      label: 'Keep expectations plain while keeping pressure low',
      evidence: formatChapterList(chEvidence),
      text: 'Your choices point toward calm privacy and light messaging, which lowers tension quickly—just pair that softness with clear expectations or neighbor links.',
      detail: 'Stepping aside and keeping notes brief protects trust. The small risk is leaving shared community expectations slightly implied or keeping resident support centered solely on you instead of neighbors too.',
    };
    actionThisWeek = {
      title: 'Close warm check-ins with one clear concrete step',
      action: 'Next time you listen one-on-one or send a short text, add one simple takeaway—either a clear standard or introducing two neighbors with shared routines.',
    };
    personalizedNextStep = {
      title: 'Pair Calm Rapport With Clear Mutual Ties',
      text: 'Build on your considerate tone by naming shared floor agreements plainly and helping quiet residents spot one peer nearby.',
    };
  } else {
    // Clean single-chapter or mixed-partial fallback strictly honoring what was actually chosen
    const anchorCh = answeredChapters.includes(4)
      ? 4
      : answeredChapters.includes(6)
      ? 6
      : answeredChapters.includes(2)
      ? 2
      : answeredChapters[0];
    const optId = session.answers[anchorCh];
    const angle = TOPIC_LEARNING_ANGLES[optId];

    // Special guard: if ch6 already selected opt_c6_timing / opt_c6_shorter, don't nag Ch. 4's gap blindly
    if (ch6 && isTargetedDirectCh6 && ch4 && TOPIC_LEARNING_ANGLES[ch4]) {
      const ch6Angle = TOPIC_LEARNING_ANGLES[ch6];
      anotherApproachToExplore = {
        label: 'Check in on whether the adjustment sticks',
        evidence: 'From your Chapter 4 and 6 choices',
        text: `${ch6Angle.anotherApproachToExplore}`,
        detail: `Since your Chapter 6 choice (${ch6Angle.label.toLowerCase()}) adapts how you first approached Chapter 4 (${TOPIC_LEARNING_ANGLES[ch4].label.toLowerCase()}), confirming with the resident keeps the adjustment sustainable.`,
      };
      actionThisWeek = {
        title: 'Test and confirm one lighter touchpoint',
        action: ch6Angle.somethingToTry,
      };
    } else {
      anotherApproachToExplore = {
        label: `Balance "${angle.topic}" tradeoffs`,
        evidence: answeredCount < 4
          ? `From your Chapter ${anchorCh} choice (${answeredCount}/4 answered)`
          : formatChapterList([anchorCh]),
        text: angle.anotherApproachToExplore,
        detail: `${angle.whatYouLeanedToward} At the same time, ${angle.anotherApproachToExplore.charAt(0).toLowerCase()}${angle.anotherApproachToExplore.slice(1)}`,
      };
      actionThisWeek = {
        title: `Try one complementary ${angle.topic.toLowerCase()} move`,
        action: angle.somethingToTry,
      };
    }

    personalizedNextStep = {
      title: answeredCount < 4 ? 'Keep Exploring Remaining Chapters' : 'Carry One Small Shift Forward',
      text: answeredCount < 4
        ? `You have answered ${answeredCount} of 4 scenario chapters (${answeredChapters.join(', ')}). Answer Chapter ${missingChapters[0]} next to connect more pieces across scenarios.`
        : 'Pick one resident you rarely hear from and try the small adjustment above once this week to see what response it opens up.',
    };
  }

  return {
    title: 'MY RA FIELD GUIDE',
    subtitle: 'What Your Choices Suggest',
    community,
    answeredCount,
    totalDecisions: 4,
    isComplete,
    missingChapters,
    strengths,
    growthArea: anotherApproachToExplore,
    anotherApproachToExplore,
    crossWorldLesson: buildCrossWorldLesson(community, ch2, ch4, ch6),
    actionThisWeek,
    personalizedNextStep,
    supportingQuote: 'Same mission. Two worlds. Practical adjustments.',
    reflections,
    disclaimer: 'Derived directly from your saved scenario choices. This highlights patterns and tradeoffs in these scenarios, not competence or character.',
  };
}
