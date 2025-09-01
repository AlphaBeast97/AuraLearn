import CallToAction from "@/components/CallToAction";
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";

const Page = () => {
  return (
    <main>
      <h1 className="text-2xl underline">Popular Companions</h1>
      <section className="home-section">
        <CompanionCard
          id='1'
          name='Neura the Brainy explorer'
          topic='Neural network of the brain'
          subject='Neuroscience'
          duration={45}
          color='#ffda6e'
        />
        <CompanionCard
          id='2'
          name='Countsy the number wizard'
          topic='Derivatives & Integral'
          subject='Mathematics'
          duration={30}
          color='#e5d0ff'
        />
        <CompanionCard
          id='3'
          name='Verba the vocabulary builder'
          topic='English lecture'
          subject='Language'
          duration={30}
          color='#BDE7FF'
        />
      </section>
      <section className="home-section">
        <CompanionsList />
        <CallToAction />
      </section>
    </main>
  );
};

export default Page;

