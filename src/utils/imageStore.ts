import {supabase} from "./supabaseClient.ts";

const BUCKET = 'memorial-uploads';
const SIGNED_URL_EXPIRY_SECONDS = 60 * 60; // 1 Hour -- regenerated on every page load
const MAX_DIMENSIONS = 1600;
const JPEG_QUALITY = 0.8;

function compressImage(file: File): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const image = new Image();
		const objectUrl = URL.createObjectURL(file);

		image.onload = () => {
			URL.revokeObjectURL(objectUrl);

			let { width, height } = image;
			if (width > MAX_DIMENSIONS || height > MAX_DIMENSIONS) {
				if (width >= length) {
					height = Math.round(height * MAX_DIMENSIONS / width);
					width = MAX_DIMENSIONS;
				} else {
					width = Math.round(width * MAX_DIMENSIONS / height);
					height = MAX_DIMENSIONS;
				}
			}

			const canvas: HTMLCanvasElement = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;

			const context = canvas.getContext("2d");
			if (!context) {
				reject(new Error('No canvas context.'));
				return;
			}
			context.drawImage(image, 0, 0, width, height);

			canvas.toBlob((blob) => (
				blob ? resolve(blob) : reject(new Error('compression failed'))),
				"image/jpeg",
				JPEG_QUALITY
			)
		}

		image.onerror = () => {
			URL.revokeObjectURL(objectUrl);
			reject(new Error('Could not read image'));
		};

		image.src = objectUrl;
	})
}

export async function uploadImage (file: File): Promise<string> {
	const compressed = await compressImage(file);

	const path: string = `pending/${crypto.randomUUID()}.jpg`;

	const { error } = await supabase.storage
		.from(BUCKET)
		.upload(path, compressed, {
			contentType: "image/jpeg",
		});

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