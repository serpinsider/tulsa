import { ComponentType, ReactElement } from 'react';
import { Feature, isFeatureEnabled } from '@/lib/features';

/**
 * Feature flag wrapper for React components
 */
export function withPageFeature<P extends object>(feature: Feature) {
  return function(Component: ComponentType<P>) {
    return function FeatureWrapper(props: P): ReactElement {
      if (!isFeatureEnabled(feature)) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-4">Feature Not Available</h1>
              <p className="text-gray-400">This feature is currently not available.</p>
            </div>
          </div>
        );
      }
      return <Component {...props} />;
    };
  };
}
