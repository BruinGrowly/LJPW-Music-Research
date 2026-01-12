import { useState, useRef, useEffect } from 'react';
import './HelpTooltip.css';

/**
 * HelpTooltip - A reusable tooltip component for displaying explanatory content
 * 
 * @param {string} content - The main tooltip content
 * @param {string} title - Optional title for the tooltip
 * @param {string} position - Position of tooltip: 'top', 'bottom', 'left', 'right'
 * @param {React.ReactNode} children - The element to attach the tooltip to
 */
function HelpTooltip({
    content,
    title,
    position = 'top',
    children,
    maxWidth = 320,
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);
    const tooltipRef = useRef(null);

    useEffect(() => {
        if (isVisible && triggerRef.current && tooltipRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();

            let top, left;

            switch (position) {
                case 'top':
                    top = triggerRect.top - tooltipRect.height - 8;
                    left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
                    break;
                case 'bottom':
                    top = triggerRect.bottom + 8;
                    left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
                    break;
                case 'left':
                    top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
                    left = triggerRect.left - tooltipRect.width - 8;
                    break;
                case 'right':
                    top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
                    left = triggerRect.right + 8;
                    break;
                default:
                    top = triggerRect.top - tooltipRect.height - 8;
                    left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
            }

            // Keep tooltip within viewport
            if (left < 10) left = 10;
            if (left + tooltipRect.width > window.innerWidth - 10) {
                left = window.innerWidth - tooltipRect.width - 10;
            }
            if (top < 10) {
                top = triggerRect.bottom + 8; // Flip to bottom
            }

            setTooltipPosition({ top, left });
        }
    }, [isVisible, position]);

    return (
        <span className="help-tooltip-container">
            <span
                ref={triggerRef}
                className="help-tooltip-trigger"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onClick={() => setIsVisible(!isVisible)}
            >
                {children || <span className="help-icon">?</span>}
            </span>

            {isVisible && (
                <div
                    ref={tooltipRef}
                    className={`help-tooltip help-tooltip-${position}`}
                    style={{
                        top: tooltipPosition.top,
                        left: tooltipPosition.left,
                        maxWidth: maxWidth,
                    }}
                >
                    {title && <div className="help-tooltip-title">{title}</div>}
                    <div className="help-tooltip-content">{content}</div>
                </div>
            )}
        </span>
    );
}

/**
 * InfoIcon - A simple info icon for use with HelpTooltip
 */
export function InfoIcon({ color = 'currentColor', size = 16 }) {
    return (
        <svg
            className="info-icon"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
    );
}

/**
 * QuestionIcon - A question mark icon for help buttons
 */
export function QuestionIcon({ color = 'currentColor', size = 16 }) {
    return (
        <svg
            className="question-icon"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
    );
}

export default HelpTooltip;
