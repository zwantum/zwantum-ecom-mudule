import type { ModuleManifest } from '@zwantum/shared-types';

/**
 * @zwantum/module-sdk
 * Extensibility framework for developing optional commerce modules.
 * Standardizes registration, configuration validation, permissions, and lifecycle hooks.
 */

export interface AdminNavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  requiredPermission?: string;
}

export interface CommerceModule<TConfig = unknown> {
  readonly manifest: ModuleManifest;

  /** Lifecycle hook invoked when the module is initialized into the host API */
  onInit?(context: { storeId: string; config: TConfig }): Promise<void>;

  /** Lifecycle hook invoked on application shutdown */
  onDestroy?(): Promise<void>;

  /** Optional navigation contribution to the Admin Panel */
  getAdminNavigation?(): AdminNavigationItem[];
}

export function defineCommerceModule<TConfig = unknown>(
  moduleDefinition: CommerceModule<TConfig>
): CommerceModule<TConfig> {
  return moduleDefinition;
}
