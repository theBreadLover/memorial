import images from "../utils/images.ts";
import PhotoCard from "../components/PhotoCard.tsx";

export default function Gallery() {
	return (
		<section
			className="section-container"
			aria-labelledby="gallery-title"
		>
			<h2
				id="gallery-title"
				className="text-2xl font-semibold border-b  border-red-700 pb-2 mb-4"
			>
				Gallery
			</h2>
			<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{images.map((image) => (
					<li key={image.id}>
						<PhotoCard
							imgSrc={image.src}
							caption={image.quote}
						/>
					</li>
				))}
			</ul>
		</section>
	)
}