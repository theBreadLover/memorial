type props = {
	imgSrc: string,
	caption: string,
}

export default function PhotoCard({imgSrc, caption}: props) {
	return (
		<>
			<figure>
				<img src={imgSrc}
				     alt={caption}
				     className="w-full h-64 object-contain rounded-lg"/>
				<figcaption className="p-2 text-sm text-gray-700">{caption}</figcaption>
			</figure>
		</>
	)
}