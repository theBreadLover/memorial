import PhotoCard from "./PhotoCard.tsx";

type properties = {
	title: string,
	image: {
		src: string,
		quote: string
	},
	text: string
}

export default function Section({title, image, text}: properties) {
	const separatedText: string[] = text.trim().split("\n");

	return (
		<>
			<section className="article-section">
				<h2 className="section-title">{title}</h2>
				<PhotoCard imgSrc={image.src} caption={image.quote} />
				{separatedText.map((paragraph: string, index: number)=> {
					return (
						<p key={index} className="article-text">{paragraph.trim()}</p>
					)
				})}
			</section>
		</>
	)
}