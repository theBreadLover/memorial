import { useEffect, useRef, useState } from "react";
import images from "../utils/images.ts";
import PhotoCard from "../components/PhotoCard.tsx";
import { getApprovedMessages } from "../utils/messageStore.ts";
import { getSignedUrl } from "../utils/imageStore.ts";

type GalleryItem = {
	id: string;
	src: string;
	caption: string;
}

function LazyPhoto({item}: {item: GalleryItem}) {
	const [src, setSrc] = useState<string | null>(null);
	const ref = useRef<HTMLLIElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					getSignedUrl(item.src).then(setSrc);
					observer.disconnect();
				}
			},
			{rootMargin: "200px"}
		);

		observer.observe(element);

		return () => observer.disconnect();
	}, [item.src])

	return (
		<li ref={ref}>
			{
				src
					? (<PhotoCard imgSrc={src} caption={item.caption} />)
					: (<div className="gallery-figure h-48 sm:h-64 w-full bg-sky-500/50 animate-pulse"/>)
			}
		</li>
	)
}

export default function Gallery() {
	const [photos, setPhotos] = useState<GalleryItem[]>([]);

	useEffect(() => {
		async function load(){
			const curated = await Promise.all(
				images.map(async (image) => {
					const src = await getSignedUrl(image.path);
					return src ? {id: image.id, src, caption: image.quote} : null;
				})
			);

			const messages  = await getApprovedMessages();
			const submitted = await Promise.all(
				messages
					.filter((message) => message.imagePath)
					.map(async (message) => {
						const src = await getSignedUrl(message.imagePath as string);
						return src ? {id: message.id, src, caption: `Sent by ${message.author}`} : null;
					})
			)

			setPhotos([...curated, ...submitted].filter((photo): photo is GalleryItem => photo !== null));
		}

		load().catch(() => setPhotos([]));
	}, []);

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
				{photos.map((photo) => (
					<LazyPhoto key={photo.id} item={photo} />
				))}
			</ul>
		</section>
	)
}