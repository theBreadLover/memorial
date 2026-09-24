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
				className="section-title"
			>
				Gallery
			</h2>
			<ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6">
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