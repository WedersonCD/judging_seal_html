export interface Seal {
    seal_name: string,
    seal_rate: number,
    seal_createdAt: string,
    seal_updatedAt: string,
    seal_hashtags: string[],
    seal_isOnLastest: Boolean,
    seal_description: string,
    user: string,
    date?:string | Date
}