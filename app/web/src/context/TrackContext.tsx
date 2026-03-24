import React, { createContext, useContext, useState, useEffect } from 'react';

type Track = 'creativa' | 'tecnologica' | 'none';

interface TrackContextType {
  track: Track;
  setTrack: (track: Track) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

const TrackContext = createContext<TrackContextType | undefined>(undefined);

export const TrackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [track, setTrackState] = useState<Track>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('ld_track') as Track) || 'none';
    }
    return 'none';
  });

  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('ld_theme') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  const setTrack = (newTrack: Track) => {
    setTrackState(newTrack);
    localStorage.setItem('ld_track', newTrack);
  };

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    localStorage.setItem('ld_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <TrackContext.Provider value={{ track, setTrack, theme, setTheme }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrack = () => {
  const context = useContext(TrackContext);
  if (context === undefined) {
    throw new Error('useTrack must be used within a TrackProvider');
  }
  return context;
};
