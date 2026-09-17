type properties = {
	author: string,
	relation: string,
	text: string,
}

export default function MessageSection({author, relation, text}: properties) {

	let paragraphs: string[] = text.trim().split('\n');

	return (
		<article
			className="border-l-4 border-red-700 pl-4 mb-4"
			aria-label={`Message from ${relation}`}
		>
			<h3 className="font-semibold text-lg">{author}</h3>
			{paragraphs.map((paragraph: string, index: number) => (
					<p key={index} className="text-gray-700">
						{paragraph.trim()}
					</p>
				))}
		{/**/}
		</article>
	)
}