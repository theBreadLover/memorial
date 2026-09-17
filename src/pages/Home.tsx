import images from "../utils/images.ts";
import Section from "../components/Section.tsx";
// import images from "../utils/images.ts";

export default function Home () {
	return (
		<>
			<header className="text-center mb-10 max-w-2xl w-full" role="banner">
				<h1 id="memorial-title" className="text-3xl font-semibold tracking-[0.3em] uppercase text-red-700">
					In Memory Of
				</h1>
				<figure className="mt-8 flex flex-col items-center">
					<img
						src={images[1].src}
						alt="Portrait of Edwin Hernandez"
						className="w-48 h-48 rounded-full object-cover border-3 border-black shadow-xl"
					/>
					<figcaption className="sr-only">Edwin Hernandez</figcaption>
				</figure>
				<p className="text-2xl font-bold mt-4" aria-label="Person's name">
					Edwin Hernandez
				</p>
				<time
					className="Text-gray-600 mt-1 block" dateTime="2006 - 2025">
					2006 - 2025
				</time>
			</header>

			{/* Introduction Section */}
			<Section
				title="Introduction"
				text="They touched many lives with their kindness, strength, and warmth.
					Their story lives on in the hearts of those who knew them."
			/>

			{/* Interaction Section */}
			<Section
				title={"Interactions"}
				text={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, laborum!"}
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
				<ul className="list-disc list-inside text-gray-700 space-y-2">
					<li>Going to the gym together.</li>
					<li>Edwin telling about his progress on his goal to get a new bike.</li>
					<li>Going to ice-skate every weekend.</li>
				</ul>
			</section>

			{/* Messages Section */}
		</>
	);
};
