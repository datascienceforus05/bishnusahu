import { useCallback, useMemo, useState } from "react";
import BackgroundCanvas from "./components/BackgroundCanvas";
import CloudWipe from "./components/CloudWipe";
import EarthLineArt from "./components/EarthLineArt";
import AwardsSection from "./components/sections/AwardsSection";
import HelloSection from "./components/sections/HelloSection";
import JourneySection from "./components/sections/JourneySection";
import LoaderSection from "./components/sections/LoaderSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import PublicationSection from "./components/sections/PublicationSection";
import ResumeSection from "./components/sections/ResumeSection";
import SkillsSection from "./components/sections/SkillsSection";
import WelcomeSection from "./components/sections/WelcomeSection";
import DetailModal from "./components/ui/DetailModal";
import NextButton from "./components/ui/NextButton";
import PrevButton from "./components/ui/PrevButton";
import {
  awards,
  experience,
  projects,
  publication,
  skillCategories,
} from "./data/portfolio";
import type { DetailPayload } from "./data/portfolio";
import { useCloudWipe } from "./hooks/useCloudWipe";
import { useNavigation } from "./hooks/useNavigation";

const LAST_SECTION_INDEX = 8;

function App() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [userName, setUserName] = useState("");
  const [journeyIndex, setJourneyIndex] = useState(0);
  const [journeyNavSteps, setJourneyNavSteps] = useState(0);
  const [journeySeenAll, setJourneySeenAll] = useState(false);
  const [detailPayload, setDetailPayload] = useState<DetailPayload | null>(null);

  const { isWiping, triggerWipe, handleMidpoint, handleComplete } = useCloudWipe();
  const journeyLastIndex = experience.length - 1;
  const canLeaveJourney = journeySeenAll || journeyNavSteps >= 2;

  const openDetail = useCallback((payload: DetailPayload) => {
    setDetailPayload(payload);
  }, []);

  const closeDetail = useCallback(() => {
    setDetailPayload(null);
  }, []);

  const stepJourney = useCallback(
    (direction: -1 | 1) => {
      setJourneyNavSteps((value) => value + 1);
      setJourneyIndex((value) => {
        const next = Math.max(0, Math.min(journeyLastIndex, value + direction));
        if (next === journeyLastIndex) {
          setJourneySeenAll(true);
        }
        return next;
      });
    },
    [journeyLastIndex],
  );

  const advanceSection = useCallback(async () => {
    if (isWiping || detailPayload) {
      return;
    }

    if (sectionIndex === 0 || sectionIndex >= LAST_SECTION_INDEX) {
      return;
    }

    if (sectionIndex === 3 && !canLeaveJourney) {
      stepJourney(1);
      return;
    }

    await triggerWipe(() => {
      setSectionIndex((value) => Math.min(value + 1, LAST_SECTION_INDEX));
    });
  }, [canLeaveJourney, detailPayload, isWiping, sectionIndex, stepJourney, triggerWipe]);

  const retreatSection = useCallback(async () => {
    if (isWiping || detailPayload) {
      return;
    }

    if (sectionIndex <= 1) {
      return;
    }

    if (sectionIndex === 3 && journeyIndex > 0) {
      stepJourney(-1);
      return;
    }

    await triggerWipe(() => {
      setSectionIndex((value) => Math.max(value - 1, 1));
    });
  }, [detailPayload, isWiping, journeyIndex, sectionIndex, stepJourney, triggerWipe]);

  const advanceByIntent = useCallback(() => {
    void advanceSection();
  }, [advanceSection]);

  const retreatByIntent = useCallback(() => {
    void retreatSection();
  }, [retreatSection]);

  useNavigation({
    onAdvance: advanceByIntent,
    onPrevious: retreatByIntent,
    enabled: !isWiping && !detailPayload,
  });

  const shouldShowSpaceHint = !isWiping && !detailPayload && sectionIndex > 0 && sectionIndex < LAST_SECTION_INDEX;

  const handleLoaderEnter = useCallback(
    async (enteredName: string) => {
      if (isWiping) {
        return;
      }

      setUserName(enteredName);
      await triggerWipe(() => {
        setSectionIndex(1);
      });
    },
    [isWiping, triggerWipe],
  );

  const handleWelcomeAdvance = useCallback(async () => {
    if (sectionIndex !== 1 || isWiping) {
      return;
    }

    await triggerWipe(() => {
      setSectionIndex(2);
    });
  }, [isWiping, sectionIndex, triggerWipe]);

  const handleJourneyNav = useCallback(
    (direction: -1 | 1) => {
      stepJourney(direction);
    },
    [stepJourney],
  );

  const activeSection = useMemo(() => {
    switch (sectionIndex) {
      case 0:
        return <LoaderSection onEnter={handleLoaderEnter} />;
      case 1:
        return <WelcomeSection userName={userName || "Guest"} onAutoAdvance={handleWelcomeAdvance} />;
      case 2:
        return <HelloSection userName={userName || "Guest"} />;
      case 3:
        return (
          <JourneySection
            items={experience}
            activeIndex={journeyIndex}
            onNavigate={handleJourneyNav}
            onOpenDetail={openDetail}
          />
        );
      case 4:
        return <ProjectsSection items={projects} onOpenDetail={openDetail} />;
      case 5:
        return <AwardsSection items={awards} onOpenDetail={openDetail} />;
      case 6:
        return (
          <SkillsSection
            categories={skillCategories}
            publication={publication}
            onOpenDetail={openDetail}
          />
        );
      case 7:
        return (
          <PublicationSection
            title={publication.title}
            doi={publication.doi}
            doiUrl={publication.doiUrl}
            pdfPath={publication.pdfPath}
          />
        );
      case 8:
      default:
        return <ResumeSection />;
    }
  }, [
    handleJourneyNav,
    handleLoaderEnter,
    handleWelcomeAdvance,
    journeyIndex,
    openDetail,
    sectionIndex,
    userName,
  ]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[var(--cream)]">
      <BackgroundCanvas />
      <EarthLineArt />

      <main className="relative z-20 h-screen w-screen">{activeSection}</main>

      <PrevButton
        hidden={sectionIndex <= 1}
        disabled={isWiping || Boolean(detailPayload)}
        onClick={retreatByIntent}
      />

      <NextButton
        hidden={sectionIndex <= 1 || sectionIndex >= LAST_SECTION_INDEX}
        disabled={isWiping || Boolean(detailPayload)}
        onClick={advanceByIntent}
      />

      {shouldShowSpaceHint && (
        <div
          key={`space-hint-${sectionIndex}`}
          className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
          data-nav-ignore="true"
        >
          <div className="glass-card animate-[spaceHint_2s_ease_forwards] rounded-[3px] border border-[rgba(201,168,108,0.36)] px-4 py-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--gold)]">
              Press Space For Next
            </p>
          </div>
        </div>
      )}

      <CloudWipe active={isWiping} onMidpoint={handleMidpoint} onComplete={handleComplete} />

      <DetailModal open={Boolean(detailPayload)} data={detailPayload} onClose={closeDetail} />
    </div>
  );
}

export default App;
