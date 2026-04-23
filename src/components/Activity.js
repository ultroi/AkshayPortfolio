import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import '../styles/Activity.css';

// ✅ Heavy calculations moved outside component (memoized)
const calculateStreaks = (contributions) => {
  let currentStreak = 0;
  let maxStreak = 0;
  let tempStreak = 0;

  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i]?.count > 0) currentStreak++;
    else break;
  }

  for (let i = 0; i < contributions.length; i++) {
    if (contributions[i]?.count > 0) {
      tempStreak++;
      maxStreak = Math.max(maxStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return { currentStreak, longestStreak: maxStreak };
};

const ActivityContent = ({ 
  contributions, 
  totals, 
  lastUpdated, 
  loading, 
  error, 
  selectedYear, 
  onYearChange 
}) => {
  // ✅ useMemo: Heavy calculations only when dependencies change
  const { currentStreak, longestStreak } = useMemo(
    () => calculateStreaks(contributions),
    [contributions]
  );

  const sortedTotals = useMemo(
    () => Object.entries(totals).sort((a, b) => Number(b[0]) - Number(a[0])),
    [totals]
  );

  const availableYears = useMemo(
    () => ['all', ...sortedTotals.map(([year]) => year)],
    [sortedTotals]
  );

  const filteredContributions = useMemo(
    () => selectedYear === 'all' 
      ? contributions 
      : contributions.filter(item => item.date?.startsWith(selectedYear)),
    [selectedYear, contributions]
  );

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    data: null
  });

  const handleCellLeave = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }));
  }, []);

  const handleCellHover = useCallback((event, item) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const tooltipWidth = 140;  // approx width
    const tooltipHeight = 50;  // approx height

    let x = rect.left + rect.width / 2;
    let y = rect.top - tooltipHeight - 8;

    // LEFT EDGE FIX
    if (x - tooltipWidth / 2 < 8) {
      x = tooltipWidth / 2 + 8;
    }

    // RIGHT EDGE FIX
    if (x + tooltipWidth / 2 > window.innerWidth - 8) {
      x = window.innerWidth - tooltipWidth / 2 - 8;
    }

    // TOP EDGE FIX → flip below
    if (y < 8) {
      y = rect.bottom + 8;
    }

    setTooltip({
      visible: true,
      x,
      y,
      data: item
    });
  }, []);

  const contributionCount = useMemo(
    () => contributions.reduce((sum, item) => sum + (item.count || 0), 0),
    [contributions]
  );

  const heatmapCellSize = selectedYear === '2026' ? '10px' : '14px';

  const getLevelColor = useCallback((level) => {
    const colors = {
      0: 'var(--level-0)',
      1: 'var(--level-1)',
      2: 'var(--level-2)',
      3: 'var(--level-3)',
      4: 'var(--level-4)'
    };
    return colors[level] || colors[0];
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="activity-hero">
        <div className="hero-badge">
          <span className="badge-icon">⚡</span>
          <span>GitHub Insights</span>
        </div>
        <h1 className="hero-title">
          Development <span className="gradient-text">Footprint</span>
        </h1>
        <p className="hero-subtitle">
          Track my coding journey, contributions, and growth as a developer
        </p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card stat-card-primary">
          <div className="stat-icon-wrapper">
            <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Contributions</span>
            <span className="stat-value">{loading ? '...' : contributionCount.toLocaleString()}</span>
            <span className="stat-trend">+{Math.floor(contributionCount * 0.12)} this year</span>
          </div>
          <div className="stat-bg-glow"></div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 12h4l2-6 4 12 3-9 3 6 2-3"/>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Current Streak</span>
            <span className="stat-value">{loading ? '...' : currentStreak}</span>
            <span className="stat-trend">days</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 8v4l3 3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Longest Streak</span>
            <span className="stat-value">{loading ? '...' : longestStreak}</span>
            <span className="stat-trend">days</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">Active Years</span>
            <span className="stat-value">{Object.keys(totals).length}</span>
            <span className="stat-trend">on GitHub</span>
          </div>
        </div>
      </div>

      {/* Contribution Heatmap */}
      <div className="heatmap-section">
        <div className="section-header">
          <div className="header-left">
            <h2>Contribution Calendar</h2>
            <p className="header-description">Daily coding activity visualized</p>
          </div>
          <div className="header-right">
            <div className="year-selector">
              {availableYears.map(year => (
                <button
                  key={year}
                  className={`year-btn ${selectedYear === year ? 'active' : ''}`}
                  onClick={() => onYearChange(year)}
                >
                  {year === 'all' ? 'All' : year}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="heatmap-container">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Fetching contribution data...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p>{error}</p>
            </div>
          ) : (
            <>
              <div className="heatmap-grid" style={{ '--heatmap-cell-size': heatmapCellSize }}>
                {filteredContributions.map((item) => (
                  <div
                    key={item.date}
                    className={`heatmap-cell level-${item.level}`}
                    style={{ '--cell-color': getLevelColor(item.level) }}
                    data-count={item.count}
                    data-date={item.date}
                    onMouseEnter={(e) => handleCellHover(e, item)}
                    onMouseMove={(e) => handleCellHover(e, item)}
                    onMouseLeave={handleCellLeave}
                  />
                ))}
              </div>

              {tooltip.visible && tooltip.data && (
                <div
                  className="cell-tooltip"
                  style={{
                    position: 'fixed',
                    top: tooltip.y,
                    left: tooltip.x,
                    zIndex: 9999
                  }}
                >
                  <strong>{tooltip.data.date}</strong>
                  <span>{tooltip.data.count} contribution{tooltip.data.count !== 1 ? 's' : ''}</span>
                </div>
              )}
            </>
          )}
        </div>

        {!loading && !error && (
          <div className="heatmap-footer">
            <div className="update-info">
              <span className="update-dot"></span>
              Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) : '—'}
            </div>

            <div className="heatmap-legend">
              <span className="legend-label">Less</span>
              <div className="legend-colors">
                <div className="legend-color level-0"></div>
                <div className="legend-color level-1"></div>
                <div className="legend-color level-2"></div>
                <div className="legend-color level-3"></div>
                <div className="legend-color level-4"></div>
              </div>
              <span className="legend-label">More</span>
            </div>
          </div>
        )}
      </div>

      {/* Yearly Breakdown */}
      <div className="yearly-breakdown">
        <h3>Yearly Overview</h3>
        <div className="yearly-grid">
          {sortedTotals.map(([year, count]) => (
            <div key={year} className="year-card">
              <div className="year-card-header">
                <span className="year-number">{year}</span>
                <span className="year-count">{count.toLocaleString()}</span>
              </div>
              <div className="year-progress">
                <div 
                  className="year-progress-fill" 
                  style={{ width: `${(count / (sortedTotals[0]?.[1] || 1)) * 100}%` }}
                ></div>
              </div>
              <div className="year-card-footer">
                <span>contributions</span>
                <span className="year-percent">
                  {Math.round((count / (sortedTotals.reduce((sum, [, c]) => sum + c, 0))) * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Quote */}
      <div className="activity-quote">
        <div className="quote-icon">"</div>
        <blockquote>
          Code is not just about solving problems — it's about creating solutions that outlive the moment.
        </blockquote>
        <div className="quote-author">— Continuous iteration, constant improvement</div>
      </div>
    </>
  );
};

// ✅ React.memo: Prevents re-renders unless props actually change
const MemoizedActivityContent = React.memo(ActivityContent);

function Activity() {
  const [contributions, setContributions] = useState([]);
  const [totals, setTotals] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isVisible, setIsVisible] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  const sectionRef = useRef(null);
  const fetchTimeoutRef = useRef(null);
  
  const username = 'ultroi';
  const apiUrl = `https://github-contributions-api.jogruber.de/v4/${username}`;
  const cacheKey = 'github-contributions-ultroi-data';
  const cacheDateKey = 'github-contributions-ultroi-fetched-at';

  // ✅ Intersection Observer: Lazy load - fetch only when section is visible
  useEffect(() => {
    const currentRef = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFetched) {
          setIsVisible(true);
          setHasFetched(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasFetched]);

  // ✅ Helper functions
  const isSameDay = useCallback((first, second) => {
    return (
      first &&
      second &&
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  }, []);

  const loadCache = useCallback(() => {
    try {
      const cachedRaw = localStorage.getItem(cacheKey);
      const cachedAtRaw = localStorage.getItem(cacheDateKey);
      if (!cachedRaw || !cachedAtRaw) return null;

      const cachedAt = new Date(cachedAtRaw);
      const cachedData = JSON.parse(cachedRaw);

      return { cachedData, cachedAt };
    } catch {
      return null;
    }
  }, [cacheKey, cacheDateKey]);

  const saveCache = useCallback((data) => {
    try {
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(cacheDateKey, new Date().toISOString());
    } catch {
      // ignore localStorage errors
    }
  }, [cacheKey, cacheDateKey]);

  const fetchContributions = useCallback(async (isForeground = true) => {
    if (!isVisible) return;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // ✅ 8s timeout

      const response = await fetch(apiUrl, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed to load GitHub data (${response.status})`);
      }

      const data = await response.json();
      setContributions(data.contributions || []);
      setTotals(data.total || {});
      setLastUpdated(new Date().toISOString());
      setError(null);
      if (isForeground) setLoading(false);
      saveCache(data);
    } catch (fetchError) {
      setError(fetchError.message);
      if (isForeground) setLoading(false);
    }
  }, [isVisible, apiUrl, saveCache]);

  // ✅ Data loading: Fetch on visibility + cache strategy
  useEffect(() => {
    if (!isVisible) return;

    const now = new Date();
    const cache = loadCache();

    // Load cached data first (instant UI)
    if (cache) {
      setContributions(cache.cachedData.contributions || []);
      setTotals(cache.cachedData.total || {});
      setLastUpdated(cache.cachedAt.toISOString());
      setLoading(false);
    }

    // ✅ Background refresh: Fetch new data but don't block UI
    if (!cache || !isSameDay(cache.cachedAt, now)) {
      // Debounce background fetch
      if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
      
      fetchTimeoutRef.current = setTimeout(() => {
        fetchContributions(false);
      }, 500);
    }

    // ✅ Refresh every 6 hours (not 24h) for live data
    const intervalId = setInterval(() => {
      fetchContributions(false);
    }, 6 * 60 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
      if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
    };
  }, [isVisible, fetchContributions, isSameDay, loadCache]);

  useEffect(() => {
    const yearKeys = Object.keys(totals);
    if (yearKeys.length === 0) return;

    if (selectedYear !== 'all' && !yearKeys.includes(selectedYear)) {
      const currentYear = new Date().getFullYear().toString();
      if (yearKeys.includes(currentYear)) {
        setSelectedYear(currentYear);
      } else {
        setSelectedYear(yearKeys[0]);
      }
    }
  }, [totals, selectedYear]);

  const handleYearChange = useCallback((year) => {
    setSelectedYear(year);
  }, [setSelectedYear]);

  // ✅ Show placeholder while data loads (don't block page render)
  if (!isVisible) {
    return (
      <section id="activity" className="activity" ref={sectionRef}>
        <div className="activity-container">
          <div className="activity-hero" style={{ opacity: 0.5 }}>
            <div className="hero-badge">
              <span className="badge-icon">⚡</span>
              <span>GitHub Insights</span>
            </div>
            <h1 className="hero-title">
              Development <span className="gradient-text">Footprint</span>
            </h1>
            <p className="hero-subtitle">
              Track my coding journey, contributions, and growth as a developer
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="activity" className="activity" ref={sectionRef}>
      <div className="activity-container">
        <MemoizedActivityContent
          contributions={contributions}
          totals={totals}
          lastUpdated={lastUpdated}
          loading={loading}
          error={error}
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
        />
      </div>
    </section>
  );
}

export default Activity;
