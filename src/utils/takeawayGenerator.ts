import { AttendeeSession, CommunityType } from '../types';

export interface TopicReflection {
  chapter: number;
  topic: string;
  optionId: string;
  youChose: string;
  whatThisPrioritizes: string;
  whatToWatchFor: string;
  tryThisAction: string;
  crossChapterNote?: string;
}

export interface FieldGuideStrength {
  title: string;
  evidence: string;
  explanation: string;
}

export interface FieldGuideGrowthArea {
  label: string;
  text: string;
  evidence: string;
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
  growthArea: FieldGuideGrowthArea;
  crossWorldLesson: FieldGuideCrossWorldLesson;
  actionThisWeek: FieldGuideAction;
  personalizedNextStep: PersonalizedNextStep;
  supportingQuote: string;
  reflections: TopicReflection[];
  disclaimer: string;
}

// -----------------------------------------------------------------------------
// EXACT TOPIC-SPECIFIC LEARNING ANGLES MAPPING
// -----------------------------------------------------------------------------
export const TOPIC_LEARNING_ANGLES: Record<string, {
  topic: string;
  chapter: number;
  label: string;
  whatThisPrioritizes: string;
  whatToWatchFor: string;
  tryThisAction: string;
}> = {
  // CHAPTER 2: CONNECTION
  opt_c2_checkin: {
    topic: 'Connection',
    chapter: 2,
    label: 'Send a brief personal check-in',
    whatThisPrioritizes: 'Taking initiative without pressuring the resident to respond.',
    whatToWatchFor: 'A personal check-in creates an opening, but the resident may feel on the spot if the message sounds urgent.',
    tryThisAction: 'Send a 1-sentence low-stakes note: "No need to reply, just wanted to say welcome to the hall!"',
  },
  opt_c2_invite: {
    topic: 'Connection',
    chapter: 2,
    label: 'Offer a low-pressure invitation',
    whatThisPrioritizes: 'Making participation easy while recognizing that attendance does not measure belonging.',
    whatToWatchFor: 'Residents may skip floor programs while still feeling connected in other ways.',
    tryThisAction: 'Invite them to a low-commitment activity (e.g. grabbing coffee to-go) with an easy out.',
  },
  opt_c2_ask_pref: {
    topic: 'Connection',
    chapter: 2,
    label: 'Ask how they prefer to connect',
    whatThisPrioritizes: 'Giving the resident a say in how contact happens.',
    whatToWatchFor: 'Honoring autonomy is valuable, but requires you to follow up on their chosen medium.',
    tryThisAction: 'Ask one concrete question: "Do you prefer quick texts, hallway hellos, or short emails?"',
  },
  opt_c2_natural: {
    topic: 'Connection',
    chapter: 2,
    label: 'Find a natural opportunity to talk',
    whatThisPrioritizes: 'Using comfortable encounters while noticing who those encounters leave out.',
    whatToWatchFor: 'Spontaneous greetings feel unforced, but miss residents whose routines bypass common spaces.',
    tryThisAction: 'Keep a mental tally of who rarely crosses the lobby, and plan deliberate alternative outreach.',
  },

  // CHAPTER 3: TRUST AND BOUNDARIES
  opt_c3_perspective: {
    topic: 'Trust and boundaries',
    chapter: 3,
    label: 'Ask for their perspective',
    whatThisPrioritizes: 'Understanding the concern while still following through on the expectation.',
    whatToWatchFor: 'Inviting their view builds rapport, but avoid letting empathy compromise community standards or safety.',
    tryThisAction: 'Open with curiosity: "Help me understand what was happening earlier," then reaffirm the boundary.',
  },
  opt_c3_impact: {
    topic: 'Trust and boundaries',
    chapter: 3,
    label: 'Explain the concern and its impact',
    whatThisPrioritizes: 'Making the reason for a boundary understandable and relevant.',
    whatToWatchFor: 'Framing around community impact avoids personal power struggles, but keep it brief so it doesn’t sound like lecturing.',
    tryThisAction: 'Connect the expectation directly to neighbors: "Quiet hours protect our neighbors\' morning exam schedules."',
  },
  opt_c3_expectation: {
    topic: 'Trust and boundaries',
    chapter: 3,
    label: 'State the expectation clearly',
    whatThisPrioritizes: 'Providing clarity while leaving room for respectful discussion.',
    whatToWatchFor: 'Direct boundaries eliminate ambiguity, but delivery needs warmth so residents don’t feel antagonized.',
    tryThisAction: 'State the standard plainly: "We need the music down by 10 PM. Thanks for understanding and cooperating."',
  },
  opt_c3_private: {
    topic: 'Trust and boundaries',
    chapter: 3,
    label: 'Suggest talking privately',
    whatThisPrioritizes: 'Protecting dignity while addressing the concern directly.',
    whatToWatchFor: 'Stepping aside diffuses peer audience tension, but ensure the conversation stays focused on the policy issue.',
    tryThisAction: 'Say quietly: "Can we step outside for a quick second so we can chat 1-on-1?"',
  },

  // CHAPTER 4: COMMUNICATION
  opt_c4_groupchat: {
    topic: 'Communication',
    chapter: 4,
    label: 'Community group chat',
    whatThisPrioritizes: 'Reaching many people while checking whether the intended resident actually uses it.',
    whatToWatchFor: 'Broadcasts reach everyone at once, but busy or overwhelmed residents frequently mute group notifications.',
    tryThisAction: 'Check in individually with quieter residents before assuming everyone saw the group chat blast.',
  },
  opt_c4_directmsg: {
    topic: 'Communication',
    chapter: 4,
    label: 'Personal message',
    whatThisPrioritizes: 'Making outreach relevant while keeping it brief and manageable.',
    whatToWatchFor: 'Direct messages lower friction, but keep them concise so residents don’t feel overwhelmed by paragraphs.',
    tryThisAction: 'Keep outreach to 15 words or fewer with a single yes/no or time question.',
  },
  opt_c4_inperson: {
    topic: 'Communication',
    chapter: 4,
    label: 'In-person conversation',
    whatThisPrioritizes: 'Gaining immediate context while respecting timing and privacy.',
    whatToWatchFor: 'In-person check-ins offer rich emotional cues, but closed doors often mean needed rest or concentration.',
    tryThisAction: 'If a door is shut, leave a polite sticky note or send a text rather than knocking repeatedly.',
  },
  opt_c4_email: {
    topic: 'Communication',
    chapter: 4,
    label: 'Short email',
    whatThisPrioritizes: 'Providing information someone can revisit while making the requested action easy to find.',
    whatToWatchFor: 'Written emails create an archivable record, but student inboxes are often congested.',
    tryThisAction: 'Put the action or deadline right in the subject line: "[Action Needed] Room Inspection Info by Friday".',
  },

  // CHAPTER 6: ADAPTABILITY
  opt_c6_timing: {
    topic: 'Adaptability',
    chapter: 6,
    label: 'Confirm their preferred direct channel and timing',
    whatThisPrioritizes: 'Adjusting when and where contact happens.',
    whatToWatchFor: 'Aligning with the resident’s schedule removes guesswork, but you must honor their preferred window.',
    tryThisAction: 'Add their preferred contact window to your RA calendar so check-ins don’t interrupt work shifts.',
  },
  opt_c6_shorter: {
    topic: 'Adaptability',
    chapter: 6,
    label: 'Make the invitation shorter and easier to answer',
    whatThisPrioritizes: 'Reducing the effort required to understand and respond.',
    whatToWatchFor: 'Lowering reading friction encourages quick replies, but ensure essential details remain clear.',
    tryThisAction: 'Trim long event descriptions down to a single question: "Grabbing snacks at 7—want a plate saved?"',
  },
  opt_c6_time: {
    topic: 'Adaptability',
    chapter: 6,
    label: 'Arrange a convenient time to talk',
    whatThisPrioritizes: 'Replacing inconvenient encounters with an agreed time.',
    whatToWatchFor: 'Scheduling respects busy routines, but keep the meeting short so it doesn’t feel like a formal chore.',
    tryThisAction: 'Suggest a 5-minute sync: "Are you free for 5 mins between your Thursday shift and classes?"',
  },
  opt_c6_contact: {
    topic: 'Adaptability',
    chapter: 6,
    label: 'Ask how much contact they want',
    whatThisPrioritizes: 'Agreeing on a level of contact that respects autonomy.',
    whatToWatchFor: 'Establishing boundary frequency avoids crowding residents, but remember you’re still their safety resource.',
    tryThisAction: 'Clarify support: "Would a once-a-month check-in work best, or do you prefer reaching out as things arise?"',
  },
};

