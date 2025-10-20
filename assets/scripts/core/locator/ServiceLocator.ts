import { Component } from "cc";
import { ServiceKey } from "./ServiceKey";

export class ServiceLocator {
    private static services = new Map<ServiceKey, Component>();

    public static register<T extends Component>(key: ServiceKey, instance: T): void {
        this.services.set(key, instance);
    }

    public static unregister(key: ServiceKey): void {
        if (!this.services.get(key)) {
            console.warn("Not Found Component");
            return;
        }
        this.services.delete(key);
    }

    public static get<T extends Component>(key: ServiceKey): T | undefined {
        return this.services.get(key) as T || undefined;
    }
}


