import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

export function FileUpload() {
    return applyDecorators(UseInterceptors(FileInterceptor("file")));
}
