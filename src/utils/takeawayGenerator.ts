import { AttendeeSession, CommunityType } from '../types';

export interface FieldGuideStrength {
  title: string;
  explanation: string;
  choiceSource: string;
}

export interface FieldGuideGrowthArea {
  label: string;
  text: string;
  choiceSource: string;
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
  scenariosSummary: Array<{
    chapter: number;
    scenarioTitle: string;
    chosenLabel: string;
  }>;
  disclaimer: string;
}

export function generateFieldGuide(session: AttendeeSession): FieldGuideData {
  const ch2 = session.answers[2];
  const ch3 = session.answers[3];
  const ch4 = session.answers[4];
  const ch6 = session.answers[6];
  const community: CommunityType = session.selectedCommunity || 'Both';

  // Count decisions
  const decisionChapters = [2, 3, 4, 6];
  const missingChapters = decisionChapters.filter(ch => !session.answers[ch]);
  const answeredCount = decisionChapters.length - missingChapters.length;
  const isComplete = answeredCount === decisionChapters.length;

  // Build Scenario Summaries
  const scenariosSummary: Array<{ chapter: number; scenarioTitle: string; chosenLabel: string }> = [];

  if (ch2) {
    const ch2Labels: Record<string, string> = {
      opt_c2_checkin: 'Send a brief personal check-in',
      opt_c2_invite: 'Offer a low-pressure invitation',
      opt_c2_ask_pref: 'Ask how they prefer to connect',
      opt_c2_natural: 'Find a natural opportunity to talk',
    };
    scenariosSummary.push({
      chapter: 2,
      scenarioTitle: 'The Invisible Resident',
      chosenLabel: ch2Labels[ch2] || 'Explored approach',
    });
  }

  if (ch3) {
    const ch3Labels: Record<string, string> = {
      opt_c3_perspective: 'Ask for their perspective',
      opt_c3_impact: 'Explain concern and community impact',
      opt_c3_expectation: 'State expectation clearly upfront',
      opt_c3_private: 'Suggest talking privately',
    };
    scenariosSummary.push({
      chapter: 3,
      scenarioTitle: 'Peer Relationships & Boundaries',
      chosenLabel: ch3Labels[ch3] || 'Explored approach',
    });
  }

  if (ch4) {
    const ch4Labels: Record<string, string> = {
      opt_c4_groupchat: 'Community group chat broadcast',
      opt_c4_directmsg: 'Personal direct message',
      opt_c4_inperson: 'In-person conversation',
      opt_c4_email: 'Short structured email',
    };
    scenariosSummary.push({
      chapter: 4,
      scenarioTitle: 'Communication Channel',
      chosenLabel: ch4Labels[ch4] || 'Explored channel',
    });
  }

  if (ch6) {
    const ch6Labels: Record<string, string> = {
      opt_c6_timing: 'Confirm preferred direct channel and timing',
      opt_c6_shorter: 'Make invitation shorter and easier to answer',
      opt_c6_time: 'Arrange a convenient scheduled time to talk',
      opt_c6_contact: 'Ask how much contact they prefer',
    };
    scenariosSummary.push({
      chapter: 6,
      scenarioTitle: 'Superpower Adaptation',
      chosenLabel: ch6Labels[ch6] || 'Explored adaptation',
    });
  }

  // Determine Strengths
  const strengths: FieldGuideStrength[] = [];

  // Strength 1: Derived from Connection & Boundaries (Ch 2 & Ch 3)
  if (ch2 === 'opt_c2_ask_pref' || ch3 === 'opt_c3_perspective') {
    strengths.push({
      title: 'Listening First & Respecting Autonomy',
      explanation: 'You prioritized learning the resident’s personal perspective and preferences before jumping to solutions, creating a collaborative climate where residents feel heard rather than managed.',
      choiceSource: 'Reflected in your Chapter 2 / 3 choices',
    });
  } else if (ch2 === 'opt_c2_checkin' || ch3 === 'opt_c3_impact') {
    strengths.push({
      title: 'Intentional Outreach & Contextual Framing',
      explanation: 'You favored direct, purposeful contact while framing expectations around collective community impact rather than personal authority.',
      choiceSource: 'Reflected in your Chapter 2 / 3 choices',
    });
  } else if (ch3 === 'opt_c3_expectation') {
    strengths.push({
      title: 'Transparent Boundary Setting',
      explanation: 'You valued clear, direct standards upfront so residents know exactly where community boundaries stand, reducing ambiguity in peer-to-peer relationships.',
      choiceSource: 'Reflected in your Chapter 3 choice',
    });
  } else if (ch3 === 'opt_c3_private' || ch2 === 'opt_c2_natural') {
    strengths.push({
      title: 'Preserving Dignity & Psychological Safety',
      explanation: 'You prioritized unforced, private interactions that save face and allow residents to connect comfortably on their own terms.',
      choiceSource: 'Reflected in your Chapter 2 / 3 choices',
    });
  } else {
    strengths.push({
      title: 'Low-Pressure Inclusivity',
      explanation: 'Your approach gives residents autonomy to engage without feeling spotlighted, keeping the door open for organic community involvement.',
      choiceSource: 'Reflected in your connection choices',
    });
  }

  // Strength 2: Derived from Channel (Ch 4) + Adaptation (Ch 6)
  if (ch6 === 'opt_c6_timing' || ch6 === 'opt_c6_shorter') {
    strengths.push({
      title: 'Agility & Willingness to Adapt',
      explanation: 'When Alex revealed their demanding work shifts and study schedule, you adjusted your outreach to be lower friction and aligned with their specific routine.',
      choiceSource: 'Reflected in your Chapter 6 adaptation',
    });
  } else if (ch6 === 'opt_c6_contact' || ch2 === 'opt_c2_ask_pref') {
    strengths.push({
      title: 'Boundary Calibration',
      explanation: 'You recognized that care does not mean constant contact; tailoring communication frequency prevents residents from feeling crowded while keeping support accessible.',
      choiceSource: 'Reflected in your Chapter 6 adjustment',
    });
  } else if (ch6 === 'opt_c6_time') {
    strengths.push({
      title: 'Structured Intentionality',
      explanation: 'You opted for mutually agreed times rather than unexpected drop-ins, providing predictability for busy residents balancing off-campus obligations.',
      choiceSource: 'Reflected in your Chapter 6 adjustment',
    });
  } else {
    strengths.push({
      title: 'Direct Channel Focus',
      explanation: 'You favored clear, direct communication lines over vague broadcasts, ensuring important messages reach individual residents reliably.',
      choiceSource: 'Reflected in your communication choices',
    });
  }

  // Determine Growth Area / Skill to Practice Next
  let growthArea: FieldGuideGrowthArea;

  if (ch4 === 'opt_c4_groupchat' && (ch6 === 'opt_c6_timing' || ch6 === 'opt_c6_shorter')) {
    growthArea = {
      label: 'A skill to practice next',
      text: 'Check channel preferences earlier: Before relying on building-wide group chats for quiet or working residents, confirm individually how they prefer to receive important building updates.',
      choiceSource: 'Tied to your initial group chat choice & subsequent adaptation',
    };
  } else if (ch4 === 'opt_c4_inperson' && ch6 === 'opt_c6_time') {
    growthArea = {
      label: 'A skill to practice next',
      text: 'Lead with asynchronous confirmation: For independent residents with heavy work or lab commitments, unscheduled door knocks can add pressure. Pair in-person warmth with quick advance messages.',
      choiceSource: 'Tied to your in-person outreach and scheduling choice',
    };
  } else if (ch3 === 'opt_c3_expectation') {
    growthArea = {
      label: 'A complementary approach to explore',
      text: 'Pair clarity with curiosity: When stating a policy expectation, ask the resident for their perspective on the situation first. Understanding their context softens peer defensiveness without compromising standards.',
      choiceSource: 'Tied to your upfront expectation setting in Chapter 3',
    };
  } else if (ch2 === 'opt_c2_natural' || ch2 === 'opt_c2_invite') {
    growthArea = {
      label: 'A skill to practice next',
      text: 'Incorporate scheduled intentionality: While waiting for organic interactions feels natural, residents with heavy off-campus jobs may rarely cross common areas. Practice small, deliberate 1-on-1 check-ins.',
      choiceSource: 'Tied to your natural opportunity preference in Chapter 2',
    };
  } else if (ch4 === 'opt_c4_directmsg') {
    growthArea = {
      label: 'A complementary approach to explore',
      text: 'Bridge 1-on-1 trust into peer connections: Direct messages build great individual trust. Look for opportunities to connect quiet residents with one neighbor who shares similar coursework or work hours.',
      choiceSource: 'Tied to your direct messaging choice in Chapter 4',
    };
  } else {
    growthArea = {
      label: 'A skill to practice next',
      text: 'Test different messaging lengths and time windows: Small changes in when and how concisely you send updates can dramatically shift how easily residents respond.',
      choiceSource: 'Tied to your communication and adjustment choices',
    };
  }

  // Determine Cross-World Lesson (Residence Hall vs Apartment)
  let crossWorldLesson: FieldGuideCrossWorldLesson;

  switch (community) {
    case 'Residence hall':
      crossWorldLesson = {
        title: 'Borrow from Apartment Communities',
        text: 'Bring intentional, scheduled touchpoints behind closed doors. In residence halls, we often rely on running into residents in the hallway or lounge. Practice deliberate 1-on-1 check-ins for the residents who rarely leave their rooms.',
        worldContext: 'Applying apartment intentionality to traditional residence halls',
      };
      break;

    case 'Apartment community':
      crossWorldLesson = {
        title: 'Borrow from Traditional Residence Halls',
        text: 'Inject spontaneous micro-moments into daily routines. In apartment living, deadbolts can make outreach feel formal. Look for casual, low-stakes greetings at mailboxes, breezeways, or stairwells so not every touchpoint feels like an official meeting.',
        worldContext: 'Applying residence hall spontaneous warmth to apartment communities',
      };
      break;

    case 'Both':
      crossWorldLesson = {
        title: 'Leverage Dual-World Fluency',
        text: 'Recognize each building’s "door culture." Use high-density common areas for quick temperature checks, while leaning into apartment-style asynchronous scheduling when residents are overwhelmed by work or coursework.',
        worldContext: 'Bridging high-density halls and independent apartment communities',
      };
      break;

    case 'New to the RA role':
    default:
      crossWorldLesson = {
        title: 'Build Both Superpowers Early',
        text: 'Balance the residence hall skill of being visible and approachable in shared spaces with the apartment skill of deliberate, respectful 1-on-1 scheduling that honors student independence.',
        worldContext: 'Foundation for building strong community across any living environment',
      };
      break;
  }

  // Determine Action for This Week
  let actionThisWeek: FieldGuideAction;

  if (ch6 === 'opt_c6_timing' || ch2 === 'opt_c2_ask_pref') {
    actionThisWeek = {
      title: 'Ask One Preference Question',
      action: 'Identify one resident you rarely see in your community. Send a short, low-pressure message asking: "Hey! Just checking in—what is the easiest way or time for me to share quick building updates with you this semester?"',
    };
  } else if (ch3 === 'opt_c3_perspective') {
    actionThisWeek = {
      title: 'Practice Two-Minute Listening',
      action: 'During your next resident interaction, spend the first two minutes solely asking about their week or major and listening actively before introducing any announcements or policy reminders.',
    };
  } else if (ch4 === 'opt_c4_groupchat') {
    actionThisWeek = {
      title: 'Swap Broadcast for Two Direct Notes',
      action: 'Instead of posting another general reminder in the floor chat, send two quick, direct 1-sentence check-in notes to residents who typically remain silent in group spaces.',
    };
  } else {
    actionThisWeek = {
      title: 'Connect Behind One Closed Door',
      action: 'Leave a brief personalized sticky note or send a short direct message to one resident whose door is almost always shut, simply asking how their semester is progressing with no action required from them.',
    };
  }

  return {
    title: 'MY RA FIELD GUIDE',
    subtitle: 'What my choices suggest',
    community,
    answeredCount,
    totalDecisions: 4,
    isComplete,
    missingChapters,
    strengths: strengths.slice(0, 2),
    growthArea,
    crossWorldLesson,
    actionThisWeek,
    scenariosSummary,
    disclaimer: 'Based on your choices in today’s scenarios.',
  };
}
