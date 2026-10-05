import { supabase } from "./supabaseClient.ts";

export type TributeMessage = {
	id: string;
	author: string;
	relation: string;
	message: string;
	createdAt: string;
	status: "pending" | "approved" | "rejected";
	imagePath: string | null;
}

function mapRow(row: any): TributeMessage {
	return {
		id: row.id,
		author: row.author,
		relation: row.relation,
		message: row.message,
		createdAt: row.created_at,
		status: row.status,
		imagePath: row.image_path ?? null,
	}
}

export async function getApprovedMessages(): Promise<TributeMessage[]> {
	const { data, error } = await supabase
		.from("messages")
		.select("*")
		.eq("status", "approved")
		.order("created_at", {ascending: false});

	if (error) throw error;

	return (data ?? []).map(mapRow);
}

export async function getPendingMessages(): Promise<TributeMessage[]> {
	const { data, error } = await supabase
		.from("messages")
		.select("*")
		.eq("status", "pending")
		.order("created_at", {ascending: false});

	if (error) throw error;

	return (data ?? []).map(mapRow);
}

export async function submitMessage(author: string, relation: string, text: string, imagePath: string | null = null): Promise<void> {
	const { error } = await supabase
		.functions
		.invoke("submit-message", {
			body: { author, relation, text, imagePath }
		});

	if (error) throw error;
}

export async function approveMessage(id: string): Promise<void> {
	const { error } = await supabase
		.from("messages")
		.update({status: "approved"})
		.eq("id", id);

	if (error) throw error;
}

export async function rejectMessage(id: string): Promise<void> {
	const { error } = await supabase
		.from("messages")
		.update({status: "rejected"})
		.eq("id", id);

	if (error) throw error;
}

export async function updateMessageImagePath (id: string, imagePath: string): Promise<void> {
	const { error } = await supabase
		.from("messages")
	 	.update({image_path: imagePath})
		.eq("id", id);

	if (error) throw error;
}