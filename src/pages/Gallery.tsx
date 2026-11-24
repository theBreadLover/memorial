import { useEffect, useRef, useState } from "react";
import images from "../utils/images.ts";
import PhotoCard from "../components/PhotoCard.tsx";
import { getApprovedMessages } from "../utils/messageStore.ts";
import { getSignedUrl } from "../utils/imageStore.ts";

type GalleryItem = {
	id: string;
	path: string;
	caption: string;
}

function LazyPhoto({item}: {item: GalleryItem}) {
	const [src, setSrc] = useState<string | null>(null);
	const [hasError, setHasError] = useState(false);
	const ref = useRef<HTMLLIElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					getSignedUrl(item.path)
						.then((url) => {
							if (url) {
								setSrc(url);
							} else {
								setHasError(true);
							}
						})
						.catch(() => setHasError(true));
					observer.disconnect();
				}
			},
			{rootMargin: "200px"}
		);

		observer.observe(element);

		return () => observer.disconnect();
	}, [item.path])

	return (
		<li ref={ref}>
			{src ? (
				<PhotoCard imgSrc={src} caption={item.caption} />
			) : hasError ? (
				<div className="gallery-figure h-48 sm:h-64 w-full bg-background-color border border-linen-border flex items-center justify-center text-xs text-charcoal-faint p-2 text-center rounded-xl">
					Unable to load image
				</div>
			) : (
				<div className="gallery-figure h-48 sm:h-64 w-full bg-sage-light animate-pulse rounded-xl" />
			)}
		</li>
	)
}

export default function Gallery() {
	const [photos, setPhotos] = useState<GalleryItem[]>([]);

	useEffect(() => {
		async function load(){
			const curated: GalleryItem[] = images.map((image) => ({
				id: image.id,
				path: image.path,
				caption: image.quote,
			}));

			try {
				const messages = await getApprovedMessages();
				const submitted: GalleryItem[] = messages
					.filter((message) => Boolean(message.imagePath))
					.map((message) => ({
						id: message.id,
						path: message.imagePath as string,
						caption: `Sent by ${message.author}`,
					}));

				setPhotos([...curated, ...submitted]);
			} catch {
				setPhotos(curated);
			}
		}

		load();
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