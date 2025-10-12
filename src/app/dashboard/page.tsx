import CallToAction from "@/components/CallToAction";
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import { GetAllCompanions, GetRecentSessions } from "@/lib/actions/companions.actions";
import { getSubjectColor } from "@/lib/utils";

const DashboardPage = async () => {

    const companions = await GetAllCompanions({ limit: 3 });
    const recentSessionsCompanion = await GetRecentSessions();

    return (
        <main>
            <h1 className="text-2xl underline">Popular Companions</h1>
            <section className="home-section">
                {companions.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        id={companion.id}
                        name={companion.name}
                        topic={companion.topic}
                        subject={companion.subject}
                        duration={companion.duration}
                        color={getSubjectColor(companion.subject)}
                    />
                ))}
            </section>
            <section className="home-section">
                <CompanionsList
                    title='Recently Completed Sessions'
                    companions={recentSessionsCompanion}
                    classNames='w-2/3 max-lg:w-full'
                />
                <CallToAction />
            </section>
        </main>
    );
};

export default DashboardPage;