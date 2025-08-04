import React, { useState } from 'react';

export interface DataPoint {
  label: string;
  value: number;
  color: string;
  hoverColor: string;
}

interface TooltipProps {
  visible: boolean;
  x: number;
  y: number;
  data: DataPoint | null;
  percentage: number;
}

const Tooltip: React.FC<TooltipProps> = ({ visible, x, y, data, percentage }) => {
  if (!visible || !data)
    return null;

  return (
    <div
      className="absolute z-10 bg-white rounded-lg shadow-xl border border-gray-200 p-3 pointer-events-none transform -translate-x-1/2 -translate-y-full"
      style={{ left: x, top: y - 10 }}
    >
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: data.color }}
        />
        <span className="font-semibold text-gray-800">{data.label}</span>
      </div>
      <div className="text-sm text-gray-600">
        <div>
          Total:
          {data.value.toLocaleString()}
        </div>
        <div>
          Percentage:
          {percentage.toFixed(1)}
          %
        </div>
      </div>
    </div>
  );
};

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians)),
  };
}

interface Props {
  data: DataPoint[];
}

export default function PieChart({ data }: Props) {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [tooltipData, setTooltipData] = useState<{
    visible: boolean;
    x: number;
    y: number;
    data: DataPoint | null;
    percentage: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
    data: null,
    percentage: 0,
  });

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const size = 280;
  const center = size / 2;
  const radius = 100;

  const createPath = (startAngle: number, endAngle: number, isHovered: boolean) => {
    const adjustedRadius = isHovered ? radius + 8 : radius;
    const start = polarToCartesian(center, center, adjustedRadius, endAngle);
    const end = polarToCartesian(center, center, adjustedRadius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M',
      center,
      center,
      'L',
      start.x,
      start.y,
      'A',
      adjustedRadius,
      adjustedRadius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      'Z',
    ].join(' ');
  };

  const handleMouseEnter = (index: number, event: React.MouseEvent) => {
    setHoveredSegment(index);
    const rect = event.currentTarget.getBoundingClientRect();
    const percentage = (data[index].value / total) * 100;

    setTooltipData({
      visible: true,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      data: data[index],
      percentage,
    });
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null);
    setTooltipData({ ...tooltipData, visible: false });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (tooltipData.visible) {
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltipData({
        ...tooltipData,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  const handleSvgMouseLeave = () => {
    setHoveredSegment(null);
    setTooltipData(prev => ({ ...prev, visible: false }));
  };

  let currentAngle = 0;

  return (
    <div className="relative">
      <svg
        width={size}
        height={size}
        className="drop-shadow-lg"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleSvgMouseLeave}
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(0,0,0,0.1)" />
          </filter>
        </defs>

        {data.map((item, index) => {
          const angle = (item.value / total) * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;
          const isHovered = hoveredSegment === index;

          currentAngle += angle;

          return (
            <path
              key={index}
              d={createPath(startAngle, endAngle, isHovered)}
              fill={isHovered ? item.hoverColor : item.color}
              stroke="white"
              strokeWidth="3"
              className="transition-all duration-300 ease-out cursor-pointer"
              style={{ filter: 'url(#shadow)' }}
              onMouseEnter={e => handleMouseEnter(index, e)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </svg>

      <Tooltip {...tooltipData} />
    </div>
  );
};
