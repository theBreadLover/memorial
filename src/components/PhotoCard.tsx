type properties = {
	imgSrc: string,
	caption: string,
}

export default function PhotoCard({imgSrc, caption}: properties) {
	return (
		<figure className="gallery-figure bg-white border border-linen-border rounded-xl overflow-hidden shadow-xs">
			<div className="h-48 sm:h-64 w-full overflow-hidden bg-background-color">
				<img
					src={imgSrc}
					alt={caption}
					width={400}
					height={300}
					loading="lazy"
					decoding="async"
					className="w-full h-full object-cover"
				/>
			</div>
			<figcaption className="p-2.5 text-xs sm:text-sm text-muted-color text-center font-sans">{caption}</figcaption>
		</figure>
	)
}