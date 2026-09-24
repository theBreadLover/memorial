export type TributeMessage = {
	id: string;
	author: string;
	relation: string;
	text: string;
	createdAt: string;
	status: "pending" | "approved" | "rejected";
}

const STORAGE_KEY = "memorial_messages";

function readAllMessages(): TributeMessage[] {
	try {
		const raw= localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as TributeMessage[]) : seedSampleData();
	}
	catch {
		return [];
	}
}

function writeAllMessages(messages: TributeMessage[]): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function seedSampleData(): TributeMessage[] {
	const sample: TributeMessage[] = [
		{
			id: crypto.randomUUID(),
			author: "John Doe",
			relation: "Friend",
			text: "You will always be in our hearts. Thank you for the love and guidance you gave us.",
			createdAt: new Date().toISOString(),
			status: "approved",
		},
		{
			id: crypto.randomUUID(),
			author: "Michael Smith",
			relation: "Family",
			text: "You will always be in our hearts. Thank you for the love and guidance you gave us.",
			createdAt: new Date().toISOString(),
			status: "approved",
		},
	];
	writeAllMessages(sample);
	return sample;
}

export function getAprovedMessages(): TributeMessage[] {
	return readAllMessages()
		.filter(message => message.status === "approved")
		.sort((a, b) => (a.createdAt <b.createdAt ? 1 : -1));
}

export function getPendingMessages(): TributeMessage[] {
	return readAllMessages()
		.filter(message => message.status === "pending")
		.sort((a, b) => (a.createdAt <b.createdAt ? 1 : -1));
}

export function submitMessage(author: string, relation: string, text: string): void {

	const messages: TributeMessage[] = readAllMessages();

	messages.push({
		id: crypto.randomUUID(),
		author: author.trim(),
		relation: relation.trim(),
		text: text.trim(),
		createdAt: new Date().toISOString(),
		status: "pending"
	});

	writeAllMessages(messages);
}

export function  approveMessage(id: string): void {
	const messages: TributeMessage[] = readAllMessages()
		.map((message) => message.id === id ? {...message, status: "approved"} : message);

	writeAllMessages(messages);
}

export function  rejectMessage(id: string): void {
	const messages: TributeMessage[] = readAllMessages()
		.map((message) => message.id === id ? {...message, status: "rejected"} : message);

	writeAllMessages(messages);
}