type properties = {
	imgSrc: string,
	caption: string,
}

export default function PhotoCard({imgSrc, caption}: properties) {
	return (
		<>
			<figure className="gallery-figure">
				<div className="h-48 sm:h-64 w-full overflow-hidden bg-sky-50/50">
					<img src={imgSrc}
							 alt={caption}
							 loading="lazy"
							 decoding="async"
							 className="w-full h-full object-cover"
					/>
				</div>
				<figcaption className="p-2 text-sm text-slate-600 text-center">{caption}</figcaption>
			</figure>
		</>
	)
}