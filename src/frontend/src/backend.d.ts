import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface DemoRecord {
    id: bigint;
    name: string;
    createdAt: bigint;
    email: string;
    company: string;
    message: string;
}
export interface DemoRequest {
    name: string;
    email: string;
    company: string;
    message: string;
}
export interface backendInterface {
    listDemoRequests(): Promise<Array<DemoRecord>>;
    submitDemoRequest(req: DemoRequest): Promise<DemoRecord>;
}
