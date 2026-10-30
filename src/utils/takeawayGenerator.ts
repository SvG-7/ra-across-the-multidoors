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

// -----------------------------------------------------------------------------
// EXACT TOPIC-SPECIFIC LEARNING ANGLES (SUPPORTIVE, SPECIFIC, RESPECTFUL TONE)
// -----------------------------------------------------------------------------
export const TOPIC_LEARNING_ANGLES: Record<string, {
  topic: string;
  chapter: number;
  label: string;
  whatYouLeanedToward: string;
  anotherApproachToExplore: string;
  somethingToTry: string;
  whatThisPrioritizes: string; // backwards compatibility
  whatToWatchFor: string;      // backwards compatibility
  tryThisAction: string;       // backwards compatibility
}> = {
  // CHAPTER 2: CONNECTION
  opt_c2_natural: {
    topic: 'Connection',
    chapter: 2,
    label: 'Find a natural opportunity to talk',
    whatYouLeanedToward: 'Casual conversations can make connection feel comfortable and unforced.',
    anotherApproachToExplore: 'A brief planned check-in can extend that connection to residents whose daily routines bypass common spaces.',
    somethingToTry: 'Keep note of residents you rarely see in the lobby, and leave a friendly welcome note or send a quick greeting.',
    whatThisPrioritizes: 'Casual conversations can make connection feel comfortable and unforced.',
    whatToWatchFor: 'A brief planned check-in can extend that connection to residents whose daily routines bypass common spaces.',
    tryThisAction: 'Keep note of residents you rarely see in the lobby, and leave a friendly welcome note or send a quick greeting.',
  },
  opt_c2_checkin: {
    topic: 'Connection',
    chapter: 2,
    label: 'Send a brief personal check-in',
    whatYouLeanedToward: 'A direct personal note takes proactive initiative without demanding an immediate reply.',
    anotherApproachToExplore: 'Pairing a direct message with an easy, low-stakes question helps residents feel cared for rather than spotlighted.',
    somethingToTry: 'Send a 1-sentence note: "No need to reply—just wanted to make sure everything is settling in well for your week!"',
    whatThisPrioritizes: 'A direct personal note takes proactive initiative without demanding an immediate reply.',
    whatToWatchFor: 'Pairing a direct message with an easy, low-stakes question helps residents feel cared for rather than spotlighted.',
    tryThisAction: 'Send a 1-sentence note: "No need to reply—just wanted to make sure everything is settling in well for your week!"',
  },
  opt_c2_invite: {
    topic: 'Connection',
    chapter: 2,
    label: 'Offer a low-pressure invitation',
    whatYouLeanedToward: 'A relaxed invitation gives residents full autonomy to join when they feel ready.',
    anotherApproachToExplore: 'Remembering that event attendance is only one way to connect helps you notice other quiet ways residents participate.',
    somethingToTry: 'Invite them to grab coffee or a snack to-go with an explicit "no pressure if you\'re swamped" option.',
    whatThisPrioritizes: 'A relaxed invitation gives residents full autonomy to join when they feel ready.',
    whatToWatchFor: 'Remembering that event attendance is only one way to connect helps you notice other quiet ways residents participate.',
    tryThisAction: 'Invite them to grab coffee or a snack to-go with an explicit "no pressure if you\'re swamped" option.',
  },
  opt_c2_ask_pref: {
    topic: 'Connection',
    chapter: 2,
    label: 'Ask how they prefer to connect',
    whatYouLeanedToward: 'Giving residents a say in how communication happens builds immediate respect and agency.',
    anotherApproachToExplore: 'Following up reliably on their preferred channel reinforces that their boundaries are valued.',
    somethingToTry: 'Ask one quick question: "Do you prefer quick hallway hellos, a text, or short emails when updates come up?"',
    whatThisPrioritizes: 'Giving residents a say in how communication happens builds immediate respect and agency.',
    whatToWatchFor: 'Following up reliably on their preferred channel reinforces that their boundaries are valued.',
    tryThisAction: 'Ask one quick question: "Do you prefer quick hallway hellos, a text, or short emails when updates come up?"',
  },

  // CHAPTER 3: TRUST AND BOUNDARIES
  opt_c3_expectation: {
    topic: 'Trust and boundaries',
    chapter: 3,
    label: 'State the expectation clearly',
    whatYouLeanedToward: 'Clear expectations make the situation transparent and easy to understand upfront.',
    anotherApproachToExplore: 'Pairing clarity with an invitation to share their perspective can help keep the conversation collaborative.',
    somethingToTry: 'State the standard plainly, then follow with warmth: "We need noise down by 10 PM so neighbors can study. How is your evening going otherwise?"',
    whatThisPrioritizes: 'Clear expectations make the situation transparent and easy to understand upfront.',
    whatToWatchFor: 'Pairing clarity with an invitation to share their perspective can help keep the conversation collaborative.',
    tryThisAction: 'State the standard plainly, then follow with warmth: "We need noise down by 10 PM so neighbors can study. How is your evening going otherwise?"',
  },
  opt_c3_perspective: {
    topic: 'Trust and boundaries',
    chapter: 3,
    label: 'Ask for their perspective',
    whatYouLeanedToward: 'Inviting their viewpoint builds rapport and shows you value understanding context before taking action.',
    anotherApproachToExplore: 'Holding the community expectation alongside genuine curiosity ensures standards stay protected while trust grows.',
    somethingToTry: 'Open with curiosity: "Help me understand what was going on earlier tonight," then reaffirm the shared floor standard.',
    whatThisPrioritizes: 'Inviting their viewpoint builds rapport and shows you value understanding context before taking action.',
    whatToWatchFor: 'Holding the community expectation alongside genuine curiosity ensures standards stay protected while trust grows.',
    tryThisAction: 'Open with curiosity: "Help me understand what was going on earlier tonight," then reaffirm the shared floor standard.',
  },
  opt_c3_impact: {
    topic: 'Trust and boundaries',
    chapter: 3,
    label: 'Explain the concern and its impact',
    whatYouLeanedToward: 'Framing boundaries around community impact helps residents see how mutual respect benefits everyone.',
    anotherApproachToExplore: 'Keeping the explanation brief and neighbor-focused avoids feeling like a lecture and invites cooperation.',
    somethingToTry: 'Connect the policy directly to neighbors: "Quiet hours protect our neighbors who have early clinicals or morning exams."',
    whatThisPrioritizes: 'Framing boundaries around community impact helps residents see how mutual respect benefits everyone.',
    whatToWatchFor: 'Keeping the explanation brief and neighbor-focused avoids feeling like a lecture and invites cooperation.',
    tryThisAction: 'Connect the policy directly to neighbors: "Quiet hours protect our neighbors who have early clinicals or morning exams."',
  },
  opt_c3_private: {
    topic: 'Trust and boundaries',
    chapter: 3,
    label: 'Suggest talking privately',
    whatYouLeanedToward: 'Stepping aside diffuses peer audience pressure and protects everyone’s dignity.',
    anotherApproachToExplore: 'Keeping a 1-on-1 discussion focused and concise helps the resident feel respected rather than singled out.',
    somethingToTry: 'Say quietly and warmly: "Could we step into the hallway for just a minute to chat one-on-one?"',
    whatThisPrioritizes: 'Stepping aside diffuses peer audience pressure and protects everyone’s dignity.',
    whatToWatchFor: 'Keeping a 1-on-1 discussion focused and concise helps the resident feel respected rather than singled out.',
    tryThisAction: 'Say quietly and warmly: "Could we step into the hallway for just a minute to chat one-on-one?"',
  },

  // CHAPTER 4: COMMUNICATION
  opt_c4_groupchat: {
    topic: 'Communication',
    chapter: 4,
    label: 'Community group chat',
    whatYouLeanedToward: 'A group chat can make community updates easy to share across many residents simultaneously.',
    anotherApproachToExplore: 'Checking someone’s preferred channel can help important messages reach them more reliably when large groups are muted.',
    somethingToTry: 'Use the group chat for open invitations, and follow up with a quick 1-on-1 check-in for residents who stay quiet.',
    whatThisPrioritizes: 'A group chat can make community updates easy to share across many residents simultaneously.',
    whatToWatchFor: 'Checking someone’s preferred channel can help important messages reach them more reliably when large groups are muted.',
    tryThisAction: 'Use the group chat for open invitations, and follow up with a quick 1-on-1 check-in for residents who stay quiet.',
  },
  opt_c4_directmsg: {
    topic: 'Communication',
    chapter: 4,
    label: 'Personal message',
    whatYouLeanedToward: 'A personal message lowers reading friction and allows residents to reply asynchronously on their own time.',
    anotherApproachToExplore: 'Bridging individual rapport into neighbor connections helps residents build peer friendships beyond just you.',
    somethingToTry: 'Keep individual texts to 15 words or fewer with a single actionable question.',
    whatThisPrioritizes: 'A personal message lowers reading friction and allows residents to reply asynchronously on their own time.',
    whatToWatchFor: 'Bridging individual rapport into neighbor connections helps residents build peer friendships beyond just you.',
    tryThisAction: 'Keep individual texts to 15 words or fewer with a single actionable question.',
  },
  opt_c4_inperson: {
    topic: 'Communication',
    chapter: 4,
    label: 'In-person conversation',
    whatYouLeanedToward: 'Face-to-face check-ins offer immediate warmth, natural tone, and rich personal connection.',
    anotherApproachToExplore: 'Complementing in-person visits with asynchronous notes ensures residents who work irregular hours still feel remembered.',
    somethingToTry: 'If a resident’s door is closed, leave a friendly sticky note rather than knocking repeatedly.',
    whatThisPrioritizes: 'Face-to-face check-ins offer immediate warmth, natural tone, and rich personal connection.',
    whatToWatchFor: 'Complementing in-person visits with asynchronous notes ensures residents who work irregular hours still feel remembered.',
    tryThisAction: 'If a resident’s door is closed, leave a friendly sticky note rather than knocking repeatedly.',
  },
  opt_c4_email: {
    topic: 'Communication',
    chapter: 4,
    label: 'Short email',
    whatYouLeanedToward: 'A concise email provides an archivable reference that residents can revisit when convenient.',
    anotherApproachToExplore: 'Putting the key takeaway or action in the subject line helps busy students identify what matters quickly.',
    somethingToTry: 'Use clear brackets in your subject line: "[Quick Question] What snack works best for Thursday?"',
    whatThisPrioritizes: 'A concise email provides an archivable reference that residents can revisit when convenient.',
    whatToWatchFor: 'Putting the key takeaway or action in the subject line helps busy students identify what matters quickly.',
    tryThisAction: 'Use clear brackets in your subject line: "[Quick Question] What snack works best for Thursday?"',
  },

  // CHAPTER 6: ADAPTABILITY
  opt_c6_shorter: {
    topic: 'Adaptability',
    chapter: 6,
    label: 'Make the invitation shorter and easier to answer',
    whatYouLeanedToward: 'A brief invitation can make responding feel manageable during a busy schedule.',
    anotherApproachToExplore: 'Offering a simple way to reply builds on that approach by lowering mental overhead.',
    somethingToTry: 'Trim event details down to a single question: "Grabbing tacos at 7—want a plate saved in the lounge fridge?"',
    whatThisPrioritizes: 'A brief invitation can make responding feel manageable during a busy schedule.',
    whatToWatchFor: 'Offering a simple way to reply builds on that approach by lowering mental overhead.',
    tryThisAction: 'Trim event details down to a single question: "Grabbing tacos at 7—want a plate saved in the lounge fridge?"',
  },
  opt_c6_timing: {
    topic: 'Adaptability',
    chapter: 6,
    label: 'Confirm their preferred direct channel and timing',
    whatYouLeanedToward: 'Aligning communication with a resident’s actual schedule eliminates guesswork and respects their routine.',
    anotherApproachToExplore: 'Recording their preferred window ensures your check-ins don’t interrupt critical work or rest shifts.',
    somethingToTry: 'Ask: "What 2-hour window during the week is generally easiest for you to see a quick message?"',
    whatThisPrioritizes: 'Aligning communication with a resident’s actual schedule eliminates guesswork and respects their routine.',
    whatToWatchFor: 'Recording their preferred window ensures your check-ins don’t interrupt critical work or rest shifts.',
    tryThisAction: 'Ask: "What 2-hour window during the week is generally easiest for you to see a quick message?"',
  },
  opt_c6_time: {
    topic: 'Adaptability',
    chapter: 6,
    label: 'Arrange a convenient time to talk',
    whatYouLeanedToward: 'Setting a mutually agreed time replaces inconvenient interruptions with focused, intentional connection.',
    anotherApproachToExplore: 'Keeping scheduled syncs short (5 minutes) prevents meetings from feeling like an overwhelming obligation.',
    somethingToTry: 'Suggest a micro-sync: "Do you have 5 minutes between your Thursday lab and shift to catch up?"',
    whatThisPrioritizes: 'Setting a mutually agreed time replaces inconvenient interruptions with focused, intentional connection.',
    whatToWatchFor: 'Keeping scheduled syncs short (5 minutes) prevents meetings from feeling like an overwhelming obligation.',
    tryThisAction: 'Suggest a micro-sync: "Do you have 5 minutes between your Thursday lab and shift to catch up?"',
  },
  opt_c6_contact: {
    topic: 'Adaptability',
    chapter: 6,
    label: 'Ask how much contact they want',
    whatYouLeanedToward: 'Agreeing on contact cadence honors the resident’s independence while keeping support accessible.',
    anotherApproachToExplore: 'Reassuring them that low contact is completely fine while reminding them you are always here builds safety.',
    somethingToTry: 'Ask: "Would a monthly check-in work best, or do you prefer reaching out whenever a question comes up?"',
    whatThisPrioritizes: 'Agreeing on contact cadence honors the resident’s independence while keeping support accessible.',
    whatToWatchFor: 'Reassuring them that low contact is completely fine while reminding them you are always here builds safety.',
    tryThisAction: 'Ask: "Would a monthly check-in work best, or do you prefer reaching out whenever a question comes up?"',
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

  decisionChapters.forEach((ch) => {
    const optId = session.answers[ch];
    if (optId && TOPIC_LEARNING_ANGLES[optId]) {
      const data = TOPIC_LEARNING_ANGLES[optId];
      let crossChapterNote: string | undefined = undefined;

      // Supportive connection between Chapter 4 and Chapter 6
      if (ch === 6 && ch4) {
        if (ch4 === 'opt_c4_groupchat') {
          crossChapterNote = 'In Chapter 4, you leaned toward a shared group chat. In Chapter 6, after learning about Alex’s work shifts, you explored tailored individual outreach.';
        } else if (ch4 === 'opt_c4_directmsg' || ch4 === 'opt_c4_inperson') {
          crossChapterNote = 'You already favored direct communication in Chapter 4. In Chapter 6, you built on that approach by fine-tuning the timing and message length.';
        } else if (ch4 === 'opt_c4_email') {
          crossChapterNote = 'You initially explored email in Chapter 4. In Chapter 6, you adjusted to Alex’s fast routine with quick, low-friction touchpoints.';
        }
      }

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
        crossChapterNote,
      });
    }
  });

  // 1. Two Potential Strengths in Approaches Chosen
  const strengths: FieldGuideStrength[] = [];

  if (ch2 && TOPIC_LEARNING_ANGLES[ch2]) {
    const angle = TOPIC_LEARNING_ANGLES[ch2];
    strengths.push({
      title: ch2 === 'opt_c2_ask_pref' || ch2 === 'opt_c2_invite'
        ? 'Honoring Resident Autonomy'
        : 'Proactive Outreach Initiative',
      evidence: `You leaned toward "${angle.label}" in Chapter 2.`,
      explanation: `${angle.whatYouLeanedToward} This approach helps residents feel invited and respected.`,
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
      evidence: `You leaned toward "${angle.label}" in Chapter 6.`,
      explanation: `${angle.whatYouLeanedToward} This helps calibrate support to the resident’s real-world schedule.`,
    });
  } else if (ch3 && TOPIC_LEARNING_ANGLES[ch3]) {
    const angle = TOPIC_LEARNING_ANGLES[ch3];
    strengths.push({
      title: 'Constructive Boundary Setting',
      evidence: `You leaned toward "${angle.label}" in Chapter 3.`,
      explanation: `${angle.whatYouLeanedToward} This keeps conversations open while maintaining standards.`,
    });
  } else {
    strengths.push({
      title: 'Clear Communication',
      evidence: 'Awaiting your Chapter 3 boundary choice.',
      explanation: 'Balancing clarity with curiosity creates a supportive living community.',
    });
  }

  // 2. Another Approach to Explore (Replaces judgmental "growth area")
  let anotherApproachToExplore: FieldGuideApproachToExplore;

  if (ch4 === 'opt_c4_groupchat') {
    anotherApproachToExplore = {
      label: 'Developing Micro-1-on-1 Channels',
      evidence: 'In Chapter 4, you leaned toward community group broadcasting.',
      text: 'Broad announcements make community updates easy to share. A complementary approach to explore is a quick 15-word personal check-in, which helps important messages reach residents who mute large group channels.',
    };
  } else if (ch4 === 'opt_c4_directmsg' || ch4 === 'opt_c4_email') {
    anotherApproachToExplore = {
      label: 'Bridging 1-on-1 Rapport into Peer Connections',
      evidence: 'In Chapter 4, you leaned toward direct personal communication.',
      text: 'Individual outreach builds strong trust. Another approach to explore is connecting that resident with a neighbor who shares similar courses or interests, easing the pressure on you as the sole connector.',
    };
  } else if (ch4 === 'opt_c4_inperson') {
    anotherApproachToExplore = {
      label: 'Leveraging Asynchronous Touchpoints',
      evidence: 'In Chapter 4, you leaned toward in-person conversation.',
      text: 'Face-to-face check-ins offer immediate warmth and tone. A complementary approach to explore is leaving a friendly note when doors are closed, ensuring busy residents still feel remembered without feeling pressured.',
    };
  } else {
    anotherApproachToExplore = {
      label: 'Balancing Direct & Broad Outreach Channels',
      evidence: 'Awaiting your Chapter 4 communication choice.',
      text: 'Effective community building blends whole-group announcements with discreet 1-on-1 touchpoints so every resident finds an easy way in.',
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
      text: 'Apartment deadbolts and long walkways create physical distance. Borrow hall practices: turn routine mailroom pickups, courtyard walks, and laundry areas into warm greeting zones that build recognition before issues arise.',
    };
  } else {
    crossWorldLesson = {
      title: 'Multiverse Synthesis: Hybrid Connection Routes',
      worldContext: 'Cross-Community Perspective',
      text: 'Seamless community building pairs the physical visibility of residence halls with the autonomous, low-friction scheduling of apartment life. Meet residents where their daily energy actually flows.',
    };
  }

  // 4. One Action to Try in Your Community
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

  // Personalized Next Step
  let personalizedNextStep: PersonalizedNextStep;
  if (ch2 && ch6 && TOPIC_LEARNING_ANGLES[ch2] && TOPIC_LEARNING_ANGLES[ch6]) {
    personalizedNextStep = {
      title: 'Your Multiverse Pathway',
      text: `Take your Chapter 2 priority (${TOPIC_LEARNING_ANGLES[ch2].label.toLowerCase()}) and apply your Chapter 6 adaptation (${TOPIC_LEARNING_ANGLES[ch6].label.toLowerCase()}) to one resident in your community this week.`,
    };
  } else {
    personalizedNextStep = {
      title: 'Your Multiverse Pathway',
      text: 'Review the scenario reflections below and pick one specific action to try with a quiet resident this semester.',
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
    growthArea: anotherApproachToExplore, // backwards-compatible alias
    anotherApproachToExplore,
    crossWorldLesson,
    actionThisWeek,
    personalizedNextStep,
    supportingQuote: 'Same mission. Two worlds. Infinite ways to build community.',
    reflections,
    disclaimer: 'Based on your choices in today’s scenarios. These observations reflect prioritized approaches, not evaluations of competence.',
  };
}
