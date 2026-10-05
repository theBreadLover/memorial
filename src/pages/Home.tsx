import { useEffect, useState } from "react";
import images from "../utils/images.ts";
import Section from "../components/Section.tsx";
import { getSignedUrl } from "../utils/imageStore.ts";

export default function Home () {
	const [protraitUrl, setProtraitUrl] = useState<string | null>(null);

	useEffect(() => {
		getSignedUrl(images[1].path).then(setProtraitUrl);
	}, [])

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
						{protraitUrl && (
							<img
								src={protraitUrl}
								alt="Portrait of Edwin Hernandez"
								className="w-full h-full rounded-full object-cover border-4 border-white"
							/>
						)}
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
			</header>

			{/* Introduction Section */}
			<Section
				title="Introduction"
				text="He touched many lives with his kindness, strength, and warmth. His story lives on in the hearts of those who knew him.
          He was a dreamer who always worked hard to acomplished his many achievements."
			/>

			{/* Interaction Section */}
			<Section
				title={"Interactions"}
				text={"Edwin was a easy-going guy that always managed to get along with everybody that He approached. He always liked to take part in group" +
					" outings and celebrations, as well as going to events whis his motorcycle.\nHe was open to new adventures with friends. He used to go" +
					" ice-skating every weekend and work out at the gym the rest of the week.\nRiding his mototrycle to new places every night when he was" +
					" not busy.\n Also discovering new places to eat and chill was also another hobby of his."}

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
		</>
	);
};