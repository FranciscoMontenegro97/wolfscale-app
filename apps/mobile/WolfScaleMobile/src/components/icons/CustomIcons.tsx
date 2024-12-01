import React from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react-native';

export interface CustomIconProps {
  stroke?: string;
  size?: number;
}

export const CustomCheck = (props: CustomIconProps) => (
  <Check {...props} />
);

export const CustomChevronLeft = (props: CustomIconProps) => (
  <ChevronLeft {...props} />
);

export const CustomChevronRight = (props: CustomIconProps) => (
  <ChevronRight {...props} />
);