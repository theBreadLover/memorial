import MessageSection from "../components/MessageSection.tsx";

export default function Messages() {
	return (
		<section
			className="section-container"
			aria-labelledby="messages-title"
		>
			<h2
			id="messages-title"
			className="text-xl font-semibold border-b border-red-700 pb-2 mb-4"
			>
			Messages Of Love
			</h2>
			<MessageSection
				author={"John Doe"}
				relation={"Friend"}
				text={"You will always be in our hearts. Thank you for the love and guidance you gave us."}
			/>

			<MessageSection
				author={"Michael Smith"}
				relation={"Family"}
				text={"You will always be in our hearts. Thank you for the love and guidance you gave us."}
			/>
		</section>
	)
}