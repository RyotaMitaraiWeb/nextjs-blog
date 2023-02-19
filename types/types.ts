/**
 * Description of each role:
 * * **guest** - the role of unauthenticated users. Guests can view articles and user profiles, but
 * do not have access to any non-GET methods.
 * * **user** - the default role of any authenticated user. Users can comment on articles.
 * * **writer** - writers can publish articles, as well as edit and delete the ones they have published.
 * **Note:** writers that have been demoted to user won't be able to edit or delete their articles.
 * * **admin** - admins can edit and delete *any* article, regardless of whether they are its author or not
 * * **superadmin** - super admins can promote users up to an admin and demote them down to a user.
 * **Note:** this role cannot be assigned via APIs; this must be done in the database itself.
 */
export type role = 'guest' | 'user' | 'writer' | 'admin' | 'superadmin';

/**
 * ```typescript
 * interface IArticleSubmission {
    title?: string;
    content?: string;
}
 * ```
 * Validation model for creating and editing articles
 */
export interface IArticleSubmission {
    title?: string;
    content?: string;
}

/**
 * ```typescript
 * interface IArticle {
    title: string;
    content: string;
    createdAt: string;
    userId: string;
    author: {
        id: string;
        name: string;
    }
}
 * ```
 */
export interface IArticle {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    userId: string;
    author: {
        id: string;
        name: string;
        image: string;
    }
}

/**
 * ```typescript
 * interface IArticleCard {
    id: string;
    title: string;
    createdAt: string;
    author: {
        name: string;
        image: string;
    }
}
 * ```
 */
export interface IArticleCard {
    id: string;
    title: string;
    createdAt: string;
    author: {
        id: string;
        name: string;
        image: string;
    }
}