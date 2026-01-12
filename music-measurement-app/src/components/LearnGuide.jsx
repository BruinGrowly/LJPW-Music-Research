import { useState } from 'react';
import './LearnGuide.css';
import {
    DIMENSION_EXPLANATIONS,
    METRIC_EXPLANATIONS,
    PHASE_EXPLANATIONS,
    EARWORM_SCIENCE,
    QUICK_TIPS,
    GLOSSARY,
} from '../lib/explanationData';

function LearnGuide() {
    const [activeSection, setActiveSection] = useState('intro');

    const sections = [
        { id: 'intro', label: 'What is LJPW?', icon: '🎯' },
        { id: 'dimensions', label: 'The Four Dimensions', icon: '🌟' },
        { id: 'metrics', label: 'Understanding Metrics', icon: '📊' },
        { id: 'phases', label: 'Phase Classifications', icon: '🔮' },
        { id: 'earworms', label: 'Creating Earworms', icon: '🎵' },
        { id: 'tips', label: 'Quick Tips', icon: '💡' },
        { id: 'glossary', label: 'Glossary', icon: '📖' },
    ];

    return (
        <div className="learn-guide">
            <div className="learn-header">
                <h2>📚 Learn LJPW Music Science</h2>
                <p>Understand what the measurements mean and how to use them</p>
            </div>

            <div className="learn-layout">
                <nav className="learn-nav">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                            onClick={() => setActiveSection(section.id)}
                        >
                            <span className="nav-icon">{section.icon}</span>
                            <span className="nav-label">{section.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="learn-content">
                    {activeSection === 'intro' && <IntroSection />}
                    {activeSection === 'dimensions' && <DimensionsSection />}
                    {activeSection === 'metrics' && <MetricsSection />}
                    {activeSection === 'phases' && <PhasesSection />}
                    {activeSection === 'earworms' && <EarwormsSection />}
                    {activeSection === 'tips' && <TipsSection />}
                    {activeSection === 'glossary' && <GlossarySection />}
                </div>
            </div>
        </div>
    );
}

// =============================================================================
// SECTION COMPONENTS
// =============================================================================

function IntroSection() {
    return (
        <div className="section-content">
            <h3>What is LJPW?</h3>

            <div className="intro-card highlight">
                <p className="intro-lead">
                    <strong>LJPW</strong> stands for <strong>Love, Justice, Power, Wisdom</strong> —
                    four fundamental dimensions that measure the <em>semantic content</em> of music.
                </p>
            </div>

            <div className="content-block">
                <h4>The Big Idea</h4>
                <p>
                    Every piece of music has a unique "fingerprint" based on how much of each
                    dimension it contains. By understanding these dimensions, you can:
                </p>
                <ul>
                    <li>🎯 Analyze why certain songs are more memorable than others</li>
                    <li>🎵 Create music that achieves specific emotional effects</li>
                    <li>🧲 Understand the science behind "earworms"</li>
                    <li>🎨 Make intentional choices about your musical palette</li>
                </ul>
            </div>

            <div className="content-block">
                <h4>The Core Formula</h4>
                <div className="formula-box">
                    <code>Music = f(Love, Justice, Power, Wisdom)</code>
                </div>
                <p>
                    Every musical element — every interval, chord, mode, and genre — can be
                    measured in these four dimensions. The combination determines how the
                    music feels and whether it sticks in your mind.
                </p>
            </div>

            <div className="content-block">
                <h4>The Magic Thresholds</h4>
                <div className="thresholds-grid">
                    <div className="threshold-item love">
                        <span className="threshold-label">Love ≥ 0.7</span>
                        <span className="threshold-desc">Required for emotional stickiness</span>
                    </div>
                    <div className="threshold-item harmony">
                        <span className="threshold-label">Harmony ≥ 0.6</span>
                        <span className="threshold-desc">Required for coherent encoding</span>
                    </div>
                </div>
                <p className="threshold-note">
                    When BOTH thresholds are met, music becomes <strong>autopoietic</strong> —
                    self-sustaining in consciousness. This is where earworms live!
                </p>
            </div>

            <div className="next-section">
                <p>Ready to dive deeper? Explore the sections in the sidebar to learn about each dimension in detail.</p>
            </div>
        </div>
    );
}

function DimensionsSection() {
    const [activeDimension, setActiveDimension] = useState('L');
    const dim = DIMENSION_EXPLANATIONS[activeDimension];

    return (
        <div className="section-content">
            <h3>The Four Dimensions</h3>

            <div className="dimension-tabs">
                {Object.entries(DIMENSION_EXPLANATIONS).map(([key, d]) => (
                    <button
                        key={key}
                        className={`dimension-tab ${activeDimension === key ? 'active' : ''}`}
                        style={{
                            '--dim-color': d.color,
                            borderColor: activeDimension === key ? d.color : 'transparent'
                        }}
                        onClick={() => setActiveDimension(key)}
                    >
                        <span className="dim-emoji">{d.emoji}</span>
                        <span className="dim-name">{d.name}</span>
                    </button>
                ))}
            </div>

            <div className="dimension-detail" style={{ '--dim-color': dim.color }}>
                <div className="dim-header">
                    <span className="dim-big-emoji">{dim.emoji}</span>
                    <div>
                        <h4 style={{ color: dim.color }}>{dim.name} ({dim.symbol})</h4>
                        <p className="dim-short">{dim.shortDesc}</p>
                    </div>
                </div>

                <div className="dim-section">
                    <h5>What It Means</h5>
                    <p className="dim-full">{dim.fullDesc}</p>
                    <pre className="dim-list">{dim.whatItMeans}</pre>
                </div>

                <div className="dim-section">
                    <h5>Musical Examples</h5>
                    <pre className="dim-examples">{dim.musicalExamples}</pre>
                </div>

                <div className="dim-section highlight-box" style={{ borderColor: dim.color }}>
                    <h5>How to Increase {dim.name}</h5>
                    <pre className="dim-tips">{dim.howToIncrease}</pre>
                </div>

                <div className="dim-section earworm-box">
                    <h5>🎵 Earworm Connection</h5>
                    <p>{dim.earwormConnection}</p>
                </div>

                <div className="dim-meta">
                    <span>Equilibrium: <strong>{dim.equilibrium}</strong></span>
                    <span>Beauty Threshold: <strong>{dim.thresholdForBeauty}</strong></span>
                </div>
            </div>
        </div>
    );
}

function MetricsSection() {
    return (
        <div className="section-content">
            <h3>Understanding Metrics</h3>
            <p className="section-intro">
                Beyond the four dimensions, LJPW calculates derived metrics that tell you
                about the overall quality and impact of music.
            </p>

            {Object.entries(METRIC_EXPLANATIONS).map(([key, metric]) => (
                <div key={key} className="metric-card">
                    <div className="metric-header">
                        <h4>{metric.name} ({metric.symbol})</h4>
                        <code className="metric-formula">{metric.formula}</code>
                    </div>

                    <p className="metric-short">{metric.shortDesc}</p>

                    <div className="metric-body">
                        <div className="metric-section">
                            <h5>What It Means</h5>
                            <pre>{metric.whatItMeans}</pre>
                        </div>

                        <div className="metric-section">
                            <h5>How to Use It</h5>
                            <pre>{metric.howToUse}</pre>
                        </div>

                        <div className="metric-section earworm-connection">
                            <h5>🎵 Earworm Connection</h5>
                            <p>{metric.earwormConnection}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function PhasesSection() {
    return (
        <div className="section-content">
            <h3>Phase Classifications</h3>
            <p className="section-intro">
                Music exists in one of three phases based on its Harmony Index and Love value.
                Understanding these phases helps you know what kind of impact your music will have.
            </p>

            <div className="phases-flow">
                <div className="phase-arrow">→</div>
                {Object.entries(PHASE_EXPLANATIONS).map(([key, phase]) => (
                    <div
                        key={key}
                        className="phase-card"
                        style={{ '--phase-color': phase.color }}
                    >
                        <div className="phase-header">
                            <span className="phase-emoji">{phase.emoji}</span>
                            <h4>{phase.name}</h4>
                        </div>
                        <p className="phase-short">{phase.shortDesc}</p>
                    </div>
                ))}
            </div>

            {Object.entries(PHASE_EXPLANATIONS).map(([key, phase]) => (
                <div
                    key={key}
                    className="phase-detail"
                    style={{ borderLeftColor: phase.color }}
                >
                    <h4>
                        <span className="phase-emoji">{phase.emoji}</span>
                        {phase.name}
                    </h4>

                    <p>{phase.fullDesc}</p>

                    <div className="phase-section">
                        <h5>Characteristics</h5>
                        <pre>{phase.whatItMeans}</pre>
                    </div>

                    <div className="phase-section">
                        <h5>Examples</h5>
                        <p>{phase.examples}</p>
                    </div>

                    <div className="phase-section tip-box">
                        <h5>{key === 'AUTOPOIETIC' ? '✨ How to Achieve' : '🔧 How to Improve'}</h5>
                        <pre>{phase.howToFix || phase.howToAchieve}</pre>
                    </div>
                </div>
            ))}
        </div>
    );
}

function EarwormsSection() {
    return (
        <div className="section-content">
            <h3>🎵 {EARWORM_SCIENCE.title}</h3>
            <p className="section-intro highlight">{EARWORM_SCIENCE.intro}</p>

            <div className="earworm-section">
                <h4>{EARWORM_SCIENCE.whyEarwormsHappen.title}</h4>
                <pre className="earworm-content">{EARWORM_SCIENCE.whyEarwormsHappen.content}</pre>
            </div>

            <div className="earworm-section formula-section">
                <h4>{EARWORM_SCIENCE.theFormula.title}</h4>
                <pre className="earworm-content">{EARWORM_SCIENCE.theFormula.content}</pre>
            </div>

            <div className="earworm-section tips-section">
                <h4>{EARWORM_SCIENCE.practicalTips.title}</h4>
                <pre className="earworm-content">{EARWORM_SCIENCE.practicalTips.content}</pre>
            </div>

            <div className="earworm-section examples-section">
                <h4>{EARWORM_SCIENCE.famousExamples.title}</h4>
                <div className="famous-examples">
                    {EARWORM_SCIENCE.famousExamples.examples.map((example, i) => (
                        <div key={i} className="example-card">
                            <h5>{example.song}</h5>
                            <div className="example-profile">
                                <span style={{ color: '#ff6b6b' }}>L: {example.profile.L}</span>
                                <span style={{ color: '#4ecdc4' }}>J: {example.profile.J}</span>
                                <span style={{ color: '#ffd93d' }}>P: {example.profile.P}</span>
                                <span style={{ color: '#6c5ce7' }}>W: {example.profile.W}</span>
                            </div>
                            <div className="example-metrics">
                                <span>H: {example.H}</span>
                                <span>V: {example.V}</span>
                            </div>
                            <p className="example-why">{example.why}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TipsSection() {
    return (
        <div className="section-content">
            <h3>💡 Quick Tips</h3>
            <p className="section-intro">
                Fast reference guides for different musical goals.
            </p>

            <div className="tips-grid">
                {Object.entries(QUICK_TIPS).map(([key, category]) => (
                    <div key={key} className="tips-card">
                        <h4>{category.title}</h4>
                        <ul>
                            {category.tips.map((tip, i) => (
                                <li key={i}>{tip}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

function GlossarySection() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEntries = Object.entries(GLOSSARY).filter(([term]) =>
        term.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="section-content">
            <h3>📖 Glossary</h3>

            <div className="glossary-search">
                <input
                    type="text"
                    placeholder="Search terms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="glossary-list">
                {filteredEntries.map(([term, definition]) => (
                    <div key={term} className="glossary-item">
                        <dt>{term}</dt>
                        <dd>{definition}</dd>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LearnGuide;
