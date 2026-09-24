type properties = {
	imgSrc: string,
	caption: string,
}

export default function PhotoCard({imgSrc, caption}: properties) {
	return (
		<>
			<figure className="gallery-figure">
				<img src={imgSrc}
				     alt={caption}
				     className="w-full h-64 object-contain rounded-lg"/>
				<figcaption className="p-2 text-sm text-slate-600 text-center">{caption}</figcaption>
			</figure>
		</>
	)
}