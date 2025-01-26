import { Identifier } from "../types/Identifier";
import { Response, ResponseError, ResponseEvent } from "../types/Response";

export default class MessageEmitter {
    #listeners: Map<Identifier, ResponseEvent> = new Map();

    addListener(id: Identifier, listener: ResponseEvent) {
        this.#listeners.set(id, listener);
    }

    emit(data: Response | ResponseError) {
        if (!["number", "string"].includes(typeof data.id))
            // TODO Implement notifications
            return console.error("[AuroraRPC] Broken request: ", data);

        if (!this.#listeners.has(data.id))
            return console.error("[AuroraRPC] Unhandled request: ", data);

        this.#listeners.get(data.id)?.(data);
        this.#listeners.delete(data.id);
    }
}
