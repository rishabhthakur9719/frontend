import React from 'react';

const RoleBadge = ({ profile }) => {
  // Map profiles to distinct accessible, professional colors
  const profileStyles = {
    ADHD: 'bg-purple-light/20 text-purple-light border border-purple-light/40',
    Dyslexia: 'bg-yellow/20 text-yellow border border-yellow/40',
    Autism: 'bg-green/20 text-green border border-green/40',
    Default: 'bg-navy-light text-text-muted border border-text-muted/40',
  };

  const currentStyle = profileStyles[profile] || profileStyles['Default'];

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm ${currentStyle}`}
    >
      {profile}
    </span>
  );
};

export default RoleBadge;
