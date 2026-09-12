import PhotoCard from "../components/PhotoCard.tsx";
import images from "../utils/images.ts";

export default function Gallery() {
	return (
		<div className="bg-contrast-color">
			{images.map(image => (
				<PhotoCard imgSrc={image.src} caption={image.quote} key={image.id}/>
			))}
		</div>
	)
}