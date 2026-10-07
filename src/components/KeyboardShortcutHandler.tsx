import React, { useEffect } from 'react';
import { useTrading } from '../context/TradingContext';

export const KeyboardShortcutHandler: React.FC = () => {
  const {
    openTradeModal,
    setIsCommandSearchOpen,
    setActivePage,
    isTradeModalOpen,
    isCommandSearchOpen
  } = useTrading();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input, textarea, select, or contenteditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      ) {
        return;
      }

      // Ignore if modal is already open
      if (isTradeModalOpen || isCommandSearchOpen) {
        return;
      }

      // Don't interfere if ctrl/alt/meta is held
      if (e.ctrlKey || e.altKey || e.metaKey) {
        return;
      }

      const key = e.key.toLowerCase();

      switch (key) {
        case 'b':
          e.preventDefault();
          openTradeModal('BUY');
          break;
        case 's':
          e.preventDefault();
          setIsCommandSearchOpen(true);
          break;
        case 'p':
          e.preventDefault();
          setActivePage('portfolio');
          break;
        case 'o':
          e.preventDefault();
          setActivePage('orders');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openTradeModal, setIsCommandSearchOpen, setActivePage, isTradeModalOpen, isCommandSearchOpen]);

  return null;
};
