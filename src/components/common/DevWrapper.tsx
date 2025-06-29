import React from 'react';
import UnderDevelopment from '@/components/common/UnderDevelopment';
import { isComponentUnderDevelopment, isFeatureUnderDevelopment } from '@/config/appConfig';

interface DevWrapperProps {
  children: React.ReactNode;
  componentName?: string;
  featureName?: string;
  type?: 'component' | 'feature';
  description?: string;
  estimatedCompletion?: string;
}

export default function DevWrapper({ 
  children, 
  componentName, 
  featureName,
  type = 'component',
  description,
  estimatedCompletion 
}: DevWrapperProps) {
  const name = componentName || featureName;
  const isUnderDev = componentName 
    ? isComponentUnderDevelopment(componentName)
    : featureName 
    ? isFeatureUnderDevelopment(featureName)
    : false;

  if (isUnderDev && name) {
    return (
      <UnderDevelopment
        type={type}
        name={name}
        description={description}
        estimatedCompletion={estimatedCompletion}
        showBackButton={false}
      />
    );
  }

  return <>{children}</>;
}