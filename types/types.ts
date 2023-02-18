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

export interface IArticleSubmission {
    title?: string;
    content?: string;
}