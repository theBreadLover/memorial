import PhotoCard from "../components/PhotoCard.tsx";
import images from "../utils/images.ts";

export default function Gallery() {
	return (
		<div className="gallery-container">
			{images.map(image => (
				<PhotoCard imgSrc={image.src} caption={image.quote} />
			))}
		</div>
	)
}