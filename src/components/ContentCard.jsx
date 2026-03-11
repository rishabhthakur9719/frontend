import React from 'react';
import RoleBadge from './RoleBadge';

const ContentCard = ({ title, content, themeColor = 'navy-light', actionButtons, profile }) => {
  return (
    <div
      className={`bg-${themeColor} rounded-xl shadow-lg border border-white/5 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-white/10`}
    >
      <div className="p-6 border-b border-white/5 flex justify-between items-start">
        <h3 className="text-xl font-bold text-text-primary">{title}</h3>
        {profile && <RoleBadge profile={profile} />}
      </div>
      
      <div className="p-6 flex-grow text-text-muted leading-relaxed whitespace-pre-wrap">
        {content}
      </div>

      {actionButtons && (
        <div className="px-6 py-4 bg-navy-dark/30 border-t border-white/5 flex justify-end items-center gap-3">
          {actionButtons}
        </div>
      )}
    </div>
  );
};

export default ContentCard;
