import {supabase} from "./supabaseClient.ts";

const BUCKET = 'memorial-uploads';
const SIGNED_URL_EXPIRY_SECONDS = 60 * 60; // 1 Hour -- regenerated on every page load

export async function uploadImage (file: File): Promise<string> {
	const extension: string = file.name.split('.').pop() || 'jpg';

	const path: string = `pending/${crypto.randomUUID()}.${extension}`;

	const { error } = await supabase.storage
		.from(BUCKET)
		.upload(path, file);

	if (error) throw error;

	return path;
}

export async function getSignedUrl (path: string): Promise<string | null> {
	const {data, error} = await supabase.storage
		.from(BUCKET)
		.createSignedUrl(path, SIGNED_URL_EXPIRY_SECONDS);

	if (error || !data) throw error;

	return data.signedUrl;
}

export async function approvedImage (pendingPath: string): Promise<string> {
	const approvedPath = pendingPath.replace(/^pending\//,'approved/');

	const { error } = await supabase.storage
		.from(BUCKET)
		.move(pendingPath, approvedPath);

	if (error) throw error;

	return approvedPath;
}

export async function removeImage (path: string): Promise<void> {
	const { error } = await supabase.storage
		.from(BUCKET)
		.remove([path]);

	if (error) throw error;
}