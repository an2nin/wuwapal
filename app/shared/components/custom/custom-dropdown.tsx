import { Check, ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import ThemedGradientText from '../themed-gradient-text';

interface DropdownOption {
  id: string;
  name: string;
}

interface ModernDropdownProps {
  options: DropdownOption[];
  current?: string;
  onSelect: (id: string) => void;
  className?: string;
}

export default function CustomDropdown({
  options,
  current,
  onSelect,
  className = '',
}: ModernDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(current || options[0]?.id);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.id === selectedId);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionId: string) => {
    setSelectedId(optionId);
    onSelect(optionId);
    setIsOpen(false);
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // Small delay to prevent flickering
  };

  return (
    <div
      className={`relative min-w-72 inline-block ${className}`}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        type="button"
        className="group relative inline-flex items-center justify-between min-w-[200px] p-3 rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
      >
        <div className="flex items-center">
          <ThemedGradientText className="lg:text-3xl text-2xl hover:cursor-pointer animate-pulse">
            {selectedOption?.name || 'Select Option'}
          </ThemedGradientText>
        </div>
        <ChevronDown
          className={`w-5 h-5 ml-3 text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} group-hover:text-white`}
        />
      </button>

      {/* Dropdown Content */}
      <div className={`absolute top-full left-0 right-0 mt-2 z-50 transition-all duration-300 origin-top ${
        isOpen
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
      }`}
      >
        <div className="bg-card border rounded-xl shadow-xl backdrop-blur-sm overflow-hidden">
          <div className="">
            {options.map((option, index) => (
              <button
                type="button"
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`w-full px-6 py-3 text-left flex items-center cursor-pointer justify-between transition-all duration-200 group ${
                  selectedId === option.id
                    ? 'bg-primary text-white font-bold'
                    : 'text-gray-300 hover:bg-primary/10 hover:text-white'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    selectedId === option.id
                      ? 'bg-gradient-to-r from-white to-white'
                      : 'bg-background group-hover:bg-primary/10'
                  }`}
                  >
                  </div>
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                    {option.name}
                  </span>
                </div>
                {selectedId === option.id && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
