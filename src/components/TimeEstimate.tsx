import { calculateCleaningTime, getTimeWindow } from '@/lib/timeCalculator';
import type { ServiceType, SquareFootage } from '@/lib/timeCalculator';

interface TimeEstimateProps {
  squareFootage: SquareFootage;
  bedrooms: string;
  bathrooms: string;
  serviceType: ServiceType;
  addons: string[];
  showDetailed?: boolean;
  className?: string;
}

export default function TimeEstimate({
  squareFootage,
  bedrooms,
  bathrooms,
  serviceType,
  addons,
  showDetailed = false,
  className = ''
}: TimeEstimateProps) {
  const calculation = calculateCleaningTime({
    squareFootage,
    bedrooms,
    bathrooms,
    serviceType,
    addons
  });

  const timeWindow = getTimeWindow(calculation.totalMinutes);

  if (!showDetailed) {
    return (
      <div className={`text-sm ${className}`}>
        <span className="text-gray-400">Estimated Time:</span>
        <span className="ml-2 text-white">{timeWindow}</span>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-sm font-medium text-gray-400">Time Estimate</h3>
        <p className="text-lg font-medium text-white">{timeWindow}</p>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-400">Base Time</p>
          <div className="mt-1 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Square Footage</span>
              <span className="text-white">{calculation.breakdown.base.details.squareFootage.minutes}m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Bedrooms</span>
              <span className="text-white">{calculation.breakdown.base.details.bedrooms.minutes}m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Bathrooms</span>
              <span className="text-white">{calculation.breakdown.base.details.bathrooms.minutes}m</span>
            </div>
          </div>
        </div>

        {calculation.breakdown.serviceType.minutes > 0 && (
          <div>
            <p className="text-sm text-gray-400">Service Type Addition</p>
            <div className="mt-1 flex justify-between text-sm">
              <span className="text-gray-300">{serviceType}</span>
              <span className="text-white">{calculation.breakdown.serviceType.minutes}m</span>
            </div>
          </div>
        )}

        {calculation.breakdown.addons.items.length > 0 && (
          <div>
            <p className="text-sm text-gray-400">Add-ons</p>
            <div className="mt-1 space-y-1 text-sm">
              {calculation.breakdown.addons.items.map((addon) => (
                <div key={addon.name} className="flex justify-between">
                  <span className="text-gray-300">{addon.name}</span>
                  <span className="text-white">{addon.minutes}m</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-gray-700">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-300">Total Time</span>
            <span className="font-medium text-white">{calculation.totalMinutes}m</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            * Time estimates include a 20% buffer for unexpected situations
          </p>
        </div>
      </div>
    </div>
  );
}