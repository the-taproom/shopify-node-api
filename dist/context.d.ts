import { SessionStorage } from './auth/session/session_storage';
import { ContextParams } from './base_types';
import { AuthScopes } from './auth/scopes';
import { WebhookRegistry } from './webhooks/types';
interface ContextInterface extends ContextParams {
    SESSION_STORAGE: SessionStorage;
    SCOPES: AuthScopes;
    WEBHOOKS_REGISTRY: WebhookRegistry;
    /**
     * Sets up the Shopify API Library to be able to integrate with Shopify and run authenticated commands.
     *
     * @param params Settings to update
     */
    initialize(params: ContextParams): void;
    /**
     * Throws error if context has not been initialized.
     */
    throwIfUninitialized(): void | never;
    /**
     * Throws error if the current app is private.
     */
    throwIfPrivateApp(message: string): void | never;
}
declare const Context: ContextInterface;
export { Context, ContextInterface };
//# sourceMappingURL=context.d.ts.map