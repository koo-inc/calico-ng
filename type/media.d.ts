export interface Media {
    id?: string;
    meta: MediaMeta;
    payload: string;
}
export declare namespace Media {
    function of(meta: MediaMeta, payload: string): Media;
    function read(file: File): Promise<Media>;
}
export interface MediaMeta {
    name: string;
    size: number;
    type: string;
}
export declare namespace MediaMeta {
    function of(file: File): MediaMeta;
}
