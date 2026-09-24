import { useEffect, useState } from "react";
import MessageSection from "../components/MessageSection.tsx";
import MessageForm from "../components/MessageForm.tsx";
import { getAprovedMessages, type TributeMessage } from "../utils/messageStore.ts";

export default function Messages() {

	const [messages, setMessages] = useState<TributeMessage[]>([]);

	useEffect(() => {
		setMessages(getAprovedMessages());
	}, []);

	return (
		<section
			className="section-container"
			aria-labelledby="messages-title"
		>
			<h2
			id="messages-title"
			className="section-title"
			>
			Messages Of Love
			</h2>

			{messages.length === 0 ? (
				<p className="text-slate-500 mb-4">Be the first to share a memory.</p>
			) : (
				messages.map((message: TributeMessage) => (
					<MessageSection
						key={message.id}
						author={message.author}
						relation={message.relation}
						message={message.text}
					/>
				))
			)}

			<MessageForm />
		</section>
	)
}