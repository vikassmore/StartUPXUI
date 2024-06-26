import { Byte } from "@angular/compiler/src/util";

export class FunderDocumentModel {
    documentId: number
    documentName: string;
    documentFile: Byte;
    isActive: boolean;
    userId: number;
}