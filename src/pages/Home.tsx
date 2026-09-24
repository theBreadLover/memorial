import images from "../utils/images.ts";
import Section from "../components/Section.tsx";

export default function Home () {
	return (
		<>
			<header className="relative max-w-2xl mx-auto mb-10" role="banner">
				<h1
					id="memorial-title"
					className="text-2xl sm:text-3xl font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-accent-color"
				>
					In Memory Of
				</h1>

				<figure className="mt-6 sm:mt-8 flex flex-col items-center">
					<div className="portrait-ring">
						<img
							src={images[1].src}
							alt="Portrait of Edwin Hernandez"
							className="w-full h-full rounded-full object-cover border-4 border-white"
						/>
					</div>
					<figcaption className="sr-only">Edwin Hernandez</figcaption>
				</figure>

				<p
					className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal mt-4 text-title-color"
					aria-label="Person's name"
				>
					Edwin Hernandez
				</p>
				<time
					className="block mt-2 text-sm sm:text-base tracking-wide text-muted-color"
					dateTime="2006 - 2025"
				>
					2006 - 2025
				</time>

				{/*
					Optional: a real quote from or about Edwin, in his own community's words.
					Uncomment and fill in when you have one — nothing invented in the meantime.

					<p className="font-serif italic text-base sm:text-lg mt-5 max-w-md mx-auto text-title-color">
						"..."
					</p>
				*/}
			</header>

			{/* Introduction Section */}
			<Section
				title="Introduction"
				text="He touched many lives with his kindness, strength, and warmth.
          His story lives on in the hearts of those who knew him."
			/>

			{/* Interaction Section */}
			<Section
				title={"Interactions"}
				text={"Edwin was a easy-going guy that always managed to get along with everybody that He approached"}
			/>

			{/* Memories Section */}
			<section
				className="section-container"
				aria-labelledby="memories-title"
			>
				<h2
					id="memories-title"
					className="section-title"
				>
					Favorite Memories
				</h2>
				<ul className="list-disc list-inside text-slate-600 space-y-2">
					<li>Going to the gym together.</li>
					<li>Edwin telling about his progress on his goal to get a new bike.</li>
					<li>Going to ice-skate every weekend.</li>
				</ul>
			</section>

			{/* Messages Section */}
		</>
	);
};