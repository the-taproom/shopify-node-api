/// <reference types="node" />
import http from 'http';
import { DeliveryMethod, RegisterOptions, RegisterReturn } from './types';
interface RegistryInterface {
    /**
     * Registers the Webhooks provided in the Context WEBHOOKS_REGISTRY
     *
     * @param options Parameters to register the Webhooks, including shop, accessToken
     */
    register(options: RegisterOptions): Promise<RegisterReturn>;
    /**
     * Processes the webhook request received from the Shopify API
     *
     * @param request HTTP request received from Shopify
     * @param response HTTP response to the request
     */
    process(request: http.IncomingMessage, response: http.ServerResponse): Promise<void>;
    /**
     * Confirms that the given path is a webhook path
     *
     * @param string path component of a URI
     */
    isWebhookPath(path: string): boolean;
}
declare function buildCheckQuery(topic: string): string;
declare function buildQuery(topic: string, address: string, deliveryMethod?: DeliveryMethod, webhookId?: string): string;
declare const WebhooksRegistry: RegistryInterface;
export { WebhooksRegistry, RegistryInterface, buildCheckQuery, buildQuery };
//# sourceMappingURL=registry.d.ts.map