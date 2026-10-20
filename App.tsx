import React, { useState } from 'react';
import {
  PortalHeader,
  NavTabId,
  OurCompanySubpage,
  OUR_COMPANY_DROPDOWN_ITEMS,
} from './components/PortalHeader';
import { PortalFooter } from './components/PortalFooter';
import { OurCompanyHero } from './components/OurCompanyHero';
import { CeoMottoSection } from './components/CeoMottoSection';
import { AboutKBZLifeSection } from './components/AboutKBZLifeSection';
import { VisionMissionPurposeSection } from './components/VisionMissionPurposeSection';
import { CoreValuesSection } from './components/CoreValuesSection';
import { AspirationsSection } from './components/AspirationsSection';
import { HubPlaceholderView } from './components/HubPlaceholderView';
import { ContentEditorModal } from './components/ContentEditorModal';
import { OurCompanyNewsPage } from './components/OurCompanyNewsPage';
import { CompanyUpdateVideoPage } from './components/CompanyUpdateVideoPage';
import { TopPerformerPage } from './components/TopPerformerPage';
import {
  defaultCompanyContent,
  samplePreviewCompanyContent,
  CompanyContentData,
} from './data/companyContent';
import { Sparkles, SlidersHorizontal, ChevronRight, Home } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTabId>('our-company');
  const [activeSubpage, setActiveSubpage] = useState<OurCompanySubpage>('overview');
  const [isPlaceholderMode, setIsPlaceholderMode] = useState<boolean>(true);
  const [customContent, setCustomContent] = useState<CompanyContentData | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  // Active content based on mode or user edits
  const activeContent: CompanyContentData = customContent
    ? customContent
    : isPlaceholderMode
    ? defaultCompanyContent
    : samplePreviewCompanyContent;

  const handleToggleMode = () => {
    setIsPlaceholderMode(!isPlaceholderMode);
    setCustomContent(null);
  };

  const handleSelectTab = (tabId: NavTabId, subpage?: OurCompanySubpage) => {
    setActiveTab(tabId);
    if (tabId === 'our-company') {
      setActiveSubpage(subpage || 'overview');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveCustomContent = (updated: CompanyContentData) => {
    setCustomContent(updated);
  };

  const handleResetContent = () => {
    setCustomContent(null);
    setIsPlaceholderMode(true);
  };

  return (
    <div className="min-h-screen bg-[#EDF4FB] bg-light-blue-pattern text-slate-900 flex flex-col font-sans antialiased selection:bg-[#00529B] selection:text-white">
      {/* Shared Header & Responsive Navigation */}
      <PortalHeader
        activeTab={activeTab}
        activeSubpage={activeSubpage}
        onSelectTab={handleSelectTab}
        isPlaceholderMode={isPlaceholderMode && !customContent}
        onTogglePlaceholderMode={handleToggleMode}
        onOpenContentEditor={() => setIsEditorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full" id="main-content">
        {/* Status / Mode Helper Banner */}
        <div className="bg-[#E5F0FA] border-b border-[#00529B]/15 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00529B]" aria-hidden="true" />
              <span>
                {customContent ? (
                  <strong className="text-[#003366]">Custom Content Active:</strong>
                ) : isPlaceholderMode ? (
                  <strong className="text-[#003366]">Strict Placeholder Mode:</strong>
                ) : (
                  <strong className="text-[#003366]">Sample Preview Mode:</strong>
                )}{' '}
                {customContent
                  ? 'Viewing user-applied content and imagery.'
                  : isPlaceholderMode
                  ? 'Official KBZLIFE Company Profile, Burmese Vision, Mission, Purpose, Core Values & Aspirations active.'
                  : 'Displaying visual mockup preview with sample corporate copy.'}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleToggleMode}
                className="text-[11px] font-semibold text-[#00529B] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#00529B]" />
                <span>{isPlaceholderMode ? 'View Sample Preview' : 'View Raw Placeholders'}</span>
              </button>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <button
                onClick={() => setIsEditorOpen(true)}
                className="text-[11px] font-semibold text-[#003366] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#003366]" />
                <span>Edit / Supply Official Assets</span>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Sub-Navigation Toolbar when inside Our Company */}
        {activeTab === 'our-company' && (
          <div className="bg-[#EDF4FB]/95 backdrop-blur-md border-b border-sky-200/80 sticky top-18 z-30 shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
              {/* Breadcrumb Indicator */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <button
                  onClick={() => handleSelectTab('our-company', 'overview')}
                  className="hover:text-[#003366] flex items-center gap-1 cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Our Company</span>
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                <span className="font-bold text-[#003366]">
                  {OUR_COMPANY_DROPDOWN_ITEMS.find((item) => item.id === activeSubpage)?.label}
                </span>
              </div>

              {/* Subpage Tabs Switcher */}
              <div className="flex items-center gap-1 overflow-x-auto py-0.5">
                {OUR_COMPANY_DROPDOWN_ITEMS.map((item) => {
                  const isCurrent = activeSubpage === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab('our-company', item.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                        isCurrent
                          ? 'bg-[#003366] text-white shadow-2xs'
                          : 'text-slate-600 hover:text-[#003366] hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* CONTENT ROUTING */}
        {activeTab === 'our-company' ? (
          <div>
            {/* SUBPAGE 1: OVERVIEW (Full Page 1 Implementation) */}
            {activeSubpage === 'overview' && (
              <div>
                <OurCompanyHero content={activeContent.hero} />
                <CeoMottoSection content={activeContent.ceoMotto} />
                <AboutKBZLifeSection content={activeContent.about} />
                <VisionMissionPurposeSection
                  vision={activeContent.vision}
                  mission={activeContent.mission}
                  purpose={activeContent.purpose}
                />
                <CoreValuesSection content={activeContent.coreValues} />
                <AspirationsSection content={activeContent.aspirations} />
              </div>
            )}

            {/* SUBPAGE 2: OUR COMPANY NEWS */}
            {activeSubpage === 'news' && (
              <OurCompanyNewsPage onBackToOverview={() => setActiveSubpage('overview')} />
            )}

            {/* SUBPAGE 3: COMPANY UPDATE VIDEO */}
            {activeSubpage === 'videos' && (
              <CompanyUpdateVideoPage onBackToOverview={() => setActiveSubpage('overview')} />
            )}

            {/* SUBPAGE 4: TOP PERFORMER */}
            {activeSubpage === 'top-performers' && (
              <TopPerformerPage onBackToOverview={() => setActiveSubpage('overview')} />
            )}
          </div>
        ) : (
          /* TABS 2, 3, 4: Modular Placeholders */
          <HubPlaceholderView
            hubId={activeTab}
            onReturnToCompany={() => handleSelectTab('our-company', 'overview')}
          />
        )}
      </main>

      {/* Shared Footer with Quick Links (Strictly in footer only) */}
      <PortalFooter
        activeTab={activeTab}
        onSelectTab={(tabId) => handleSelectTab(tabId, 'overview')}
      />

      {/* Content Editor Modal for Stakeholder Content Population */}
      <ContentEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        currentContent={activeContent}
        onSaveContent={handleSaveCustomContent}
        onResetContent={handleResetContent}
      />
    </div>
  );
}