// -----------------------------------------------------------------------------
// MAIN GENERATOR
// -----------------------------------------------------------------------------
export function generateFieldGuide(session: AttendeeSession): FieldGuideData {
  const ch2 = session.answers[2];
  const ch3 = session.answers[3];
  const ch4 = session.answers[4];
  const ch6 = session.answers[6];
  const community: CommunityType = session.selectedCommunity || 'Both';

  const decisionChapters = [2, 3, 4, 6];
  const missingChapters = decisionChapters.filter((ch) => !session.answers[ch]);
  const answeredCount = decisionChapters.length - missingChapters.length;
  const isComplete = answeredCount === decisionChapters.length;

  // Build reflections for each answered chapter
  const reflections: TopicReflection[] = [];

  [2, 3, 4, 6].forEach((ch) => {
    const optId = session.answers[ch];
    if (optId && TOPIC_LEARNING_ANGLES[optId]) {
      const data = TOPIC_LEARNING_ANGLES[optId];
      let crossChapterNote: string | undefined = undefined;

      // Explicit connection between Chapter 4 and Chapter 6
      if (ch === 6 && ch4) {
        if (ch4 === 'opt_c4_groupchat') {
          crossChapterNote = 'In Chapter 4, you prioritized broad community broadcasting. In Chapter 6, after uncovering Alex\'s off-campus work shifts, you shifted toward tailored individual outreach.';
        } else if (ch4 === 'opt_c4_directmsg' || ch4 === 'opt_c4_inperson') {
          crossChapterNote = 'You already favored direct communication in Chapter 4. In Chapter 6, you refined that approach by adjusting the specific timing and message friction rather than starting over.';
        } else if (ch4 === 'opt_c4_email') {
          crossChapterNote = 'You initially favored formal asynchronous email in Chapter 4. In Chapter 6, you adapted to Alex\'s fast-paced routine by making future touchpoints quicker and less bureaucratic.';
        }
      }

      reflections.push({
        chapter: ch,
        topic: data.topic,
        optionId: optId,
        youChose: data.label,
        whatThisPrioritizes: data.whatThisPrioritizes,
        whatToWatchFor: data.whatToWatchFor,
        tryThisAction: data.tryThisAction,
        crossChapterNote,
      });
    }
  });

  // 1. Two Potential Strengths Supported by Selected Answers
  const strengths: FieldGuideStrength[] = [];

  if (ch2 && TOPIC_LEARNING_ANGLES[ch2]) {
    const angle = TOPIC_LEARNING_ANGLES[ch2];
    strengths.push({
      title: ch2 === 'opt_c2_ask_pref' || ch2 === 'opt_c2_invite'
        ? 'Honoring Resident Autonomy'
        : 'Proactive Outreach Initiative',
      evidence: `You prioritized "${angle.label}" in Chapter 2.`,
      explanation: `${angle.whatThisPrioritizes} This approach helps residents feel invited rather than surveilled.`,
    });
  } else {
    strengths.push({
      title: 'Intentional Engagement',
      evidence: 'Awaiting your Chapter 2 connection choice.',
      explanation: 'Exploring proactive connection methods helps quiet residents feel supported.',
    });
  }

  if (ch6 && TOPIC_LEARNING_ANGLES[ch6]) {
    const angle = TOPIC_LEARNING_ANGLES[ch6];
    strengths.push({
      title: 'Contextual Adaptation',
      evidence: `You prioritized "${angle.label}" in Chapter 6.`,
      explanation: `${angle.whatThisPrioritizes} This approach can help calibrate support to the resident's actual schedule.`,
    });
  } else if (ch3 && TOPIC_LEARNING_ANGLES[ch3]) {
    const angle = TOPIC_LEARNING_ANGLES[ch3];
    strengths.push({
      title: 'Constructive Boundary Setting',
      evidence: `You prioritized "${angle.label}" in Chapter 3.`,
      explanation: `${angle.whatThisPrioritizes} This can help de-escalate tension while maintaining standards.`,
    });
  } else {
    strengths.push({
      title: 'Flexible Problem Solving',
      evidence: 'Awaiting your Chapter 6 adaptation choice.',
      explanation: 'Learning resident realities allows you to refine outreach as circumstances evolve.',
    });
  }

  // 2. One Clearly Explained Growth Opportunity or Complementary Skill
  let growthArea: FieldGuideGrowthArea;
  if (ch4 === 'opt_c4_groupchat') {
    growthArea = {
      label: 'Developing Micro-1-on-1 Channels',
      evidence: 'In Chapter 4, you favored broad community group broadcasting.',
      text: 'Broad announcements save time, but quiet or overwhelmed residents frequently mute notifications. Practicing quick 15-word personal check-ins builds trust with residents who slip through large group channels.',
    };
  } else if (ch4 === 'opt_c4_directmsg' || ch4 === 'opt_c4_email') {
    growthArea = {
      label: 'Bridging 1-on-1 Rapport into Peer Connections',
      evidence: 'In Chapter 4, you prioritized direct asynchronous messaging.',
      text: 'Individual outreach builds solid trust. A complementary growth skill is connecting that resident with a floor neighbor who shares similar courses or hobbies, easing the pressure on you as the sole connector.',
    };
  } else if (ch4 === 'opt_c4_inperson') {
    growthArea = {
      label: 'Leveraging Asynchronous Touchpoints',
      evidence: 'In Chapter 4, you selected in-person conversation.',
      text: 'Face-to-face greetings offer immediate social cues, but residents with jobs or dense labs often keep doors shut. Practicing low-effort digital or note-based check-ins ensures residents feel remembered even when away.',
    };
  } else {
    growthArea = {
      label: 'Balancing Direct & Broad Outreach Channels',
      evidence: 'Awaiting your Chapter 4 communication choice.',
      text: 'Effective community building blends whole-group energy with discreet 1-on-1 touchpoints so neither quiet nor social residents are overlooked.',
    };
  }

  // 3. One Practical Strategy to Borrow Across Worlds
  let crossWorldLesson: FieldGuideCrossWorldLesson;
  if (community === 'Residence hall') {
    crossWorldLesson = {
      title: 'Borrow from Apartment Worlds: Asynchronous Boundaries',
      worldContext: 'Residence Hall RA Perspective',
      text: 'In high-density traditional halls, RAs often feel always "on call." Borrow apartment practices: set intentional "office hour" windows, establish asynchronous check-in norms, and avoid relying purely on spontaneous door knocks.',
    };
  } else if (community === 'Apartment community') {
    crossWorldLesson = {
      title: 'Borrow from Residence Halls: High-Visibility Touchpoints',
      worldContext: 'Apartment Community RA Perspective',
      text: 'Apartment deadbolts and long walkways create physical isolation. Borrow hall practices: turn routine mailroom pickups, courtyard walks, and laundry areas into warm greeting zones that build recognition before formal issues occur.',
    };
  } else {
    crossWorldLesson = {
      title: 'Multiverse Synthesis: Hybrid Connection Routes',
      worldContext: 'Cross-Community Perspective',
      text: 'Seamless community building pairs the physical visibility of residence halls with the autonomous, low-friction scheduling of apartment life. Meet residents where their daily energy actually flows.',
    };
  }

  // 4. One Action to Try This Week
  let actionThisWeek: FieldGuideAction;
  if (ch6 === 'opt_c6_shorter') {
    actionThisWeek = {
      title: 'The 15-Word Message Test',
      action: 'Draft your next community announcement in 15 words or fewer with a single actionable question before sending.',
    };
  } else if (ch6 === 'opt_c6_timing') {
    actionThisWeek = {
      title: 'Window Mapping',
      action: 'Ask two residents whose schedules are unpredictable what 2-hour window during the week is easiest for them to reply.',
    };
  } else if (ch6 === 'opt_c6_contact') {
    actionThisWeek = {
      title: 'Cadence Check-In',
      action: 'Check in with one resident who rarely attends events and ask if they prefer monthly texts or checking in as questions arise.',
    };
  } else {
    actionThisWeek = {
      title: 'The Lobby Observation',
      action: 'Spend 15 minutes in your community lobby or courtyard observing foot traffic patterns to identify who you haven’t crossed paths with lately.',
    };
  }

  // Personalized Next Step (replaces generic quote as sole ending)
  let personalizedNextStep: PersonalizedNextStep;
  if (ch2 && ch6) {
    personalizedNextStep = {
      title: 'Your Multiverse Pathway',
      text: `Take your Chapter 2 priority (${TOPIC_LEARNING_ANGLES[ch2].label.toLowerCase()}) and apply your Chapter 6 adaptation (${TOPIC_LEARNING_ANGLES[ch6].label.toLowerCase()}) to one resident in your building this week.`,
    };
  } else {
    personalizedNextStep = {
      title: 'Your Multiverse Pathway',
      text: 'Review the scenario reflections below and pick one specific action to practice with a quiet resident this semester.',
    };
  }

  return {
    title: 'MY RA FIELD GUIDE',
    subtitle: 'What My Choices Suggest',
    community,
    answeredCount,
    totalDecisions: 4,
    isComplete,
    missingChapters,
    strengths,
    growthArea,
    crossWorldLesson,
    actionThisWeek,
    personalizedNextStep,
    supportingQuote: 'Same mission. Two worlds. Infinite ways to build community.',
    reflections,
    disclaimer: 'Based on your choices in today’s scenarios. These observations reflect prioritized approaches, not evaluations of competence.',
  };
}
