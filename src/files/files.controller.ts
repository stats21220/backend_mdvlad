import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileElementResponse } from './file-respose-element.response';
import { FilesService } from './files.service';
import { MFile } from './mfile';

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {

	}


	@Post('upload')
	// @UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
		
		console.log(file);
		
		
		const firstNameImage = file.originalname.split('.')
		const saveArray: MFile[] = [{
			originalname: `${firstNameImage[0]}.${firstNameImage[firstNameImage.length - 1]}`,
			buffer: file.buffer
		}]
		if (file.mimetype.includes('image')) { // тип изображения
			const buffers = await this.filesService.converToWebp(file.buffer)
			for (const buffer of buffers) {
				saveArray.push({
				originalname: `${file.originalname.split('.')[0]}.${buffer.resize}.webp`,
				buffer: buffer.buffer
			});
			}
		}
		
		return await this.filesService.saveFiles(saveArray)
	}
}
