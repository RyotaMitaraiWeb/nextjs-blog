import { WriterGuard } from "./WriterGuard";

/**
 * Returns ``true`` if the user and the author's IDs match and the user can create articles
 */
export function AuthorGuard(userId: string = '', authorId: string = '', role: string = 'guest') {
    return userId === authorId && WriterGuard(role);
}