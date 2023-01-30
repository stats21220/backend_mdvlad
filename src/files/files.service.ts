import { Injectable } from '@nestjs/common';
import {path} from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra'; //обеспечивает наличие директории (если нет то создает)
import { FileElementResponse } from './file-respose-element.response';
import * as sharp from 'sharp';
import { MFile } from './mfile';

@Injectable()
export class FilesService {

	async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
		const Folder  = `${path}/uploads`;
		await ensureDir(Folder);

		const res: FileElementResponse[] = [];

		for (const file of files) {
			const fileFolder = Folder + `/${file.originalname.split('.')[0]}`
			await ensureDir(fileFolder);
			await writeFile(`${fileFolder}/${file.originalname}`, file.buffer);
			res.push({url: `${fileFolder}/${file.originalname}`, name: file.originalname});
		}
		return res;
	}

	async converToWebp(file: Buffer): Promise<{resize: string, buffer: Buffer}[]> {
		const buffer: {resize: string, buffer: Buffer}[] = []

		const s = await sharp(file)
			.resize(320, 240)
			.webp()
			.toBuffer()
		
		const m = await sharp(file)
			.resize(700, 525)
			.webp()
			.toBuffer()

		const b = await sharp(file)
			.resize(1200, 900)
			.webp()
			.toBuffer()

		buffer.push(
			{resize: '320', buffer: s},
			{resize: '700', buffer: m},
			{resize: '1200', buffer: b}
			)

		// buffer.push(s, m, b)

		return buffer
		// return sharp(file)
		// 	.webp()
		// 	.toBuffer()
	}
}
