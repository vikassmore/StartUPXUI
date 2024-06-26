import { Time } from "@angular/common";

export interface IncidentEditRegistration {
    incidentid: number;
    incidentdate: Date;
    incidenttime: Time;
    incidentlocation: string;
    incidentmessage: string;
    incidentcontributerid: number;
    status:string;
}